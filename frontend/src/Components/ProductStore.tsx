import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./ProductStore.module.css";
import { useFetch } from "../hooks/useFetch";
import UserContext from "../context/user";

interface props {
  role: string;
  children?: React.ReactNode;
}

export const ProductStore: React.FC<props> = (props) => {
  const fetchData = useFetch();
  const context = useContext(UserContext);
  const [storeProduct, setStoreProduct] = useState<
    {
      store_id: number;
      store_quantity: number;
      product_id: string;
      product_description: string;
      unit_of_measurement: string;
      piece_per_uom: number;
      in_use: boolean;
    }[]
  >([]);
  const productIDRef = useRef<HTMLInputElement | null>(null);
  const storeQuantityRef = useRef<HTMLInputElement | null>(null);

  // GET all store products from store table
  const pullStoreProducts = async () => {
    const res = await fetchData(
      "/store/all",
      "GET",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("all store products ok");
      // console.log(res.data);
      setStoreProduct(res.data);
    } else {
      console.log("all store products error");
      console.log(res.data);
    }
  };

  // ADD new product to store
  const addNewProductToStore = async () => {
    if (productIDRef.current && storeQuantityRef.current) {
      const res = await fetchData(
        "/store/add",
        "PUT",
        {
          productID: productIDRef.current.value,
          storeQuantity: storeQuantityRef.current.value,
        },
        context?.accessToken
      );

      if (res.ok) {
        console.log("add product to store successful");
        // console.log(res.data);
        pullStoreProducts();
        productIDRef.current.value = "";
        storeQuantityRef.current.value = "";
      } else {
        console.log("add product to store error");
        console.log(res.data);
      }
    }
  };

  useEffect(() => {
    pullStoreProducts();
  }, []);

  return (
    <div className={styles.storeProductsPage}>
      <div className={styles.firstRow}>
        <div className={styles.addForm}>
          <h1 className={styles.formTitle}>Add New Product To Store</h1>
          <div className={styles.formInput}>
            <label className={styles.label}>Product ID:</label>
            <input
              ref={productIDRef}
              className={styles.input}
              placeholder="input"
            ></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Quantity</label>
            <input
              ref={storeQuantityRef}
              className={styles.input}
              placeholder="input"
            ></input>
          </div>
          <button
            className={`${styles.addBtn} ${
              props.role == "Manager" ? styles.blue : styles.green
            }`}
            onClick={() => {
              addNewProductToStore();
            }}
          >
            Add To Store
          </button>
        </div>
      </div>
      <div className={styles.secondRow}>
        <div className={styles.productList}>
          <h2 className={styles.listTitle}>Store Products</h2>
          <div className={styles.listHeaders}>
            <div className={styles.listRows}>
              <p className={`${styles.headerInput} ${styles.first}`}>
                Product ID
              </p>
              <p className={`${styles.headerInput} ${styles.middle}`}>
                Product Description
              </p>
              <p className={`${styles.headerInput} ${styles.middle}`}>
                Store Quantity
              </p>
              <p className={`${styles.headerInput} ${styles.middle}`}>UOM</p>
              <p className={`${styles.headerInput} ${styles.last}`}>In Use</p>
            </div>
          </div>
          <div className={styles.listBody}>
            {storeProduct
              .slice()
              .reverse()
              .map((item, index) => {
                return (
                  <div key={index} className={styles.listRows}>
                    <p className={`${styles.bodyInput} ${styles.first}`}>
                      {item.product_id}
                    </p>
                    <p className={`${styles.bodyInput} ${styles.middle}`}>
                      {item.product_description}
                    </p>
                    <p className={`${styles.bodyInput} ${styles.middle}`}>
                      {item.store_quantity}
                    </p>
                    <p className={`${styles.bodyInput} ${styles.middle}`}>
                      {item.unit_of_measurement}
                    </p>
                    <p className={`${styles.bodyInput} ${styles.last}`}>
                      {item.in_use ? "in use" : "not in use"}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
