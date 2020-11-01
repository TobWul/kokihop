import React from "react";
import { action } from "@storybook/addon-actions";
import Button from "./Button";
import RoundButton from "./RoundButton";
import iconLibrary from "../Icon/iconlibrary";

// Addons
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { allIcons } from "../../stories/helpers.stories";

export default {
  title: "Button",
  component: Button,
  decorators: [withA11y, withKnobs],
};

export const Primary = () => (
  <Button onClick={action("clicked")}>
    {text("Buttont text", "Ny oppskrift")}
  </Button>
);
export const Secondary = () => (
  <Button onClick={action("clicked")} secondary>
    {text("Buttont text", "Ny oppskrift")}
  </Button>
);
export const PrimaryRoundButton = () => (
  <RoundButton
    onClick={action("clicked")}
    icon={select("icons", allIcons, "add")}
  />
);
