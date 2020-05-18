import React from "react";
import PropTypes from "prop-types";
import styles from "./EditorAddBlock.module.scss";
import Icon from "../Icon/Icon";

const AddBlockButton = ({ addBlock, name, icon, disabled }) => {
  return (
    <button
      className={styles.addBlockButton}
      onClick={addBlock}
      disabled={disabled}
    >
      <Icon icon={icon} />
      <span>{name}</span>
    </button>
  );
};

export default AddBlockButton;
