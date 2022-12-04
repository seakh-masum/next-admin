import React, { useEffect, useState } from "react";
import { checkDeviceType } from "shared/helper/Service";

const DialogContainer = (props) => {
  const { title, closeModal, width, children } = props;
  const [domLoaded, setDomLoaded] = useState(false);
  const isMobile = checkDeviceType();


  useEffect(() => {
    setDomLoaded(true);
  }, []);

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
  }, [children, closeModal])

  return (
    <div className="bg-black/25 inset-0 fixed z-40 grid place-content-center dark:bg-black/50">
      <div className={`w-auto bg-white z-50 cursor-pointer duration-500 ease-in-out h-auto shadow-xl p-5 dark:bg-neutral-800 ${isMobile ? 'fixed bottom-0 left-0 right-0 rounded-t-xl' : 'rounded-xl'}`}>
        {children}
      </div>
    </div>
  );
}

export default DialogContainer;
