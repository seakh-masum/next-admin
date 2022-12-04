import React from "react";
import { ListPage } from "shared/hoc/ListPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";
import AddEditBank from "./[action]";

const dbPath = FIRESTORE_PATH.banks;

const initialFormData = {
  accountNo: '',
  accountType: 'savings',
  bankName: '',
  branchName: '',
  color: '#000000',
  holderName: '',
  ifsc: '',
};
const selectedColumn = ['bankName', 'accountNo', 'accountType', 'color'];

const AddComponent = ({ data, closeModal, setRefresh, initialObject }) => {
  return (
    <AddEditBank data={data} closeModal={closeModal} setRefresh={setRefresh} path={dbPath} initialObject={initialObject} initialFormValue={initialFormData} />
  )
}

export default ListPage(AddComponent, 'Bank Details', dbPath, initialFormData, 'bank', selectedColumn);