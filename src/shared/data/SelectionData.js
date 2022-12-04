const CARD_TYPE_LIST = [
  { label: 'Credit', value: 'credit' },
  { label: 'Debit', value: 'debit' },
];

const NETWORK_LIST = [
  { label: 'Rupay', value: 'rupay' },
  { label: 'VISA', value: 'visa' },
  { label: 'Master Card', value: 'master_card' },
];

const RELATIONSHIP_LIST = [
  { label: 'Friend', value: 'friend' },
  { label: 'Family', value: 'family' },
  { label: 'Sister', value: 'sister' },
  { label: 'Brother', value: 'brother' },
  { label: 'Others', value: 'others' },
];

const CATEGORY_LIST = [
  { label: 'Friend', value: 'friend' },
  { label: 'Family', value: 'family' },
  { label: 'Office', value: 'office' },
  { label: 'Services', value: 'services' },
  { label: 'Others', value: 'others' },
];

const ACCOUNT_TYPE = [
  { label: 'Salary', value: 'salary' },
  { label: 'Current', value: 'current' },
  { label: 'Savings', value: 'savings' },
];

const PAGE_SIZE_OPTIONS = [
  { label: 2, value: 2 },
  { label: 3, value: 3 },
  { label: 5, value: 5 },
  { label: 10, value: 10 },
];

const COLORS_LIST = [
  'slate', 'gray', 'zinc', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'
];

const BILL_CATEGORY_LIST = ['policy', 'recharge', 'cylinder'];

const BILL_STATUS_LIST = [{ label: 'Due', value: 'due', color: 'yellow' }, { label: 'Paid', value: 'paid', color: 'green' }, { label: 'Overdue', value: 'OverDue', color: 'red' },];

export { CARD_TYPE_LIST, NETWORK_LIST, RELATIONSHIP_LIST, CATEGORY_LIST, ACCOUNT_TYPE, PAGE_SIZE_OPTIONS, COLORS_LIST, BILL_CATEGORY_LIST, BILL_STATUS_LIST };