const REGEX = {
  email:
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
  onlyNumber: /^\d+$/,
  fullName: /^[a-z ,.'-]+$/i,
  ifsc: /^[A-Za-z]{4}0[A-Z0-9a-z]{6}$/,
  accountNo: /^\d{9,18}$/,
  percentage: /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/,
  year: /^(19|20)\d{2}$/,
  url: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  upi: /^\w.+@\w+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
}

const ERROR_MESSAGE = {
  emailRequired: "Email id is required",
  emailInvalid: "Please enter valid email address",
  phoneRequired: "Phone number is required",
  phoneInvalid: "Phone number is invalid",
  cardNameRequired: 'Card name is required',
  cardNamePattern: 'Card name must be contain characters only',
  cardNoRequired: 'Card number is required',
  cardNoPattern: 'Card number must contain numbers only',
  cardNoEqualLength: 'Card number must be equal to 16 digit',
  cvvEqualLength: 'CVV must be equal to 3 digit',
  expiryDateMinDate: 'Expiry date must be more than current date',
  ifscPattern: 'IFSC code must have 4 digits in first, 7 alphanumeric followed by',
  accountNoPattern: 'Account no must be within 9 to 18 digits',
  percentagePattern: 'Percentage must be within 0 to 100 & can be decimal number',
  startYearPattern: 'Start year must be within 1900 to 2099',
  endYearPattern: 'End year must be within 1900 to 2099'
};

const STORAGE_KEY = {
  theme: 'theme',
  user: 'user',
  darkMode: 'dark_mode',
  passcode: 'passcode',
}

const FIRESTORE_PATH = {
  contacts: "contacts",
  cards: "cards",
  banks: "banks",
  docs: 'documents',
  social: 'social',
  upi: 'upi',
  links: 'links',
  education: 'education',
  experience: 'experience',
  colors: 'colors',
  tableColumns: 'table-columns',
  users: 'users',
  bills: 'bills'
};

const MENU_LIST = [
  { label: "Dashboard", icon: "fa-solid fa-house", path: "/" },
  {
    label: "Bank Details",
    icon: "fa-solid fa-building-columns",
    path: "/bank",
  },
  {
    label: "Card Details",
    icon: "fa-solid fa-credit-card",
    path: "/cards",
  },
  { label: 'Documents', icon: 'fa-solid fa-file-lines', path: '/documents' },
  { label: 'Social', icon: 'fa-solid fa-user-group', path: '/social' },
  { label: 'Contacts', icon: 'fa-solid fa-address-book', path: '/contact' },
  { label: 'Education', icon: 'fa-solid fa-school', path: '/education' },
  { label: 'Experience', icon: 'fa-solid fa-briefcase', path: '/experience' },
  { label: 'UPI Details', icon: 'fa-solid fa-wallet', path: '/upi' },
  // { label: 'Medical', icon: 'fa-solid fa-kit-medical', path: '/pages/medical' },
  { label: 'Links', icon: 'fa-solid fa-link', path: '/link' },
  { label: 'Bills', icon: 'fa-solid fa-receipt', path: '/bills' },
];

const SETTINGS_MENU = [
  { label: 'Change Theme', icon: 'fa-solid fa-palette', path: '/theme-picker' },
  { label: 'Set Passcode', icon: 'fa-solid fa-lock', path: '/passcode' },
];



const CARD_TYPE = {
  debit: "Debit",
  credit: "Credit",
};

const CARD_NETWORK = {
  rupay: "Rupay",
  visa: "VISA",
  master_card: "Master Card",
};

const ACCOUNT_TYPE1 = {
  salary: "Salary",
  current: "Current",
  savings: "Savings",
};

const GLOBAL_STYLE = {
  heading: 'text-3xl font-bold text-neutral-900 dark:text-white',
  surface: 'bg-neutral-100 h-screen dark:bg-neutral-900',
}

const SORT_DIRECTION = {
  desc: 'desc',
  asc: 'asc',
}

const BUTTON_SIZE = {
  mini: 'mini',
  full: 'full',
  rounded: 'rounded',
  normal: 'normal',
}

const BUTTON_COLOR = {
  primary: 'primary',
  accent: 'accent',
  warn: 'warn'
}

const BUTTON_VARIANT = {
  flat: 'flat',
  raised: 'raised',
  outline: 'outline',
  link: 'link',
  icon: 'icon'
}

export {
  REGEX,
  ERROR_MESSAGE,
  MENU_LIST,
  CARD_TYPE,
  CARD_NETWORK,
  FIRESTORE_PATH,
  GLOBAL_STYLE,
  ACCOUNT_TYPE1,
  SORT_DIRECTION,
  SETTINGS_MENU,
  STORAGE_KEY,
  BUTTON_SIZE,
  BUTTON_COLOR,
  BUTTON_VARIANT
};
