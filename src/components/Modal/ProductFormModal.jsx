import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsQuery } from "services/productsQuery";
import useFormFields from "hooks/useFormFields";
import { Modal } from "./Modal";

import styles from "./ProductFormModal.module.css";

function ProductFormModal({ isOpen, onClose }) {
  const queryClient = useQueryClient();

  const [formData, handleChange] = useFormFields({
    name: "",
    quantity: 0,
    price: 0,
  });

  const { name, quantity, price } = formData;

  const { mutate } = useMutation({
    mutationFn: productsQuery.createProduct,
    onSuccess: () => {
      console.log("success");
      onClose();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !quantity || !price) return;

    const dataToSubmit = {
      name: name,
      quantity: Number(quantity) || 0,
      price: Number(price) || 0,
    };

    mutate(dataToSubmit);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} onChange={handleChange} className={styles.product_form}>
        <h3>ایجاد محصول جدید</h3>
        <div className={styles.form_fields}>
          <label htmlFor="name">نام کالا</label>
          <input type="text" name="name" placeholder="نام کالا را وارد کنید" />

          <label htmlFor="quantity">تعداد موجودی</label>
          <input type="number" name="quantity" min="0" placeholder="تعداد موجودی را وارد کنید" />

          <label htmlFor="price">قیمت</label>
          <input type="number" name="price" min="0" placeholder="قیمت را وارد کنید" />
        </div>
        <div className={styles.form_buttons}>
          <button type="submit">ایجاد</button>
          <button type="button" onClick={onClose}>
            انصراف
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ProductFormModal;
