import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./RecipePage.module.scss";
import TextBlock from "../RecipeBlocks/TextBlock";
import IngredientsBlock from "../RecipeBlocks/IngredientsBlock";
import ImageBlock from "../RecipeBlocks/ImageBlock";
import TitleBlock from "../RecipeBlocks/TitleBlock";
import useDataApi, { getRecipeBlocks } from "../../api/api";
import { useParams, useRouteMatch } from "react-router-dom";

const RecipePage = ({ recipeId }) => {
  const [state] = useDataApi(`/recipes/${recipeId}`);
  const { data = { blocks: [] } } = state;
  const { blocks } = data;

  const serializer = (block) => {
    const blockProps = { key: block._id, block };
    const blockTypes = {
      title: <TitleBlock {...blockProps} />,
      text: <TextBlock {...blockProps} />,
      ingredients: <IngredientsBlock {...blockProps} />,
      image: <ImageBlock {...blockProps} />,
    };
    return blockTypes[block.type];
  };
  return (
    <div className={styles.recipeWrapper}>
      {blocks.map((block) => serializer(block))}
    </div>
  );
};

export default RecipePage;
