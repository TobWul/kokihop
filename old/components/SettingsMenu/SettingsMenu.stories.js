import React from "react";
import { action } from "@storybook/addon-actions";

// Addons
import { withKnobs, boolean, number, date, text } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import SettingsMenu from "./SettingsMenu";

export default {
  title: "Settings Menu",
  component: SettingsMenu,
  decorators: [withA11y, withKnobs],
};

export const Categories = () => (
  <SettingsMenu
    editPage={action("Opening edit page")}
    url={text("url", "https://nrk.no")}
    newPage={action("Create new page")}
    openSettings={action("Opening settings")}
    savedCount={number("Copied count", 0)}
    prevUpdate={date("Last update", new Date())}
  />
);
