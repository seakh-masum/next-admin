import { ActionPage } from "shared/hoc/ActionPage";
import { FIRESTORE_PATH } from "shared/helper/ContstantData";
import { CARD_TYPE_LIST, COLORS_LIST, NETWORK_LIST } from "shared/data/SelectionData";
import { makeSelectArr } from "shared/helper/utility";

const dbPath = FIRESTORE_PATH.cards;

const initialFormData = {
  cardName: "",
  cardNo: "",
  cardType: "credit",
  color: "#000000",
  holderName: "",
  expiryDate: '',
  cvv: "",
  network: "rupay",
  provider: "",
};

const inputs = [
  {
    id: 1,
    name: 'cardName',
    type: 'text',
    placeholder: 'Enter your card name',
    label: 'Card Name',
    isRequired: true,
    inputType: 'input',
    hasPattern: 'fullName',
  },
  {
    id: 2,
    name: 'cardNo',
    type: 'text',
    placeholder: 'Enter the card number',
    label: 'Card Number',
    isRequired: true,
    inputType: 'input',
    equalLength: 16,
    hasPattern: 'onlyNumber',
  },
  {
    id: 3,
    name: 'cardType',
    type: 'text',
    placeholder: 'Enter the type of card',
    label: 'Card Type',
    required: true,
    inputType: 'select',
    options: CARD_TYPE_LIST,
  },
  {
    id: 4,
    name: 'holderName',
    type: 'text',
    placeholder: 'Enter the card holder name',
    label: 'Holder Name',
    isRequired: true,
    inputType: 'input',
    hasPattern: 'fullName'
  },
  {
    id: 5,
    name: 'cvv',
    type: 'text',
    placeholder: 'Enter the cvv',
    label: 'CVV',
    isRequired: true,
    inputType: 'input',
    equalLength: 3,
    hasPattern: 'onlyNumber'
  },
  {
    id: 6,
    name: 'expiryDate',
    type: 'month',
    placeholder: 'Enter the expiry date',
    label: 'Expiry Date',
    inputType: 'input',
    minDate: new Date(),
  },
  {
    id: 7,
    name: 'network',
    type: 'text',
    placeholder: 'Enter the network',
    label: 'Network',
    inputType: 'select',
    options: NETWORK_LIST
  },
  {
    id: 8,
    name: 'provider',
    type: 'text',
    placeholder: 'Enter the provider name',
    label: 'Provider Name',
    isRequired: true,
    inputType: 'input',
    hasPattern: 'fullName'
  },
  {
    id: 9,
    name: 'color',
    type: 'text',
    placeholder: 'Enter the color',
    label: 'Color',
    required: true,
    inputType: 'select',
    options: makeSelectArr(COLORS_LIST),
  },
];

export default ActionPage(dbPath, initialFormData, inputs);