import { useQuery } from "@tanstack/react-query";
import { productsQuery } from "services/productsQuery";

import styles from "./ProductTable.module.css";

function ProductTable() {
  const { data: products } = useQuery({ queryKey: ["products"], queryFn: productsQuery.getProducts });

  return (
    <div className={styles.products_container}>
      <div className={styles.products_navbar}>
        <div className={styles.search_box}>
          <img src="search.svg" alt="search" />
          <input type="text" placeholder="جستجو کالا" />
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
        <button>افزودن محصول</button>
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
                <img src="edit.svg" alt="ویرایش" style={{ marginLeft: "14px" }} />
                <img src="trash.svg" alt="حذف" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
