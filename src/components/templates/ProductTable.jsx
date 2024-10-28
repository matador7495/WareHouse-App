import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { productsQuery } from "services/productsQuery";
import useDebounce from "hooks/useDebounce";
import { Modal } from "components/Modal/Modal";
import ProductFormModal from "components/Modal/ProductFormModal";
import ConfirmationModal from "components/Modal/ConfirmationModal";

import styles from "./ProductTable.module.css";

function ProductTable() {
  const [search, setSearch] = useState("");

  const [modalState, setModalState] = useState({ isOpen: false, type: null, productId: null });

  const debouncedSearch = useDebounce(search, 500);

  const { data: products } = useQuery({
    queryKey: ["products", debouncedSearch],
    queryFn: () => productsQuery.getProducts({ name: debouncedSearch || undefined }),
  });

  const openModalHandler = (type, id) => {
    setModalState({ isOpen: true, type, productId: id });
  };
  const closeModalHandler = () => {
    setModalState({ isOpen: false, type: null, productId: null });
  };

  return (
    <>
      {modalState.isOpen && (
        <Modal>
          {(modalState.type === "add" || modalState.type === "edit") && (
            <ProductFormModal onClose={closeModalHandler} productId={modalState.productId} />
          )}
          {modalState.type === "delete" && <ConfirmationModal onClose={closeModalHandler} productId={modalState.productId} />}
        </Modal>
      )}

      <div className={styles.products_container}>
        <div className={styles.products_navbar}>
          <div className={styles.search_box}>
            <img src="search.svg" alt="search" />
            <input type="text" placeholder="جستجو کالا" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className={styles.profile_info}>
            <img src="profile.jpg" alt="profile" />
            <div>
              <p>میلاد عظمی</p>
              <span>مدیر</span>
            </div>
          </div>
        </div>
        <div className={styles.products_header}>
          <div>
            <img src="setting.svg" alt="setting" />
            <span>مدیریت کالا</span>
          </div>
          <button onClick={() => openModalHandler("add")}>افزودن محصول</button>
        </div>
        <table className={styles.products_table}>
          <thead>
            <tr>
              <th>نام کالا</th>
              <th>موجودی</th>
              <th>قیمت</th>
              <th colSpan="2">شناسه کالا</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.data.data.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price} هزار تومان</td>
                <td colSpan="2">{product.id}</td>
                <td>
                  <img src="edit.svg" alt="ویرایش" style={{ marginLeft: "14px" }} onClick={() => openModalHandler("edit", product.id)} />
                  <img src="trash.svg" alt="حذف" onClick={() => openModalHandler("delete", product.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductTable;
