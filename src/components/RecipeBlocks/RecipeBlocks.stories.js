import React from "react";

// Addons
import { withA11y } from "@storybook/addon-a11y";
import RecipeBlockWrapper from "./RecipeBlockWrapper";
import RecipeBlockList from "../RecipeBlockList/RecipeBlockList";
import { action } from "@storybook/addon-actions";

export default {
  title: "Recipe Blocks",
  component: RecipeBlockWrapper,
  decorators: [withA11y],
};

const ingredientBlockData = {
  type: "ingredients",
  value: ["Gulrot", "Potet", "Løk"],
};
const textBlockData = {
  type: "text",
  value: "En litt lengre tekst som passer fint den lange boksen med greier",
};

const titleBlockData = {
  type: "title",
  value: "Surdeig",
};

const imageBlockData = {
  type: "image",
  value: {
    src:
      "https://images.pexels.com/photos/600620/pexels-photo-600620.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    alt: "Mat",
  },
};

const blocks = [
  titleBlockData,
  textBlockData,
  ingredientBlockData,
  imageBlockData,
];

export const List = () => (
  <div style={{ maxWidth: 768 }}>
    <RecipeBlockList
      blocks={blocks}
      updateBlockValue={action("Updating data")}
    />
  </div>
);

// export const TextBlock = () => <RecipeBlockWrapper />;
// export const TitleBlock = () => <RecipeBlockWrapper />;
// export const ImageBlock = () => <RecipeBlockWrapper />;
export const IngredientsBlock = () => (
  <RecipeBlockWrapper
    block={ingredientBlockData}
    updateBlockValue={action("Updating block data")}
  />
);
