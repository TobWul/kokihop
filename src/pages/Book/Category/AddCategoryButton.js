import React from "react";
import PropTypes from "prop-types";
import CategoryLabel from "./CategoryLabel";
import Icon from "../Icon/Icon";
import styles from "./Category.module.scss";
import { useState } from "react";
import { cn } from "../../../lib/helpers";

const AddCategoryButton = ({ addCategory }) => {
  const [isEditing, setEditing] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  return (
    <div className={styles.addCategoryWrapper}>
      <div className={styles.label}>
        <input
          name="categoryName"
          id="categoryName"
          value={categoryName}
          onChange={handleChange}
        />
      </div>
      <button
        onClick={() => addCategory(CategoryLabel)}
        className={cn(styles.label, styles.addCategory)}
      >
        <Icon icon="add" />
      </button>
    </div>
  );
};

export default AddCategoryButton;
