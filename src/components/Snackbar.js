import React from 'react'

const Snackbar = ({ closeSnackbar }) => {
  return (
    <div id='snackbar' className='hidden'>
      <i id='snackbar-icon' className='fa-solid text-2xl'></i>
      <span id='snackbar-message' className='text-white'></span>
      <button id='snackbar-close' className='ml-10' onClick={closeSnackbar}>
        <i className="fa-solid fa-xmark text-white text-xl"></i>
      </button>
    </div>
  )
}

export default Snackbar