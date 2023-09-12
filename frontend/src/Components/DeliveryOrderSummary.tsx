import React, { useContext, useEffect, useState } from "react";
import styles from "./DeliveryOrderSummary.module.css";
import { useFetch } from "../hooks/useFetch";
import UserContext from "../context/user";

interface props {
  role: string;
  doID: number;
  setDOID: React.Dispatch<React.SetStateAction<number>>;
  children?: React.ReactNode;
}

export const DeliveryOrderSummary: React.FC<props> = (props) => {
  const fetchData = useFetch();
  const context = useContext(UserContext);
  const [doDetails, setDODetails] = useState<{
    delivery_id: Number;
    username: String;
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
      delivery_id: Number;
      product_id: String;
      delivery_quantity: Number;
      product_description: String;
      unit_of_measurement: String;
    }[]
  >([]);

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

  useEffect(() => {
    getOneDO();
    getDOListItems();
  }, []);

  // should pull this data from backend and store into a state
  const deliveryRowDetails: {
    productID: string;
    productDescription: string;
    quantity: number;
    uom: string;
  }[] = [
    {
      productID: "item1",
      productDescription:
        "tooth lorem ipsum toreil loogooseok lorem ipsum okokoaks",
      quantity: 200,
      uom: "CTN",
    },
    {
      productID: "item2",
      productDescription: "comb",
      quantity: 150,
      uom: "CTN",
    },
    {
      productID: "item3",
      productDescription: "tissue",
      quantity: 10,
      uom: "CTN",
    },
    {
      productID: "item4",
      productDescription: "pen",
      quantity: 20,
      uom: "CTN",
    },
  ];

  // map the state
  const rows = deliveryRowDetails.map((item, index) => {
    return (
      <div key={index} className={styles.columnInputs}>
        <p className={styles.first}>{item.productID}</p>
        <p className={styles.middle}>{item.productDescription}</p>
        <p className={styles.middle}>{item.quantity}</p>
        <p className={styles.last}>{item.uom}</p>
      </div>
    );
  });

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
                  className={`${styles.checkbox}`}
                  type="checkbox"
                  checked={doDetails.completed ? true : false}
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
                  <p className={styles.middle}>{String(item.delivery_quantity)}</p>
                  <p className={styles.last}>{item.unit_of_measurement}</p>
                </div>
              );
            })}
            {/* {rows}
            {rows} */}
          </div>
        </div>
        <button
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
