import React, { useContext, useEffect, useState } from "react";
import styles from "./PurchaseDisplay.module.css";
import { useFetch } from "../../hooks/useFetch";
import UserContext from "../../context/user";

interface props {
  poID: number;
  setPOID: React.Dispatch<React.SetStateAction<number>>;
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  productID: string;
  setProductID: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
}

export const PurchaseDisplay: React.FC<props> = (props) => {
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
                <div
                  key={index}
                  className={styles.listBodyRows}
                  onClick={() => {
                    console.log(item.order_id);
                    props.setPOID(item.order_id);
                    props.setProductID(item.product_id);
                    props.setPage("poSummary");
                  }}
                >
                  <p className={styles.orderID}>{item.order_id}</p>
                  <p className={styles.orderItem}>{item.product_id}</p>
                  <p className={styles.orderUser}>{item.username}</p>
                  <p className={styles.orderDate}>{orderDate}</p>
                  <p className={styles.deliveredDate}>{deliveredDate}</p>
                </div>
              );
            })}
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
                <div
                  key={index}
                  className={styles.listBodyRows}
                  onClick={() => {
                    console.log(item.order_id);
                    props.setPOID(item.order_id);
                    props.setProductID(item.product_id);
                    props.setPage("poSummary");
                  }}
                >
                  <p className={styles.orderID}>{item.order_id}</p>
                  <p className={styles.orderItem}>{item.product_id}</p>
                  <p className={styles.orderUser}>{item.username}</p>
                  <p className={styles.orderDate}>{orderDate}</p>
                  <p className={styles.deliveredDate}>{estimatedDate}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
