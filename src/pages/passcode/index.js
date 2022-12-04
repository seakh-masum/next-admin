import Button from 'components/Button';
import React, { useRef, useEffect, useState } from 'react'
import { STORAGE_KEY } from 'shared/helper/ContstantData';
import { checkDeviceType } from 'shared/helper/Service';
import { checkLocalStorage, getLocalStorage, setLocalStorage } from 'shared/helper/storage';
import { showError, showSuccess } from 'shared/helper/utility';

const Passcode = ({ closeDialog }) => {
  const [existPasscode, setExistPasscode] = useState('');
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();
  const input5 = useRef();
  const input6 = useRef();
  const input7 = useRef();
  const input8 = useRef();
  const submitBtn = useRef();
  const isMobile = checkDeviceType();

  const styles = {
    nbrButton:
      'w-16 aspect-square border rounded-full bg-primary-50 text-primary-700 grid place-content-center text-xl disabled:text-neutral-500 disabled:bg-transparent',
    inputField:
      'flex-initial aspect-square w-1/4 rounded-xl outline-black text-4xl text-center bg-neutral-100 border-2 border-solid',
    // form: 'flex flex-row justify-center items-center gap-2 mt-3',
    container:
      'p-6 -m-2 h-screen flex flex-col justify-center gap-12 items-center bg-gradient-to-b from-primary-100 to-white sm:max-w-2xl m-auto sm:my-9 sm:from-white sm:rounded-2xl sm:h-[600px] sm:gap-6',

    subHeading: 'text-md text-neutral-700 -mb-3 dark:text-neutral-400',
    inputContainer: `flex flex-row gap-6 justify-start items-center w-[${isMobile ? ' full' : '400px'}]`,
  };

  const inputFields = [
    {
      currentInputRef: input1,
      nextInputRef: input2,
      prevInputRef: input1
    },
    {
      currentInputRef: input2,
      nextInputRef: input3,
      prevInputRef: input1
    },
    {
      currentInputRef: input3,
      nextInputRef: input4,
      prevInputRef: input2
    },
    {
      currentInputRef: input4,
      nextInputRef: input5,
      prevInputRef: input3
    },
    {
      currentInputRef: input5,
      nextInputRef: input6,
      prevInputRef: input4
    },
    {
      currentInputRef: input6,
      nextInputRef: input7,
      prevInputRef: input5
    },
    {
      currentInputRef: input7,
      nextInputRef: input8,
      prevInputRef: input6
    },
    {
      currentInputRef: input8,
      nextInputRef: submitBtn,
      prevInputRef: input7
    },
  ];


  useEffect(() => {
    if (checkLocalStorage(STORAGE_KEY.passcode)) {
      const existingPasscode = getLocalStorage(STORAGE_KEY.passcode);
      setExistPasscode(existingPasscode);
      inputFields[3].nextInputRef = submitBtn;
    } else {
      inputFields[3].nextInputRef = input5;
    }

    return () => {
      console.log('done')
    }
  }, []);

  const setPasscode = (e) => {
    e.preventDefault();
    const input1Value = input1.current.value,
      input2Value = input2.current.value,
      input3Value = input3.current.value,
      input4Value = input4.current.value;

    const oldPasscode = input1Value + input2Value + input3Value + input4Value;
    let passcode = oldPasscode;

    if (existPasscode != '') {
      const input5Value = input5.current.value,
        input6Value = input6.current.value,
        input7Value = input7.current.value,
        input8Value = input8.current.value;
      const newPasscode = input5Value + input6Value + input7Value + input8Value;
      passcode = newPasscode;
      if (oldPasscode == newPasscode) {
        showError('Your passcode has matched with old one!');
        alert('old matched new one');
      } else {
        afterPasscodeSet(passcode);
      }
    } else {
      passcode = oldPasscode;
      afterPasscodeSet(passcode);
    }
  };

  const afterPasscodeSet = (passcode) => {
    showSuccess(existPasscode != '' ? 'Passcode has changed successfully!' : 'Passcode has set successfully!');
    setLocalStorage(STORAGE_KEY.passcode, passcode);
    closeDialog();
  }

  const onKeyupInput = (e, nextInput, prevInput) => {
    const { value } = e.target;
    value.length === 1 ? nextInput?.current?.focus() : '';
    if (e.keyCode == 8) {
      prevInput.current.focus();
    }

    if (existPasscode != '') {
      const input1Value = input1.current.value,
        input2Value = input2.current.value,
        input3Value = input3.current.value,
        input4Value = input4.current.value;

      const passcode = input1Value + input2Value + input3Value + input4Value;
      const [existInput1, existInput2, existInput3, existInput4] = Array.from(String(existPasscode));

      // if(existPasscode == passcode) 

      const flag = existPasscode == passcode;
      const borderGreen = 'border-green-500';
      const borderRed = 'border-red-500';

      if (passcode != '') {
        input1.current.classList.toggle(borderRed, !flag);
        input1.current.classList.toggle(borderGreen, flag);

        input2.current.classList.toggle(borderRed, !flag);
        input2.current.classList.toggle(borderGreen, flag);

        input3.current.classList.toggle(borderRed, !flag);
        input3.current.classList.toggle(borderGreen, flag);

        input4.current.classList.toggle(borderRed, !flag);
        input4.current.classList.toggle(borderGreen, flag);
      } else {
        if (existPasscode == passcode) {
          input1.current.classList.toggle(borderGreen);
          input2.current.classList.toggle(borderGreen);
          input3.current.classList.toggle(borderGreen);
          input4.current.classList.toggle(borderGreen);
        } else {
          input1.current.classList.toggle(borderRed);
          input2.current.classList.toggle(borderRed);
          input3.current.classList.toggle(borderRed);
          input4.current.classList.toggle(borderRed);
        }
      }
    }
  }



  return (
    <section>
      <form className='flex flex-col gap-6'>
        {/* Old Passcode */}
        <p className={styles.subHeading}>{existPasscode != '' ? 'Enter your old passcode' : 'Enter your passcode'}</p>
        <div className={styles.inputContainer}>
          {inputFields.slice(0, 4).map((item, index) => (
            <input
              key={index}
              type="text"
              pattern="\d*"
              maxLength="1"
              ref={item.currentInputRef}
              className={styles.inputField}
              onKeyUp={(e) => onKeyupInput(e, item.nextInputRef, item.prevInputRef)}
            />
          ))}
        </div>


        {/* New Passcode */}
        {existPasscode != '' &&
          <>
            <p className={styles.subHeading}>Enter your new passcode</p>
            <div className={styles.inputContainer}>
              {inputFields.slice(4, 8).map((item, index) => (
                <input
                  key={index}
                  type="text"
                  pattern="\d*"
                  maxLength="1"
                  ref={item.currentInputRef}
                  className={styles.inputField}
                  onKeyUp={(e) => onKeyupInput(e, item.nextInputRef, item.prevInputRef)}
                />
              ))}
            </div>
          </>
        }

        <Button
          type='submit'
          title="Set Passcode"
          variant="flat"
          ref={submitBtn}
          clickEvent={(e) => setPasscode(e)}
        />
      </form >
    </section >
  )
}

export default Passcode