import { ActionPage } from "shared/hoc/ActionPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";
import { makeSelectArr } from "shared/helper/utility";
import { BILL_CATEGORY_LIST } from "shared/data/SelectionData";

const dbPath = FIRESTORE_PATH.bills;

const initialFormData = {
  billName: '',
  billId: '',
  dueDate: '',
  paidDate: '',
  billCategory: '',
  paidWith: '',
};

const inputs = [
  {
    id: 1,
    name: 'billName',
    type: 'text',
    placeholder: 'Enter the bill name',
    label: 'Bill Name',
    isRequired: true,
    maxlength: 18,
  },
  {
    id: 2,
    name: 'billId',
    type: 'text',
    placeholder: 'Enter the bill id',
    label: 'Bill Id',
    isRequired: true,
  },
  {
    id: 3,
    name: 'dueDate',
    type: 'date',
    placeholder: 'Enter the due date',
    label: 'Due Date',
    isRequired: true,
  },
  {
    id: 4,
    name: 'paidDate',
    type: 'date',
    placeholder: 'Enter the paid date',
    label: 'Paid Date',
  },
  {
    id: 5,
    name: 'billCategory',
    type: 'text',
    placeholder: 'Enter the bill category',
    label: 'Category',
    isRequired: true,
    inputType: 'select',
    options: makeSelectArr(BILL_CATEGORY_LIST)
  },
  {
    id: 6,
    name: 'paidWith',
    type: 'text',
    placeholder: 'Enter the bank by which you paid',
    label: 'Paid With',
  },
];

export default ActionPage(dbPath, initialFormData, inputs);