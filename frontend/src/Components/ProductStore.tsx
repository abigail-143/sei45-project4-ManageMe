import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductStore.module.css";
import { useFetch } from "../hooks/useFetch";
import UserContext from "../context/user";

export const ProductStore: React.FC = () => {
  const fetchData = useFetch();
  const context = useContext(UserContext);
  const [storeProduct, setStoreProduct] = useState<
    {
      store_id: number;
      store_quantity: number;
      product_id: string;
      product_description: string;
      unit_of_measurement: string;
      piece_per_uom: number;
      in_use: boolean;
    }[]
  >([]);

  const pullStoreProducts = async () => {
    const res = await fetchData(
      "/store/all",
      "GET",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("all store products ok");
      console.log(res.data);
      setStoreProduct(res.data);
    } else {
      console.log("all store products error");
      console.log(res.data);
    }
  };

  useEffect(() => {
    pullStoreProducts();
  }, []);

  return (
    <div className={styles.storeProductsPage}>
      <div className={styles.firstRow}>
        <div className={styles.addForm}>
          <h1 className={styles.formTitle}>Add New Product To Store</h1>
          <div className={styles.formInput}>
            <label className={styles.label}>Product ID:</label>
            <input className={styles.input} placeholder="input"></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Quantity</label>
            <input className={styles.input} placeholder="input"></input>
          </div>
          <button className={styles.addBtn}>Add To Store</button>
        </div>
      </div>
      <div className={styles.secondRow}>
        <div className={styles.productList}>
          <h2 className={styles.listTitle}>Store Products</h2>
          <div className={styles.listHeaders}>
            <div className={styles.listRows}>
              <p className={`${styles.headerInput} ${styles.first}`}>
                Product ID
              </p>
              <p className={`${styles.headerInput} ${styles.middle}`}>
                Product Description
              </p>
              <p className={`${styles.headerInput} ${styles.middle}`}>UOM</p>
              <p className={`${styles.headerInput} ${styles.middle}`}>
                Piece per UOM
              </p>
              <p className={`${styles.headerInput} ${styles.last}`}>In Use</p>
            </div>
          </div>
          <div className={styles.listBody}>
            {storeProduct.map((item, index) => {
              return (
                <div key={index} className={styles.listRows}>
                  <p className={`${styles.bodyInput} ${styles.first}`}>
                    {item.product_id}
                  </p>
                  <p className={`${styles.bodyInput} ${styles.middle}`}>
                    {item.product_description}
                  </p>
                  <p className={`${styles.bodyInput} ${styles.middle}`}>
                    {item.unit_of_measurement}{" "}
                  </p>
                  <p className={`${styles.bodyInput} ${styles.middle}`}>
                    {item.piece_per_uom}
                  </p>
                  <p className={`${styles.bodyInput} ${styles.last}`}>
                    {item.in_use ? "in use" : "not in use"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
