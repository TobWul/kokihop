import React from "react";
import styles from "./Paginator.module.scss";
import Icon from "../../../components/DS/Icon/Icon";

const Paginator = ({ currentPage, bookLength, nextPage, prevPage }) => {
  return (
    <div className={styles.paginator}>
      <div className={styles.innerWrapper}>
        {/* <button onClick={prevPage}>
          <Icon icon="chevron_left" strokeWidth={2} />
        </button> */}
        <span>
          Side {currentPage + 1} av {bookLength}
        </span>
        {/* <button onClick={nextPage}>
          <Icon icon="chevron_right" strokeWidth={2} />
        </button> */}
      </div>
      <div
        className={styles.progress}
        style={{
          transform: `scaleX(${(currentPage + 1) / bookLength})`,
        }}
      />
    </div>
  );
};

export default Paginator;
