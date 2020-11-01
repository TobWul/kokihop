import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";
import styles from "./SettingsMenu.module.scss";

const SettingsItem = ({ icon, name, onClick }) => {
  return (
    <div onClick={onClick} className={styles.settingsItem}>
      <Icon icon={icon} />
      <span>{name}</span>
    </div>
  );
};

export default SettingsItem;
