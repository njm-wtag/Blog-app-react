import { useEffect, useRef } from "react";
import "./Button.scss";

const Button = ({ children, className, onclickHandler, type }) => {
  return (
    <button
      type={type ? type : null}
      className={`${className} custom-button`}
      onClick={onclickHandler}
    >
      {children}
    </button>
  );
};

export default Button;
