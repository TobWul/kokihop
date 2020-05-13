import React from "react";
import PropTypes from "prop-types";
import MenuCard from "../MenuCard/MenuCard";
import styles from "./SettingsMenu.module.scss";
import { cn } from "../../lib/helpers";

const CopiedLinkToast = ({ show, url, inputRef }) => {
  return (
    <div className={cn(styles.copiedLinkToast, show && styles.show)}>
      <input type="text" ref={inputRef} hidden value={url} readOnly />
      <MenuCard>Linken er kopiert</MenuCard>
    </div>
  );
};

CopiedLinkToast.propTypes = {
  show: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  inputRef: PropTypes.any.isRequired,
};

export default CopiedLinkToast;
