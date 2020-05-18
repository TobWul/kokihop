import React from "react";
import { DebounceInput } from "react-debounce-input";
import styles from "./EditorBlocks.module.scss";

const TitleBlock = ({ block, updateBlockValue }) => {
  return (
    <DebounceInput
      value={block.value}
      debounceTimeout={1000}
      minLength={1}
      onChange={(e) => updateBlockValue(block.id, e.target.value)}
      className={styles.titleBlock}
      placeholder="Tittel..."
    />
  );
};

export default TitleBlock;
