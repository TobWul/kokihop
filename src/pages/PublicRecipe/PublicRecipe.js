import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../components/DS/Spinner/Spinner";
import RecipeContent from "../../components/Webapp/RecipeContent/RecipeContent";
import SaveToBook from "../../components/Webapp/SaveToBook/SaveToBook";
import styles from "./PublicRecipe.module.scss";

const PublicRecipe = () => {
  let { recipeId } = useParams();
  const { data, loading, error } = useQuery(GET_RECIPE, {
    variables: { recipeId },
    onError: (err) => console.log(error),
  });
  const { data: bookQuery, loading: bookLoading, error: bookError } = useQuery(
    GET_BOOKS
  );
  if (data) {
    return (
      <div className={styles.publicRecipe}>
        <RecipeContent recipe={data.getRecipe} />
        <SaveToBook
          recipeId={recipeId}
          userId={data.getRecipe.user}
          books={bookQuery && bookQuery.getBooks}
        />
      </div>
    );
  } else if (error) {
    console.log(error);
    return "Error";
  } else {
    return <Spinner />;
  }
};

const GET_RECIPE = gql`
  query GetRecipe($recipeId: ID!) {
    getRecipe(recipeId: $recipeId) {
      user
      title
      content
      createdAt
      updatedAt
    }
  }
`;

const GET_BOOKS = gql`
  query {
    getBooks {
      id
      name
      categories {
        id
        name
      }
    }
  }
`;

export default PublicRecipe;
