import React from "react";
import styles from "./Category.module.scss";
import { cn } from "../../../lib/helpers";

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

export default CategoryLabel;
