import React from "react";
import { Heading1 } from "../../DS/Typography/Typography";
import styles from "./RecipeContent.module.scss";

const RecipeContent = ({ recipe }) => {
  return (
    <div className={styles.recipeWrapper}>
      <Heading1>{recipe && recipe.title}</Heading1>
      {recipe && <div dangerouslySetInnerHTML={{ __html: recipe.content }} />}
    </div>
  );
};

export default RecipeContent;
