import React, { useContext } from "react";
import Pages from "./Pages";
import BookIndex from "../BookIndex/BookIndex";
import styles from "./RecipeBook.module.scss";
import RoundButton from "../../../components/DS/Button/RoundButton";
import { useEffect } from "react";
import { RecipeContext } from "../../../context/recipeContext";
import { useHistory, useParams } from "react-router-dom";
import { Heading1 } from "../../../components/DS/Typography/Typography";
import Button from "../../../components/DS/Button/Button";
import { gql, useQuery } from "@apollo/client";
import Categories from "../Category/Categories";
import { ROUTES } from "../../../Routes/Router";

const RecipeBook = () => {
  let { bookId: urlBookId } = useParams();
  const history = useHistory();
  const { categoryId, setBookId } = useContext(RecipeContext);

  useEffect(() => {
    setBookId(urlBookId);
  }, [urlBookId]);

  const newRecipe = () => {
    history.push(ROUTES.NEW_RECIPE);
  };

  return (
    <>
      <div className={styles.bookContainer}>
        <Categories />
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
