// import React from "react";
import "./common.css";

const Button = ({ children, className = "", type = "button", onClick, disabled = false, ariaLabel, ...rest }) => {
  const classes = `btn ${className}`.trim();
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
