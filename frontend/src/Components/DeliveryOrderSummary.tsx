import React from "react";
import styles from "./DeliveryOrderSummary.module.css";

interface props {
    role: string;
    children?: React.ReactNode;
}

export const DeliveryOrderSummary: React.FC<props> = (props) => {
  // should pull this data from backend and store into a state
  const deliveryRowDetails: {
    productID: string;
    productDescription: string;
    quantity: number;
    uom: string;
  }[] = [
    {
      productID: "item1",
      productDescription:
        "tooth lorem ipsum toreil loogooseok lorem ipsum okokoaks",
      quantity: 200,
      uom: "CTN",
    },
    {
      productID: "item2",
      productDescription: "comb",
      quantity: 150,
      uom: "CTN",
    },
    {
      productID: "item3",
      productDescription: "tissue",
      quantity: 10,
      uom: "CTN",
    },
    {
      productID: "item4",
      productDescription: "pen",
      quantity: 20,
      uom: "CTN",
    },
  ];

  // map the state
  const rows = deliveryRowDetails.map((item, index) => {
    return (
      <div key={index} className={styles.columnInputs}>
        <p className={styles.first}>{item.productID}</p>
        <p className={styles.middle}>{item.productDescription}</p>
        <p className={styles.middle}>{item.quantity}</p>
        <p className={styles.last}>{item.uom}</p>
      </div>
    );
  });

  return (
    <div className={styles.purchaseOrderPage}>
      <div className={styles.purchaseOrderBox}>
        <h1
          className={`${styles.boxHeader} ${
            props.role == "Manager" ? styles.blueFont : styles.greenFont
          }`}
        >
          Delivery Order Summary Details
        </h1>
        <div className={styles.orderDetails}>
          <div className={`${styles.orderDetailsInput} ${styles.left}`}>
            <div className={styles.labelInput}>
              <label className={styles.label}>Delivery Order No.:</label>
              <label className={styles.labelContent}>item1</label>
            </div>
            <div className={styles.labelInput}>
              <label className={styles.label}>Order Placed By:</label>
              <label className={styles.labelContent}>item1</label>
            </div>
            <div className={styles.labelInput}>
              <label className={styles.label}>Date of Delivery Order:</label>
              <label className={styles.labelContent}>item1</label>
            </div>
            <div className={styles.labelInput}>
              <label className={styles.label}>Scheduled Delivery Date:</label>
              <label className={styles.labelContent}>item1</label>
            </div>
          </div>
          <div className={`${styles.orderDetailsInput} ${styles.right}`}>
            <div className={styles.labelInput}>
              <label className={styles.label}>Delivered On:</label>
              <div className={styles.labelContent}>
                <input
                  className={styles.labelContentInput}
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                ></input>
              </div>
            </div>
            <div className={styles.labelInput}>
              <label className={styles.label}>Delivery Order Completed:</label>
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
          </div>
          <div className={styles.orderRows}>
            {rows}
            {rows}
          </div>
        </div>
        <button
          className={`${styles.submitButton} ${
            props.role == "Manager" ? styles.blueBG : styles.greenBG
          }`}
        >
          Save Delivery Order Summary
        </button>
      </div>
    </div>
  );
};
