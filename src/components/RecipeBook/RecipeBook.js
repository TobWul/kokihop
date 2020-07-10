import React, { useContext } from "react";
import Pages from "../Pages/Pages";
import CategoryContainer from "../Category/CategoryContainer";
import BookIndex from "../BookIndex/BookIndex";
import styles from "./RecipeBook.module.scss";
import RoundButton from "../Button/RoundButton";
import { RecipeContext } from "../../context/RecipeContext";
import withAuthorization from "../HOC/withAuthorization";
import { useState } from "react";
import { useEffect } from "react";
import withAuthentication from "../HOC/withAuthentication";
import { withFirebase } from "../../firebase/context";

const RecipeBook = ({ user, firebase }) => {
  const { navigate, categoryId, bookId, setBook, book } = useContext(
    RecipeContext
  );

  useEffect(() => {
    async function fetchData() {
      const result = await firebase.getBook(user.uid);
      console.log(result);
      setBook(result);
    }
    fetchData();
  }, []);

  const newRecipe = () => {
    navigate("/ny-oppskrift", { categoryId, bookId });
  };

  return (
    <>
      <div className={styles.bookContainer}>
        <CategoryContainer categories={book.categories} />
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

export default withFirebase(withAuthentication(RecipeBook));
