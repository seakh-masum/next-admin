import React from "react";
import { ListPage } from "shared/hoc/ListPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";
import AddEditExperience from "./[action]";

const dbPath = FIRESTORE_PATH.experience;

const initialFormData = {
  company: "",
  role: "",
  joiningDate: "",
  lastDate: "",
  tenure: "",
  location: '',
};

const selectedColumn = ['company', 'role', 'tenure', 'joiningDate'];


const AddComponent = ({ data, closeModal, setRefresh, initialObject }) => {
  return (
    <AddEditExperience
      data={data}
      closeModal={closeModal}
      path={dbPath}
      initialFormValue={initialFormData}
      setRefresh={setRefresh}
      initialObject={initialObject}
    />
  )
}

export default ListPage(AddComponent, 'Experience', dbPath, initialFormData, 'experience', selectedColumn);