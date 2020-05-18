import React, { useEffect } from "react";
import Icon from "../Icon/Icon";
import styles from "./EditorBlocks.module.scss";
import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.min.css";
import "medium-editor/dist/css/themes/beagle.min.css";

const EditorTextBlock = ({ block, updateBlockValue }) => {
  const { value } = block;
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

    const editor = new MediumEditor("#editor", config);
    editor.setContent(value);
    editor.subscribe("editableInput", (eventObj, editable) => {
      updateBlockValue(block.id, editor.getContent());
    });
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div id="editor" className={styles.textBlock} onChange={handleChange} />
  );
};

const EditButton = (props) => {
  return (
    <button
      key={props.cmd}
      onMouseDown={(evt) => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
      }}
    >
      <Icon icon={props.icon} />
      {props.name || props.cmd}
    </button>
  );
};

export default EditorTextBlock;
