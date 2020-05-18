import React from "react";

// Addons
import { withA11y } from "@storybook/addon-a11y";
import EditorRecipeBlockWrapper from "../EditorRecipeBlockWrapper/EditorRecipeBlockWrapper";
import { action } from "@storybook/addon-actions";

export default {
  title: "Editor Recipe Blocks",
  component: EditorRecipeBlockWrapper,
  decorators: [withA11y],
};

const ingredientBlockData = {
  id: "fjdsklaøfjkldsøa",
  type: "ingredients",
  value: ["Gulrot", "Potet", "Løk"],
};
const textBlockData = {
  id: "fjdsklaøfjkldsøa",
  type: "text",
  value:
    "<p>Om morgenen: Gjør klar surdeigen. Nok til at det blir 127g. La det være 60g surdeig igjen, da blir det 180g surdeig, nok til å mate den på nytt.</p><p><b>Kl. 18:00:</b> Bland sammen hvetemel, rugmel og vann. La det stå én time.</p><p><b>Kl. 19:00:</b> Tøm 127g surdeig oppå deigen. Fordel den utover og begynn 5-8 min knaing. Slap &amp; fold har fungert veldig fint i det siste.</p><p><b>Kl. 19:30:</b> Bland inn 15g salt. Kna 5-8 min igjen. Nå burde deigen ha begynt å danne en god glutenstruktur. Test det med “window pane”-teknikken.</p><p><b>Kl. 20:00:</b> Brett deigen først fra venstre til høyre, topp til bunn, høyre til venstre og til slutt bunn til topp.</p><p><b>Kl. 20:30:</b> Del deigen i to deler. Ta den ene deigen og dra den utover til den blir veldig tynn og stor. Brett langsiden 1/3 inn i deigen. Brett så den andre langsiden over slik at de blir kant i kant. Brett kortsiden 1/3 3 ganger til man har en rull. Gjenta på den andre deigen. Legg dem i hver sin smurte form, dekk med plast og la stå til neste dag i et kjølig rom, 14-18 grader.</p><p>Neste dag</p><p><b>Kl. 07:00:</b> Strø mel utover kjøkkenbenken. Legg deigen på melet. Brett enden av deigen inn mot senter. Gjør dette rundt hele deigen til overflaten er stram. Gjør det samme med den andre. Legg hver deig i hver sin meldryssede hevekurv. Dekk til med plast og sett i kjøleskapet.</p><p>Ettermiddag: Ta et brød ut av kjøleskapet og skru ovnen på 225°C. Legg inn pizzastein og jernkasserolle i ovnen. Når ovnen er varm, legg brødet på pizzaspaden og “score” brødet. Sett inn i ovnen, legg kaserollen over brød. Timer på 25 min. Ta av kaserollen og stek 20 min til. Brød ferdig.</p><p>Neste morgen: Gjenta stekingen.</p>",
};

const titleBlockData = {
  id: "fjdsklaøfjkldsøa",
  type: "title",
  value: "Surdeig",
};

const imageBlockData = {
  id: "fjdsklaøfjkldsøa",
  type: "image",
  value: {
    src:
      "https://images.pexels.com/photos/600620/pexels-photo-600620.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    alt: "Mat",
  },
};

export const EditorIngredientsBlock = () => (
  <EditorRecipeBlockWrapper
    block={ingredientBlockData}
    updateBlockValue={action("Updating block data")}
    deleteBlock={action("Delete block")}
  />
);
export const EditorTextBlock = () => (
  <EditorRecipeBlockWrapper
    block={textBlockData}
    updateBlockValue={action("Updating block data")}
    deleteBlock={action("Delete block")}
  />
);
export const EditorTitleBlock = () => (
  <EditorRecipeBlockWrapper
    block={titleBlockData}
    updateBlockValue={action("Updating block data")}
    deleteBlock={action("Delete block")}
  />
);
export const EditorImageBlock = () => (
  <EditorRecipeBlockWrapper
    block={imageBlockData}
    updateBlockValue={action("Updating block data")}
    deleteBlock={action("Delete block")}
  />
);
