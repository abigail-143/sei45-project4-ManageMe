import React from "react";
import styles from "./ProductsDisplay.module.css";

export const ProductsDisplay: React.FC = () => {
  return (
    <div className={styles.productsPage}>
      <div className={styles.pageRowOne}>
        <div className={styles.tab}>
          <h1 className={styles.title}>All Products</h1>
          <img className={styles.img} src="simulation.png"></img>
        </div>
      </div>
      <div className={styles.pageRowTwo}>
        <div className={styles.tab}>
          <h1 className={styles.title}>Warehouse Products</h1>
          <img className={styles.img} src="storage.png"></img>
        </div>
        <div className={styles.tab}>
          <h1 className={styles.title}>Store Products</h1>
          <img className={styles.img} src="shop.png"></img>
        </div>
      </div>
    </div>
  );
};
