import { ActionPage } from "shared/hoc/ActionPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";

const dbPath = FIRESTORE_PATH.docs;

const initialFormData = {
  type: '',
  userName: '',
  documentId: ''
};

const inputs = [
  {
    id: 1,
    name: 'type',
    type: 'text',
    placeholder: 'Enter your document type',
    label: 'Document Type',
    isRequired: true,
    inputType: 'input',
  },
  {
    id: 2,
    name: 'userName',
    type: 'text',
    placeholder: 'Enter the name on the docs',
    label: 'Name on the Document',
    isRequired: true,
    inputType: 'input',
  },
  {
    id: 3,
    name: 'documentId',
    type: 'text',
    placeholder: 'Enter the document id',
    label: 'Document Id',
    isRequired: true,
    inputType: 'input',
  },
];

export default ActionPage(dbPath, initialFormData, inputs);