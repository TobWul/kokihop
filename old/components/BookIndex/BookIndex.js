import React, { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import Button from "../Button/Button";
import SignOutButton from "../AuthPages/SignOutButton/SignOutButton";

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
          <div key={category._id}>
            <h3>{category.name}</h3>
            {category.recipes.map((recipe, index) => (
              <Button
                key={recipe}
                onClick={() => navigateToRecipePage(index, category._id)}
              >
                {recipe}
              </Button>
            ))}
          </div>
        ))}
      </div>
      <SignOutButton />
    </div>
  );
};

export default BookIndex;
