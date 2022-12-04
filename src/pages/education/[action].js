import { ActionPage } from "shared/hoc/ActionPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";

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

const inputs = [
  {
    id: 1,
    name: 'name',
    type: 'text',
    placeholder: 'Enter your full name',
    label: 'Full Name',
    isRequired: true,
    inputType: 'input',
  },
  {
    id: 2,
    name: 'institute',
    type: 'text',
    placeholder: 'Enter the institute name',
    label: 'Institute Name',
    isRequired: true,
    inputType: 'input',
  },
  {
    id: 3,
    name: 'startYear',
    type: 'text',
    placeholder: 'Enter the starting year',
    label: 'Start Year',
    isRequired: true,
    inputType: 'input',
    hasPattern: 'year'
  },
  {
    id: 4,
    name: 'endYear',
    type: 'text',
    placeholder: 'Enter the ending year',
    label: 'End Year',
    isRequired: true,
    inputType: 'input',
    hasPattern: 'year',
  },
  {
    id: 5,
    name: 'university',
    type: 'text',
    placeholder: 'Enter the university name',
    label: 'University',
    isRequired: true,
    inputType: 'input',
  },
  {
    id: 6,
    name: 'percentage',
    type: 'text',
    placeholder: 'Enter the marks percentage',
    label: 'Percentage',
    isRequired: true,
    inputType: 'input',
    hasPattern: 'percentage'
  },
  {
    id: 7,
    name: 'grade',
    type: 'text',
    placeholder: 'Enter the grade',
    label: 'Grade',
    isRequired: true,
    inputType: 'input',
  },
  {
    id: 8,
    name: 'degree',
    type: 'text',
    placeholder: 'Enter the name of the degree',
    label: 'Degree',
    isRequired: true,
    inputType: 'input',
  },
];

export default ActionPage(dbPath, initialFormData, inputs);