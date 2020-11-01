import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";

const Input = ({
  id,
  type,
  placeholder,
  label,
  value,
  onChange,
  errorMessage,
  ...props
}) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Input;
