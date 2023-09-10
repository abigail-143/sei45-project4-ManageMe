import React from "react";
import styles from "./NewDeliveryOrder.module.css";

export const NewDeliveryOrder: React.FC = () => {

  return (
    <div className={styles.deliveryOrderPage}>
      <div className={styles.deliveryOrderBox}>
        <h1 className={styles.boxHeader}>New Store Delivery Order</h1>
        <div className={styles.orderDetails}>
          <div className={`${styles.orderDetailsInput} ${styles.left}`}>
            <div className={styles.labelDetails}>
              <label className={styles.labelOrder}>Delivery Order No.:</label>
              <input
                className={styles.inputOrder}
                placeholder="purchase order no."
              ></input>
            </div>
            <div className={styles.labelDetails}>
              <label className={styles.labelOrder}>Order Placed By:</label>
              <input
                className={styles.inputOrder}
                placeholder="username"
              ></input>
            </div>
            <div className={styles.labelDetails}>
              <label className={styles.labelOrder}>
                Date of Delivery Order:
              </label>
              <div className={styles.inputOrder}>
                <input
                  className={styles.date}
                  id="date"
                  type="date"
                  placeholder="Order Date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                ></input>
              </div>
            </div>
            <div className={styles.labelDetails}>
              <label className={styles.labelOrder}>
                Scheduled Delivery Date:
              </label>
              <div className={styles.inputOrder}>
                <input
                  className={styles.date}
                  id="date"
                  type="date"
                  placeholder="Order Date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                ></input>
              </div>
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
            <input
              className={`${styles.newInput} ${styles.first}`}
              placeholder="Product ID"
            ></input>
            <input
              className={`${styles.newInput} ${styles.middle}`}
              placeholder="Product Description"
            ></input>
            <input
              className={`${styles.newInput} ${styles.middle}`}
              placeholder="Quantity"
            ></input>
            <div className={`${styles.newInput} ${styles.middle}`}>
              <select
                className={`${styles.middle} ${styles.select}`}
                id="uom"
                name="Unit of Measurement"
              >
                <option value="CTN">CTN</option>
                <option value="BOX">BOX</option>
                <option value="EA">EA</option>
              </select>
            </div>

            <input
              className={`${styles.newInput} ${styles.middle}`}
              placeholder="Supplier"
            ></input>
            <input
              className={`${styles.newInput} ${styles.last}`}
              placeholder="Lead Time"
            ></input>
          </div>
          <div className={styles.columnInputs}>
            <input
              className={`${styles.newInput} ${styles.first}`}
              placeholder="Product ID"
            ></input>
            <input
              className={`${styles.newInput} ${styles.middle}`}
              placeholder="Product Description"
            ></input>
            <input
              className={`${styles.newInput} ${styles.middle}`}
              placeholder="Quantity"
            ></input>
            <div className={`${styles.newInput} ${styles.middle}`}>
              <select
                className={`${styles.middle} ${styles.select}`}
                id="uom"
                name="Unit of Measurement"
              >
                <option value="CTN">CTN</option>
                <option value="BOX">BOX</option>
                <option value="EA">EA</option>
              </select>
            </div>

            <input
              className={`${styles.newInput} ${styles.middle}`}
              placeholder="Supplier"
            ></input>
            <input
              className={`${styles.newInput} ${styles.last}`}
              placeholder="Lead Time"
            ></input>
          </div>
        </div>
        <button className={styles.addButton}>Add New Row</button>
        <button className={styles.submitButton}>Submit Purchase Order</button>
      </div>
    </div>
  );
};
