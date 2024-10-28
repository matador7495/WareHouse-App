import styles from "./Modal.module.css";

export function Modal({ children }) {
  return (
    <div className={styles.modal_backdrop}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
}
