import React from "react";
import styles from "./ProductsDisplay.module.css";

interface props {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  page: string;
  children?: React.ReactNode;
}

export const ProductsDisplay: React.FC<props> = (props) => {
  return (
    <div className={styles.productsPage}>
      <div className={styles.pageRowOne}>
        <div className={styles.tab} onClick={() => {
          props.setPage("allproducts");
        }}>
          <h1 className={styles.title}>All Products</h1>
          <img className={styles.img} src="simulation.png"></img>
        </div>
      </div>
      <div className={styles.pageRowTwo}>
        <div className={`${styles.tab} ${styles.one}`} onClick={() => {
          props.setPage("warehouseproducts");
        }}>
          <h1 className={styles.title}>Warehouse Products</h1>
          <img className={styles.img} src="storage.png"></img>
        </div>
        <div className={`${styles.tab} ${styles.two}`} onClick={() => {
          props.setPage("storeproducts");
        }}>
          <h1 className={styles.title}>Store Products</h1>
          <img className={styles.img} src="shop.png"></img>
        </div>
      </div>
    </div>
  );
};
