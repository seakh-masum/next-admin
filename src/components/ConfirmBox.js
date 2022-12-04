import React, { useEffect } from 'react'
import { checkDeviceType } from 'shared/helper/Service';
import Button from './Button';

export const ConfirmBox = ({ title, message, closeModal, onYes }) => {

  const isMobile = checkDeviceType();


  useEffect(() => {
    const bind = e => {
      if (e.keyCode !== 27) {
        return
      }

      if (document.activeElement && ['INPUT', 'SELECT'].includes(document.activeElement.tagName)) {
        return
      }

      closeModal()
    }

    document.addEventListener('keyup', bind)
    return () => document.removeEventListener('keyup', bind)
  }, [closeModal]);

  return (
    // <div className="bg-black/25 inset-0 fixed z-40 grid place-content-center dark:bg-black/50">
    //   <div className='w-auto bg-white z-50 cursor-pointer duration-300 ease-in-out h-auto shadow-xl p-5 rounded-xl dark:bg-neutral-800'>
    <>
      {/* <h2 className='text-black text-2xl font-bold dark:text-white'>{title}</h2> */}
      <div className="flex flex-row  justify-between items-center">
        <h1 className="text-2xl font-bold text-black dark:text-white">{title}</h1>
        {
          isMobile &&
          <button onClick={closeModal}>
            <i className="fa-solid fa-circle-xmark text-2xl text-neutral-400 dark:text-white"></i>
          </button>
        }
      </div>
      <p className='text-neutral-600 dark:text-white w-90 pb-6 pt-3'>{message}</p>
      <div className='flex flex-row gap-3 justify-end items-center'>
        {
          !isMobile &&
          <Button
            title="No"
            variant="link"
            clickEvent={closeModal}
            size='mini'
          />
        }
        {/* <button onClick={closeModal} className='text-black dark:text-white'>No</button> */}
        {/* <button onClick={onYes} className='bg-red-500 dark:bg-red-400 py-1 px-4 rounded-2xl text-white'>Yes</button> */}
        <Button
          title="Yes"
          variant="flat"
          color='warn'
          clickEvent={onYes}
          size={isMobile ? 'full' : 'mini'}
        />
      </div>
    </>
    //   </div>
    // </div>
  )
}
