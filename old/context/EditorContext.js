import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { mongoObjectId } from "../lib/helpers";
const EditorContext = React.createContext();

const EditorContextProvider = ({ children }) => {
  const [blocks, setBlocks] = useState([]);

  const blockIndex = (blockId) =>
    blocks.findIndex((block) => block._id === blockId);

  const updateBlockValue = (blockId, newValue) => {
    console.log(blockId, newValue);
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

  const addBlock = (type, initialValue) => {
    const allowedTypes = ["title", "text", "image", "ingredients"];
    if (!allowedTypes.includes(type)) return null;
    const newBlock = {
      _id: mongoObjectId(),
      type: type,
      value: initialValue || null,
    };
    const temp = [...blocks, newBlock];
    setBlocks(temp);
  };

  return (
    <EditorContext.Provider
      value={{
        blocks,
        setBlocks,
        updateBlockValue,
        updateBlockOrder,
        addBlock,
        deleteBlock,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export { EditorContextProvider, EditorContext };
