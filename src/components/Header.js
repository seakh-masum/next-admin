import React, { useState, useEffect, useRef } from "react";
import { logout } from "shared/helper/Firebase";
import UserInfo from "./UserInfo";
import Toggle from "./Toggle";
import { useRouter } from "next/router";
import { checkCookie, eraseCookie, getCookie } from "shared/helper/storage";
import { getAPI } from "shared/helper/API";
import { showError, showSuccess } from "shared/helper/utility";

const Header = ({ onClickMenu }) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isDarkMode, setDarkMode] = useState(false);
  const [isUserBoxOpen, setUserBoxOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  // const [user, loading, error] = useAuthState(auth);
  const userBoxRef = useRef(null);
  // const { data: session } = useSession()
  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.name);
  //   } catch (err) {
  //     console.error(err);
  //     showError("An error occured while fetching user data");
  //   }
  // };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    setLoader(true);
    if (loader) {
      // fetchUserName();
      if (checkCookie('user')) {
        setUser(getCookie('user'));
      } else {
        setUser(null)
      }
    }
    // if (!user) {
    //   router.push("/auth/login");
    // }

    // return () => {
    //   console.log('This will be logged on unmount');
    // };
  }, [loader]);


  const onChangeDarkMode = (event) => {
    event.stopPropagation();
    setDarkMode(!isDarkMode);
  }

  const handleClick = async (e) => {
    // if (!isUserBoxOpen) {
    //   document.addEventListener("click", handleOutsideClick, false);
    // } else {
    //   document.removeEventListener("click", handleOutsideClick, false);
    // }
    await setUserBoxOpen(prevState => (!prevState));
    // await userBoxRef.current.showModal();
  };

  // const handleOutsideClick = e => {
  //   if (!userBoxRef.current.contains(e.target)) handleClick();
  // };


  const onLogout = () => {
    getAPI('/api/auth/logout').then((res) => {
      setUser(null);
      eraseCookie('user');
      showSuccess(res.message);
    }).catch((err) =>
      showError(err.message)
    )
  }


  return (
    <div className="relative flex flex-row justify-between items-center text-white p-4 bg-white backdrop-blur dark:bg-neutral-900">
      <button
        className="w-12 h-12 hover:bg-white/10 hover:border-rounded"
        onClick={onClickMenu}
      >
        <i className="fa-solid fa-bars text-2xl text-black dark:text-white"></i>
      </button>

      <div className="inline-flex gap-7">
        <Toggle onChange={onChangeDarkMode} value={isDarkMode} title='Dark Mode' />
        {user ?
          <div className="relative">
            <button onClick={handleClick}>
              <i className="fa-regular fa-user text-2xl text-black dark:text-white"></i>
            </button>
            {isUserBoxOpen &&
              <div className="absolute top-9 right-0 bg-neutral-50 rounded-xl shadow-2xl dark:bg-neutral-800 border-neutral-300 border w-max-content py-4 px-8">
                <UserInfo ref={userBoxRef} onLogout={onLogout} />
              </div>
            }
          </div>
          : (
            <button className="text-black dark:text-white" onClick={() => router.push('/auth/login')}>Login</button>
          )}
      </div>
    </div>
  );
};

export default Header;
