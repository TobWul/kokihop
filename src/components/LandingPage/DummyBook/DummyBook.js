import React from "react";
import { getMonthString } from "../../../lib/helpers";
import {
  Body1,
  Heading1,
  Heading4,
  Subtitle1,
} from "../../DS/Typography/Typography";
import styles from "./DummyBook.module.scss";

const DummyBook = ({ bookName }) => {
  return (
    <div className={styles.bookCover}>
      <div className={styles.label}>
        <Heading1>{bookName || "..."}</Heading1>
        <Body1>
          Startet {getMonthString()} {new Date().getFullYear()}
        </Body1>
      </div>
    </div>
  );
};

export default DummyBook;
