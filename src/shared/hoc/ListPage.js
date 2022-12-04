import React, { useState, useEffect } from "react";
import Card from "components/Card";
import Titlebar from "components/Titlebar";
import Table from "components/Table";
import Dialog from "components/Dialog";
import { useRouter } from "next/router";
import Paginator from "components/Paginator";
import Filter from "components/Filter";
import TableColumn from "components/TableColumn";
import { showError, showSuccess } from "shared/helper/utility";
import { deleteAPI, getAPI, putAPI } from "shared/helper/API";
import { assignValueInObject, checkDeviceType } from "shared/helper/Service";
import QRCode from "components/QRCode";
import useModal from "shared/hooks/useModal";
import DialogContainer from "components/DialogContainer";
import MiniCard from "components/MiniCard";
import { ConfirmBox } from "components/ConfirmBox";

export const ListPage = (AddComponent, title, path, initialFormData, route, selectedColumn) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const { action } = router.query;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [columnValue, setColumnValue] = useState({});
    const [columnOrder, setColumnOrder] = useState([]);
    const [columnId, setColumnId] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [pageLimit, setPageLimit] = useState(10);
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0);
    const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
    const [validationMessage, setValidationMessage] = useState({});
    const { setDialog, closeDialog } = useModal();
    const isMobile = checkDeviceType();

    const [domLoaded, setDomLoaded] = useState(false);


    useEffect(() => {
      setDomLoaded(true);
    }, []);


    useEffect(() => {
      setLoading(true);
      if (loading) {
        getAllData();
      }
    }, [loading, pageLimit, refresh, pageNumber, sortColumn, sortDirection]);


    useEffect(() => {
      getTableColumns();
    }, [refresh])

    const getAllData = () => {
      getAPI(`/api/${path}?page=${pageNumber}&limit=${pageLimit}&sort=${sortColumn}&direction=${sortDirection}`)
        .then(res => {
          const { data, count } = res;
          setTableData(data);
          setCount(count);
        }).catch(err => {
          console.log(err)
        });
    }

    const getTableColumns = () => {
      getAPI(`/api/table-columns/${path}`).then(res => {
        const { id, orders, value } = res;
        setColumnValue(value);
        setColumnOrder(orders);
        setColumnId(id);
        setValidationMessage(assignValueInObject(value, undefined));
      })
    }



    const onAdd = async () => {
      router.push(`/${route}/?action=add`, `/${route}/add`);
    };


    const closeModal = () => {
      router.back();
    };


    const onEdit = async (id) => {
      const selectedData = tableData.find((x) => x.id === id);
      setFormData(selectedData);
      router.push(`/${route}/?action=edit&id=${id}`, `/${route}/edit?id=${id}`);
    };

    const deleteItem = async (id) => {
      setRefresh(false);
      deleteAPI(`/api/${path}/${id}`).then((data) => {
        setRefresh(true);
        showSuccess(data.message);
        closeDialog();
      }).catch((error) => {
        showError(error.message);
      });
    }

    const onView = (id) => {
      const selectedData = tableData.find((x) => x.id === id);
      setFormData(selectedData);
      router.push(`/${route}/?action=view&id=${id}`, `/${route}/view?id=${id}`);
    };

    const getTitle = () => {
      const str = action.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())
      return `${str} ${title}`;
    }

    const limit = (data) => {
      setPageLimit(data);
    }

    const onSort = (column, direction) => {
      setSortColumn(column);
      setSortDirection(direction);
    }

    const onOpenColumn = () => {
      setIsColumnModalOpen(true);
    }

    const closeColumnModal = () => {
      setRefresh(false);
      putAPI(`/api/table-columns/${path}/${columnId}`, { name: path, orders: columnOrder, value: columnValue })
        .then((res) => {
          showSuccess(res.message);
          setIsColumnModalOpen(false);
          // closeDialog()
          setColumnOrder(res.orders);
          setRefresh(true)
        })
        .catch((error) => {
          showError(error.message);
          setIsColumnModalOpen(false);
          // closeDialog();
        });
    }

    const changePage = (page) => {
      setPageNumber(page);
    }

    const QrDialog = ({ formData }) => {
      return (
        <Dialog
          title='QR Code'
          width="300px"
          closeModal={closeDialog}
        >
          <QRCode columnValue={columnValue} formData={formData} />
        </Dialog>
      );
    }

    const openDeleteDialog = (id) => {
      setDialog(
        <ConfirmBox closeModal={closeDialog} title='Delete Item' onYes={() => deleteItem(id)} message='Are you sure want to delete the item??' />
      );
    }

    const onQrCode = (id) => {
      const selectedData = tableData.find((x) => x.id === id);
      setDialog(<QrDialog formData={selectedData} />)
    }

    return (
      <>
        {domLoaded &&
          <>
            {/* Modals */}
            <>
              {router.query.action &&
                <DialogContainer>
                  <Dialog
                    title={getTitle()}
                    width="500px"
                    closeModal={closeModal}
                  >
                    <AddComponent data={formData} initialObject={validationMessage} setRefresh={setRefresh} {...props} />
                  </Dialog>
                </DialogContainer>
              }
              {
                isColumnModalOpen &&
                <DialogContainer>
                  <Dialog
                    title='Table Columns'
                    width="500px"
                    closeModal={closeColumnModal}
                  >
                    <TableColumn columnOrder={columnOrder} columnValue={columnValue} setColumnOrder={setColumnOrder} />
                  </Dialog>
                </DialogContainer>
              }
            </>
            <Titlebar title={title} onClickBtn={onAdd} isMobile={isMobile} />
            {isMobile ?
              // Mobile
              <div className="p-3">
                {tableData.map((item, index) => (
                  <MiniCard key={index} topLeft={item[selectedColumn[0]]} bottomLeft={item[selectedColumn[1]]} topRight={item[selectedColumn[2]]} bottomRight={item[selectedColumn[3]]}
                    onEdit={() => onEdit(item.id)}
                    onView={() => onView(item.id)}
                    onDelete={() => openDeleteDialog(item.id)}
                    onQrCode={() => onQrCode(item.id)} />
                ))}
              </div> :
              // Desktop
              <Card>
                <Filter onOpenColumn={onOpenColumn} />
                <Table
                  columns={columnOrder}
                  displayColumn={columnValue}
                  data={tableData}
                  onSort={onSort}
                  sortColumn={sortColumn}
                  sortDirection={sortDirection}
                  onEdit={onEdit}
                  onView={onView}
                  onDelete={openDeleteDialog}
                  onQrCode={onQrCode}
                />
                <Paginator totalItem={count} currentPage={pageNumber} setCurrentPage={(page) => changePage(page)} limit={limit} />
              </Card>
            }
          </>
        }
      </>
    );
  };

  return Wrapper;
};