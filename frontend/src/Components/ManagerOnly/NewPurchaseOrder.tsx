import React, { useContext, useRef, useState } from "react";
import styles from "./NewPurchaseOrder.module.css";
import { useFetch } from "../../hooks/useFetch";
import UserContext from "../../context/user";

interface props {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setPOID: React.Dispatch<React.SetStateAction<number>>;
  page: string;
  children?: React.ReactNode;
}

export const NewPurchaseOrder: React.FC<props> = (props) => {
  const fetchData = useFetch();
  const context = useContext(UserContext);
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
  const productIDRef = useRef<HTMLInputElement | null>(null);
  const orderQuantityRef = useRef<HTMLInputElement | null>(null);
  const orderPlacedDateRef = useRef<HTMLInputElement | null>(null);

  // ADD new PO
  const addNewPO = async () => {
    if (
      usernameRef.current &&
      productIDRef.current &&
      orderQuantityRef.current &&
      orderPlacedDateRef.current
    ) {
      const res = await fetchData(
        "/po/new",
        "PUT",
        {
          username: usernameRef.current.value,
          productID: productIDRef.current.value,
          orderQuantity: orderQuantityRef.current.value,
          orderPlacedDate: orderPlacedDateRef.current.value,
        },
        context?.accessToken
      );

      if (res.ok) {
        console.log("add new PO ok");
        console.log(res.data.order);
        // setNewPO(res.data.order);
        props.setPOID(res.data.order.order_id);
      } else {
        console.log("add new PO error");
        console.log(res.data);
      }
    }
  };

  // get 1 product to auto-populate fields
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

  // need to include updating backend database
  const handleClick = async () => {
    // create the po first
    await addNewPO();
    props.setPage("poSummary");
  };

  return (
    <div className={styles.purchaseOrderPage}>
      <div className={styles.purchaseOrderBox}>
        <h1 className={styles.boxHeader}>New Purchase Order</h1>
        <div className={styles.orderDetails}>
          <div className={`${styles.orderDetailsInput} ${styles.left}`}>
            <div className={styles.labelInput}>
              <label>Order Placed By:</label>
              <input
                ref={usernameRef}
                placeholder="username"
                defaultValue={context?.username}
              ></input>
            </div>
            <div className={styles.labelInput}>
              <label>Date of Purchase Order:</label>
              <input
                ref={orderPlacedDateRef}
                id="date"
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
              ></input>
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
            <input
              onInput={() => {
                getOneProduct();
              }}
              ref={productIDRef}
              placeholder="Product ID"
            ></input>
            <input
              defaultValue={
                product.product_description ? product.product_description : ""
              }
              placeholder="Product Description"
            ></input>
            <input ref={orderQuantityRef} placeholder="Quantity"></input>
            <select
              className={styles.select}
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
            <input
              defaultValue={product.supplier ? product.supplier : ""}
              placeholder="Supplier"
            ></input>
            <input
              defaultValue={
                product.supplier_leadtime ? product.supplier_leadtime : ""
              }
              placeholder="Lead Time"
            ></input>
          </div>
        </div>
        <button className={styles.submitButton} onClick={handleClick}>
          Submit Purchase Order
        </button>
      </div>
    </div>
  );
};
