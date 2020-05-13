import React from "react";
import PropTypes from "prop-types";
import TextBlock from "./BlockTypes/TextBlock";
import ImageBlock from "./BlockTypes/ImageBlock";
import IngredientsBlock from "./BlockTypes/IngredientsBlock";
import Icon from "../Icon/Icon";
import styles from "./RecipeBlock.module.scss";
import DragHandle from "../DragHandle/DragHandle";
import { cn } from "../../lib/helpers";

const RecipeBlockWrapper = ({ block, updateBlockValue }) => {
  const blockProps = {
    block,
    updateBlockValue,
  };
  const serializer = {
    title: <TextBlock {...blockProps} />,
    text: <TextBlock {...blockProps} />,
    image: <ImageBlock {...blockProps} />,
    ingredients: <IngredientsBlock {...blockProps} />,
  };

  const isImage = block.type === "image";

  return (
    <div className={styles.blockWrapper}>
      <button className={styles.delete}>
        <Icon icon="delete" />
      </button>
      <div className={cn(styles.innerWrapper, isImage && styles.isImage)}>
        {serializer[block.type]}
      </div>
      <DragHandle />
    </div>
  );
};

export default RecipeBlockWrapper;
