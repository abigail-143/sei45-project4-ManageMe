import React, { useState } from "react";
import styles from "./StockLevelWarehouse.module.css";
import { WarehouseStockChart } from "./Charts/WarehouseStockChart";
import { POChart } from "./Charts/POChart";

export const StockLevelWarehouse: React.FC = () => {
  const [productID, setProductID] = useState<string>("SQA0001");

  return (
    <div className={styles.stockWarehouse}>
      {/* build next time */}
      {/* <div className={styles.tabRow}>
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
      </div> */}
      <div className={`${styles.tableDisplay} ${styles.one}`}>
        <h1 className={styles.title}>Warehouse Stock Levels</h1>
        <div className={styles.table}>
          <WarehouseStockChart></WarehouseStockChart>
        </div>
      </div>
      <div className={`${styles.tableDisplay} ${styles.two}`}>
        <div className={styles.secondTableHeader}>
          <h1 className={styles.title}>PO Orders</h1>
          <div className={styles.searchBar}>
            <input
              placeholder="Find Product"
              onChange={(event) => {
                const value = event.target.value;
                const upper = value.toUpperCase();
                setProductID(upper);
              }}
            ></input>
          </div>
        </div>
        <div className={styles.table}>
          <POChart productID={productID}></POChart>
        </div>
      </div>
    </div>
  );
};
