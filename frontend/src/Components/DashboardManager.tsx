import React, { useContext, useEffect, useState } from "react";
import styles from "./DashboardManager.module.css";
import { useFetch } from "../hooks/useFetch";
import UserContext from "../context/user";

export const DashboardManager: React.FC = () => {
  const fetchData = useFetch();
  const context = useContext(UserContext);
  const [poData, setPOData] = useState<
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
  const [doData, setDOData] = useState<
    {
      delivery_id: number;
      username: string;
      delivery_placed_date: Date;
      to_deliver_date: Date;
      delivered_date: Date;
      completed: boolean;
    }[]
  >([]);


  const pullAllPO = async () => {
    const res = await fetchData(
      "/po/all",
      "GET",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("PO ok");
      // console.log(res.data);
      setPOData(res.data);
    } else {
      console.log("fetch PO error");
      console.log(res.data);
    }
  };
  // map data from PO table: moved this into JSX
  // const poRows = poTableRows.map((item, index) => {
  //   return (
  //     <div key={index} className={styles.poTableRows}>
  //       <p>Order {item.poID}</p>
  //       <p>{item.productID}</p>
  //       <p>{item.user}</p>
  //       <p>{item.orderDate}</p>
  //       <p>{item.expectedDate}</p>
  //     </div>
  //   );
  // });

  const pullAllDO = async () => {
    const res = await fetchData(
      "/do/all",
      "GET",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("DO ok");
      setDOData(res.data);
    } else {
      console.log("fetch DO error");
      console.log(res.data);
    }
  };

  // map out date from DO Table
  // const doRow = doTableRows.map((item, index) => {
  //   return (
  //     <div key={index} className={styles.doTableRows}>
  //       <p>Order {item.doID}</p>
  //       <p>{item.user}</p>
  //       <p>{item.orderDate}</p>
  //       <p>{item.toDeliver}</p>
  //     </div>
  //   );
  // });

  useEffect(() => {
    pullAllPO();
    pullAllDO();
  }, []);

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
              <p>Fulfilled</p>
            </div>
            <div className={styles.poTableRowsDiv}>
              {/* {poRows} */}
              {poData.map((item, index) => {
                const orderDate = String(item.order_placed_date).split("T")[0];
                return (
                  <div key={index} className={styles.poTableRows}>
                    <p>Order {item.order_id}</p>
                    <p>{item.product_id}</p>
                    <p>{item.username}</p>
                    <p>{orderDate}</p>
                    <p>{item.fulfilled ? "Fulfilled" : "Pending"}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={`${styles.firstTable} ${styles.two}`}>
          <h1 className={styles.title}>Recent Store Delivery Orders</h1>
          <div className={styles.doTable}>
            <div className={styles.doTableHeaders}>
              <p>DO ID</p>
              <p>Raised By</p>
              <p>Order Date</p>
              <p>Completed</p>
            </div>
            <div className={styles.doTableRowsDiv}>
              {doData.map((item, index) => {
                const orderDate = String(item.delivery_placed_date).split(
                  "T"
                )[0];
                return (
                  <div key={index} className={styles.doTableRows}>
                    <p>Order {item.delivery_id}</p>
                    <p>{item.username}</p>
                    <p>{orderDate}</p>
                    <p>{item.completed ? "Completed" : "Pending"}</p>
                  </div>
                );
              })}
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
