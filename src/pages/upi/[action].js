import { ActionPage } from "shared/hoc/ActionPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";

const dbPath = FIRESTORE_PATH.upi;

const initialFormData = {
  upiAddress: '',
  bankName: '',
  upiProvider: '',
};

const inputs = [
  {
    id: 1,
    name: 'upiAddress',
    type: 'text',
    inputType: 'input',
    placeholder: 'Enter your upi address',
    label: 'UPI Address',
    isRequired: true,
    hasPattern: 'upi'
  },
  {
    id: 2,
    name: 'bankName',
    type: 'text',
    inputType: 'input',
    placeholder: 'Enter the name of the bank',
    label: 'Bank Name',
    isRequired: true,
  },
  {
    id: 3,
    name: 'upiProvider',
    type: 'text',
    inputType: 'input',
    placeholder: 'Enter the provider name',
    label: 'Provider Name',
    isRequired: true,
    hasPattern: 'fullName'
  },
];

export default ActionPage(dbPath, initialFormData, inputs); 