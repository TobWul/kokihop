import React from "react";
import PropTypes from "prop-types";
import EditorTextBlock from "../EditorBlocks/EditorTextBlock";
import EditorImageBlock from "../EditorBlocks/EditorImageBlock";
import EditorIngredientsBlock from "../EditorBlocks/EditorIngredientsBlock";
import Icon from "../Icon/Icon";
import styles from "./EditorRecipeBlock.module.scss";
import DragHandle from "../DragHandle/DragHandle";
import { cn } from "../../lib/helpers";
import EditorTitleBlock from "../EditorBlocks/EditorTitleBlock";

const EditorRecipeBlockWrapper = ({
  block,
  updateBlockValue,
  deleteBlock,
  moving,
}) => {
  const blockProps = {
    block,
    updateBlockValue,
    moving,
  };
  const serializer = {
    title: <EditorTitleBlock {...blockProps} />,
    text: <EditorTextBlock {...blockProps} />,
    image: <EditorImageBlock {...blockProps} />,
    ingredients: <EditorIngredientsBlock {...blockProps} />,
  };

  const isImage = block.type === "image";

  return (
    <li className={styles.blockWrapper}>
      <button
        className={styles.delete}
        aria-label="Delete block"
        onClick={() => deleteBlock(block.id)}
      >
        <Icon icon="delete" />
      </button>
      <div className={cn(styles.innerWrapper, isImage && styles.isImage)}>
        {serializer[block.type]}
      </div>
      <DragHandle />
    </li>
  );
};

export default EditorRecipeBlockWrapper;
