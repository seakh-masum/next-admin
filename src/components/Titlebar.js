import React from "react";
import { BUTTON_COLOR } from "shared/helper/ContstantData";
import Button from "./Button";

const Titlebar = (props) => {
  const { title, onClickBtn, isMobile } = props;
  return (
    <div className={`flex flex-row justify-between items-center ${isMobile ? 'px-3' : 'px-4'}`}>
      <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold  text-neutral-900 capitalize dark:text-white`}>{title}</h1>
      <Button
        title="Add"
        variant="raised"
        color={isMobile ? BUTTON_COLOR.accent : BUTTON_COLOR.primary}
        icon="fa-solid fa-plus"
        clickEvent={onClickBtn}
        size={isMobile ? 'mini' : ''}
      />
    </div>
  );
};

export default Titlebar;
