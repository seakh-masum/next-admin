import React from "react";
import { ListPage } from "shared/hoc/ListPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";
import AddEditUpi from "./[action]";

const dbPath = FIRESTORE_PATH.upi;

const initialFormData = {
  upiAddress: '',
  bankName: '',
  upiProvider: '',
};

const selectedColumn = ['upiAddress', 'bankName', 'upiProvider', ''];

const AddComponent = ({ data, closeModal, setRefresh, initialObject }) => {
  return (
    <AddEditUpi
      data={data}
      closeModal={closeModal}
      path={dbPath}
      initialFormValue={initialFormData}
      setRefresh={setRefresh}
      initialObject={initialObject}
    />
  )
}

export default ListPage(AddComponent, 'UPI Details', dbPath, initialFormData, 'upi', selectedColumn);