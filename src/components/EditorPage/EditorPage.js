import React, { useEffect, useContext } from "react";
import EditorRecipeBlockList from "../EditorRecipeBlockList/EditorRecipeBlockList";
import styles from "./Editor.module.scss";
import EditorAddBlock from "../EditorAddBlock/EditorAddBlock";
import Button from "../Button/Button";
import { useHistory, useLocation } from "react-router-dom";
import useDataApi from "../../api/api";
import { createRecipe, updateRecipe } from "../../api/recipe";
import { EditorContext } from "../../context/EditorContext";
import { mongoObjectId } from "../../lib/helpers";

const EditorPage = () => {
  const { state } = useLocation();
  const { recipeId, bookId, categoryId } = state || {};
  const url = `/bok/${bookId}`;
  console.log(state);

  const history = useHistory();
  const { blocks, setBlocks } = useContext(EditorContext);
  const uri = recipeId ? `/recipes/${recipeId}` : null;
  const [api] = useDataApi(uri);

  useEffect(() => {
    setBlocks(
      (api.data && api.data.blocks) || [
        { type: "title", value: "", _id: mongoObjectId() },
      ]
    );
  }, [api.isLoading, api.data]);

  const save = () => {
    recipeId
      ? updateRecipe(recipeId, blocks)
      : createRecipe(categoryId, blocks);
    history.push(url);
  };

  if (!categoryId || !bookId) {
    // history.push(url);
  }

  return (
    <div className={styles.editor}>
      <EditorRecipeBlockList />
      <EditorAddBlock />
      <Button onClick={save}>Lagre</Button>
    </div>
  );
};

export default EditorPage;
