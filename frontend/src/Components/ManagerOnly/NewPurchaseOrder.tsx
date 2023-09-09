import React from "react";
import styles from "./NewPurchaseOrder.module.css";

export const NewPurchaseOrder: React.FC = () => {
  return (
    <div className={styles.purchaseOrderPage}>
      <div className={styles.purchaseOrderBox}>
        <h1 className={styles.boxHeader}>New Purchase Order</h1>
        <div className={styles.orderDetails}>
          <div className={`${styles.orderDetailsInput} ${styles.left}`}>
            <div className={styles.labelInput}>
              <label>Purchase Order No.:</label>
              <input placeholder="Purchase Order No."></input>
            </div>
            <div className={styles.labelInput}>
              <label>Order Placed By:</label>
              <input
                id="date"
                type="date"
                placeholder="Order Date"
                defaultValue={new Date().toISOString().split("T")[0]}
              ></input>
            </div>
            <div className={styles.labelInput}>
              <label>Date of Purchase Order:</label>
              <input placeholder="input"></input>
            </div>
          </div>
        </div>
        <div className={styles.orderInput}>
          <div className={styles.columnHeaders}>
            <p>Product ID</p>
            <p>Product Description</p>
            <p>Quantity</p>
            <p>Unit Of Measurement</p>
            <p>Supplier</p>
            <p>Lead Time</p>
          </div>
          <div className={styles.columnInputs}>
            <input placeholder="Product ID"></input>
            <input placeholder="Product Description"></input>
            <input placeholder="Quantity"></input>
            <select
              className={styles.select}
              id="uom"
              name="Unit of Measurement"
            >
              <option value="CTN">CTN</option>
              <option value="BOX">BOX</option>
              <option value="EA">EA</option>
            </select>
            <input placeholder="Supplier"></input>
            <input placeholder="Lead Time"></input>
          </div>
        </div>
        <button className={styles.submitButton}>Submit Purchase Order</button>
      </div>
    </div>
  );
};
