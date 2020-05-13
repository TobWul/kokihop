import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import MenuCard from "../MenuCard/MenuCard";
import SettingsItem from "./SettingsItem";
import { getTimestamp } from "../../lib/dateHandling";
import CopiedLinkToast from "./CopiedLinkToast";
import styles from "./SettingsMenu.module.scss";

const SettingsMenu = ({
  editPage,
  url,
  newPage,
  openSettings,
  savedCount,
  prevUpdate,
}) => {
  console.log(savedCount);

  const [copied, setCopied] = useState(false);

  const copyRef = useRef(null);

  const copy = () => {
    copyRef.current.select();
    copyRef.current.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const haveSavedCount = savedCount && savedCount.length > 0;

  if (!(prevUpdate instanceof Date)) {
    prevUpdate = new Date(prevUpdate);
  }
  return (
    <div className={styles.settingsMenuWrapper}>
      <MenuCard>
        <SettingsItem name="Rediger oppskrift" icon="edit" onClick={editPage} />
        <SettingsItem name="Kopier linken" icon="hyperlink" onClick={copy} />
        {haveSavedCount && (
          <p>{savedCount} har lagret denne oppskriften i sin bok</p>
        )}
        <p>Sist endret: {getTimestamp(prevUpdate)}</p>
      </MenuCard>
      <MenuCard>
        <SettingsItem name="Ny oppskrift" icon="addCircle" onClick={newPage} />
        <SettingsItem
          name="Innstillinger"
          icon="settings"
          onClick={openSettings}
        />
      </MenuCard>
      <CopiedLinkToast show={copied} url={url} inputRef={copyRef} />
    </div>
  );
};

export default SettingsMenu;
