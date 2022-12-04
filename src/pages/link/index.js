import React from "react";
import { ListPage } from "shared/hoc/ListPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";
import AddEditLink from "./[action]";

const dbPath = FIRESTORE_PATH.links;

const initialFormData = {
  title: '',
  linkAddress: '',
  category: '',
  image: ''
};

const selectedColumn = ['title', 'linkAddress', 'category', ''];


const AddComponent = ({ data, closeModal, setRefresh, initialObject }) => {
  return (
    <AddEditLink
      data={data}
      closeModal={closeModal}
      path={dbPath}
      initialFormValue={initialFormData}
      setRefresh={setRefresh}
      initialObject={initialObject}
    />
  )
}


export default ListPage(AddComponent, 'Link', dbPath, initialFormData, 'link', selectedColumn);