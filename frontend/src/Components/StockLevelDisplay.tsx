import React from "react";
import styles from "./StockLevelDisplay.module.css";

export const StockLevelDisplay: React.FC = () => {
  return (
    <div className={styles.stockDisplayPage}>
      <div className={styles.tab}>
        <h1 className={styles.title}>Store</h1>
        <img className={styles.img} src="/shop.png"></img>
      </div>
      <div className={styles.tab}>
        <h1 className={styles.title}>Warehouse</h1>
        <img className={styles.img} src="/storage.png"></img>
      </div>
    </div>
  );
};
