import React from "react";
import PropTypes from "prop-types";
import CategoryLabel from "./CategoryLabel";
import { category } from "../../lib/propTypes";
import styles from "./Category.module.scss";
import AddCategoryButton from "./AddCategoryButton";

const Categories = ({
  categories,
  changeCategory,
  selectedCategory,
  addCategory,
}) => {
  return (
    <div className={styles.wrapper}>
      {categories.map((category) => (
        <CategoryLabel
          id={category.id}
          key={`category-${category.id}`}
          name={category.name}
          active={selectedCategory.id === category.id}
          changeCategory={changeCategory}
        />
      ))}
      {/* <AddCategoryButton addCategory={addCategory} /> */}
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape(category)),
  changeCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.shape(category),
};

export default Categories;
