import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import styles from "./RecipePage.module.scss";
import { gql, useQuery } from "@apollo/client";
import { RecipeContext } from "../../../context/recipeContext";
import Button from "../../../components/DS/Button/Button";

const RecipePage = () => {
  const { recipeId, categoryId } = useContext(RecipeContext);
  const { data, error, loading, refetch } = useQuery(GET_RECIPE, {
    fetchPolicy: "cache-and-network",
    variables: { recipeId },
  });
  const recipe = data && data.getRecipe;

  return (
    <div className={styles.recipeWrapper}>
      {recipe && <div dangerouslySetInnerHTML={{ __html: recipe.content }} />}
    </div>
  );
};

const GET_RECIPE = gql`
  query GetRecipe($recipeId: ID!) {
    getRecipe(recipeId: $recipeId) {
      id
      content
      createdAt
      updatedAt
    }
  }
`;

export default RecipePage;
