import React from "react";
import { capitalizeFirstLetter } from "shared/helper/utility";

const Status = ({ value, type }) => {

  const getColorStyle = () => {
    let color;
    switch (value) {
      // bill status
      case 'due':
      case 'current':
        color = 'yellow';
        break;
      case 'overdue':
        color = 'red';
        break;
      case 'paid':
        color = 'green';
        break;

      // card type
      case 'credit':
      case 'salary':
        color = 'orange';
        break;
      case 'debit':
      case 'savings':
        color = 'cyan';
        break;

      default:
        break;
    }

    return type == 'tiny' ? `bg-${color}-400}` : `bg-${color}-100 text-${color}-700 border-${color}-700`;
  }

  const getLabel = () => {
    return capitalizeFirstLetter(value);
  }

  return (
    <>
      {type == 'tiny' ? (
        <span className="inline-flex items-center gap-1">
          <span className={`w-3 h-3 rounded-full ${getColorStyle()}`}></span>
          <span className="text-xs dark:text-white">{getLabel()}</span>
        </span>
      )
        : (
          <span className={`py-1 px-3 text-xs rounded-3xl border border-solid ${getColorStyle()}`}>
            {getLabel()}
          </span>
        )
      }
    </>
  );
};

export default Status;
