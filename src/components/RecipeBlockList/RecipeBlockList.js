import React, { useState } from "react";
import PropTypes from "prop-types";
import arrayMove from "array-move";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import RecipeBlockWrapper from "../RecipeBlocks/RecipeBlockWrapper";

const RecipeBlockList = (props) => {
  const [blocks, setBlocks] = useState(props.blocks);
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setBlocks(arrayMove(blocks, oldIndex, newIndex));
  };
  return (
    <div>
      <BlockContainer
        blocks={blocks}
        onSortEnd={onSortEnd}
        useDragHandle
        updateBlockValue={props.updateBlockValue}
      />
    </div>
  );
};
const BlockItem = sortableElement(({ block, updateBlockValue }) => (
  <RecipeBlockWrapper block={block} updateBlockValue={updateBlockValue} />
));

const BlockContainer = sortableContainer(({ blocks, updateBlockValue }) => {
  return (
    <ul>
      {blocks.map((block, index) => (
        <BlockItem
          key={`item-${index}`}
          index={index}
          block={block}
          updateBlockValue={updateBlockValue}
        />
      ))}
    </ul>
  );
});

export default RecipeBlockList;
