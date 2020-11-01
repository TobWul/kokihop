import React from "react";
import PropTypes from "prop-types";

const TitleBlock = ({ block }) => {
  const { value } = block;
  return <h1>{value}</h1>;
};

TitleBlock.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
  }),
};
export default TitleBlock;
