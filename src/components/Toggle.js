import React from 'react'

const Toggle = ({ onChange, value, checkboxRef, title }) => {

  return (
    <div className="flex items-center w-full">
      <label htmlFor="toggleB" className="flex items-center cursor-pointer">

        <div className="relative">
          <input
            type="checkbox"
            id="toggleB"
            className="sr-only"
            onChange={onChange}
            checked={value}
          />
          <div className="block bg-neutral-500 w-14 h-8 rounded-full"></div>
          <div
            className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
          ></div>
        </div>
        {title &&
          <div
            className="ml-3 text-gray-700 font-medium dark:text-neutral-100"
          >
            {title}
          </div>
        }
      </label>
    </div>

  )
}

export default Toggle

