import { useRouter } from "next/router";
import Passcode from "pages/passcode";
import React from "react";
import { MENU_LIST, SETTINGS_MENU } from "shared/helper/ContstantData";
import useModal from "shared/hooks/useModal";
import Dialog from "./Dialog";
import ThemePicker from "./ThemePicker";
import UserInfo from "./UserInfo";

export const Sidenav = ({ closeSidenav, isOpen }) => {
  const router = useRouter();
  const { setDialog, closeDialog } = useModal();



  const onClickMenu = (e, path) => {
    // router.push(item.path)
    if (path === '/theme-picker') {
      setDialog(<Dialog title='Theme Picker' width='400px' closeModal={closeDialog} > <ThemePicker /></Dialog >)
    } else if (path === '/passcode') {
      setDialog(<Dialog title='Set Passcode' width='400px' closeModal={closeDialog}><Passcode closeDialog={closeDialog} /></Dialog>)
    }
  }


  return (
    <div className="bg-black/50 inset-0 fixed z-40 overflow-y-auto min-h-screen" onClick={closeSidenav}>
      <div className={`w-max-content bg-white z-50 cursor-pointer duration-300 ease-in-out dark:bg-neutral-800 min-w-[250px] min-h-screen`}>
        {/* <div className="grid place-content-center p-8 bg-neutral-100"> */}
        {/* <h1 className="text-4xl">My Admin</h1> */}
        <div className="bg-neutral-50 dark:bg-neutral-700 w-max-content py-4 pl-3 pr-7">
          <UserInfo hasEdit={true} />
        </div>
        {/* </div> */}
        <h4 className="text-base text-neutral-600 pt-3">Services</h4>
        <ul className="">
          {MENU_LIST.map((item, index) => (
            <li key={index}
              className="py-2 px-4 hover:bg-black/10 dark:text-white flex flex-row items-center gap-2"
              onClick={() => router.push(item.path)}
            >
              <i className={`${item.icon} basis-8 text-xl`}></i> <span className="grow">{item.label}</span>
            </li>
          ))}
        </ul>
        <h4 className="text-base text-neutral-600 pt-3">Settings</h4>
        <ul className="">
          {SETTINGS_MENU.map((item, index) => (
            <li key={index}
              className="py-2 px-4 hover:bg-black/10 dark:text-white flex flex-row items-center gap-2"
              onClick={(e) => onClickMenu(e, item.path)}
            >
              <i className={`${item.icon} basis-8 text-xl`}></i> <span className="grow">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
