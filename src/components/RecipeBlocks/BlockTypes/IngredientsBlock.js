import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Icon from "../../Icon/Icon";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { useState } from "react";
import DragHandle from "../../DragHandle/DragHandle";
import { DebounceInput } from "react-debounce-input";
import styles from "./BlockTypes.module.scss";

const IngredientItem = SortableElement(
  ({ value, ingredientIndex, removeItem, updateItem }) => (
    <li className={styles.ingredientItem}>
      <DragHandle />
      <DebounceInput
        minLength={1}
        debounceTimeout={200}
        onChange={(e) => updateItem(e, ingredientIndex)}
        value={value}
        placeholder="Skriv inn ingrediens..."
        className={styles.ingredientInput}
      />
      <button onClick={() => removeItem(ingredientIndex)}>
        <Icon icon="close" />
      </button>
    </li>
  )
);

const IngredientContainer = SortableContainer(
  ({ items, removeItem, updateItem, addIngredient }) => {
    return (
      <ul>
        {items.map((value, index) => (
          <IngredientItem
            key={`ingredient-${index}`}
            index={index}
            ingredientIndex={index}
            value={value}
            removeItem={removeItem}
            updateItem={updateItem}
          />
        ))}

        <li className={styles.addIngredient}>
          <button onClick={addIngredient}>
            <Icon icon="addCircle" />
            Ny ingrediens
          </button>
        </li>
      </ul>
    );
  }
);

const IngredientsBlock = ({ block, updateBlockValue }) => {
  const [ingredients, setIngredients] = useState(block.value);

  useEffect(() => {
    const addIngredientOnKeyUp = (e) => {
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
    document.addEventListener("keydown", addIngredientOnKeyUp);
    return () => document.removeEventListener("keydown", addIngredientOnKeyUp);
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newIngredientstOrder = arrayMove(ingredients, oldIndex, newIndex);
      setIngredients(newIngredientstOrder);
      updateBlockValue(newIngredientstOrder);
    }
  };

  const removeItem = (index) => {
    const updatedIngredientsList = [...ingredients];
    updatedIngredientsList.splice(index, 1);
    setIngredients(updatedIngredientsList);
    updateBlockValue(updatedIngredientsList);
  };

  const updateItem = (e, index) => {
    const updatedIngredientsList = [...ingredients];
    updatedIngredientsList[index] = e.target.value;
    updateBlockValue(updatedIngredientsList);
    setIngredients(updatedIngredientsList);
  };

  const addIngredient = () => {
    if (!ingredients.some((ingredient) => ingredient.length === 0)) {
      setIngredients([...ingredients, ""]);
      setTimeout(() => {
        const allIngredients = [
          ...document.getElementsByClassName(styles.ingredientInput),
        ];
        allIngredients[allIngredients.length - 1].focus();
      }, 5);
    }
  };

  return (
    <div className={styles.ingredientsBlock}>
      <IngredientContainer
        items={ingredients}
        onSortEnd={onSortEnd}
        removeItem={removeItem}
        updateItem={updateItem}
        addIngredient={addIngredient}
        useDragHandle
        lockAxis="y"
        lockToContainerEdges
      />
    </div>
  );
};

export default IngredientsBlock;
