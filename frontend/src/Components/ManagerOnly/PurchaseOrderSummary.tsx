import React from "react";
import styles from "./PurchaseOrderSummary.module.css";

export const PurchaseOrderSummary: React.FC = () => {
  return (
    <div className={styles.purchaseOrderPage}>
      <div className={styles.purchaseOrderBox}>
        <h1 className={styles.boxHeader}>Purchase Order Summary Details</h1>
        <div className={styles.orderDetails}>
          <div className={`${styles.orderDetailsInput} ${styles.left}`}>
            <div className={styles.labelInput}>
              <label className={styles.label}>Purchase Order No.:</label>
              <label className={styles.labelContent}>item1</label>
            </div>
            <div className={styles.labelInput}>
              <label className={styles.label}>Order Placed By:</label>
              <label className={styles.labelContent}>item1</label>
            </div>
            <div className={styles.labelInput}>
              <label className={styles.label}>Date of Purchase Order:</label>
              <label className={styles.labelContent}>item1</label>
            </div>
          </div>
          <div className={`${styles.orderDetailsInput} ${styles.right}`}>
            <div className={styles.labelInput}>
              <label className={styles.label}>Estimated Arrival Date:</label>
              <label className={styles.labelContent}>item1</label>
            </div>
            <div className={styles.labelInput}>
              <label className={styles.label}>Shipment Arrived On:</label>
              <div className={styles.labelContent}>
                <input
                  className={styles.labelContentInput}
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                ></input>
              </div>
            </div>
            <div className={styles.labelInput}>
              <label className={styles.label}>Purchase Order Completed:</label>
              <div className={styles.label}>
                <input className={`${styles.checkbox}`} type="checkbox"></input>
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
            <p className={styles.first}>item1</p>
            <p className={styles.middle}>
              ycl toothbrushasdaskjdlaksjldjasldja
            </p>
            <p className={styles.middle}>100</p>
            <p className={styles.middle}>CTN</p>
            <p className={styles.middle}>
              toothbrush & co toothbrush & co toothbrush & co toothbrush & co
            </p>
            <p className={styles.last}>30 days</p>
          </div>
        </div>
        <button className={styles.submitButton}>Save Purchase Order Summary</button>
      </div>
    </div>
  );
};
