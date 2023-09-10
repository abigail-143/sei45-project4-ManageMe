import React from "react";
import styles from "./DashboardManager.module.css"

export const DashboardManager: React.FC = () => {
  // pull data from PO Table
  const poTableRows: {
    poID: number;
    productID: string;
    user: string;
    orderDate: string;
    expectedDate: string;
  }[] = [
    {
      poID: 1,
      productID: "item 1",
      user: "user1",
      orderDate: new Date().toISOString().split("T")[0],
      expectedDate: new Date().toISOString().split("T")[0],
    },
    {
      poID: 3,
      productID: "item 1",
      user: "user2",
      orderDate: new Date().toISOString().split("T")[0],
      expectedDate: new Date().toISOString().split("T")[0],
    },
    {
      poID: 3,
      productID: "item 2",
      user: "user1",
      orderDate: new Date().toISOString().split("T")[0],
      expectedDate: new Date().toISOString().split("T")[0],
    },
    {
      poID: 4,
      productID: "item 3",
      user: "user1",
      orderDate: new Date().toISOString().split("T")[0],
      expectedDate: new Date().toISOString().split("T")[0],
    },
  ];

  // map data from PO table
  const poRows = poTableRows.map((item, index) => {
    return (
      <div key={index} className={styles.poTableRows}>
        <p>Order {item.poID}</p>
        <p>{item.productID}</p>
        <p>{item.user}</p>
        <p>{item.orderDate}</p>
        <p>{item.expectedDate}</p>
      </div>
    );
  });

  // fetch data from DO Table
  const doTableRows: {
    doID: number;
    user: string;
    orderDate: string;
    toDeliver: string;
  }[] = [
    {
      doID: 1,
      user: "user1",
      orderDate: new Date().toISOString().split("T")[0],
      toDeliver: new Date().toISOString().split("T")[0],
    },
    {
      doID: 2,
      user: "user1",
      orderDate: new Date().toISOString().split("T")[0],
      toDeliver: new Date().toISOString().split("T")[0],
    },
    {
      doID: 3,
      user: "user1",
      orderDate: new Date().toISOString().split("T")[0],
      toDeliver: new Date().toISOString().split("T")[0],
    },
    {
      doID: 4,
      user: "user1",
      orderDate: new Date().toISOString().split("T")[0],
      toDeliver: new Date().toISOString().split("T")[0],
    },
  ];

  // map out date from DO Table
  const doRow = doTableRows.map((item, index) => {
    return (
      <div key={index} className={styles.doTableRows}>
        <p>Order {item.doID}</p>
        <p>{item.user}</p>
        <p>{item.orderDate}</p>
        <p>{item.toDeliver}</p>
      </div>
    );
  });
  return (
    <div className={styles.dashboardPage}>
      <div className={styles.first}>
        <div className={`${styles.firstTable} ${styles.one}`}>
          <h1 className={styles.title}>Recent Purchase Orders</h1>
          <div className={styles.poTable}>
            <div className={styles.poTableHeaders}>
              <p>PO ID</p>
              <p>Product ID</p>
              <p>Raised By</p>
              <p>Order Date</p>
              <p>Expected Date</p>
            </div>
            <div className={styles.poTableRowsDiv}>{poRows}</div>
          </div>
        </div>
        <div className={`${styles.firstTable} ${styles.two}`}>
          <h1 className={styles.title}>Recent Store Delivery Orders</h1>
          <div className={styles.doTable}>
            <div className={styles.doTableHeaders}>
              <p>DO ID</p>
              <p>Raised By</p>
              <p>Order Date</p>
              <p>To Deliver Date</p>
            </div>
            <div className={styles.doTableRowsDiv}>
              {doRow}
              {doRow}
              {doRow}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.second}>
        <h1 className={styles.secondTitle}>Warehouse Stock Level</h1>
        <div className={styles.secondDisplayDiv}>this is a table</div>
      </div>
      <div className={styles.second}>
        <h1 className={styles.secondTitle}>Store Stock Level</h1>
        <div className={styles.secondDisplayDiv}>this is a table</div>
      </div>
    </div>
  );
};
