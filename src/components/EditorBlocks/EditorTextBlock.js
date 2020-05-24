import React, { useEffect } from "react";
import Icon from "../Icon/Icon";
import styles from "./EditorBlocks.module.scss";
import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.min.css";
import "medium-editor/dist/css/themes/beagle.min.css";

const EditorTextBlock = ({ block, updateBlockValue }) => {
  const { value = "" } = block;
  useEffect(() => {
    const config = {
      placeholder: {
        text: "Type your text",
        hideOnClick: false,
      },
      imageDragging: false,
      fileDragging: false,
      autoLink: true,
      targetBlank: true,
      toolbar: {
        buttons: ["bold", "italic", "underline", "anchor"],
      },
    };

    const editor = new MediumEditor(`#editor-${block._id}`, config);
    editor.setContent(value);
    editor.subscribe("editableInput", (eventObj, editable) => {
      updateBlockValue(block._id, editor.getContent());
    });
  }, []);

  return <div id={`editor-${block._id}`} className={styles.textBlock} />;
};

export default EditorTextBlock;
