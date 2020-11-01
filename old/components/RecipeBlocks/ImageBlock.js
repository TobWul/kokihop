import React from "react";
import PropTypes from "prop-types";

const ImageBlock = ({ block }) => {
  const { value } = block;
  return <img src={value.src} alt={value.alt} />;
};

export default ImageBlock;
