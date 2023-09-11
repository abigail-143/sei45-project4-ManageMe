import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductsAll.module.css";
import { useFetch } from "../hooks/useFetch";
import UserContext from "../context/user";

export const ProductsAll: React.FC = () => {
  const fetchData = useFetch();
  const context = useContext(UserContext);
  const [productList, setProductList] = useState<
    {
      inventory_id: Number;
      product_id: String;
      product_description: String;
      unit_of_measurement: String;
      in_use: Boolean;
      supplier: String;
      supplier_leadtime: Number;
      piece_per_uom: Number;
      cost_per_uom: Number;
    }[]
  >([]);

  const pullAllProducts = async () => {
    const res = await fetchData(
      "/products/all",
      "GET",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("all products ok");
      console.log(res.data);
      setProductList(res.data);
    } else {
      console.log("all producst error");
      console.log(res.data);
    }
  };

  useEffect(() => {
    pullAllProducts();
  }, []);

  return (
    <div className={styles.allProductsPage}>
      <div className={styles.firstRow}>
        <div className={styles.addForm}>
          <h1 className={styles.formTitle}>Add New Product</h1>
          <div className={styles.formInput}>
            <label className={styles.label}>Product ID:</label>
            <input className={styles.input} placeholder="input"></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Product Description:</label>
            <input className={styles.input} placeholder="input"></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Unit Of Measurement:</label>
            <select
              className={styles.inputSelect}
              id="uom"
              name="Unit of Measurement"
            >
              <option value="CTN">CTN</option>
              <option value="BOX">BOX</option>
              <option value="EA">EA</option>
            </select>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Piece Per UOM:</label>
            <input className={styles.input} placeholder="input"></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Cost Per UOM:</label>
            <input className={styles.input} placeholder="input"></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Supplier:</label>
            <input className={styles.input} placeholder="input"></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Supplier Leadtime:</label>
            <input className={styles.input} placeholder="input"></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>In Use:</label>
            <select className={styles.inputSelect} id="inUse" name="in use">
              <option value="true">In Use</option>
              <option value="false">Not In Use</option>
            </select>
          </div>
          <button className={styles.addBtn}>Add New Product</button>
        </div>
      </div>
      <div className={styles.secondRow}>
        <div className={styles.productList}>
          <h2 className={styles.listTitle}>All Products</h2>
          <div className={styles.listHeaders}>
            <div className={styles.listRows}>
              <p className={`${styles.headerInput} ${styles.first}`}>
                Product ID
              </p>
              <p className={`${styles.headerInput} ${styles.middle}`}>
                Product Description
              </p>
              <p className={`${styles.headerInput} ${styles.middle}`}>UOM</p>
              <p className={`${styles.headerInput} ${styles.middle}`}>
                Piece per UOM
              </p>
              <p className={`${styles.headerInput} ${styles.middle}`}>
                Cost per UOM
              </p>
              <p className={`${styles.headerInput} ${styles.middle}`}>
                Supplier
              </p>
              <p className={`${styles.headerInput} ${styles.middle}`}>
                Supplier Leadtime
              </p>
              <p className={`${styles.headerInput} ${styles.last}`}>In Use</p>
            </div>
          </div>
          <div className={styles.listBody}>
            {productList.map((item, index) => {
              return (
                <div key={index} className={styles.listRows}>
                  <p className={`${styles.bodyInput} ${styles.first}`}>
                    {item.product_id}
                  </p>
                  <p className={`${styles.bodyInput} ${styles.middle}`}>
                    {item.product_description}
                  </p>
                  <p className={`${styles.bodyInput} ${styles.middle}`}>
                    {item.unit_of_measurement}
                  </p>
                  <p className={`${styles.bodyInput} ${styles.middle}`}>
                    {String(item.piece_per_uom)}
                  </p>
                  <p className={`${styles.bodyInput} ${styles.middle}`}>
                    {String(item.cost_per_uom)}
                  </p>
                  <p className={`${styles.bodyInput} ${styles.middle}`}>
                    {item.supplier}
                  </p>
                  <p className={`${styles.bodyInput} ${styles.middle}`}>
                    {String(item.supplier_leadtime)}
                  </p>
                  <p className={`${styles.bodyInput} ${styles.last}`}>
                    {item.in_use ? "In Use" : "Not In Use"}
                  </p>
                </div>
              );
            })}
            {/* <div className={styles.listRows}>
              <p className={`${styles.bodyInput} ${styles.first}`}>
                Product ID
              </p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>
                Product Description
              </p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>UOM</p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>
                Piece per UOM
              </p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>
                Cost per UOM
              </p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>Supplier</p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>
                Supplier Leadtime
              </p>
              <p className={`${styles.bodyInput} ${styles.last}`}>In Use</p>
            </div> */}

            {/* <div className={styles.listRows}>
              <p className={`${styles.bodyInput} ${styles.first}`}>
                Product ID
              </p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>
                Product Description
              </p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>UOM</p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>
                Piece per UOM
              </p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>
                Cost per UOM
              </p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>Supplier</p>
              <p className={`${styles.bodyInput} ${styles.middle}`}>
                Supplier Leadtime
              </p>
              <p className={`${styles.bodyInput} ${styles.last}`}>In Use</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
