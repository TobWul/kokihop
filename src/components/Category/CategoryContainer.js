import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Categories from "./Categories";
import { useState } from "react";

const sampleData = [
  {
    id: "321jdfh2131",
    name: "Brød",
  },
  {
    id: "321jdkdos131",
    name: "Middag",
  },
];

const CategoryContainer = () => {
  const [categories, setCategories] = useState(sampleData);
  const [selectedCategory, setSelectedCategory] = useState(sampleData[0]);
  useEffect(() => {
    // Fetch categories
  }, []);
  const changeCategory = (newCategoryId) => {
    setSelectedCategory(
      categories.find(({ id }) => id === newCategoryId) || {}
    );
  };
  const addCategory = (categoryName) => {
    if (!categoryName) {
      console.error("addCategory requires a name");
      return;
    }
    setCategories([
      ...categories,
      {
        name: categoryName,
        id: `${Math.random()}`,
      },
    ]);
  };
  return (
    <Categories
      categories={categories}
      changeCategory={changeCategory}
      addCategory={addCategory}
      selectedCategory={selectedCategory}
    />
  );
};

export default CategoryContainer;
