import React, { useState, useContext } from "react";
import MenuCard from "../MenuCard/MenuCard";
import AddBlockButton from "./AddBlockButton";
import styles from "./EditorAddBlock.module.scss";
import RoundButton from "../Button/RoundButton";
import { cn, mongoObjectId } from "../../lib/helpers";
import { EditorContext } from "../../context/EditorContext";

const EditorAddBlock = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { addBlock: editorAddBlock } = useContext(EditorContext);
  const addBlock = (type, initialValue) => {
    editorAddBlock(type, initialValue);
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
          addBlock={() =>
            addBlock("ingredients", [{ _id: mongoObjectId(), value: "" }])
          }
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
