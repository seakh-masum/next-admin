import React from 'react'

const Filter = ({ onOpenColumn }) => {
  return (
    <div className='flex flex-row items-center'>
      <button onClick={onOpenColumn}>
        <i className="fa-solid fa-table-list"></i> Sort
      </button>
    </div>
  )
}

export default Filter;