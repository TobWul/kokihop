import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import Icon from "../Icon/Icon";
import { Link } from "react-router-dom";
import { cn } from "../../../lib/helpers";
import Spinner from "../Spinner/Spinner";

const Button = ({
  onClick,
  href,
  to,
  children,
  icon,
  secondary,
  type,
  loading,
  disabled,
}) => {
  if (!children) return null;
  const buttonClassName = cn(styles.button, secondary && styles.secondary);

  const ButtonContent = () => (
    <>
      <span className={loading ? styles.isLoading : ""}>
        {icon && <Icon icon={icon} />}
        {children}
      </span>
      {loading && <Spinner />}
    </>
  );

  if (href) {
    return (
      <a className={buttonClassName} href={href}>
        <ButtonContent />
      </a>
    );
  } else if (onClick || type === "submit") {
    return (
      <button
        onClick={onClick}
        className={buttonClassName}
        type={type}
        disabled={disabled}
      >
        <ButtonContent />
      </button>
    );
  } else if (to) {
    return (
      <Link to={to} className={buttonClassName}>
        <ButtonContent />
      </Link>
    );
  }
  return null;
};

Button.propTypes = {
  onClick: PropTypes.func,
  href: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default Button;
