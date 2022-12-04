import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Card from 'components/Card'
import Input from 'components/Input'
import ErrorMessage from 'components/ErrorMessage'
import Button from 'components/Button'
import { SocialLogin } from 'components/SocialLogin'
import { getErrorMessage } from 'shared/helper/Service'
import { GLOBAL_STYLE } from 'shared/helper/ContstantData'
import { getCookie, setCookie } from 'shared/helper/storage'
import { postAPI } from 'shared/helper/API'
import { showError, showSuccess } from 'shared/helper/utility'


const Signup = () => {
  const router = useRouter();
  const [user, setUser] = useState(getCookie('user'));
  const [type, setType] = useState('password');
  const [formValue, setFormValue] = useState({
    name: '',
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    name: '',
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: 'name',
      type: 'text',
      placeholder: 'Enter the full name',
      label: 'Email',
      isRequired: true,
      hasPattern: 'fullName'
    },
    {
      id: 2,
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email address',
      label: 'Email',
      isRequired: true,
      hasPattern: 'email'
    },
    {
      id: 3,
      name: 'password',
      type: 'password',
      placeholder: 'Enter the password',
      label: 'Password',
      hasPattern: 'password'
    },
  ];


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
    if (user) router.push("/bank");
  }, [user]);

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  };

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

  const onSignup = () => {
    postAPI(`/api/auth/signup`, formValue).then((res) => {
      showSuccess(res.message);
      setCookie('user', res.data, 15);
      router.push('/bank')
    }).catch((error) => {
      showError(error.message);
    });
  }

  return (
    <Card>
      <div className='flex flex-col gap-6 py-4'>
        <h2 className={GLOBAL_STYLE.heading}>Signup</h2>

        <div>
          <Input name="name"
            label="Full Name"
            value={formValue.name}
            onChange={handleChange}
            type="text"
            placeholder="Enter your full name">
            {errorMessage?.login?.length > 0 && (
              <ErrorMessage message={errorMessage.login} />
            )}
          </Input>
          <Input name="email"
            label="Email"
            value={formValue.email}
            onChange={handleChange}
            type="text"
            placeholder="Enter your email address">
            {errorMessage?.login?.length > 0 && (
              <ErrorMessage message={errorMessage.login} />
            )}
          </Input>
          <Input name="password"
            label="Password"
            value={formValue.password}
            onChange={handleChange}
            type="password"
            placeholder="Enter the password" setType={setType} isPassword={true}>
            {errorMessage?.password?.length > 0 && (
              <ErrorMessage message={errorMessage.password} />
            )}
          </Input>
        </div>
        <Button className='w-full'
          title="Submit"
          variant="primary"
          size='full'
          clickEvent={onSignup}
        />
        <SocialLogin />
        <div className='flex justify-center dark:text-white'>
          Already have an account? <Link href="/auth/login"><a className='ml-2 text-blue-500'>Login now!</a></Link>
        </div>
      </div>
    </Card>

  )
}

export default Signup