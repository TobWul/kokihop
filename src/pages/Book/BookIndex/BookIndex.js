import React, { useContext, useState } from "react";
import { RecipeContext } from "../../../context/recipeContext";
import styles from "./BookIndex.module.scss";
import {
  Heading1,
  Heading3,
} from "../../../components/DS/Typography/Typography";
import Icon from "../../../components/DS/Icon/Icon";
import Input from "../../../components/DS/Input/Input";
import { gql, useMutation } from "@apollo/client";

const BookIndex = () => {
  const { book, setCurrentPage, bookId, refetch } = useContext(RecipeContext);
  const [newCategoryName, setNewCategoryName] = useState("");

  const navigateToRecipePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [addNewCategory] = useMutation(ADD_NEW_CATEGORY, {
    update() {
      refetch();
    },
    onError(err) {
      console.error(err);
    },
    variables: { name: newCategoryName, bookId },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addNewCategory();
  };

  return (
    <div>
      <Heading1>{book.name}</Heading1>
      <div>
        {book &&
          book.categories &&
          book.categories.map(({ name, recipes, _key }) => (
            <div className={styles.card} key={name}>
              <Heading3>{name}</Heading3>
              {recipes.map((id) => (
                <li key={id}>{id}</li>
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
      <form onSubmit={onSubmit}>
        <button type="submit">
          <Icon icon="addCircle" />
          Legg til ny kategori
        </button>
        <Input
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
      </form>
    </div>
  );
};

const ADD_NEW_CATEGORY = gql`
  mutation AddNewCategory($name: String!, $bookId: ID!) {
    addCategory(name: $name, bookId: $bookId) {
      name
      recipes
    }
  }
`;

export default BookIndex;
