import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import Icon from "../Icon/Icon";
import { Link } from "react-router-dom";

const Button = ({ onClick, href, to, children, icon, secondary, type }) => {
  if (!children) return null;
  const buttonClassName = [styles.button, secondary && styles.secondary].join(
    " "
  );

  const ButtonContent = () => (
    <>
      {icon && <Icon icon={icon} />}
      {children}
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
      <button onClick={onClick} className={buttonClassName} type={type}>
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
