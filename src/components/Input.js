import React, { useState } from "react";


const Input = (props) => {
  const [isShown, setIsShown] = useState(false);
  const { value, onChange, type, placeholder, label, name, maxLength, setType, isPassword } =
    props;

  const changeVisibility = () => {
    isShown ? setType('password') : setType('text');
    setIsShown(!isShown);
  }
  return (
    <div className="flex flex-col h-20">
      <label htmlFor={name} className='text-black dark:text-white text-xs'>{label}</label>
      <div className="relative input-box">
        <input
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 bg-neutral-100 rounded-lg dark:bg-neutral-600 dark:text-white dark:outline-black"
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
        />
        {isPassword &&
          <a className="absolute right-2 top-2 cursor-pointer" onClick={changeVisibility}>
            {isShown == true ?
              <i className="fa-solid fa-eye"></i> : <i className="fa-sharp fa-solid fa-eye-slash"></i>}
          </a>
        }
      </div>
      {props.children}
    </div>
  );
};

export default Input;
