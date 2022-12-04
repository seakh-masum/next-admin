import React from "react";
import { ListPage } from "shared/hoc/ListPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";
import AddEditEducation from "./[action]";


const dbPath = FIRESTORE_PATH.education;

const initialFormData = {
  name: "",
  institute: "",
  startYear: "",
  endYear: "",
  university: "",
  percentage: "",
  grade: "",
  degree: "",
};

const selectedColumn = ['institute', 'university', 'grade', 'percentage'];

const AddComponent = ({ data, closeModal, setRefresh, initialObject }) => {
  return (
    <AddEditEducation
      data={data}
      closeModal={closeModal}
      path={dbPath}
      initialFormValue={initialFormData}
      setRefresh={setRefresh}
      initialObject={initialObject}
    />
  )
}


export default ListPage(AddComponent, 'Education', dbPath, initialFormData, 'education', selectedColumn);