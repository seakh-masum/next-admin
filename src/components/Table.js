import React from "react";
import { cardNumber } from "shared/helper/Service";
import { CARD_NETWORK } from "shared/helper/ContstantData";
import Status from "./Status";
import Color from "./Color";
import Avatar from "./Avatar";
import { makeExpiryDate } from "shared/helper/utility";

const Table = ({ data, columns, onEdit, onDelete, onView, onSort, sortColumn, sortDirection, displayColumn, onQrCode }) => {
  const tableCell = 'p-2 text-black dark:text-white';

  const getTableData = (type, value, row) => {
    switch (type) {
      case "isActive":
      case "billStatus":
      case "cardType":
      case "accountType":
        return <Status value={value} />;

      case "color":
        return <Color value={value} />;

      // case "cardType":
      //   return CARD_TYPE[value];

      case "network":
        return CARD_NETWORK[value];

      case 'cardNo':
        return cardNumber(value);

      case 'expiryDate':
        return makeExpiryDate(value);

      case 'image':
        return <Avatar url={value} title={row.title} />

      default:
        return value;
    }
  };



  return (
    <>
      <table className="bg-white -mx-4 dark:bg-neutral-800 ">
        <thead>
          {(columns && columns.length > 0) ?
            <tr className="py-3 bg-neutral-100 dark:bg-neutral-700">
              {columns?.map((item, index) => (
                <th className={`first:pl-5 relative ${tableCell} ${item == 'color' ? 'text-center' : 'text-left'}`} key={index} onClick={() => onSort(item, sortDirection == 'desc' ? 'asc' : 'desc')} >
                  {displayColumn[item]} {sortColumn == item && <i className={`fa-solid text-xs ${sortDirection == 'desc' ? 'fa-arrow-down' : sortDirection == 'asc' ? 'fa-arrow-up' : ''}`}></i>}
                </th>
              ))}
              <th className={`${tableCell} text-right pr-5`}>Action</th>
            </tr> : <tr className="py-3 bg-neutral-100 dark:bg-neutral-700">
              {[1, 2, 3, 4, 5].map((item) => {
                <th key={item} className={`first:pl-5 relative ${tableCell} animate-pulse`}></th>
              })}
            </tr>
          }
        </thead>
        <tbody>
          {data?.map((row, i) => (
            <tr className="border-b border-neutral-300 dark:border-neutral-600" key={i}>
              {columns?.map((column, j) => (
                <td key={j} className={`first:pl-5 relative ${tableCell}`}>
                  {getTableData(column, row[column], row)}
                </td>
              ))}
              <td className="p-2">
                <div className="flex flex-row gap-2 items-center justify-end pr-5">
                  <button onClick={() => onEdit(row.id)}>
                    <i className="fa-solid fa-pen text-black dark:text-white"></i>
                  </button>
                  <button onClick={() => onDelete(row.id)}>
                    <i className="fa-solid fa-trash text-black dark:text-white"></i>
                  </button>
                  <button onClick={() => onView(row.id)}>
                    <i className="fa-solid fa-eye text-black dark:text-white"></i>
                  </button>
                  <button onClick={() => onQrCode(row.id)}><i className="fa-solid fa-qrcode text-black dark:text-white"></i></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
