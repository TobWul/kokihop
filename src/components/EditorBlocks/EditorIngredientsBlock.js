import React, { useEffect, useState } from "react";
import Icon from "../Icon/Icon";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import DragHandle from "../DragHandle/DragHandle";
import styles from "./EditorBlocks.module.scss";
import { mongoObjectId } from "../../lib/helpers";

const EditorIngredientItem = SortableElement(
  ({ item, ingredientIndex, updateItem, removeItem }) => (
    <li className={styles.ingredientItem}>
      <DragHandle />
      <input
        onChange={(e) => updateItem(e, ingredientIndex)}
        value={item.value}
        placeholder="Skriv inn ingrediens..."
        className={styles.ingredientInput}
        aria-label="Ny ingrediens"
      />
      <button
        onClick={() => removeItem(ingredientIndex)}
        aria-label="Remove ingredient"
      >
        <Icon icon="close" />
      </button>
    </li>
  )
);

const EditorIngredientContainer = SortableContainer(
  ({ items, addIngredient, updateItem, removeItem }) => {
    return (
      <ul>
        {items.map((item, index) => (
          <EditorIngredientItem
            key={item._id}
            index={index}
            ingredientIndex={index}
            item={item}
            updateItem={updateItem}
            removeItem={removeItem}
          />
        ))}

        <li className={styles.addIngredient}>
          <button onClick={addIngredient} aria-label="Add ingredient">
            <Icon icon="addCircle" />
            Ny ingrediens
          </button>
        </li>
      </ul>
    );
  }
);

const EditorIngredientsBlock = ({ block, updateBlockValue }) => {
  const [ingredients, setIngredients] = useState(block.value);
  useEffect(() => {
    const addIngredientOnKeyDown = (e) => {
      if (
        e.which === 13 &&
        e.target.className.includes(styles.ingredientInput)
      ) {
        addIngredient();
      } else if (
        e.which === 8 &&
        e.target.value &&
        e.target.value.length <= 0
      ) {
        const itemToBeRemovedIndex = [
          ...e.target.parentElement.parentElement.children,
        ].indexOf(e.target.parentElement);
        removeItem(itemToBeRemovedIndex);
      }
    };
    document.addEventListener("keydown", addIngredientOnKeyDown);
    return () =>
      document.removeEventListener("keydown", addIngredientOnKeyDown);
  }, []);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newIngredientstOrder = arrayMove(block.value, oldIndex, newIndex);
      setIngredients(newIngredientstOrder);
      updateBlockValue(block._id, newIngredientstOrder);
    }
  };

  const removeItem = (index) => {
    const updatedIngredientsList = [...block.value];
    updatedIngredientsList.splice(index, 1);
    setIngredients(updatedIngredientsList);
    updateBlockValue(block._id, updatedIngredientsList);
  };

  const updateItem = (e, index) => {
    const updatedIngredientsList = [...block.value];
    updatedIngredientsList[index].value = e.target.value;
    setIngredients(updatedIngredientsList);
    updateBlockValue(block._id, updatedIngredientsList);
  };

  const addIngredient = () => {
    // if (!block.value.some((ingredient) => ingredient.length === 0)) {
    const newList = [...block.value, { _id: mongoObjectId(), value: "" }];
    setIngredients(newList);
    updateBlockValue(block._id, newList);
    setTimeout(() => {
      const allIngredients = [
        ...document.getElementsByClassName(styles.ingredientInput),
      ];
      allIngredients[allIngredients.length - 1].focus();
    }, 5);
    // }
  };

  return (
    <div className={styles.ingredientsBlock}>
      <EditorIngredientContainer
        onSortEnd={onSortEnd}
        items={ingredients}
        updateItem={updateItem}
        removeItem={removeItem}
        addIngredient={addIngredient}
        useDragHandle
        lockAxis="y"
        lockToContainerEdges
      />
    </div>
  );
};

export default EditorIngredientsBlock;
