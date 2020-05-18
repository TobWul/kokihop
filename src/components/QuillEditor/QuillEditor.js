import React, { useEffect } from "react";
import "./QuillEditor.scss";

import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import Quill from "quill/core";
import Bubble from "quill/themes/bubble";
import Toolbar from "quill/modules/toolbar";

import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Underline from "quill/formats/underline";
import Link from "quill/formats/link";
import Icons from "quill/ui/icons";
import Icon from "../Icon/Icon";
import editorIcons from "./editorIcons";
import { debounce } from "../../lib/helpers";

const QuillEditor = ({ block, updateBlockValue }) => {
  useEffect(() => {
    Quill.register({
      "modules/toolbar": Toolbar,
      "themes/bubble": Bubble,
      "formats/bold": Bold,
      "formats/italic": Italic,
      "formats/underline": Underline,
      "formats/link": Link,
      "ui/icons": Icons,
    });
    var Delta = Quill.import("delta");

    const icons = Quill.import("ui/icons");
    var toolbarOptions = ["bold", "italic", "underline", "link"];
    icons["bold"] = editorIcons["bold"];
    icons["italic"] = editorIcons["italic"];
    icons["underline"] = editorIcons["underline"];
    icons["link"] = editorIcons["link"];

    var quill = new Quill("#editor", {
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: "Del genistreken med verden...",
      theme: "bubble",
    });

    // Store accumulated changes
    quill.updateContents(block.value);
    console.log(block);

    var change = new Delta();
    quill.on(
      "text-change",
      debounce((delta) => {
        change = change.compose(delta);
        if (change.length() > 0) {
          console.log("Saving changes", change);

          change = new Delta();
          updateBlockValue(JSON.stringify(quill.getContents().ops));
          // partial: JSON.stringify(change);
        }
      }, 1000)
    );

    // Check for unsaved data
    window.onbeforeunload = function () {
      if (change.length() > 0) {
        return "There are unsaved changes. Are you sure you want to leave?";
      }
    };
  });
  return <div id="editor" className="quillEditor"></div>;
};

export default QuillEditor;
