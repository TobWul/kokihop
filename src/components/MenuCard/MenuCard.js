import React from "react";
import PropTypes from "prop-types";
import styles from "./MenuCard.module.scss";
import { cn } from "../../lib/helpers";

const MenuCard = ({ children, className }) => (
  <div className={cn(styles.card, className)}>{children}</div>
);

export default MenuCard;
