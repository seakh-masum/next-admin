import { ActionPage } from "shared/hoc/ActionPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";
import { RELATIONSHIP_LIST, CATEGORY_LIST } from "shared/data/SelectionData";

const dbPath = FIRESTORE_PATH.contacts;

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  designation: '',
  relationship: '',
  category: '',
  address: '',
  birthdate: ''
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
    hasPattern: 'fullName'
  },
  {
    id: 2,
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email address',
    label: 'Email Address',
    isRequired: true,
    inputType: 'input',
    hasPattern: 'email',
    isCopy: true,
  },
  {
    id: 3,
    name: 'phone',
    type: 'text',
    placeholder: 'Enter the phone number',
    label: 'Phone Number',
    isRequired: true,
    inputType: 'input',
    hasPattern: 'phone',
    isCopy: true,
  },
  {
    id: 4,
    name: 'company',
    type: 'text',
    placeholder: 'Enter the company name',
    label: 'Company Name',
    inputType: 'input',
  },
  {
    id: 5,
    name: 'designation',
    type: 'text',
    placeholder: 'Enter the designation',
    label: 'Designation',
    inputType: 'input',
  },
  {
    id: 6,
    name: 'relationship',
    type: 'text',
    placeholder: 'Enter relationship with you',
    label: 'Relationship',
    inputType: 'select',
    options: RELATIONSHIP_LIST
  },
  {
    id: 7,
    name: 'category',
    type: 'text',
    placeholder: 'Enter the category name',
    label: 'Category',
    inputType: 'select',
    options: CATEGORY_LIST
  },
  {
    id: 8,
    name: 'address',
    type: 'text',
    placeholder: 'Enter the address',
    label: 'Address',
    inputType: 'input',
  },
  {
    id: 9,
    name: 'birthdate',
    type: 'date',
    placeholder: 'Enter the date of birth',
    label: 'Birthdate',
    inputType: 'input',
  },
];

export default ActionPage(dbPath, initialFormData, inputs);