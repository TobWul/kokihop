import React from "react";

// Addons
import { withA11y } from "@storybook/addon-a11y";
import MenuCard from "./MenuCard";

export default {
  title: "MenuCard",
  component: MenuCard,
  decorators: [withA11y],
};

export const Categories = () => <MenuCard />;
