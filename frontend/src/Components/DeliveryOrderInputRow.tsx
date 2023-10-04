import React, { useContext, useState, useRef } from "react";
import styles from "./NewDeliveryOrder.module.css";
import { useFetch } from "../hooks/useFetch";
import UserContext from "../context/user";

interface props {
  updateArray: (idx: any, productName: any, productQuantity: any) => void;
  idx: number;
  productName: string;
  productQuantity: number;
}

export const NewRow: React.FC<props> = (props) => {
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
  const productIDRef = useRef<HTMLInputElement | null>(null);

  // this is for auto-population
  const getOneProduct = async () => {
    if (productIDRef.current) {
      const res = await fetchData(
        "/products/" + productIDRef.current.value,
        "POST",
        undefined,
        context?.accessToken
      );

      if (res.ok) {
        // console.log("get 1 product ok");
        setProduct(res.data[0]);
      } 
      // else {
      //   console.log("get 1 product error");
      //   console.log(res.data);
      // }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "productID") {
      props.updateArray(props.idx, e.target.value, props.productQuantity);
    } else if (e.target.id === "quantity") {
      props.updateArray(props.idx, props.productName, e.target.value);
    }
  };

  return (
    <div className={styles.columnInputs}>
      <input
        id="productID"
        value={props.productName}
        ref={productIDRef}
        className={`${styles.newInput} ${styles.first}`}
        placeholder="Product ID"
        onChange={(e) => {
          getOneProduct();
          handleChange(e);
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
        id="quantity"
        value={props.productQuantity}
        className={`${styles.newInput} ${styles.middle}`}
        placeholder="Quantity"
        onChange={(e) => {
          handleChange(e);
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
};
