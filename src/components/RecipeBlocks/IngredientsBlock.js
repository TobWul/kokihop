import React from "react";
import PropTypes from "prop-types";

const IngredientsList = ({ block }) => {
  const { value } = block;
  return (
    <ul>
      {value.map((ingredient) => (
        <li key={ingredient._id}>{ingredient.value}</li>
      ))}
    </ul>
  );
};

export default IngredientsList;
