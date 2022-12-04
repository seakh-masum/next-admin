import React, { Fragment, useEffect, useState } from 'react'
import { putAPI } from 'shared/helper/API';
import { STORAGE_KEY } from 'shared/helper/ContstantData';
import { defaultUpdatePayload, getErrorMessage } from 'shared/helper/Service';
import { checkCookie, getCookie, setCookie } from 'shared/helper/storage';
import { showError, showSuccess } from 'shared/helper/utility';
import ErrorMessage from './ErrorMessage';
import FormContainer from './FormContainer';
import Input from './Input';

const UserEdit = ({ closeModal }) => {

  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    displayName: '',
    email: '',
    phone: '',
    photoURL: ''
  });
  const [formValue, setFormValue] = useState({
    displayName: '',
    email: '',
    phone: '',
    photoURL: ''
  });

  const inputs = [
    {
      id: 1,
      name: 'displayName',
      type: 'text',
      placeholder: 'Enter your full name',
      label: 'Full Name',
      inputType: 'input',
      hasPattern: 'fullName',
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Enter the email address',
      label: 'Email Address',
      isRequired: true,
      inputType: 'input',
      hasPattern: 'email',
    },
    {
      id: 3,
      name: 'phone',
      type: 'text',
      placeholder: 'Enter the phone number',
      label: 'Phone Number',
      required: true,
      inputType: 'input',
      hasPattern: 'phone'
    },
    {
      id: 4,
      name: 'photoURL',
      type: 'text',
      placeholder: 'Enter the photo url',
      label: 'Photo Url',
      required: true,
      inputType: 'input',
    },
  ];


  useEffect(() => {
    Object.keys(formValue).forEach((key) => {
      checkError(key);
    });
  }, [formValue]);

  useEffect(() => {
    if (checkCookie('user')) {
      setFormValue(getCookie('user'));
    } else {
      setFormValue({
        displayName: '',
        email: '',
        phone: '',
        photoURL: ''
      })
    }
  }, []);


  const checkError = (targetName) => {
    const inputProps = inputs.find(x => x.name === targetName);
    setErrorMessage((prevErrorValue) => {
      return {
        ...prevErrorValue,
        [targetName]: getErrorMessage(
          targetName,
          formValue[targetName],
          inputProps
        ),
      };
    });
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  };


  const updateData = (e) => {
    e.preventDefault();
    updateApiCall();
  }

  const updateApiCall = () => {
    setLoader(true);
    putAPI(`/api/user`, defaultUpdatePayload({}, formValue)).then((data) => {
      setLoader(false);
      closeModal();
      showSuccess(data.message);
      setCookie(STORAGE_KEY.user, data.data)
    })
      .catch((error) => {
        setLoader(false);
        showError(error.message);
      });
  }

  return (
    <FormContainer updateData={updateData} isEdit={true} closeModal={closeModal} loader={loader}>
      <>
        {inputs.map((input) => (
          <Fragment key={input.id}>
            <Input
              value={formValue[input.name]}
              onChange={handleChange}
              {...input}
            >
              {errorMessage[input.name]?.length > 0 && (
                <ErrorMessage message={errorMessage[input.name]} />
              )}
            </Input>
          </Fragment>
        ))}
      </>
    </FormContainer>
  )
}

export default UserEdit