import React, { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import Button from "../Button/Button";

const BookIndex = () => {
  const { setCurrentPage, setCategoryId, categories } = useContext(
    RecipeContext
  );

  const navigateToRecipePage = (pageNumber, categoryId) => {
    setCategoryId(categoryId);
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      Index
      <div>
        {categories.map((category) => (
          <div>
            <h3>{category.name}</h3>
            {category.recipes.map((recipe, index) => (
              <Button onClick={() => navigateToRecipePage(index, category._id)}>
                {recipe}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookIndex;
