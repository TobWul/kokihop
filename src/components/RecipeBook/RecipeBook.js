import React, { useContext } from "react";
import Pages from "../Pages/Pages";
import CategoryContainer from "../Category/CategoryContainer";
import BookIndex from "../BookIndex/BookIndex";
import styles from "./RecipeBook.module.scss";
import RoundButton from "../Button/RoundButton";
import { RecipeContext } from "../../context/RecipeContext";

const RecipeBook = () => {
  const { navigate, categoryId, bookId } = useContext(RecipeContext);

  const newRecipe = () => {
    navigate("/ny-oppskrift", { categoryId, bookId });
  };

  return (
    <>
      <div className={styles.bookContainer}>
        <CategoryContainer />
        <div className={styles.pageWrapper}>
          {categoryId === "index" ? <BookIndex /> : <Pages />}
          {categoryId !== "index" && (
            <RoundButton icon="add" onClick={newRecipe} fab="bottom right" />
          )}
        </div>
      </div>
    </>
  );
};

export default RecipeBook;
