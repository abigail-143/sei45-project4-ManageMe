import React, { useEffect, useState, useRef, useContext } from "react";
import styles from "./NewDeliveryOrder.module.css";
import { useFetch } from "../hooks/useFetch";
import UserContext from "../context/user";
import { NewRow } from "./DeliveryOrderInputRow";

interface props {
  role: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setDOID: React.Dispatch<React.SetStateAction<number>>;
  page: string;
  children?: React.ReactNode;
}

export const NewDeliveryOrder: React.FC<props> = (props) => {
  const fetchData = useFetch();
  const context = useContext(UserContext);
  const [newDOID, setNewDOID] = useState<number>(0);

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const deliveryPlacedDateRef = useRef<HTMLInputElement | null>(null);
  const toDeliverDateRef = useRef<HTMLInputElement | null>(null);

  // this is to track all the inputs from the rows
  const mainRef = useRef([]);

  // + 2 days from current date
  const estimatedDeliveryDate = new Date(
    new Date().setDate(new Date().getDate() + 2)
  );

  // this creates a new DO entry
  const addNewDO = async () => {
    if (
      usernameRef.current &&
      deliveryPlacedDateRef.current &&
      toDeliverDateRef.current
    ) {
      const res = await fetchData(
        "/do/new",
        "PUT",
        {
          username: usernameRef.current.value,
          deliveryPlacedDate: deliveryPlacedDateRef.current.value,
          toDeliverDate: toDeliverDateRef.current.value,
        },
        context?.accessToken
      );

      if (res.ok) {
        console.log("new DO ok");
        console.log(res.data.order.delivery_id);
        setNewDOID(res.data.order.delivery_id);

        mainArray.forEach((item) => {
          addItemsToDO(res.data.order.delivery_id, item[0], item[1]);
          console.log("item added");
          console.log(item);
        });

        // this is to set the delivery order id for the summary page
        props.setDOID(res.data.order.delivery_id);
      } else {
        console.log("new DO error");
        console.log(res.data);
      }
    }
  };

  const addItemsToDO = async (
    id: number,
    productID: string,
    deliveryQuantity: number
  ) => {
    const res = await fetchData(
      "/list/add",
      "PUT",
      {
        deliveryID: id,
        productID: productID,
        deliveryQuantity: deliveryQuantity,
      },
      context?.accessToken
    );

    if (res.ok) {
      console.log("add 1 item to DO ok");
      console.log(res.data);
    } else {
      console.log("add 1 item to DO error");
      console.log(res.data);
    }
  };

  // this rowRef is to toggle the scroll bar height
  const rowRef = useRef<HTMLDivElement | null>(null);

  // this is to track the user inputs from each row
  const [mainArray, setMainArray] = useState<[string, number][]>([["", 0]]);

  // this will pass to child, this is to update the already created array of arrays when user type in some input
  const updateArray = (
    idx: number,
    productName: string,
    productQuantity: number
  ) => {
    console.log({ productName, productQuantity });
    const currArray = JSON.parse(JSON.stringify(mainArray));
    currArray[idx] = [productName, productQuantity];
    setMainArray(currArray);
  };

  // this is add row, adds an array to the mainArray array
  const addItem = () => {
    const currArray = JSON.parse(JSON.stringify(mainArray));
    currArray.push(["", 0]);
    setMainArray(currArray);
  };

  // when submitting, wait for DO to be created then show summary
  const handleClick = async () => {
    await addNewDO();
    props.setPage("doSummary");
  };

  return (
    <div className={styles.deliveryOrderPage}>
      {/* {JSON.stringify(mainArray)} */}
      <div className={styles.deliveryOrderBox}>
        <h1
          className={`${
            props.role == "Manager"
              ? styles.boxHeaderBlue
              : styles.boxHeaderGreen
          }`}
        >
          New Store Delivery Order
        </h1>
        <div className={styles.orderDetails}>
          <div className={`${styles.orderDetailsInput} ${styles.left}`}>
            <div className={styles.labelDetails}>
              <label className={styles.labelOrder}>Delivery Order No.:</label>
              <input
                className={styles.inputOrder}
                placeholder="delivery order no."
              ></input>
            </div>
            <div className={styles.labelDetails}>
              <label className={styles.labelOrder}>Order Placed By:</label>
              <input
                ref={usernameRef}
                className={styles.inputOrder}
                placeholder="username"
                defaultValue={context?.username}
              ></input>
            </div>
            <div className={styles.labelDetails}>
              <label className={styles.labelOrder}>
                Date of Delivery Order:
              </label>
              <div className={styles.inputOrder}>
                <input
                  ref={deliveryPlacedDateRef}
                  className={styles.date}
                  id="orderPlacedDate"
                  type="date"
                  placeholder="Order Date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                ></input>
              </div>
            </div>
            <div className={styles.labelDetails}>
              <label className={styles.labelOrder}>
                Scheduled Delivery Date:
              </label>
              <div className={styles.inputOrder}>
                <input
                  ref={toDeliverDateRef}
                  className={styles.date}
                  id="toDeliverDate"
                  type="date"
                  placeholder="Order Date"
                  defaultValue={
                    estimatedDeliveryDate.toISOString().split("T")[0]
                  }
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
          {/* map out the number of rows here */}
          <div className={styles.inputRows} ref={rowRef}>
            {mainArray.map((item, idx) => {
              return (
                <NewRow
                  updateArray={updateArray}
                  idx={idx}
                  productName={item[0]}
                  productQuantity={item[1]}
                ></NewRow>
              );
            })}
          </div>
        </div>
        <button
          className={`${styles.addButton} ${
            props.role == "Manager" ? styles.lightBlueBG : styles.lightGreenBG
          }`}
          onClick={() => {
            // addRow();
            addItem();
            console.log(mainArray);
          }}
        >
          Add New Row
        </button>
        <button
          className={`${styles.submitButton} ${
            props.role == "Manager" ? styles.blueBG : styles.greenBG
          }`}
          onClick={handleClick}
        >
          Submit Store Deliver Order
        </button>
      </div>
    </div>
  );
};
