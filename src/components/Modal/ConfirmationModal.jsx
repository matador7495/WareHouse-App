import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsQuery } from "services/productsQuery";

import notifications from "utils/toastNotifications";
import styles from "./ConfirmationModal.module.css";

function ConfirmationModal({ onClose, productId }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: productsQuery.deleteProduct,
    onSuccess: () => {
      notifications("DELETE");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
    },
    onError: (error) => {
      notifications("ERROR", error);
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
