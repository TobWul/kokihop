import React from "react";
import arrayMove from "array-move";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import EditorRecipeBlockWrapper from "../EditorRecipeBlockWrapper/EditorRecipeBlockWrapper";

const EditorRecipeBlockList = ({
  blocks,
  updateBlockValue,
  deleteBlock,
  updateBlockOrder,
}) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    oldIndex !== newIndex &&
      updateBlockOrder(arrayMove(blocks, oldIndex, newIndex));
  };

  return (
    <EditorBlockContainer
      blocks={blocks}
      onSortEnd={onSortEnd}
      useDragHandle
      updateBlockValue={updateBlockValue}
      deleteBlock={deleteBlock}
    />
  );
};
const EditorBlockItem = sortableElement(
  ({ block, updateBlockValue, deleteBlock }) => (
    <EditorRecipeBlockWrapper
      block={block}
      updateBlockValue={updateBlockValue}
      deleteBlock={deleteBlock}
    />
  )
);

const EditorBlockContainer = sortableContainer(
  ({ blocks, updateBlockValue, deleteBlock }) => {
    return (
      <ul>
        {blocks.map((block, index) => (
          <EditorBlockItem
            key={`item-${index}`}
            index={index}
            block={block}
            updateBlockValue={updateBlockValue}
            deleteBlock={deleteBlock}
          />
        ))}
      </ul>
    );
  }
);

export default EditorRecipeBlockList;
