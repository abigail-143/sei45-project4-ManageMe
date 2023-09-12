import React, { useContext, useEffect, useState } from "react";
import styles from "./DashboardStaff.module.css";
import { useFetch } from "../hooks/useFetch";
import UserContext from "../context/user";

export const DashboardStaff: React.FC = () => {
  const fetchData = useFetch();
  const context = useContext(UserContext);
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

  useEffect(() => {
    pullAllDO();
  }, []);

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.first}>
        <div className={`${styles.firstTable}`}>
          <h1 className={styles.title}>Recent Store Delivery Orders</h1>
          <div className={styles.doTable}>
            <div className={styles.doTableHeaders}>
              <p>DO ID</p>
              <p>Raised By</p>
              <p>Order Date</p>
              <p>To Deliver Date</p>
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
              {/* {doRow}
              {doRow}
              {doRow} */}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.second}>
        <h1 className={styles.secondTitle}>Store Stock Quantity</h1>
        <div className={styles.secondDisplayDiv}>this is a table</div>
      </div>
    </div>
  );
};
