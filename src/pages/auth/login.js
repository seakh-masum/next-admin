import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getErrorMessage } from 'shared/helper/Service'
import { GLOBAL_STYLE } from 'shared/helper/ContstantData'
import Card from 'components/Card'
import Input from 'components/Input'
import ErrorMessage from 'components/ErrorMessage'
import Button from 'components/Button'
import { SocialLogin } from 'components/SocialLogin'
import { showError, showSuccess } from 'shared/helper/utility';
import { getCookie, setCookie } from 'shared/helper/storage';
import { postAPI } from 'shared/helper/API';


const Login = () => {
  const router = useRouter();

  const [type, setType] = useState('password')
  const [user, setUser] = useState(null);

  // const [user, loading, error] = useAuthState(auth);

  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email address',
      label: 'Email',
      isRequired: true,
      hasPattern: 'email'
    },
    {
      id: 2,
      name: 'password',
      type: 'password',
      placeholder: 'Enter the password',
      label: 'Password',
    },
  ];


  useEffect(() => {
    Object.keys(formValue).forEach((key) => {
      checkError(key);
    });
  }, [formValue]);

  useEffect(() => {
    // if (loading) {
    // maybe trigger a loading screen
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

  const onLogin = () => {
    postAPI(`/api/auth/login`, formValue).then((res) => {
      if (res && res.data) {
        setCookie('user', res.data, 15);
        router.push('/bank')
      }
      showSuccess(res.message);
    }).catch((error) => {
      showError(error.message);
    });
  }

  return (
    <Card>
      <div className='flex flex-col gap-6 py-4'>
        <h2 className={GLOBAL_STYLE.heading}>Login</h2>
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
          <Input name="password"
            label="Password"
            value={formValue.password}
            onChange={handleChange}
            type={type}
            placeholder="Enter the password" setType={setType} isPassword={true}>
            {errorMessage?.password?.length > 0 && (
              <ErrorMessage message={errorMessage.password} />
            )}
          </Input>
          <div className='flex justify-end'>
            <Link className='text-xs text-neutral-600 dark:text-neutral-400' href="/auth/reset-password">Forgot Password?? </Link>
          </div>
        </div>
        <Button
          title="Submit"
          variant="primary"
          size='full'
          clickEvent={onLogin}
        />

        <SocialLogin />

        <div className='flex justify-center dark:text-white'>
          Don't have an account? <Link href="/auth/signup"><a className='ml-2 text-blue-500'>Signup now</a></Link>
        </div>
      </div>
    </Card>

  )
}

export default Login