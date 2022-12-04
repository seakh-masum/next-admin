import React, { useEffect, useState } from 'react';
import { logout } from 'shared/helper/Firebase';
import { checkCookie, getCookie } from 'shared/helper/storage';
import useModal from 'shared/hooks/useModal';
import Avatar from './Avatar';
import Dialog from './Dialog';
import UserEdit from './UserEdit';

const UserInfo = React.forwardRef((props, ref) => {
  const { onLogout, hasEdit } = props;

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (checkCookie('user')) {
      setUser(getCookie('user'));
    } else {
      setUser(null)
    }
    console.log(user)
  }, []);
  // const { photoURL, displayName, email, emailVerified } = user;
  const { setDialog, closeDialog } = useModal();


  const openEditUser = () => {
    setDialog(<Dialog title='Edit User' width='500px' closeModal={closeDialog}><UserEdit closeModal={closeDialog} /> </Dialog>)
  }


  return (
    <div ref={ref} className=" flex flex-col relative" >
      {user ? <>
        {hasEdit && <button className='absolute -top-3 -right-4' onClick={openEditUser}><i className="fa-solid fa-pen-to-square"></i></button>}
        <div className='flex flex-row items-center gap-3'>
          <Avatar url={user?.photoURL} title={user?.displayName} size='xl' />
          <div>
            <span className='inline-flex items-center gap-1'>
              <h4 className="text-black text-xl font-bold dark:text-white">{user?.displayName || 'Anynomous'}</h4>
              {user?.emailVerified && <span className="material-icons-outlined text-green-400">
                verified
              </span>}
            </span>
            <p className="text-neutral-500 dark:text-neutral-400">{user?.email}</p>
          </div>
        </div>
        {onLogout &&
          <button className="w-full bg-red-100 text-sm text-red-700 rounded-xl border border-solid px-3 py-1 border-red-700 mt-3" onClick={onLogout}>Logout</button>
        }
      </> : <>
        <button>Login</button>
      </>}
    </div>
  )
});

export default UserInfo;