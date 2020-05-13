import React from "react";
import PropTypes from "prop-types";

const ImageBlock = ({ block }) => (
  <img src={block.value.src} alt={block.value.alt} />
);

export default ImageBlock;
