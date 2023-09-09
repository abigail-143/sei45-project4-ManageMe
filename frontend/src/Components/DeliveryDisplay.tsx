import React from "react";
import styles from "./DeliveryDisplay.module.css";

export const DeliveryDisplay: React.FC = () => {
  const deliveredOrders: {
    orderID: number;
    orderDate: string;
    deliveredDate: string;
    orderUser: string;
  }[] = [
    {
      orderID: 1,
      orderDate: new Date().toISOString().split("T")[0],
      deliveredDate: new Date().toISOString().split("T")[0],
      orderUser: "user1",
    },
    {
      orderID: 2,
      orderDate: new Date().toISOString().split("T")[0],
      deliveredDate: new Date().toISOString().split("T")[0],
      orderUser: "user1",
    },
    {
      orderID: 3,
      orderDate: new Date().toISOString().split("T")[0],
      deliveredDate: new Date().toISOString().split("T")[0],
      orderUser: "user1",
    },
    {
      orderID: 4,
      orderDate: new Date().toISOString().split("T")[0],
      deliveredDate: new Date().toISOString().split("T")[0],
      orderUser: "user1",
    },
  ];

  // this maps the data returned to give the rows in the list
  const orders = deliveredOrders.map((item) => {
    return (
      <div className={styles.listBodyRows}>
        <p className={styles.orderID}>{item.orderID}</p>
        <p className={styles.orderDate}>{item.orderDate}</p>
        <p className={styles.deliveredDate}>{item.deliveredDate}</p>
        <p className={styles.orderUser}>{item.orderUser}</p>
      </div>
    );
  });
  return (
    <div className={styles.deliveryPage}>
      <div className={`${styles.deliveryListDiv} ${styles.left}`}>
        <div className={styles.listTitle}>
          <h1 className={`${styles.titleName} ${styles.blue}`}>
            Completed Deliveries
          </h1>
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
            <p className={styles.orderDate}>Ordered Date</p>
            <p className={styles.deliveredDate}>Delivered Date</p>
            <p className={styles.orderUser}>Placed By</p>
          </div>
          <div className={styles.listBodyInput}>
            {orders}
            {orders}
            {orders}
            {orders}
            {orders}
            {orders}
            {orders}
          </div>
        </div>
      </div>
      <div className={`${styles.deliveryListDiv} ${styles.right}`}>
        <div className={styles.listTitle}>
          <h1 className={`${styles.titleName} ${styles.blue}`}>
            Pending Deliveries
          </h1>
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
            <p className={styles.orderDate}>Ordered Date</p>
            <p className={styles.deliveredDate}>Delivered Date</p>
            <p className={styles.orderUser}>Placed By</p>
          </div>
          <div className={styles.listBodyInput}>
            {orders}
            {orders}
          </div>
        </div>
      </div>
    </div>
  );
};
