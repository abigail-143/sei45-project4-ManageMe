import React from "react";
import styles from "./StockLevelStore.module.css";
import { StoreStockChart } from "./Charts/StoreStockChart";

interface props {
  role: string;
  children?: React.ReactNode;
}

export const StockLevelStore: React.FC<props> = (props) => {
  return (
    <div className={styles.stockWarehouse}>
      {/* built next time */}
      {/* <div className={styles.tabRow}>
        <div className={styles.tabSection}>
          <button className={styles.tabBtn}>Products In Use</button>
        </div>
        <div className={styles.tabSection}>
          <button className={styles.tabBtn}>Outdated Products</button>
        </div>
        <div className={styles.tabSection}>
          <label className={styles.searchLabel}>Search By Product ID:</label>
          <input className={styles.searchInput} placeholder="Product"></input>
          <button
            className={`${styles.searchBtn} ${
              props.role == "Manager" ? styles.blueBG : styles.greenBG
            }`}
          >
            Find
          </button>
        </div>
      </div> */}
      <div className={styles.tableDisplay}>
        <h1
          className={`${styles.title} ${
            props.role == "Manager" ? styles.blueFont : styles.greenFont
          }`}
        >
          Store Stock Levels
        </h1>
        <div className={styles.table}>
          <StoreStockChart role={props.role}></StoreStockChart>
        </div>
      </div>
    </div>
  );
};
