import React from "react";
import { Heading1 } from "../../DS/Typography/Typography";
import styles from "./RecipeContent.module.scss";

const RecipeContent = ({ recipe }) => {
  return recipe ? (
    <div className={styles.recipeWrapper}>
      <Heading1>{recipe.title}</Heading1>
      {<div dangerouslySetInnerHTML={{ __html: recipe.content }} />}
    </div>
  ) : (
    ""
  );
};

export default RecipeContent;
