import React from "react";
import { cn } from "../../../lib/helpers";
import styles from "./Modal.module.scss";

const Modal = ({ isModalOpen, setModalOpen, children }) => {
  return (
    <>
      <div
        className={cn(isModalOpen ? styles.active : "", styles.scrim)}
        onClick={() => setModalOpen(false)}
      />
      <div className={cn(isModalOpen ? styles.open : "", styles.modal)}>
        {children}
      </div>
    </>
  );
};

export default Modal;
