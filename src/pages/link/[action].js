import { ActionPage } from "shared/hoc/ActionPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";

const dbPath = FIRESTORE_PATH.links;

const initialFormData = {
  title: '',
  linkAddress: '',
  category: '',
  image: ''
};

const inputs = [
  {
    id: 1,
    name: 'title',
    type: 'text',
    placeholder: 'Enter your title',
    label: 'Title',
    isRequired: true,
  },
  {
    id: 2,
    name: 'linkAddress',
    type: 'text',
    placeholder: 'Enter the link address',
    label: 'Link Address',
    isRequired: true,
    hasPattern: 'url'
  },
  {
    id: 3,
    name: 'category',
    type: 'text',
    placeholder: 'Enter the category',
    label: 'Category Name',
  },
  {
    id: 4,
    name: 'image',
    type: 'file',
    placeholder: 'Choos a image',
    label: 'Image',
  },
];

export default ActionPage(dbPath, initialFormData, inputs);