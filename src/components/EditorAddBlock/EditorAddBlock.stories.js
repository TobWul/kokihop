import React from "react";
import { action } from "@storybook/addon-actions";

// Addons
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import EditorAddBlock from "./EditorAddBlock";
import AddBlockButton from "./AddBlockButton";
import { allIcons } from "../../stories/helpers.stories";

export default {
  title: "Editor Add Block",
  component: EditorAddBlock,
  decorators: [withA11y, withKnobs],
};

export const Menu = () => <EditorAddBlock addBlock={action("Add block")} />;
export const MenuItem = () => (
  <AddBlockButton
    name={text("Item name", "Undertittel")}
    icon={select("Item icon", allIcons, "title")}
    addBlock={action("Add block")}
  />
);
