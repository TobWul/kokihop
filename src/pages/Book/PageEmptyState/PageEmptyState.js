import React from "react";
import styles from "./PageEmptyState.module.scss";

const MiniatureAddIcon = () => (
  <svg width="26" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="13" r="13" fill="#1E2D48" />
    <path
      d="M13 7.583v10.834M18.417 13H7.583"
      stroke="#fff"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const PageEmptyState = () => {
  return (
    <div className={styles.pageEmptyState}>
      <div className={styles.text}>
        <span>Trykk på </span>
        <MiniatureAddIcon />
        <span> for å lage en ny oppskrift</span>
      </div>
    </div>
  );
};

export default PageEmptyState;
