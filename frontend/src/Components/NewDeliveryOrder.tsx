import React, { useEffect, useState, useRef } from "react";
import styles from "./NewDeliveryOrder.module.css";

interface props {
  role: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  page: string;
  children?: React.ReactNode;
}

export const NewDeliveryOrder: React.FC<props> = (props) => {
  // declare a new row
  const newRow: JSX.Element = (
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
      <div className={`${styles.newInput} ${styles.last}`}>
        <select
          className={`${styles.select}`}
          id="uom"
          name="Unit of Measurement"
        >
          <option value="CTN">CTN</option>
          <option value="BOX">BOX</option>
          <option value="EA">EA</option>
        </select>
      </div>
    </div>
  );

  // this is the array of rows to be mapped
  const [rows, setRows] = useState<JSX.Element[]>([newRow]);
  const rowRef = useRef<HTMLDivElement | null>(null);

  // this is to handle click and add new row
  const addRow = () => {
    setRows([...rows, newRow]);
    if (rowRef.current) {
      rowRef.current.scrollTop = rowRef.current.scrollHeight;
    }
  };

  // need to include updating backend
  const handleClick = () => {
    props.setPage("doSummary");
  };

  useEffect(() => {
    rows;
  }, []);

  return (
    <div className={styles.deliveryOrderPage}>
      <div className={styles.deliveryOrderBox}>
        <h1
          className={`${
            props.role == "Manager"
              ? styles.boxHeaderBlue
              : styles.boxHeaderGreen
          }`}
        >
          New Store Delivery Order
        </h1>
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
          </div>
          {/* map out the number of rows here */}
          <div className={styles.inputRows} ref={rowRef}>
            {rows.map((row) => row)}
          </div>
        </div>
        <button
          className={`${styles.addButton} ${
            props.role == "Manager" ? styles.lightBlueBG : styles.lightGreenBG
          }`}
          onClick={() => {
            addRow();
          }}
        >
          Add New Row
        </button>
        <button
          className={`${styles.submitButton} ${
            props.role == "Manager" ? styles.blueBG : styles.greenBG
          }`}
          onClick={handleClick}
        >
          Submit Store Deliver Order
        </button>
      </div>
    </div>
  );
};
