import React from "react";

const ErrorMessage = ({ message }) => {
  return <span className="text-red-500 text-xs error-message">{message}</span>;
};

export default ErrorMessage;
