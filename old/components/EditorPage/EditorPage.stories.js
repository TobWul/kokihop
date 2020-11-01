import React from "react";
import { action } from "@storybook/addon-actions";

// Addons
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { allIcons } from "../../stories/helpers.stories";
import Editor from "./Editor";

export default {
  title: "Editor",
  component: Editor,
  decorators: [withA11y, withKnobs],
};

export const RecipeEditor = () => <Editor />;
