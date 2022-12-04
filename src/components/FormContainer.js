import React, { useState, useEffect } from 'react'
import { checkDeviceType } from 'shared/helper/Service';
import Button from './Button';

const FormContainer = (props) => {

  const [domLoaded, setDomLoaded] = useState(false);
  const isMobile = checkDeviceType();


  useEffect(() => {
    setDomLoaded(true);
  }, []);


  const { closeModal, updateData, saveData, isEdit, loader, isView, handleSubmit } = props;
  return (
    <>
      {domLoaded &&
        <form onSubmit={isEdit ? updateData : saveData} className="flex flex-col gap-6">
          <div className={`grid ${isMobile ? 'grid-cols-1 max-h-96 overflow-y-auto' : 'grid-cols-2'} gap-y-1 gap-x-4`}>
            {props.children}
          </div>
          {!isView &&
            <div className="flex flex-row justify-end items-center gap-3">
              {!isMobile && <Button title="Cancel" type="reset" variant="outline" clickEvent={closeModal} />}
              {isEdit ? (
                <Button
                  type='submit'
                  loader={loader}
                  title="Update"
                  variant="primary"
                  size={`${isMobile ? 'full' : ''}`}
                  clickEvent={updateData}
                />
              ) : (
                <Button
                  type='submit'
                  loader={loader}
                  title="Save"
                  variant="raised"
                  size={`${isMobile ? 'full' : ''}`}
                  clickEvent={saveData}
                />
              )}
            </div>
          }
        </form >
      }
    </>
  )
}

export default FormContainer;