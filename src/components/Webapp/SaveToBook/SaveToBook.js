import React from "react";
import Button from "../../DS/Button/Button";
import { Subtitle2 } from "../../DS/Typography/Typography";
import styles from "./SaveToBook.module.scss";

const SaveToBook = () => {
  const save = () => {
    console.log("save");
  };
  return (
    <div className={styles.wrapper}>
      <Subtitle2>Lagre denne oppskriften i din bok:</Subtitle2>
      <Button onClick={save}>Lagre</Button>
    </div>
  );
};

export default SaveToBook;
