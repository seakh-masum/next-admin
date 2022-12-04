import { ActionPage } from "shared/hoc/ActionPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";

const dbPath = FIRESTORE_PATH.social;

const initialFormData = {
  userId: '',
  type: '',
  link: ''
};

const inputs = [
  {
    id: 1,
    name: 'userId',
    type: 'text',
    placeholder: 'Enter your social id',
    label: 'Social ID',
    isRequired: true,
  },
  {
    id: 2,
    name: 'type',
    type: 'text',
    placeholder: 'Enter your platform name',
    label: 'Platform Name',
    isRequired: true,
  },
  {
    id: 3,
    name: 'link',
    type: 'text',
    placeholder: 'Enter your profile link',
    label: 'Profile Link',
    isRequired: true,
    hasPattern: 'url'
  },
];

export default ActionPage(dbPath, initialFormData, inputs);