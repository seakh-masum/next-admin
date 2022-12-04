

import { ACCOUNT_TYPE1 } from "shared/helper/ContstantData";
import { showError, showSuccess } from "shared/helper/utility";
import Color from "./Color";
import Status from "./Status";

const View = ({ input, formValue, data }) => {
  const onCopy = (e, value) => {
    e.preventDefault();
    navigator.clipboard.writeText(data[value]).then(() => {
      showSuccess('Successfully copied!');
    }, (err) => {
      showError(err);
    });
  }

  const displayValue = (name) => {
    const value = formValue[name];
    switch (name) {
      case 'accountType':
        return ACCOUNT_TYPE1[value];

      case 'isActive':
        return <Status value={value} type='tiny' />;

      case 'color':
        return <div className="mt-1"><Color value={value} type='box' /></div>;

      // case 'createdAt':
      // case 'updatedAt':
      //   return firebaseTimestampToDate(value);

      default:
        return value;
    }
  }


  return (
    <div className="flex flex-row justify-between">
      <div className="p-1">
        <p className="text-xs text-neutral-500">{input.label}</p>
        <h2 className="text-base text-neutral-900 font-medium dark:text-white">
          {displayValue(input.name)}
        </h2>
      </div>
      {input.isCopy && <button onClick={(e) => onCopy(e, input.name)}><i className="fa-regular fa-copy text-neutral-600 dark:text-neutral-400"></i></button>}
    </div>
  )
};

export default View;