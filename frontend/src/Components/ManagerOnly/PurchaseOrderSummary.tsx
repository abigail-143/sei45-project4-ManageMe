import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./PurchaseOrderSummary.module.css";
import { useFetch } from "../../hooks/useFetch";
import UserContext from "../../context/user";

interface props {
  poID: number;
  productID: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
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
    product_description: string;
    supplier: string;
    supplier_leadtime: number;
    unit_of_measurement: string;
  }>({
    order_id: 0,
    username: "",
    product_id: "",
    order_quantity: 0,
    order_placed_date: new Date(),
    estimated_receive_date: null,
    received_date: null,
    fulfilled: null,
    product_description: "",
    supplier: "",
    supplier_leadtime: 0,
    unit_of_measurement: "",
  });
  const receivedDateRef = useRef<HTMLInputElement | null>(null);
  const fulfilledRef = useRef<HTMLInputElement | null>(null);

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

  // update PO with date and time only
  const updatePO = async () => {
    if (receivedDateRef.current && fulfilledRef.current) {
      const res = await fetchData(
        "/po/" + props.poID,
        "PATCH",
        {
          receivedDate: receivedDateRef.current.value,
          fulfilled: fulfilledRef.current.value,
        },
        context?.accessToken
      );

      if (res.ok) {
        console.log("update ok");
        console.log(res.data);
        props.setPage("purchase");
      } else {
        console.log("update error");
        console.log(res.data);
      }
    }
  };

  // add to warehouse quantity
  const updateWarehouseQuantity = async () => {
    let warehouseQty: number = 0;
    // fetch product in warehouse first
    const res = await fetchData(
      "/warehouse/" + poDetails.product_id,
      "POST",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("get 1 warehouse product ok");
      warehouseQty = res.data[0].warehouse_quantity;
      console.log(res.data[0].warehouse_quantity);
    } else {
      console.log("get 1 warehouse product error");
      console.log(res.data);
    }

    // new quantity to be updated in warehouse
    const updatedQty = warehouseQty + poDetails.order_quantity;

    // update quantity in warehouse
    const update = await fetchData(
      "/warehouse/" + poDetails.product_id,
      "PATCH",
      {
        warehouseQuantity: updatedQty,
      },
      context?.accessToken
    );

    if (update.ok) {
      console.log("warehouse qty update ok");
      console.log(res.data);
      console.log(updatedQty);
    } else {
      console.log("warehouse qty update error");
      console.log(res.data);
    }
  };

  useEffect(() => {
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
                  ref={receivedDateRef}
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
              <label className={styles.label}>Purchase Order Fulfilled:</label>
              <div className={styles.label}>
                <input
                  ref={fulfilledRef}
                  className={`${styles.checkbox}`}
                  type="checkbox"
                  name="fulfilled"
                  value="true"
                  checked={poDetails.fulfilled ? true : undefined}
                ></input>
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
            <p className={styles.middle}>{poDetails.product_description}</p>
            <p className={styles.middle}>{poDetails.order_quantity}</p>
            <p className={styles.middle}>{poDetails.unit_of_measurement}</p>
            <p className={styles.middle}>{poDetails.supplier}</p>
            <p className={styles.last}>{poDetails.supplier_leadtime} days</p>
          </div>
        </div>
        <button
          className={styles.submitButton}
          onClick={() => {
            updatePO();
            updateWarehouseQuantity();
          }}
        >
          Save Purchase Order Summary
        </button>
      </div>
    </div>
  );
};
