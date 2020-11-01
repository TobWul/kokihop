import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import styles from "./RecipePage.module.scss";
import TextBlock from "../RecipeBlocks/TextBlock";
import IngredientsBlock from "../RecipeBlocks/IngredientsBlock";
import ImageBlock from "../RecipeBlocks/ImageBlock";
import TitleBlock from "../RecipeBlocks/TitleBlock";
import useDataApi, { getRecipeBlocks } from "../../api/api";
import { RecipeContext } from "../../context/RecipeContext";

const RecipePage = ({ recipeId }) => {
  const [state, setUrl] = useDataApi(`/recipes/${recipeId}`);
  const { data = { blocks: [] } } = state;
  const { blocks } = data;
  useEffect(() => {
    setUrl(`/recipes/${recipeId}`);
  }, [recipeId]);

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
      {blocks && blocks.map((block) => serializer(block))}
    </div>
  );
};

export default RecipePage;
