import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsQuery } from "services/productsQuery";

import notifications from "utils/toastNotifications";
import styles from "./ConfirmationModal.module.css";

function ConfirmationModal({ onClose, productId, setSearch, setPagination }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: productsQuery.deleteProduct,
    onSuccess: (data) => {
      notifications("DELETE");
      if (data.statusText === "No Content") {
        setSearch("");
        setPagination(1);
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });

      onClose();
    },
    onError: (error) => {      
      if (error.response.statusText === "Unauthorized") {
        notifications("error", "شما مجوز حذف این محصول را ندارید - \n مجددا وارد شوید!");
      } else {
        notifications("ERROR", error);
      }
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
