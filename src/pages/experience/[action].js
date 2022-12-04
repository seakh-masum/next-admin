import { ActionPage } from "shared/hoc/ActionPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";

const dbPath = FIRESTORE_PATH.experience;

const initialFormData = {
  company: "",
  role: "",
  joiningDate: "",
  lastDate: "",
  tenure: "",
  location: '',
};

const inputs = [
  {
    id: 1,
    name: 'company',
    type: 'text',
    placeholder: 'Enter the company name',
    label: 'Company Name',
    isRequired: true,
    inputType: 'input',
  },
  {
    id: 2,
    name: 'role',
    type: 'text',
    placeholder: 'Enter your role here',
    label: 'Role',
    isRequired: true,
    inputType: 'input',
    hasPattern: 'fullName'
  },
  {
    id: 3,
    name: 'joiningDate',
    type: 'month',
    placeholder: 'Enter the joining date',
    label: 'Joining Date',
    isRequired: true,
  },
  {
    id: 4,
    name: 'lastDate',
    type: 'month',
    placeholder: 'Enter the last date',
    label: 'Last Date',
    isRequired: true,
    inputType: 'input',
  },
  {
    id: 5,
    name: 'location',
    type: 'text',
    placeholder: 'Enter the company location',
    label: 'Location',
    inputType: 'input'
  },
];
export default ActionPage(dbPath, initialFormData, inputs);