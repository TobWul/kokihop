import React, { useContext } from "react";
import Categories from "./Categories";
import { RecipeContext } from "../../context/RecipeContext";

const CategoryContainer = () => {
  const { categories, categoryId, setCategoryId } = useContext(RecipeContext);
  return (
    <Categories
      categories={categories}
      changeCategory={setCategoryId}
      selectedCategoryId={categoryId}
    />
  );
};

export default CategoryContainer;
