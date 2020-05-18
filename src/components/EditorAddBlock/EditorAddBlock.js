import React, { useState } from "react";
import MenuCard from "../MenuCard/MenuCard";
import AddBlockButton from "./AddBlockButton";
import styles from "./EditorAddBlock.module.scss";
import RoundButton from "../Button/RoundButton";
import { cn } from "../../lib/helpers";

const EditorAddBlock = ({ addBlock: editorAddBlock }) => {
  const [showMenu, setShowMenu] = useState(false);
  const addBlock = (type) => {
    editorAddBlock(type);
    setShowMenu(false);
  };
  const clickOutsideHandler = () => {
    setShowMenu(false);
  };
  return (
    <div className={styles.wrapper}>
      <MenuCard
        className={cn(styles.menu, showMenu && styles.show)}
        clickOutsideHandler={clickOutsideHandler}
      >
        <AddBlockButton
          name="Undertittel"
          icon="title"
          addBlock={() => addBlock("title")}
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
          disabled
          addBlock={() => addBlock("image")}
        />
      </MenuCard>
      <RoundButton icon="add" onClick={() => setShowMenu(!showMenu)} />
    </div>
  );
};

export default EditorAddBlock;
