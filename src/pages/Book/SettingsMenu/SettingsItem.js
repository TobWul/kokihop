import React from "react";
import styles from "./SettingsMenu.module.scss";
import Icon from "../../../components/DS/Icon/Icon";

const SettingsItem = ({ icon, name, onClick }) => {
  return (
    <div onClick={onClick} className={styles.settingsItem}>
      <Icon icon={icon} />
      <span>{name}</span>
    </div>
  );
};

export default SettingsItem;
