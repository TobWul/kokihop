import React from "react";
import PropTypes from "prop-types";
import { cn } from "../../lib/helpers";
import styles from "./Category.module.scss";
import { category } from "../../lib/propTypes";

const CategoryLabel = ({ name, active, changeCategory }) => {
  return (
    <button
      className={cn(styles.label, active && styles.active)}
      onClick={changeCategory}
    >
      <span>{name}</span>
    </button>
  );
};

CategoryLabel.propTypes = {
  ...category,
  active: PropTypes.bool,
  changeCategory: PropTypes.func.isRequired,
};

export default CategoryLabel;
