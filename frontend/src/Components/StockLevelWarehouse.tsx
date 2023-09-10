import React from "react";
import styles from "./StockLevelWarehouse.module.css";

export const StockLevelWarehouse: React.FC = () => {
  return (
    <div className={styles.stockWarehouse}>
      <div className={styles.tabRow}>
        <div className={styles.tabSection}>
          <button className={styles.tabBtn}>All Products</button>
        </div>
        <div className={styles.tabSection}>
          <button className={styles.tabBtn}>Products Below MSL</button>
        </div>
        <div className={styles.tabSection}>
          <button className={styles.tabBtn}>Outdated Products</button>
        </div>
        <div className={styles.tabSection}>
          <label className={styles.searchLabel}>Search By Product ID:</label>
          <input className={styles.searchInput} placeholder="Product"></input>
          <button className={styles.searchBtn}>Find</button>
        </div>
      </div>
      <div className={styles.tableDisplay}>
        <h1 className={styles.title}>Warehouse Stock Levels</h1>
        <div className={styles.table}>this is a table</div>
      </div>
    </div>
  );
};
