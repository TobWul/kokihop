import React from "react";

const TextBlock = ({ block }) => {
  const { value } = block;
  return <div dangerouslySetInnerHTML={{ __html: value }}></div>;
};

export default TextBlock;
