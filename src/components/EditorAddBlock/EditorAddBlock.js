import React from "react";
import PropTypes from "prop-types";
import MenuCard from "../MenuCard/MenuCard";
import AddBlockButton from "./AddBlockButton";
import styles from "./EditorAddBlock.module.scss";

const EditorAddBlock = ({ addBlock }) => {
  return (
    <MenuCard className={styles.menu}>
      <AddBlockButton
        name="Undertittel"
        icon="title"
        addBlock={() => addBlock("subtitle")}
      />
      <AddBlockButton
        name="Tekst"
        icon="text"
        addBlock={() => addBlock("text")}
      />
      <AddBlockButton
        name="Ingredienser"
        icon="ingredients"
        addBlock={() => addBlock("ingredients")}
      />
      <AddBlockButton
        name="Bilde"
        icon="image"
        addBlock={() => addBlock("image")}
      />
    </MenuCard>
  );
};

export default EditorAddBlock;
