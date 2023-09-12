import React, { useEffect, useState, useRef, useContext } from "react";
import styles from "./NewDeliveryOrder.module.css";
import { useFetch } from "../hooks/useFetch";
import UserContext from "../context/user";

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
  const [product, setProduct] = useState<{
    inventory_id: number | null;
    product_id: string | null;
    product_description: string | null;
    unit_of_measurement: string | null;
    in_use: boolean;
    supplier: string | null;
    supplier_leadtime: number | null;
    piece_per_uom: number | null;
    cost_per_uom: number | null;
  }>({
    inventory_id: null,
    product_id: null,
    product_description: null,
    unit_of_measurement: null,
    in_use: true,
    supplier: null,
    supplier_leadtime: null,
    piece_per_uom: null,
    cost_per_uom: null,
  });
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const deliveryPlacedDateRef = useRef<HTMLInputElement | null>(null);
  const toDeliverDateRef = useRef<HTMLInputElement | null>(null);
  const productIDRef = useRef<HTMLInputElement | null>(null);
  const deliveryQuantityRef = useRef<HTMLInputElement | null>(null);

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

        // after creating the delivery order, we'll add the list items to the delivery order
        const id = res.data.order.delivery_id;
        // use a loop to iterate through all the row inputs
        rowData.forEach((item) => {
          addItemsToDO(id, item);
        });

        // this is to set the delivery order id for the summary page
        props.setDOID(res.data.order.delivery_id);
      } else {
        console.log("new DO error");
        console.log(res.data);
      }
    }
  };

  // pass in the newly created product delivery id so that the items can be added
  const addItemsToDO = async (
    id: string,
    item: { productID: string; deliveryQuantity: string }
  ) => {
    const res = await fetchData(
      "/list/add",
      "PUT",
      {
        deliveryID: id,
        productID: item.productID,
        deliveryQuantity: item.deliveryQuantity,
      },
      context?.accessToken
    );

    if (res.ok) {
      console.log("add 1 item to DO ok");
      console.log(res.data);
    } else {
      console.log("add 1 item to DO error");
      console.log(res.data);
      console.log(newDOID);
    }
  };

  // for autopopulation, this works but the useRef is not individualise to the row, it's for all the rows
  const getOneProduct = async () => {
    if (productIDRef.current) {
      const res = await fetchData(
        "/products/" + productIDRef.current.value,
        "POST",
        undefined,
        context?.accessToken
      );

      if (res.ok) {
        console.log("get 1 product ok");
        console.log(res.data);
        setProduct(res.data[0]);
      } else {
        console.log("get 1 product error");
        console.log(res.data);
        console.log(product);
      }
    }
  };

  // declare a new row
  const newRow: JSX.Element = (
    <div className={styles.columnInputs}>
      <input
        ref={productIDRef}
        className={`${styles.newInput} ${styles.first}`}
        placeholder="Product ID"
        // onInput={getOneProduct}
        onChange={(event) => {
          getOneProduct();
          handleRowInputChange(index, "productID", event.target.value);
        }}
      ></input>
      <input
        className={`${styles.newInput} ${styles.middle}`}
        placeholder="Product Description"
        defaultValue={
          product.product_description ? product.product_description : ""
        }
      ></input>
      <input
        ref={deliveryQuantityRef}
        className={`${styles.newInput} ${styles.middle}`}
        placeholder="Quantity"
        onChange={(event) => {
          handleRowInputChange(index, "deliveryQuantity", event.target.value);
        }}
      ></input>
      <div className={`${styles.newInput} ${styles.last}`}>
        <select
          className={`${styles.select}`}
          id="uom"
          name="Unit of Measurement"
          defaultValue={
            product.unit_of_measurement ? product.unit_of_measurement : ""
          }
        >
          <option value="CTN">CTN</option>
          <option value="BOX">BOX</option>
          <option value="EA">EA</option>
        </select>
      </div>
    </div>
  );

  // this is the array of JSX rows to be mapped. the initial array has 1 jsx row so that it shows when the page is loaded
  const [rows, setRows] = useState<JSX.Element[]>([newRow]);
  // this rowRef is to toggle the scroll bar height
  const rowRef = useRef<HTMLDivElement | null>(null);
  // this is to track the user input for EACH row
  const [rowData, setRowData] = useState<
    { productID: string; deliveryQuantity: string }[]
  >([{ productID: "", deliveryQuantity: "" }]);

  // handle input at row change and track the user input
  const handleRowInputChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedDate = [...rowData];
    // basically, take array[0]['productID'] = 'value'
    updatedDate[index][field] = value;
    // then you update the rowData state again
    setRowData(updatedDate);
  };

  // this is to handle click and add new row
  const addRow = () => {
    // adding a new jsx element to the array to be mapped
    setRows([...rows, newRow]);
    // adding a new row input to the array to be updated and looped to add list items to DO
    setRowData([...rowData, { productID: "", deliveryQuantity: "" }]);
    if (rowRef.current) {
      rowRef.current.scrollTop = rowRef.current.scrollHeight;
    }
    console.log(rowData);
  };

  // when submitting, wait for DO to be created then show summary
  const handleClick = async () => {
    await addNewDO();
    props.setPage("doSummary");
  };

  useEffect(() => {
    console.log("rows");
    console.log(rows);
    console.log("rowData");
    console.log(rowData);
  }, []);

  return (
    <div className={styles.deliveryOrderPage}>
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
            {/* {rows.map((row) => row)} */}
            {rows.map((row, index) => {
              return (
                <div key={index} className={styles.columnInputs}>
                  <input
                    ref={productIDRef}
                    className={`${styles.newInput} ${styles.first}`}
                    placeholder="Product ID"
                    // onInput={getOneProduct}
                    onChange={(event) => {
                      getOneProduct();
                      handleRowInputChange(
                        index,
                        "productID",
                        event.target.value
                      );
                    }}
                  ></input>
                  <input
                    className={`${styles.newInput} ${styles.middle}`}
                    placeholder="Product Description"
                    defaultValue={
                      product.product_description
                        ? product.product_description
                        : ""
                    }
                  ></input>
                  <input
                    ref={deliveryQuantityRef}
                    className={`${styles.newInput} ${styles.middle}`}
                    placeholder="Quantity"
                    onChange={(event) => {
                      handleRowInputChange(
                        index,
                        "deliveryQuantity",
                        event.target.value
                      );
                    }}
                  ></input>
                  <div className={`${styles.newInput} ${styles.last}`}>
                    <select
                      className={`${styles.select}`}
                      id="uom"
                      name="Unit of Measurement"
                      defaultValue={
                        product.unit_of_measurement
                          ? product.unit_of_measurement
                          : ""
                      }
                    >
                      <option value="CTN">CTN</option>
                      <option value="BOX">BOX</option>
                      <option value="EA">EA</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          className={`${styles.addButton} ${
            props.role == "Manager" ? styles.lightBlueBG : styles.lightGreenBG
          }`}
          onClick={() => {
            addRow();
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
