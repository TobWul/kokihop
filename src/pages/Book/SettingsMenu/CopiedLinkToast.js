import React from "react";
import PropTypes from "prop-types";
import styles from "./SettingsMenu.module.scss";
import { cn } from "../../../lib/helpers";
import MenuCard from "../MenuCard/MenuCard";

const CopiedLinkToast = ({ show }) => {
  return (
    <div className={cn(styles.copiedLinkToast, show && styles.show)}>
      <MenuCard>Linken er kopiert</MenuCard>
    </div>
  );
};

CopiedLinkToast.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default CopiedLinkToast;
