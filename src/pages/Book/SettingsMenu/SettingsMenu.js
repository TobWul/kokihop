import React, { useState, useRef, useContext } from "react";
import SettingsItem from "./SettingsItem";
import CopiedLinkToast from "./CopiedLinkToast";
import styles from "./SettingsMenu.module.scss";
import { RecipeContext } from "../../../context/recipeContext";
import { getTimestamp } from "../../../lib/dateHandling";
import { cn } from "../../../lib/helpers";
import RoundButton from "../../../components/DS/Button/RoundButton";
import MenuCard from "../MenuCard/MenuCard";
import { useHistory } from "react-router-dom";

const SettingsMenu = ({ savedCount, prevUpdate }) => {
  const { recipeId, categoryId } = useContext(RecipeContext);
  const [copied, setCopied] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const history = useHistory();

  const copyRef = useRef(null);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  const copy = () => {
    copyRef.current.select();
    copyRef.current.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const deleteRecipe = () => {
    //TODO: Add gql mutation
    console.log("Deleting recipe...");
  };

  if (!(prevUpdate instanceof Date)) {
    prevUpdate = new Date(prevUpdate);
  }
  return (
    <>
      <RoundButton icon="menu" onClick={toggleMenu} fab="top right" />

      <div className={cn(styles.settingsMenuWrapper, isOpen && styles.isOpen)}>
        <MenuCard clickOutsideHandler={() => setOpen(false)}>
          <SettingsItem
            name="Rediger oppskrift"
            icon="edit"
            onClick={() => history.push(`/rediger-oppskrift/${recipeId}`)}
          />
          <SettingsItem
            name="Slett oppskrift"
            icon="delete"
            onClick={() => deleteRecipe(recipeId, categoryId)}
          />
          <SettingsItem name="Kopier linken" icon="hyperlink" onClick={copy} />
          {savedCount > 0 && <p>{savedCount} har lagret denn oppskriften</p>}
          <p>Sist endret: {getTimestamp(prevUpdate)}</p>
          <label htmlFor="copy" className={styles.copyInput}>
            Hidden copy element
          </label>
          <input
            id="copy"
            type="text"
            ref={copyRef}
            value={`http://localhost:3000/oppskrift/${recipeId}`}
            readOnly
            className={styles.copyInput}
          />
        </MenuCard>
        <CopiedLinkToast show={copied} />
      </div>
    </>
  );
};

export default SettingsMenu;