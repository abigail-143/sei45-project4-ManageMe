import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./ProductWarehouse.module.css";
import { useFetch } from "../hooks/useFetch";
import UserContext from "../context/user";

export const ProductWarehouse: React.FC = () => {
  const fetchData = useFetch();
  const context = useContext(UserContext);
  const [warehouseProduct, setWarehouseProduct] = useState<
    {
      product_id: string;
      warehouse_quantity: number;
      warehouse_stocklevel: number | null;
      cost_per_uom: number;
      product_description: string;
      unit_of_measurement: string;
      piece_per_uom: number;
      supplier: string;
      in_use: boolean;
      supplier_leadtime: number;
    }[]
  >([]);
  const productIDRef = useRef<HTMLInputElement | null>(null);
  const warehouseQuantityRef = useRef<HTMLInputElement | null>(null);

  // GET all products in warehouse
  const pullWarehouseProducts = async () => {
    const res = await fetchData(
      "/warehouse/all",
      "GET",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("all warehouse product ok");
      console.log(res.data);
      setWarehouseProduct(res.data);
    } else {
      console.log("all warehouse product error");
      console.log(res.data);
    }
  };

  // ADD new product to warehouse
  const addNewProductToWarehouse = async () => {
    if (productIDRef.current && warehouseQuantityRef.current) {
      const res = await fetchData(
        "/warehouse/add",
        "PUT",
        {
          productID: productIDRef.current.value,
          warehouseQuantity: warehouseQuantityRef.current.value,
        },
        context?.accessToken
      );

      if (res.ok) {
        console.log("add product to warehouse successful");
        console.log(res.data);
        pullWarehouseProducts();
        productIDRef.current.value = "";
        warehouseQuantityRef.current.value = "";
      } else {
        console.log("add product to warehouse error");
        console.log(res.data);
      }
    }
  };

  useEffect(() => {
    pullWarehouseProducts();
  }, []);

  return (
    <div className={styles.warehouseProductsPage}>
      <div className={styles.firstRow}>
        <div className={styles.addForm}>
          <h1 className={styles.formTitle}>Add New Product To Warehouse</h1>
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
              ref={warehouseQuantityRef}
              className={styles.input}
              placeholder="input"
            ></input>
          </div>
          <button
            className={styles.addBtn}
            onClick={() => {
              addNewProductToWarehouse();
            }}
          >
            Add To Warehouse
          </button>
        </div>
      </div>
      <div className={styles.secondRow}>
        <div className={styles.productList}>
          <h2 className={styles.listTitle}>Warehouse Products</h2>
          <div className={styles.listHeaders}>
            <div className={styles.listRows}>
              <p className={`${styles.headerInput} ${styles.first}`}>
                Product ID
              </p>
              <p className={`${styles.headerInput} ${styles.middle}`}>
                Product Description
              </p>
              <p className={`${styles.headerInput} ${styles.middle}`}>
                Warehouse Quantity
              </p>
              <p className={`${styles.headerInput} ${styles.middle}`}>UOM</p>
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
            {warehouseProduct
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
                      {item.warehouse_quantity}
                    </p>
                    <p className={`${styles.bodyInput} ${styles.middle}`}>
                      {item.unit_of_measurement}
                    </p>
                    <p className={`${styles.bodyInput} ${styles.middle}`}>
                      ${item.cost_per_uom}
                    </p>
                    <p className={`${styles.bodyInput} ${styles.middle}`}>
                      {item.supplier}
                    </p>
                    <p className={`${styles.bodyInput} ${styles.middle}`}>
                      {item.supplier_leadtime} days
                    </p>
                    <p className={`${styles.bodyInput} ${styles.last}`}>
                      {item.in_use ? "in use" : "not in use"}
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
