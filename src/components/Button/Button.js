import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import Icon from "../Icon/Icon";

const Button = ({ onClick, href, children, icon, secondary }) => {
  if ((!onClick && !href) || (!children && !icon)) return null;

  const buttonClassName = [styles.button, secondary && styles.secondary].join(
    " "
  );

  const ButtonContent = () => (
    <>
      {icon && <Icon icon={icon} />}
      {children}
    </>
  );
  return href ? (
    <a className={buttonClassName} href={href}>
      <ButtonContent />
    </a>
  ) : (
    <button onClick={onClick} className={buttonClassName}>
      <ButtonContent />
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  href: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export default Button;
