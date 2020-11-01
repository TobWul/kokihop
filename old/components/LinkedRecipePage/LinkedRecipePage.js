import React from "react";
import { useRouteMatch } from "react-router-dom";
import RecipePage from "../RecipePage/RecipePage";

const LinkedRecipePage = () => {
  const match = useRouteMatch("/oppskrift/:recipeId");
  console.log(match);

  return <RecipePage recipeId={match.params.recipeId} />;
};

export default LinkedRecipePage;
