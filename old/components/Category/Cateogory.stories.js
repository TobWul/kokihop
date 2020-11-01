import React from "react";
import { action } from "@storybook/addon-actions";

// Addons
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import CategoryComponent from "./Categories";

export default {
  title: "Categories",
  component: CategoryComponent,
  decorators: [withA11y, withKnobs],
};

const sampleData = [
  {
    id: "321jdfh2131",
    name: "Brød",
  },
  {
    id: "321jdkdos131",
    name: "Middag",
  },
];

export const Categories = () => (
  <CategoryComponent
    categories={sampleData}
    changeCategory={action("Changing category")}
    selectedCategory={sampleData[0]}
    addCategory={action("Adding category")}
  />
);
