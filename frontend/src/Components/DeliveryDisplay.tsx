import React, { useContext, useEffect, useState } from "react";
import styles from "./DeliveryDisplay.module.css";
import { useFetch } from "../hooks/useFetch";
import UserContext from "../context/user";

interface props {
  role: string;
  doID: number;
  setDOID: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
}

export const DeliveryDisplay: React.FC<props> = (props) => {
  const fetchData = useFetch();
  const context = useContext(UserContext);
  const [completedDO, setCompletedDO] = useState<
    {
      delivery_id: number;
      username: string;
      delivery_placed_date: Date;
      to_deliver_date: Date;
      delivered_date: Date;
      completed: boolean;
    }[]
  >([]);
  const [pendingDO, setPendingDO] = useState<
    {
      delivery_id: number;
      username: string;
      delivery_placed_date: Date;
      to_deliver_date: Date;
      delivered_date: Date;
      completed: boolean;
    }[]
  >([]);

  // pull data from backend
  const pullAllCompletedDO = async () => {
    const res = await fetchData(
      "/do/all/completed",
      "GET",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("Completed DO ok");
      // console.log(res.data);
      setCompletedDO(res.data);
    } else {
      console.log("fetch completed DO error");
      console.log(res.data);
    }
  };

  const pullAllPendingDO = async () => {
    const res = await fetchData(
      "/do/all/pending",
      "GET",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("Pending DO ok");
      // console.log(res.data);
      setPendingDO(res.data);
    } else {
      console.log("fetch pending DO error");
      console.log(res.data);
    }
  };

  useEffect(() => {
    pullAllCompletedDO();
    pullAllPendingDO();
  }, []);

  return (
    <div className={styles.deliveryPage}>
      <div className={`${styles.deliveryListDiv} ${styles.left}`}>
        <div className={styles.listTitle}>
          <h1
            className={`${styles.titleName} ${
              props.role == "Manager" ? styles.blueFont : styles.greenFont
            }`}
          >
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
            {/* this is Completed Deliveries */}
            {completedDO.map((item, index) => {
              // change Date datatype into string format
              const orderDate = String(item.delivery_placed_date).split("T")[0];
              const deliveredDate = String(item.delivered_date).split("T")[0];
              return (
                <div
                  key={index}
                  className={styles.listBodyRows}
                  onClick={() => {
                    console.log(item.delivery_id);
                    props.setDOID(item.delivery_id);
                    props.setPage("doSummary");
                  }}
                >
                  <p className={styles.orderID}>{item.delivery_id}</p>
                  <p className={styles.orderDate}>{orderDate}</p>
                  <p className={styles.deliveredDate}>{deliveredDate}</p>
                  <p className={styles.orderUser}>{item.username}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={`${styles.deliveryListDiv} ${styles.right}`}>
        <div className={styles.listTitle}>
          <h1
            className={`${styles.titleName} ${
              props.role == "Manager" ? styles.blueFont : styles.greenFont
            }`}
          >
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
            {/* this is pending deliveries */}
            {pendingDO.map((item, index) => {
              const orderDate = String(item.delivery_placed_date).split("T")[0];
              const deliveredDate = String(item.delivered_date).split("T")[0];
              return (
                <div
                  key={index}
                  className={styles.listBodyRows}
                  onClick={() => {
                    console.log(item.delivery_id);
                    props.setDOID(item.delivery_id);
                    props.setPage("doSummary");
                  }}
                >
                  <p className={styles.orderID}>{item.delivery_id}</p>
                  <p className={styles.orderDate}>{orderDate}</p>
                  <p className={styles.deliveredDate}>{deliveredDate}</p>
                  <p className={styles.orderUser}>{item.username}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
