import React from "react";

const Card = (props) => {
  return (
    <div className="bg-white py-4 px-4 m-4 flex flex-col gap-5 shadow-2xl rounded-xl dark:bg-neutral-800">
      {props.children}
    </div>
  );
};

export default Card;
