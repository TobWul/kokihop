import React from "react";
import PropTypes from "prop-types";
import CategoryLabel from "./CategoryLabel";
import { category } from "../../lib/propTypes";
import styles from "./Category.module.scss";

const Categories = ({ categories, changeCategory, selectedCategoryId }) => {
  const index = categories.shift();
  return (
    <div className={styles.wrapper}>
      <CategoryLabel
        id={index.id}
        name="Indeks"
        active={selectedCategoryId === index._id}
        changeCategory={() => changeCategory(index._id)}
      />
      {categories.map((category) => (
        <CategoryLabel
          key={`category-${category._id}`}
          name={category.name}
          active={selectedCategoryId === category._id}
          changeCategory={() => changeCategory(category._id)}
        />
      ))}
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape(category)),
  changeCategory: PropTypes.func.isRequired,
  selectedCategory: PropTypes.shape(category),
};

export default Categories;
