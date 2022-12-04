import React from "react";
import { ListPage } from "shared/hoc/ListPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";
import AddEditDocuments from "./[action]";

const dbPath = FIRESTORE_PATH.docs;

const initialFormData = {
  type: '',
  userName: '',
  documentId: ''
};

const selectedColumn = ['documentId', 'userName', 'type', ''];

const AddComponent = ({ data, closeModal, setRefresh, initialObject }) => {
  return (
    <AddEditDocuments
      data={data}
      closeModal={closeModal}
      path={dbPath}
      initialFormValue={initialFormData}
      setRefresh={setRefresh}
      initialObject={initialObject}
    />
  )
}

export default ListPage(AddComponent, 'Documents', dbPath, initialFormData, 'documents', selectedColumn);