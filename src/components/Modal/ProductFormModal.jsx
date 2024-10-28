import { useProductForm } from "hooks/useProductForm";

import styles from "./ProductFormModal.module.css";

function ProductFormModal({ productId, onClose }) {
  const { formData, handleChange, handleSubmit, isEditMode } = useProductForm(productId, onClose);

  return (
    <form onSubmit={handleSubmit} className={styles.product_form}>
      <h3>{isEditMode ? "ویرایش محصول" : "ایجاد محصول جدید"}</h3>

      <div className={styles.form_fields}>
        <label htmlFor="name">نام کالا</label>
        <input type="text" name="name" placeholder="نام کالا را وارد کنید" value={formData.name} onChange={handleChange} />

        <label htmlFor="quantity">تعداد موجودی</label>
        <input type="number" name="quantity" min="0" placeholder="تعداد موجودی را وارد کنید" value={formData.quantity} onChange={handleChange} />

        <label htmlFor="price">قیمت</label>
        <input type="number" name="price" min="0" placeholder="قیمت را وارد کنید" value={formData.price} onChange={handleChange} />
      </div>

      <div className={styles.form_buttons}>
        <button type="submit">{isEditMode ? "ویرایش" : "ایجاد"}</button>
        <button type="button" onClick={onClose}>
          انصراف
        </button>
      </div>
    </form>
  );
}

export default ProductFormModal;
