import React, { useContext, useEffect, useState } from "react";
import styles from "./DashboardManager.module.css";
import { useFetch } from "../hooks/useFetch";
import UserContext from "../context/user";
import { WarehouseStockChart } from "./Charts/WarehouseStockChart";
import { StoreStockChart } from "./Charts/StoreStockChart";

interface props {
  role: string;
  poID: number;
  setPOID: React.Dispatch<React.SetStateAction<number>>;
  doID: number;
  setDOID: React.Dispatch<React.SetStateAction<number>>;
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  productID: string;
  setProductID: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
}

export const DashboardManager: React.FC<props> = (props) => {
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
      // console.log("PO ok");
      // console.log(res.data);
      setPOData(res.data);
    } else {
      console.log("fetch PO error");
      console.log(res.data);
    }
  };

  const pullAllDO = async () => {
    const res = await fetchData(
      "/do/all",
      "GET",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      // console.log("DO ok");
      setDOData(res.data);
    } else {
      alert("fetch DO error");
      console.log(res.data);
    }
  };

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
              {poData.map((item, index) => {
                const orderDate = String(item.order_placed_date).split("T")[0];
                return (
                  <div
                    key={index}
                    className={styles.poTableRows}
                    onClick={() => {
                      console.log(item.order_id);
                      props.setPOID(item.order_id);
                      props.setProductID(item.product_id);
                      props.setPage("poSummary");
                    }}
                  >
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
                  <div
                    key={index}
                    className={styles.doTableRows}
                    onClick={() => {
                      console.log(item.delivery_id);
                      props.setDOID(item.delivery_id);
                      props.setPage("doSummary");
                    }}
                  >
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
        <div className={styles.secondDisplayDiv}>
          <WarehouseStockChart></WarehouseStockChart>
        </div>
      </div>
      <div className={styles.second}>
        <h1 className={styles.secondTitle}>Store Stock Level</h1>
        <div className={styles.secondDisplayDiv}>
          <StoreStockChart role={props.role}></StoreStockChart>
        </div>
      </div>
    </div>
  );
};
