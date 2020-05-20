import React from "react";
import Categories from "./Categories";
import { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  changeurlElementAtIndex,
  getUrlElementAtIndex,
} from "../../lib/helpers";

const CategoryContainer = ({
  categories,
  changeCategory,
  goToIndex,
  selectedCategoryId,
}) => {
  return (
    <Categories
      categories={categories}
      changeCategory={changeCategory}
      selectedCategoryId={selectedCategoryId}
      goToIndex={goToIndex}
    />
  );
};

export default CategoryContainer;
