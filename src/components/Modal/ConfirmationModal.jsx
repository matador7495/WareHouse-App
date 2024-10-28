import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsQuery } from "services/productsQuery";

import styles from "./ConfirmationModal.module.css";

function ConfirmationModal({ onClose, productId }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: productsQuery.deleteProduct,
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    productId && mutate(productId);
  };

  return (
    <form className={styles.confirmation_modal} onSubmit={handleSubmit}>
      <img src="delete.svg" alt="delete icon" />
      <p>آیا از حذف این محصول مطمئنید؟</p>
      <div>
        <button type="submit">حذف</button>
        <button type="button" onClick={onClose}>
          لغو
        </button>
      </div>
    </form>
  );
}

export default ConfirmationModal;
