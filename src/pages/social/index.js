import React from "react";
import { ListPage } from "shared/hoc/ListPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";
import AddEditSocial from "./[action]";

const dbPath = FIRESTORE_PATH.social;

const initialFormData = {
  userId: '',
  type: '',
  link: ''
};

const selectedColumn = ['userId', 'link', 'type', ''];

const AddComponent = ({ data, closeModal, setRefresh, initialObject }) => {
  return (
    <AddEditSocial
      data={data}
      closeModal={closeModal}
      path={dbPath}
      initialFormValue={initialFormData}
      setRefresh={setRefresh}
      initialObject={initialObject}
    />
  )
}

export default ListPage(AddComponent, 'Social Media', dbPath, initialFormData, 'social', selectedColumn);