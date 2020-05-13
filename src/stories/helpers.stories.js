import iconLibrary from "../components/Icon/iconlibrary";
import { select } from "@storybook/addon-knobs";

export const allIcons = Object.keys(iconLibrary);

export const allIconsSelect = select("icons", allIcons);
