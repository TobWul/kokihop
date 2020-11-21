import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { Heading3 } from "../../DS/Typography/Typography";
import styles from "./CategoryCard.module.scss";
import arrayMove from "array-move";
import DragHandle from "../DragHandle/DragHandle";

const CategoryCard = ({ name, recipes, changeOrder, id }) => {
  const SortableItem = SortableElement(({ value }) => (
    <li className={styles.listItem}>
      {value}
      <DragHandle />
    </li>
  ));
  const SortableList = SortableContainer(({ items }) => {
    return (
      <ul>
        {items &&
          items.map(
            (recipe, index) =>
              recipe && (
                <SortableItem
                  key={`item-${recipe.id}`}
                  index={index}
                  value={recipe.title}
                />
              )
          )}
      </ul>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      changeOrder(arrayMove(recipes, oldIndex, newIndex), id);
    }
  };

  return (
    <div className={styles.card} key={name}>
      <Heading3>{name}</Heading3>
      <SortableList items={recipes} onSortEnd={onSortEnd} useDragHandle />
    </div>
  );
};

export default CategoryCard;
