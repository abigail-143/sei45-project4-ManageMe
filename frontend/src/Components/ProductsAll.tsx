import React, { useContext, useEffect, useRef, useState } from "react";
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
  const productIDRef = useRef<HTMLInputElement | null>(null);
  const productDescriptionRef = useRef<HTMLInputElement | null>(null);
  const supplierRef = useRef<HTMLInputElement | null>(null);
  const supplierLeadtimeRef = useRef<HTMLInputElement | null>(null);
  const piecePerUOMRef = useRef<HTMLInputElement | null>(null);
  const costPerUOMRef = useRef<HTMLInputElement | null>(null);
  const inUseRef = useRef<HTMLSelectElement | null>(null);
  const uomRef = useRef<HTMLSelectElement | null>(null);

  // GET all products from product_inventory table
  const pullAllProducts = async () => {
    const res = await fetchData(
      "/products/all",
      "GET",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("all products ok");
      // console.log(res.data);
      setProductList(res.data);
    } else {
      console.log("all producst error");
      console.log(res.data);
    }
  };

  // ADD new product to product_inventory table
  const addNewProduct = async () => {
    if (
      productIDRef.current &&
      productDescriptionRef.current &&
      uomRef.current &&
      inUseRef.current &&
      supplierRef.current &&
      supplierLeadtimeRef.current &&
      piecePerUOMRef.current &&
      costPerUOMRef.current
    ) {
      const res = await fetchData(
        "/products/new",
        "PUT",
        {
          productID: productIDRef.current.value,
          productDescription: productDescriptionRef.current.value,
          unitOfMeasurement: uomRef.current.value,
          inUse: inUseRef.current.value,
          supplier: supplierRef.current.value,
          supplierLeadtime: supplierLeadtimeRef.current.value,
          piecePerUOM: piecePerUOMRef.current.value,
          costPerUOM: costPerUOMRef.current.value,
        },
        context?.accessToken
      );

      if (res.ok) {
        console.log("add product successful");
        // console.log(res.data);
        pullAllProducts();
        productIDRef.current.value = "";
        productDescriptionRef.current.value = "";
        uomRef.current.value = "CTN";
        inUseRef.current.value = "true";
        supplierRef.current.value = "";
        supplierLeadtimeRef.current.value = "";
        piecePerUOMRef.current.value = "";
        costPerUOMRef.current.value = "";
      } else {
        console.log("add product error");
        console.log(res.data);
      }
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
            <input
              ref={productIDRef}
              className={styles.input}
              placeholder="input"
            ></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Product Description:</label>
            <input
              ref={productDescriptionRef}
              className={styles.input}
              placeholder="input"
            ></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Unit Of Measurement:</label>
            <select
              className={styles.inputSelect}
              id="uom"
              name="uom"
              defaultValue={"CTN"}
              ref={uomRef}
            >
              <option value="CTN">CTN</option>
              <option value="BOX">BOX</option>
              <option value="EA">EA</option>
            </select>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Piece Per UOM:</label>
            <input
              ref={piecePerUOMRef}
              className={styles.input}
              placeholder="input"
            ></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Cost Per UOM:</label>
            <input
              ref={costPerUOMRef}
              className={styles.input}
              placeholder="input"
            ></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Supplier:</label>
            <input
              ref={supplierRef}
              className={styles.input}
              placeholder="input"
            ></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>Supplier Leadtime:</label>
            <input
              ref={supplierLeadtimeRef}
              className={styles.input}
              placeholder="input"
            ></input>
          </div>
          <div className={styles.formInput}>
            <label className={styles.label}>In Use:</label>
            <select
              ref={inUseRef}
              className={styles.inputSelect}
              id="inUse"
              name="inUse"
            >
              <option value="true">In Use</option>
              <option value="false">Not In Use</option>
            </select>
          </div>
          <button
            className={styles.addBtn}
            onClick={() => {
              addNewProduct();
            }}
          >
            Add New Product
          </button>
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
            {/* this will reverse the map so that the last item in the array gets mapped first. we do .slice() to create a shadow copy before reverse() so that the original array won't get messed up */}
            {productList.slice().reverse().map((item, index) => {
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
          </div>
        </div>
      </div>
    </div>
  );
};
