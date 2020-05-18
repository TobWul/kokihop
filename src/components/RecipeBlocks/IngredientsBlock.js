import React from "react";
import PropTypes from "prop-types";

const IngredientsList = ({ block }) => {
  const { value } = block;
  return (
    <ul>
      {value.map((ingredient, index) => (
        <li key={`ingredient-${index}`}>{ingredient}</li>
      ))}
    </ul>
  );
};

export default IngredientsList;
