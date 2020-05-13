import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { DebounceInput } from "react-debounce-input";
import { useRef } from "react";
import styles from "./BlockTypes.module.scss";
import { textAreaAutoHeight } from "../../../lib/helpers";

const TextBlock = ({ block, updateBlockValue }) => {
  const textareaRef = useRef(null);
  useEffect(textAreaAutoHeight, []);
  const handleChange = (e) => {
    updateBlockValue(e.target.value);
  };
  return (
    <DebounceInput
      ref={textareaRef}
      element={block.type === "text" ? "textarea" : "input"}
      minLength={2}
      debounceTimeout={1000}
      onChange={handleChange}
      value={block.value}
      className={styles.textBlock}
    />
  );
};

export default TextBlock;
