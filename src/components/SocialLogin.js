import { useRouter } from 'next/router'
import React from 'react'
import { postAPI } from 'shared/helper/API'
import { signInWithGoogle } from 'shared/helper/Firebase'
import { setCookie } from 'shared/helper/storage'
import { showError, showSuccess } from 'shared/helper/utility'

export const SocialLogin = () => {

  const router = useRouter();

  const loginWithGoogle = () => {
    signInWithGoogle().then(res => {
      postAPI('/api/auth/google-login', res.user).then(res => {
        showSuccess(res.message);
        setCookie('user', res.data, 15);
        router.push('/bank')
      }
      ).catch(err => {
        showError(err.message);
      })
    })
  }

  const style = 'py-2 px-5 border border-solid border-black basis-1/2 rounded-xl dark:text-white dark:border-white'
  return (
    <div className='flex flex-row justify-center gap-6 items-center p-3'>
      <button className={style} onClick={loginWithGoogle}>
        <i className="fa-brands fa-google mr-2"></i>  Google
      </button>

      <button className={style} onClick={signInWithGoogle}>
        <i className="fa-brands fa-facebook mr-2  "></i>  Facebook
      </button>
    </div>
  )
}
