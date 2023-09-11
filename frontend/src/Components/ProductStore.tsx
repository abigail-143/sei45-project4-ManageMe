import React from "react";
import styles from "./ProductStore.module.css";

export const ProductStore: React.FC = () => {
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
            <div className={styles.listRows}>
              <p className={`${styles.bodyInput} ${styles.first}`}>
                Product ID
              </p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>
                Product Description
              </p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>UOM</p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>
                Piece per UOM
              </p>
              <p className={`${styles.bodyInput} ${styles.last}`}>In Use</p>
            </div>
            <div className={styles.listRows}>
              <p className={`${styles.bodyInput} ${styles.first}`}>
                Product ID
              </p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>
                Product Description
              </p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>UOM</p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>
                Piece per UOM
              </p>
              <p className={`${styles.bodyInput} ${styles.last}`}>In Use</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
