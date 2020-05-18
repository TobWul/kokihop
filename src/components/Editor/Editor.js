import React, { useEffect, useState } from "react";
import EditorRecipeBlockList from "../EditorRecipeBlockList/EditorRecipeBlockList";
import { getRecipeBlocks } from "../../api/api";
import styles from "./Editor.module.scss";
import EditorAddBlock from "../EditorAddBlock/EditorAddBlock";

const Editor = ({ pageId }) => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const response = getRecipeBlocks(pageId);
    console.log(response);
    setBlocks(response);
  }, []);

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
    </div>
  );
};

export default Editor;
