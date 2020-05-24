import React, { useContext } from "react";
import arrayMove from "array-move";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import EditorRecipeBlockWrapper from "../EditorRecipeBlockWrapper/EditorRecipeBlockWrapper";
import { EditorContext } from "../../context/EditorContext";

const EditorRecipeBlockList = () => {
  const { blocks, updateBlockOrder } = useContext(EditorContext);
  const onSortEnd = ({ oldIndex, newIndex }) => {
    oldIndex !== newIndex &&
      updateBlockOrder(arrayMove(blocks, oldIndex, newIndex));
  };

  return (
    <EditorBlockContainer blocks={blocks} onSortEnd={onSortEnd} useDragHandle />
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

const EditorBlockContainer = sortableContainer(({ blocks }) => {
  return (
    <ul>
      {blocks.map((block, index) => (
        <EditorBlockItem
          key={`item-${block._id}`}
          index={index}
          block={block}
        />
      ))}
    </ul>
  );
});

export default EditorRecipeBlockList;
