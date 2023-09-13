import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./DeliveryOrderSummary.module.css";
import { useFetch } from "../hooks/useFetch";
import UserContext from "../context/user";

interface props {
  role: string;
  doID: number;
  setDOID: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
}

export const DeliveryOrderSummary: React.FC<props> = (props) => {
  const fetchData = useFetch();
  const context = useContext(UserContext);
  const [doDetails, setDODetails] = useState<{
    delivery_id: number;
    username: string;
    delivery_placed_date: Date;
    to_deliver_date: Date | null;
    delivered_date: Date | null;
    completed: boolean;
  }>({
    delivery_id: 0,
    username: "",
    delivery_placed_date: new Date(),
    to_deliver_date: null,
    delivered_date: null,
    completed: false,
  });
  const [listItems, setListItems] = useState<
    {
      delivery_id: number;
      product_id: string;
      delivery_quantity: number;
      product_description: string;
      unit_of_measurement: string;
    }[]
  >([]);
  const deliveredDateRef = useRef<HTMLInputElement | null>(null);
  const completedRef = useRef<HTMLInputElement | null>(null);

  // pull one DO from table
  const getOneDO = async () => {
    const res = await fetchData(
      "/do/" + String(props.doID),
      "POST",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("1 DO ok");
      console.log(res.data);
      setDODetails(res.data[0]);
    } else {
      console.log("1 DO error");
      console.log(res.data);
    }
  };

  // pull list items for that one DO from list table
  const getDOListItems = async () => {
    const res = await fetchData(
      "/list/" + String(props.doID),
      "POST",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("DO List ok");
      console.log(res.data);
      setListItems(res.data);
    } else {
      console.log("DO List error");
      console.log(res.data);
    }
  };

  // update date and time only
  const updateDO = async () => {
    if (deliveredDateRef.current && completedRef.current) {
      const res = await fetchData(
        "/do/" + props.doID,
        "PATCH",
        {
          deliveredDate: deliveredDateRef.current.value,
          completed: completedRef.current.value,
        },
        context?.accessToken
      );

      if (res.ok) {
        console.log("update ok");
        console.log(res.data);
        console.log("listItems: ", listItems);

        listItems.forEach((item) => {
          console.log(item);
          updateStoreQuantity(item.product_id, item.delivery_quantity);
          updateWarehouseQuantity(item.product_id, item.delivery_quantity);
        });
        props.setPage("delivery");
      } else {
        console.log("update error");
        console.log(res.data);
      }
    }
  };

  // update store quantity
  const updateStoreQuantity = async (
    productID: string,
    deliveryQuantity: number
  ) => {
    let storeQuantity: number = 0;
    // fetch product from store first
    const res = await fetchData(
      "/store/" + productID,
      "POST",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("get 1 store product ok");
      storeQuantity = res.data[0].store_quantity;
      console.log(res.data[0].store_quantity);
    } else {
      console.log("get 1 store product error");
      console.log(res.data);
    }

    const updatedQuantity: number = storeQuantity + deliveryQuantity;

    // update quantity in store
    const update = await fetchData(
      "/store/" + productID,
      "PATCH",
      { storeQuantity: updatedQuantity },
      context?.accessToken
    );

    if (update.ok) {
      console.log("store quantity update ok");
      console.log(res.data);
      console.log(updatedQuantity);
    } else {
      console.log("store quantity update error");
      console.log(res.data);
    }
  };

  // update warehouse quantity
  const updateWarehouseQuantity = async (
    productID: string,
    deliveryQuantity: number
  ) => {
    let warehouseQty: number = 0;
    // fetch product in warehouse first
    const res = await fetchData(
      "/warehouse/" + productID,
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

    // new quantity to be updated
    const updatedQty = warehouseQty - deliveryQuantity;

    // update quantity in warehouse
    const update = await fetchData(
      "/warehouse/" + productID,
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
    getOneDO();
    getDOListItems();
  }, []);

  return (
    <div className={styles.purchaseOrderPage}>
      <div className={styles.purchaseOrderBox}>
        <h1
          className={`${styles.boxHeader} ${
            props.role == "Manager" ? styles.blueFont : styles.greenFont
          }`}
        >
          Delivery Order Summary Details
        </h1>
        <div className={styles.orderDetails}>
          <div className={`${styles.orderDetailsInput} ${styles.left}`}>
            <div className={styles.labelInput}>
              <label className={styles.label}>Delivery Order No.:</label>
              <label className={styles.labelContent}>
                Order {String(doDetails.delivery_id)}
              </label>
            </div>
            <div className={styles.labelInput}>
              <label className={styles.label}>Order Placed By:</label>
              <label className={styles.labelContent}>
                {doDetails.username}
              </label>
            </div>
            <div className={styles.labelInput}>
              <label className={styles.label}>Date of Delivery Order:</label>
              <label className={styles.labelContent}>
                {String(doDetails.delivery_placed_date).split("T")[0]}
              </label>
            </div>
            <div className={styles.labelInput}>
              <label className={styles.label}>Scheduled Delivery Date:</label>
              <label className={styles.labelContent}>
                {String(doDetails.to_deliver_date).split("T")[0]}
              </label>
            </div>
          </div>
          <div className={`${styles.orderDetailsInput} ${styles.right}`}>
            <div className={styles.labelInput}>
              <label className={styles.label}>Delivered On:</label>
              <div className={styles.labelContent}>
                <input
                  ref={deliveredDateRef}
                  className={styles.labelContentInput}
                  type="date"
                  defaultValue={
                    doDetails.delivered_date
                      ? String(doDetails.delivered_date)
                      : new Date().toISOString().split("T")[0]
                  }
                ></input>
              </div>
            </div>
            <div className={styles.labelInput}>
              <label className={styles.label}>Delivery Order Completed:</label>
              <div className={styles.label}>
                <input
                  ref={completedRef}
                  className={`${styles.checkbox}`}
                  type="checkbox"
                  checked={doDetails.completed ? true : undefined}
                  name="completed"
                  value="true"
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
          </div>
          <div className={styles.orderRows}>
            {listItems.map((item, index) => {
              return (
                <div key={index} className={styles.columnInputs}>
                  <p className={styles.first}>{item.product_id}</p>
                  <p className={styles.middle}>{item.product_description}</p>
                  <p className={styles.middle}>
                    {String(item.delivery_quantity)}
                  </p>
                  <p className={styles.last}>{item.unit_of_measurement}</p>
                </div>
              );
            })}
            {/* {rows}
            {rows} */}
          </div>
        </div>
        <button
          onClick={updateDO}
          className={`${styles.submitButton} ${
            props.role == "Manager" ? styles.blueBG : styles.greenBG
          }`}
        >
          Save Delivery Order Summary
        </button>
      </div>
    </div>
  );
};
