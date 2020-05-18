import React from "react";
import PropTypes from "prop-types";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

const TitleBlock = ({ block }) => {
  const { value } = block;
  return <h1>{value}</h1>;
};

export default TitleBlock;
