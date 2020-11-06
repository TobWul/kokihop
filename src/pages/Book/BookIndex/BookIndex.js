import React, { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import Button from "../../../components/DS/Button/Button";
import { RecipeContext } from "../../../context/recipeContext";
import styles from "./BookIndex.module.scss";

const BookIndex = () => {
  const { book, setCurrentPage } = useContext(RecipeContext);
  const { logout } = useContext(AuthContext);
  console.log(book);

  const navigateToRecipePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      Index
      <div>
        {book &&
          book.categories &&
          book.categories.map(({ recipes }) => (
            <div className={styles.card}>
              {recipes.map((id) => (
                <li>{id}</li>
              ))}
            </div>
          ))}
        {/* {book &&
          book.categories.map((category) => (
            <div key={category._id}>
              <h3>{category.name}</h3>
              {category.recipes.map((id, index) => (
                <Button key={id} onClick={() => navigateToRecipePage(id)}>
                  {id}
                </Button>
              ))}
            </div>
          ))} */}
      </div>
      <Button onClick={logout}>Logg ut</Button>
    </div>
  );
};

export default BookIndex;
