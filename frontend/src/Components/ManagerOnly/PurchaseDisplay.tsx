import React, { useContext, useEffect, useState } from "react";
import styles from "./PurchaseDisplay.module.css";
import { useFetch } from "../../hooks/useFetch";
import UserContext from "../../context/user";

export const PurchaseDisplay: React.FC = () => {
  const fetchData = useFetch();
  const context = useContext(UserContext);
  const [completedPO, setCompletedPO] = useState<
    {
      order_id: number;
      username: string;
      product_id: string;
      order_quantity: number;
      order_placed_date: Date;
      estimated_receive_date: Date;
      received_date: Date;
      fulfilled: boolean;
      on_time: boolean;
    }[]
  >([]);
  const [pendingPO, setPendingPO] = useState<
    {
      order_id: number;
      username: string;
      product_id: string;
      order_quantity: number;
      order_placed_date: Date;
      estimated_receive_date: Date;
      received_date: Date;
      fulfilled: boolean;
      on_time: boolean;
    }[]
  >([]);

  const pullAllCompletedPO = async () => {
    const res = await fetchData(
      "/po/all/completed",
      "GET",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("Completed PO ok");
      // console.log(res.data);
      setCompletedPO(res.data);
    } else {
      console.log("fetch completed PO error");
      console.log(res.data);
    }
  };

  const pullAllPendingPO = async () => {
    const res = await fetchData(
      "/po/all/pending",
      "GET",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("Pending PO ok");
      // console.log(res.data);
      setPendingPO(res.data);
    } else {
      console.log("fetch pending PO error");
      console.log(res.data);
    }
  };


  // move the map into jsx
  // const deliveredOrders = purchaseOrders.map((item, index) => {
  //   return (
  //     <div key={index} className={styles.listBodyRows}>
  //       <p className={styles.orderID}>{item.poID}</p>
  //       <p className={styles.orderItem}>{item.orderItem}</p>
  //       <p className={styles.orderUser}>{item.orderUser}</p>
  //       <p className={styles.orderDate}>{item.poDate}</p>
  //       <p className={styles.deliveredDate}>{item.deliveredDate}</p>
  //     </div>
  //   );
  // });

  // const pendingOrders = purchaseOrders.map((item, index) => {
  //   return (
  //     <div key={index} className={styles.listBodyRows}>
  //       <p className={styles.orderID}>{item.poID}</p>
  //       <p className={styles.orderItem}>{item.orderItem}</p>
  //       <p className={styles.orderUser}>{item.orderUser}</p>
  //       <p className={styles.orderDate}>{item.poDate}</p>
  //       <p className={styles.estimatedDate}>{item.estimatedDate}</p>
  //     </div>
  //   );
  // });

  useEffect(() => {
    pullAllCompletedPO();
    pullAllPendingPO();
  }, []);

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
            {completedPO.map((item, index) => {
              const orderDate = String(item.order_placed_date).split("T")[0];
              const deliveredDate = String(item.received_date).split("T")[0];
              return (
                <div key={index} className={styles.listBodyRows}>
                  <p className={styles.orderID}>{item.order_id}</p>
                  <p className={styles.orderItem}>{item.product_id}</p>
                  <p className={styles.orderUser}>{item.username}</p>
                  <p className={styles.orderDate}>{orderDate}</p>
                  <p className={styles.deliveredDate}>{deliveredDate}</p>
                </div>
              );
            })}
            {/* {deliveredOrders}
            {deliveredOrders}
            {deliveredOrders}
            {deliveredOrders}
            {deliveredOrders}
            {deliveredOrders} */}
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
            {pendingPO.map((item, index) => {
              const orderDate = String(item.order_placed_date).split("T")[0];
              const estimatedDate = String(item.estimated_receive_date).split(
                "T"
              )[0];
              return (
                <div key={index} className={styles.listBodyRows}>
                  <p className={styles.orderID}>{item.order_id}</p>
                  <p className={styles.orderItem}>{item.product_id}</p>
                  <p className={styles.orderUser}>{item.username}</p>
                  <p className={styles.orderDate}>{orderDate}</p>
                  <p className={styles.deliveredDate}>{estimatedDate}</p>
                </div>
              );
            })}
            {/* {pendingOrders}
            {pendingOrders} */}
          </div>
        </div>
      </div>
    </div>
  );
};
