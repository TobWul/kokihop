import React from "react";

const EditorImageBlock = ({ block }) => (
  <img src={block.value.src} alt={block.value.alt} />
);

export default EditorImageBlock;
