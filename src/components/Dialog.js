import React, { useEffect } from "react";
import { checkDeviceType } from "shared/helper/Service";

const Dialog = (props) => {
  const { title, closeModal, width } = props;
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
  }, [props.children, closeModal])

  return (
    // <div className="bg-black/25 inset-0 fixed z-40 grid place-content-center dark:bg-black/50">
    //   <div className='w-auto bg-white z-50 cursor-pointer duration-300 ease-in-out h-auto shadow-xl p-5 rounded-xl dark:bg-neutral-800'>
    <div className={`flex flex-col gap-8 w-[${isMobile ? 'full' : width}]`}>
      <div className="flex flex-row  justify-between items-center">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{title}</h1>
        <button onClick={closeModal}>
          <i className="fa-solid fa-circle-xmark text-2xl text-neutral-400"></i>
        </button>
      </div>
      {props.children}
    </div>
    // {/* </div>
    // </div> */}
  );
}

export default Dialog;
