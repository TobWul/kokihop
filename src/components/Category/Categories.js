import React from "react";
import PropTypes from "prop-types";
import CategoryLabel from "./CategoryLabel";
import { category } from "../../lib/propTypes";
import styles from "./Category.module.scss";

const Categories = ({
  categories,
  changeCategory,
  goToIndex,
  selectedCategoryId,
}) => {
  const index = categories.shift();
  return (
    <div className={styles.wrapper}>
      <CategoryLabel
        id={index.id}
        name="Indeks"
        active={selectedCategoryId === index.id}
        changeCategory={goToIndex}
      />
      {categories.map((category) => (
        <CategoryLabel
          id={category._id}
          key={`category-${category._id}`}
          name={category.name}
          active={selectedCategoryId === category._id}
          changeCategory={changeCategory}
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
