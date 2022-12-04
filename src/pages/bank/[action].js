import { ActionPage } from "shared/hoc/ActionPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";
import { ACCOUNT_TYPE } from "shared/data/SelectionData";

const dbPath = FIRESTORE_PATH.banks;

const initialFormData = {
  accountNo: '',
  accountType: 'savings',
  bankName: '',
  branchName: '',
  color: '#000000',
  holderName: '',
  ifsc: '',
};

const inputs = [
  {
    id: 1,
    name: 'accountNo',
    type: 'text',
    placeholder: 'Enter your account number',
    label: 'Account No',
    isRequired: true,
    maxlength: 18,
    hasPattern: 'accountNo',
    isCopy: true
  },
  {
    id: 2,
    name: 'accountType',
    type: 'text',
    placeholder: 'Enter your account type',
    label: 'Account Type',
    inputType: 'select',
    options: ACCOUNT_TYPE,
  },
  {
    id: 3,
    name: 'bankName',
    type: 'text',
    placeholder: 'Enter the name of the bank',
    label: 'Bank Name',
    isRequired: true,
    hasPattern: 'fullName'
  },
  {
    id: 4,
    name: 'branchName',
    type: 'text',
    placeholder: 'Enter the name of the branch',
    label: 'Branch Name',
    isRequired: true,
    hasPattern: 'fullName'
  },
  {
    id: 5,
    name: 'holderName',
    type: 'text',
    placeholder: 'Enter the holder name',
    label: 'Holder Name',
    isRequired: true,
    hasPattern: 'fullName'
  },
  {
    id: 6,
    name: 'ifsc',
    type: 'text',
    placeholder: 'Enter the ifsc code',
    label: 'IFSC Code',
    isRequired: true,
    hasPattern: 'ifsc'
  },
  {
    id: 7,
    name: 'color',
    type: 'color',
    placeholder: 'Enter the color code',
    label: 'Color',
    inputType: 'color',
  },
];

export default ActionPage(dbPath, initialFormData, inputs);