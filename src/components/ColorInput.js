import React from "react";

const ColorInput = (props) => {
  const { value, onChange, label, name } =
    props;
  return (
    <div className="flex flex-col">
      <label className='text-black dark:text-white text-xs' htmlFor={name}>{label}</label>
      <div className="flex flex-row justify-between w-full items-center p-2 bg-neutral-100 rounded-lg dark:bg-neutral-600 dark:text-white dark:outline-black">
        <span>{value}</span>
        <input
          name={name}
          value={value}
          onChange={onChange}
          style={{ background: value }}
          className="w-8 h-8 rounded-lg -m-2 mr-0"
          type='color'
        />
      </div>
    </div>
  );
};

export default ColorInput;