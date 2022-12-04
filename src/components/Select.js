import React from "react";

const Select = (props) => {
  const { value, onChange, label, name, options } =
    props;
  return (
    <div className="flex flex-col">
      <label className='text-black dark:text-white text-xs' htmlFor={name}>{label}</label>
      <select className="w-full p-2 bg-neutral-100 rounded-lg dark:bg-neutral-600 dark:text-white dark:outline-black" name={name} value={value} onChange={onChange}>
        {options?.map((item, index) => (
          <option key={index} value={item.value}>{item.label}</option>
        ))}
      </select>
      {props.children}
    </div>
  );
};

export default Select;