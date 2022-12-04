import React from "react";
import { ListPage } from "shared/hoc/ListPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";
import AddEditBill from "./[action]";

const dbPath = FIRESTORE_PATH.bills;

const initialFormData = {
  billName: '',
  billId: '',
  dueDate: '',
  paidDate: '',
  billCategory: '',
  paidWith: '',
};

const selectedColumn = ['billName', 'billId', 'billStatus', 'dueDate'];

const AddComponent = ({ data, closeModal, setRefresh, initialObject }) => {
  return (
    <AddEditBill data={data} closeModal={closeModal} setRefresh={setRefresh} path={dbPath} initialObject={initialObject} initialFormValue={initialFormData} />
  )
}

export default ListPage(AddComponent, 'Bill Details', dbPath, initialFormData, 'bills', selectedColumn);