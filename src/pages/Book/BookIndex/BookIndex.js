import React, { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../../../context/recipeContext";
import styles from "./BookIndex.module.scss";
import {
  Heading1,
  Heading3,
} from "../../../components/DS/Typography/Typography";
import Icon from "../../../components/DS/Icon/Icon";
import Input from "../../../components/DS/Input/Input";
import { gql, useMutation, useQuery } from "@apollo/client";
import CategoryCard from "../../../components/Webapp/CategoryCard/CategoryCard";

const BookIndex = () => {
  const { book, setCurrentPage, bookId, refetch } = useContext(RecipeContext);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [recipeIDs, setRecipeIDs] = useState([]);

  useEffect(() => {
    setRecipeIDs(
      [].concat.apply(
        [],
        book.categories && book.categories.map((category) => category.recipes)
      )
    );
    refetchRecipeIDs();
  }, [book]);

  const navigateToRecipePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const { loading, error, refetch: refetchRecipeIDs } = useQuery(
    GET_RECIPE_NAMES,
    {
      variables: { recipeIDs },
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {
        console.log(data);
        setCategories(
          book &&
            book.categories &&
            book.categories.map((category) => ({
              ...category,
              recipes: category.recipes.map((recipeID) =>
                data.getRecipeNames.find(({ id }) => recipeID === id)
              ),
            }))
        );
      },
    }
  );

  const [addNewCategory] = useMutation(ADD_NEW_CATEGORY, {
    update() {
      refetch();
    },
    onError(err) {
      console.error(err);
    },
    variables: { name: newCategoryName, bookId },
  });

  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    update() {
      refetch();
    },
    onError(err) {
      console.error(err);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addNewCategory();
  };

  const changeOrder = (reorderedRecipes, categoryId) => {
    updateCategory({
      variables: {
        recipes: reorderedRecipes.map(({ id }) => id),
        bookId,
        categoryId,
      },
    });
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return { ...category, recipes: reorderedRecipes };
        } else {
          return category;
        }
      })
    );
  };

  return (
    <div className={styles.bookIndexWrapper}>
      <Heading1>{book.name}</Heading1>
      <div className={styles.categories}>
        {categories &&
          categories.map(({ id, name, recipes, _key }) => (
            <CategoryCard
              id={id}
              name={name}
              recipes={recipes}
              changeOrder={changeOrder}
            />
          ))}
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

const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $name: String
    $recipes: [String]
    $bookId: ID!
    $categoryId: ID!
  ) {
    updateCategory(
      updateCategoryInput: {
        name: $name
        recipes: $recipes
        bookId: $bookId
        categoryId: $categoryId
      }
    )
  }
`;

const GET_RECIPE_NAMES = gql`
  query GetRecipeNames($recipeIDs: [String!]) {
    getRecipeNames(recipeIDs: $recipeIDs) {
      id
      title
    }
  }
`;
export default BookIndex;
