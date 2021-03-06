import React, { useRef } from "react";
import PropTypes from "prop-types";
import styles from "./MenuCard.module.scss";
import useClickOutside from "../../../hooks/useClickOutside";
import { cn } from "../../../lib/helpers";

const MenuCard = ({ children, className, clickOutsideHandler }) => {
  const menuRef = useRef(null);
  useClickOutside(menuRef, clickOutsideHandler);
  return (
    <div ref={menuRef} className={cn(styles.card, className)}>
      {children}
    </div>
  );
};

MenuCard.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  clickOutsideHandler: PropTypes.func,
};

export default MenuCard;
