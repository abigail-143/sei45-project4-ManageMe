import React from "react";
import styles from "./PurchaseDisplay.module.css";

export const PurchaseDisplay: React.FC = () => {
  const purchaseOrders: {
    poID: number;
    poDate: string;
    deliveredDate: string;
    estimatedDate: string;
    orderUser: string;
    orderItem: string;
  }[] = [
    {
      poID: 1,
      poDate: new Date().toISOString().split("T")[0],
      deliveredDate: new Date().toISOString().split("T")[0],
      estimatedDate: new Date().toISOString().split("T")[0],
      orderUser: "user1",
      orderItem: "item1",
    },
    {
      poID: 2,
      poDate: new Date().toISOString().split("T")[0],
      deliveredDate: new Date().toISOString().split("T")[0],
      estimatedDate: new Date().toISOString().split("T")[0],
      orderUser: "user1",
      orderItem: "item2",
    },
    {
      poID: 3,
      poDate: new Date().toISOString().split("T")[0],
      deliveredDate: new Date().toISOString().split("T")[0],
      estimatedDate: new Date().toISOString().split("T")[0],
      orderUser: "user2",
      orderItem: "item1",
    },
    {
      poID: 4,
      poDate: new Date().toISOString().split("T")[0],
      deliveredDate: new Date().toISOString().split("T")[0],
      estimatedDate: new Date().toISOString().split("T")[0],
      orderUser: "user2",
      orderItem: "item2",
    },
  ];

  const deliveredOrders = purchaseOrders.map((item, index) => {
    return (
      <div key={index} className={styles.listBodyRows}>
        <p className={styles.orderID}>{item.poID}</p>
        <p className="orderItem">{item.orderItem}</p>
        <p className={styles.orderUser}>{item.orderUser}</p>
        <p className={styles.orderDate}>{item.poDate}</p>
        <p className={styles.deliveredDate}>{item.deliveredDate}</p>
      </div>
    );
  });

  const pendingOrders = purchaseOrders.map((item, index) => {
    return (
      <div key={index} className={styles.listBodyRows}>
        <p className={styles.orderID}>{item.poID}</p>
        <p className="orderItem">{item.orderItem}</p>
        <p className={styles.orderUser}>{item.orderUser}</p>
        <p className={styles.orderDate}>{item.poDate}</p>
        <p className={styles.estimatedDate}>{item.estimatedDate}</p>
      </div>
    );
  });
  return (
    <div className={styles.poPage}>
      <div className={`${styles.poListDiv} ${styles.left}`}>
        <div className={styles.listTitle}>
          <h1 className={`${styles.titleName}`}>Completed Purchase Orders</h1>
          <div className={styles.searchBar}>
            <img className={styles.searchBarImg} src="/search.png"></img>
            <input
              className={styles.searchBarInput}
              placeholder="Search Delivery"
            ></input>
          </div>
        </div>
        <div className={styles.listBody}>
          <div className={styles.listBodyRowsHeader}>
            <p className={styles.orderID}>Order ID</p>
            <p className={styles.orderItem}>Item</p>
            <p className={styles.orderUser}>Placed By</p>
            <p className={styles.orderDate}>Ordered</p>
            <p className={styles.deliveredDate}>Delivered</p>
          </div>
          <div className={styles.listBodyInput}>
            {deliveredOrders}
            {deliveredOrders}
            {deliveredOrders}
            {deliveredOrders}
            {deliveredOrders}
            {deliveredOrders}
          </div>
        </div>
      </div>
      <div className={`${styles.poListDiv} ${styles.right}`}>
        <div className={styles.listTitle}>
          <h1 className={`${styles.titleName}`}>Ongoing Purchase Orders</h1>
          <div className={styles.searchBar}>
            <img className={styles.searchBarImg} src="/search.png"></img>
            <input
              className={styles.searchBarInput}
              placeholder="Search Delivery"
            ></input>
          </div>
        </div>
        <div className={styles.listBody}>
          <div className={styles.listBodyRowsHeader}>
            <p className={styles.orderID}>Order ID</p>
            <p className={styles.orderItem}>Item</p>
            <p className={styles.orderUser}>Placed By</p>
            <p className={styles.orderDate}>Ordered</p>
            <p className={styles.estimatedDate}>Estimated</p>
          </div>
          <div className={styles.listBodyInput}>
            {pendingOrders}
            {pendingOrders}
          </div>
        </div>
      </div>
    </div>
  );
};
