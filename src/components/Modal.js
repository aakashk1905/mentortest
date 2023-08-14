import React from "react";
import styles from "../styles/Modal.module.css";

const Modal = ({
  shown,
  children,
  closeHandler,
  hideClose,
  className,
  rounded,
}) => {
  return shown ? (
    <div
      className={`${styles.container} ${rounded ? styles.rounded : ""}`}
      // hidden={!shown}
      onClick={() => {
        closeHandler();
      }}
    >
      <div
        className={styles.module}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={className}>{children}</div>
        {hideClose ? "" : <button onClick={closeHandler}>Close</button>}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Modal;
