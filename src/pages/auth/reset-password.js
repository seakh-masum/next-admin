import React, { useState, useEffect } from 'react'
import { getErrorMessage } from 'shared/helper/Service'
import { GLOBAL_STYLE } from 'shared/helper/ContstantData'
import Card from 'components/Card'
import Input from 'components/Input'
import ErrorMessage from 'components/ErrorMessage'
import Button from 'components/Button'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getCookie } from 'shared/helper/storage'
import { postAPI } from 'shared/helper/API'
import { showError, showSuccess } from 'shared/helper/utility'

const Reset = () => {
  const router = useRouter();
  const [user, setUser] = useState(getCookie('user'));
  const [formValue, setFormValue] = useState({
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    email: "",
  });

  const inputProps = {
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email address',
    label: 'Email',
    isRequired: true,
    hasPattern: 'email'
  };


  useEffect(() => {
    Object.keys(formValue).forEach((key) => {
      checkError(key);
    });
  }, [formValue]);

  useEffect(() => {
    // if (loading) {
    //   // maybe trigger a loading screen
    //   return;
    // }
    if (user) router("/bank");
  }, [user]);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const checkError = (targetName) => {
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

  const resetPassword = () => {
    postAPI(`/api/auth/password-reset`, formValue).then((res) => {
      showSuccess(res.message);
      router.push('/auth/login');
    }).catch((error) => {
      showError(error.message);
    });
  }

  return (
    <Card>
      <div className='flex flex-col gap-6'>
        <h2 className={GLOBAL_STYLE.heading}>Reset Password</h2>
        <div>
          <Input name="email"
            label="Email"
            value={formValue.email}
            onChange={handleChange}
            type="text"
            placeholder="Enter your email address">
            {errorMessage?.email?.length > 0 && (
              <ErrorMessage message={errorMessage.email} />
            )}
          </Input>
        </div>
        <Button className='w-full'
          title="Submit"
          variant="primary"
          size='full'
          clickEvent={resetPassword}
        />
        <div className='flex justify-center dark:text-white'>
          Don't have an account? <Link href="/auth/signup"><a className='ml-2 text-blue-500'>Register now.</a></Link>
        </div>
      </div>
    </Card>

  )
}

export default Reset;