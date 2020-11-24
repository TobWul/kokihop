import React from "react";
import styles from "./Input.module.scss";

const Input = ({
  id,
  type,
  placeholder,
  label,
  value,
  onChange,
  errorMessage,
  options,
  ...props
}) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label htmlFor={id}>{label}</label>}
      {options ? (
        <select className={styles.dropdown} value={value} onChange={onChange}>
          {options.map((option) => (
            <option value={option.value}>{option.name}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
        />
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Input;
