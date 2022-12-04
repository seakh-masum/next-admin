import React from "react";
import { ListPage } from "shared/hoc/ListPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";
import AddEditContact from "./[action]";

const dbPath = FIRESTORE_PATH.contacts;

const initialFormData = {
  name: '',
  company: '',
  designation: '',
  relationship: '',
  category: '',
  address: '',
  birthdate: ''
};

const selectedColumn = ['name', 'company', 'category', 'relationship'];

const AddComponent = ({ data, closeModal, setRefresh, initialObject }) => {
  return (
    <AddEditContact
      data={data}
      closeModal={closeModal}
      path={dbPath}
      initialFormValue={initialFormData}
      setRefresh={setRefresh}
      initialObject={initialObject}
    />
  )
}

export default ListPage(AddComponent, 'Contacts', dbPath, initialFormData, 'contact', selectedColumn);