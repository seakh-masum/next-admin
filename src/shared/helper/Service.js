import { REGEX, ERROR_MESSAGE } from "./ContstantData";

const getErrorMessage = (key, value, inputProps) => {
  let validationMsg = '';


  if (!inputProps) {
    return;
  }

  // check required validation
  if (!value && inputProps?.isRequired) {
    return `${inputProps.label} is required`;
  }

  // check pattern validation
  if (value && inputProps?.hasPattern && !value?.toString().match(REGEX[inputProps.hasPattern])) {
    return `${ERROR_MESSAGE[key + 'Pattern'] ?? `${inputProps.label} is invalid`}`;
  }

  // check min length validation
  if (value && value.length < inputProps?.minlength) {
    return `${ERROR_MESSAGE[key + 'MinLength'] ?? `${inputProps.label} must contain more than ${inputProps.minlength} characters`}`;
  }

  //check equal length validation
  if (value && inputProps?.equalLength && value.length !== inputProps?.equalLength) {
    return `${ERROR_MESSAGE[key + 'EqualLength'] ?? `${inputProps.label} should equal to ${inputProps.equalLength} characters`}`;
  }

  // check max characters length validation 
  if (value && value.length > inputProps?.maxlength) {
    return `${ERROR_MESSAGE[key + 'MaxLength'] ?? `${inputProps.label} must contain less than ${inputProps.maxlength} characters`}`;
  }

  // check min date validation
  if (value && inputProps?.type == 'month' && inputProps?.minDate) {
    const dy = value.split('-')[0] - inputProps.minDate.getFullYear();
    const dm = value.split('-')[1] - inputProps.minDate.getMonth() - 1;
    if (dy > 0) {
      return;
    }

    if (dy <= 0 && dm <= 0) {
      return `${ERROR_MESSAGE[key + 'MinDate'] ?? `${inputProps.label} more than current date`}`;
    }
  }
};

const firebaseTimestampToDate = (value) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = value && value?.toDate();
  const dateString = value && `${date.getDate()} ${months[date.getMonth()]
    },  ${date.getFullYear()}`;
  return dateString;
};

const makeDateString = (value) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(value);
  const dateString = value && `${date.getDate()} ${months[date.getMonth()]
    },  ${date.getFullYear()}`;
  return dateString;
};



const cardNumber = (value) => {
  return value?.replace(/[^\dA-Z]/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
};

const getCVV = (value) => {
  return value.replace(/[^\dA-Z]/g, '').trim();
}

const getDataObject = (data, obj) => {
  const copyObj = {};
  for (const key of Object.keys(obj)) {
    copyObj[key] = data[key];
  }
  return copyObj;
}

const assignValueInObject = (obj, value) => {
  const copyObj = {};
  for (const key of Object.keys(obj)) {
    copyObj[key] = value;
  }
  return copyObj;
}

const differenceOfDate = (startDate, endDate) => {
  const d1 = startDate.split('-');
  const d2 = endDate.split('-');
  let difference = '';

  if (endDate > startDate) {
    let years = Number(d2[0]) - Number(d1[0]);
    let months = Number(d2[1]) - Number(d1[1]);
    difference = years === 0 ? `${months} Months` : (months > 0 ? `${years} Years ${months} Months` : `${years - 1} Years ${12 + months} Months`);
  }

  return difference;
}

const defaultAddPayload = (formValue) => {
  return {
    ...formValue,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  }
}

const defaultUpdatePayload = (data, formValue) => {
  return {
    ...data,
    ...formValue,
    updatedAt: new Date(),
    createdAt: new Date(formValue.createdAt)
  }
}

const sortData = (arr, column, direction) => {
  if (direction == 'desc') {
    return arr.sort((a, b) => b[column].localeCompare(a[column]));
  } else {
    return arr.sort((a, b) => a[column].localeCompare(b[column]));
  }
}

const objectToArray = (obj, orderArr) => {
  const commonColumns = [{
    label: "Status",
    value: "isActive",
  },
  {
    label: "Created At",
    value: "createdAt",
  },
  {
    label: "Updated At",
    value: "updatedAt",
  }]
  let serverColumns = Object.keys(obj).map((key) => ({ value: key, label: obj[key] }));
  orderArr.forEach((item, index) => {
    let found = serverColumns.find(x => x.value == item);
    if (found)
      found.orders = index;
  });
  const orderingData = serverColumns.sort((a, b) => a.orders - b.orders);

  return [...orderingData, ...commonColumns];
}


const makeArrayFromObject = (obj, arr) => {
  let objArr = Object.keys(obj).map((key) => ({ value: key, label: obj[key] }));
  return [...arr, ...objArr];
}

const checkDeviceType = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= 700 && window.innerHeight <= 900 ? true : false;
  }
}

export { getErrorMessage, firebaseTimestampToDate, cardNumber, getCVV, getDataObject, differenceOfDate, defaultAddPayload, defaultUpdatePayload, sortData, makeDateString, objectToArray, assignValueInObject, makeArrayFromObject, checkDeviceType };
