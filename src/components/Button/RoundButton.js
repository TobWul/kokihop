import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";
import Icon from "../Icon/Icon";
import { cn } from "../../lib/helpers";

const RoundButton = ({ onClick, icon, fab }) => {
  if (!onClick || !icon) return null;
  return (
    <button
      className={cn(
        styles.button,
        styles.round,
        fab && styles.fab,
        fab && fab.includes("top") && styles.top,
        fab && fab.includes("bottom") && styles.bottom,
        fab && fab.includes("right") && styles.right,
        fab && fab.includes("left") && styles.left
      )}
      onClick={onClick}
      aria-label={icon}
    >
      <Icon icon={icon} />
    </button>
  );
};

RoundButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

export default RoundButton;
