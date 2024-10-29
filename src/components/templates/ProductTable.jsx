import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { productsQuery } from "services/productsQuery";
import useDebounce from "hooks/useDebounce";
import { e2p, sp } from "utils/replaceNumber";
import { Modal } from "components/Modal/Modal";
import ProductFormModal from "components/Modal/ProductFormModal";
import ConfirmationModal from "components/Modal/ConfirmationModal";

import Loader from "components/modules/Loader";
import styles from "./ProductTable.module.css";

function ProductTable() {
  const paginationButtons = [];
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState(1);
  const [modalState, setModalState] = useState({ isOpen: false, type: null, productId: null });

  const debouncedSearch = useDebounce(search, 300);

  const parameters = {
    name: debouncedSearch || undefined,
    page: pagination || undefined,
  };

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", debouncedSearch, pagination],
    queryFn: () => productsQuery.getProducts(parameters),
  });

  for (let i = 1; i <= products?.data.totalPages; i++) {
    paginationButtons.push(
      <button key={i} onClick={() => setPagination(i)} className={products?.data.page === i ? styles.active : ""}>
        {e2p(i)}
      </button>
    );
  }

  const openModalHandler = (type, id) => {
    setModalState({ isOpen: true, type, productId: id });
  };
  const closeModalHandler = () => {
    setModalState({ isOpen: false, type: null, productId: null });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    event.target.value.length > 2 && setPagination(1);
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
            <input type="text" placeholder="جستجو کالا" value={search} onChange={handleSearchChange} />
          </div>
          <div className={styles.profile_info}>
            <img src="profile.jpg" alt="profile" />
            <div>
              <p>میلاد عظمی</p>
              <span>مدیر</span>
            </div>
          </div>
        </div>

        <p className={styles.search_error}>{search && search.length < 3 ? "* لطفاً حداقل ۳ کاراکتر وارد کنید." : ""}</p>

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
            {isLoading ? (
              <tr>
                <td colSpan="6">
                  <Loader />
                </td>
              </tr>
            ) : products?.data.data.length ? (
              products.data.data.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{sp(product.quantity)}</td>
                  <td>{sp(product.price)} تومان</td>
                  <td colSpan="2">{e2p(product.id)}</td>
                  <td>
                    <img src="edit.svg" alt="ویرایش" style={{ marginLeft: "14px" }} onClick={() => openModalHandler("edit", product.id)} />
                    <img src="trash.svg" alt="حذف" onClick={() => openModalHandler("delete", product.id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className={styles.no_products}>
                  محصولی یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>{paginationButtons}</div>
    </>
  );
}

export default ProductTable;
