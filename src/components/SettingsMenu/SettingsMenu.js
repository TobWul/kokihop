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
  const [copied, setCopied] = useState(false);

  const copyRef = useRef(null);

  const copy = () => {
    console.log(copyRef.current);

    copyRef.current.select();
    copyRef.current.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  if (!(prevUpdate instanceof Date)) {
    prevUpdate = new Date(prevUpdate);
  }
  return (
    <div className={styles.settingsMenuWrapper}>
      <MenuCard>
        <SettingsItem name="Rediger oppskrift" icon="edit" onClick={editPage} />
        <SettingsItem name="Kopier linken" icon="hyperlink" onClick={copy} />
        {savedCount > 0 && <p>{savedCount} har lagret denn oppskriften</p>}
        <p>Sist endret: {getTimestamp(prevUpdate)}</p>
        <label htmlFor="copy" className={styles.copyInput}>
          Hidden copy element
        </label>
        <input
          id="copy"
          type="text"
          ref={copyRef}
          value={url}
          className={styles.copyInput}
        />
      </MenuCard>
      <MenuCard>
        <SettingsItem name="Ny oppskrift" icon="addCircle" onClick={newPage} />
        <SettingsItem
          name="Innstillinger"
          icon="settings"
          onClick={openSettings}
        />
      </MenuCard>
      <CopiedLinkToast show={copied} />
    </div>
  );
};

export default SettingsMenu;
