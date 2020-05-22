import React, { useState, useEffect } from "react";
import EditorRecipeBlockList from "../EditorRecipeBlockList/EditorRecipeBlockList";
import styles from "./Editor.module.scss";
import EditorAddBlock from "../EditorAddBlock/EditorAddBlock";
import Button from "../Button/Button";
import { useHistory, useLocation } from "react-router-dom";
import useDataApi, { postData } from "../../api/api";

const Editor = ({ bookId, categoryId }) => {
  let initialBlocks = [{ type: "title", value: "fdsafds", id: "jfdksa8" }];
  const [blocks, setBlocks] = useState(initialBlocks);
  const history = useHistory();
  const location = useLocation();
  const recipeId = location.state ? location.state.recipeId : null;
  const url = recipeId ? `/recipe/${recipeId}` : null;
  const [state] = useDataApi(url, setBlocks);

  if (state.data) {
    initialBlocks = state.data.blocks || initialBlocks;
  }

  useEffect(() => {
    state.data && setBlocks(initialBlocks);
  }, [state.isLoading, state.data]);

  const blockIndex = (blockId) =>
    blocks.findIndex((block) => block.id === blockId);

  const updateBlockValue = (blockId, newValue) => {
    const temp = blocks;
    temp[blockIndex(blockId)].value = newValue;
    setBlocks(temp);
  };
  const deleteBlock = (blockId) => {
    const temp = blocks.filter((block, index) => {
      return index !== blockIndex(blockId);
    });
    setBlocks(temp);
  };
  const updateBlockOrder = (newBlockOrder) => {
    setBlocks(newBlockOrder);
  };
  const addBlock = (type) => {
    const allowedTypes = ["title", "text", "image", "ingredients"];
    if (!allowedTypes.includes(type)) return null;
    const newBlock = {
      id: Math.random().toString(36).substring(7),
      type: type,
      value: "",
    };
    const temp = [...blocks, newBlock];
    setBlocks(temp);
  };
  const save = () => {
    console.log(blocks, bookId, categoryId);
    postData("/recipes", { blocks });
    history.push(`/bok/${bookId}/${categoryId}`);
  };
  return (
    <div className={styles.editor}>
      <EditorRecipeBlockList
        blocks={blocks}
        updateBlockValue={updateBlockValue}
        deleteBlock={deleteBlock}
        updateBlockOrder={updateBlockOrder}
        setBlocks={setBlocks}
      />
      <EditorAddBlock addBlock={addBlock} />
      <Button onClick={() => setBlocks(state.data.blocks)}>Endre</Button>
      <Button onClick={save}>Lagre</Button>
    </div>
  );
};

export default Editor;
