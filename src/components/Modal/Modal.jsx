import styles from "./Modal.module.css";

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal_backdrop}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
}
export default Modal;
