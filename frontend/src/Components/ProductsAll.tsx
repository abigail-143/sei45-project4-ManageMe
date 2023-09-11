import React from "react";
import styles from "./ProductsAll.module.css";

export const ProductsAll: React.FC = () => {
  return (
    <div className={styles.allProductsPage}>
      <div className={styles.firstRow}>
        <div className={styles.addForm}>
          <h1 className={styles.formTitle}>Add New Product</h1>
          <div className={styles.formInput}>
            <label className={styles.label}>Product ID:</label>
            <input className={styles.input} placeholder="input"></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Product Description:</label>
            <input className={styles.input} placeholder="input"></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Unit Of Measurement:</label>
            <select
              className={styles.inputSelect}
              id="uom"
              name="Unit of Measurement"
            >
              <option value="CTN">CTN</option>
              <option value="BOX">BOX</option>
              <option value="EA">EA</option>
            </select>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Piece Per UOM:</label>
            <input className={styles.input} placeholder="input"></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Cost Per UOM:</label>
            <input className={styles.input} placeholder="input"></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Supplier:</label>
            <input className={styles.input} placeholder="input"></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Supplier Leadtime:</label>
            <input className={styles.input} placeholder="input"></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>In Use:</label>
            <select className={styles.inputSelect} id="inUse" name="in use">
              <option value="true">In Use</option>
              <option value="false">Not In Use</option>
            </select>
          </div>
          <button className={styles.addBtn}>Add New Product</button>
        </div>
      </div>
      <div className={styles.secondRow}>
        <div className={styles.productList}>
          <h2 className={styles.listTitle}>All Products</h2>
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
              <p className={`${styles.headerInput} ${styles.middle}`}>
                Cost per UOM
              </p>
              <p className={`${styles.headerInput} ${styles.middle}`}>
                Supplier
              </p>
              <p className={`${styles.headerInput} ${styles.middle}`}>
                Supplier Leadtime
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
              <p className={`${styles.bodyInput} ${styles.middle}`}>
                Cost per UOM
              </p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>Supplier</p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>
                Supplier Leadtime
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
              <p className={`${styles.bodyInput} ${styles.middle}`}>
                Cost per UOM
              </p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>Supplier</p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>
                Supplier Leadtime
              </p>
              <p className={`${styles.bodyInput} ${styles.last}`}>In Use</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
