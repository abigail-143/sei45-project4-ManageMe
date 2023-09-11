import React, { useContext, useEffect, useState } from "react";
import styles from "./PurchaseOrderSummary.module.css";
import { useFetch } from "../../hooks/useFetch";
import UserContext from "../../context/user";

interface props {
  poID: number;
  productID: string;
  children?: React.ReactNode;
}

export const PurchaseOrderSummary: React.FC<props> = (props) => {
  const fetchData = useFetch();
  const context = useContext(UserContext);
  const [poDetails, setPODetails] = useState<{
    order_id: number;
    username: string;
    product_id: string;
    order_quantity: number;
    order_placed_date: Date;
    estimated_receive_date: Date | null;
    received_date: Date | null;
    fulfilled: boolean | null;
    on_time: boolean | null;
  }>({
    order_id: 0,
    username: "",
    product_id: "",
    order_quantity: 0,
    order_placed_date: new Date(),
    estimated_receive_date: null,
    received_date: null,
    fulfilled: null,
    on_time: null,
  });
  const [productDetails, setProductDetails] = useState<{
    inventory_id: number;
    product_id: string;
    product_description: string;
    unit_of_measurement: string;
    supplier: string;
    supplier_leadtime: number;
  }>({
    inventory_id: 0,
    product_id: "",
    product_description: "",
    unit_of_measurement: "",
    supplier: "",
    supplier_leadtime: 0,
  });

  // fetch data for 1 PO
  const getOnePO = async () => {
    const res = await fetchData(
      "/po/" + props.poID,
      "POST",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("1 PO ok");
      console.log(res.data);
      setPODetails(res.data[0]);
    } else {
      console.log("1 PO error");
      console.log(res.data);
    }
  };

  // fetch data for 1 product
  const getOneProduct = async () => {
    const res = await fetchData(
      "/products/" + props.productID,
      "POST",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("1 product ok");
      console.log(res.data);
      setProductDetails(res.data[0]);
    } else {
      console.log("1 product error");
      console.log(res.data);
    }
  };

  useEffect(() => {
    getOneProduct();
    getOnePO();
  }, []);

  // useEffect(() => {
  //   getOneProduct();
  // }, [poDetails]);

  return (
    <div className={styles.purchaseOrderPage}>
      <div className={styles.purchaseOrderBox}>
        <h1 className={styles.boxHeader}>Purchase Order Summary Details</h1>
        <div className={styles.orderDetails}>
          <div className={`${styles.orderDetailsInput} ${styles.left}`}>
            <div className={styles.labelInput}>
              <label className={styles.label}>Purchase Order No.:</label>
              <label className={styles.labelContent}>
                {poDetails.order_id}
              </label>
            </div>
            <div className={styles.labelInput}>
              <label className={styles.label}>Order Placed By:</label>
              <label className={styles.labelContent}>
                {poDetails.username}
              </label>
            </div>
            <div className={styles.labelInput}>
              <label className={styles.label}>Date of Purchase Order:</label>
              <label className={styles.labelContent}>
                {String(poDetails.order_placed_date).split("T")[0]}
              </label>
            </div>
          </div>
          <div className={`${styles.orderDetailsInput} ${styles.right}`}>
            <div className={styles.labelInput}>
              <label className={styles.label}>Estimated Arrival Date:</label>
              <label className={styles.labelContent}>
                {String(poDetails.estimated_receive_date).split("T")[0]}
              </label>
            </div>
            <div className={styles.labelInput}>
              <label className={styles.label}>Shipment Arrived On:</label>
              <div className={styles.labelContent}>
                <input
                  className={styles.labelContentInput}
                  type="date"
                  defaultValue={
                    poDetails.received_date
                      ? String(poDetails.received_date)
                      : new Date().toISOString().split("T")[0]
                  }
                ></input>
              </div>
            </div>
            <div className={styles.labelInput}>
              <label className={styles.label}>Purchase Order Completed:</label>
              <div className={styles.label}>
                <input className={`${styles.checkbox}`} type="checkbox"></input>
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
            <p>Supplier</p>
            <p>Lead Time</p>
          </div>
          <div className={styles.columnInputs}>
            <p className={styles.first}>{poDetails.product_id}</p>
            <p className={styles.middle}>
              {productDetails.product_description}
            </p>
            <p className={styles.middle}>{poDetails.order_quantity}</p>
            <p className={styles.middle}>
              {productDetails.unit_of_measurement}
            </p>
            <p className={styles.middle}>{productDetails.supplier}</p>
            <p className={styles.last}>
              {productDetails.supplier_leadtime} days
            </p>
          </div>
        </div>
        <button className={styles.submitButton}>
          Save Purchase Order Summary
        </button>
      </div>
    </div>
  );
};
