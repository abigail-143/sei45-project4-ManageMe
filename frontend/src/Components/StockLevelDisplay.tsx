import React from "react";
import styles from "./StockLevelDisplay.module.css";

interface props {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  page: string;
  children?: React.ReactNode;
}

export const StockLevelDisplay: React.FC<props> = (props) => {
  return (
    <div className={styles.stockDisplayPage}>
      <div
        className={styles.tab}
        onClick={() => {
          props.setPage("stockstore");
        }}
      >
        <h1 className={styles.title}>Store</h1>
        <img className={styles.img} src="/shop.png"></img>
      </div>
      <div
        className={styles.tab}
        onClick={() => {
          props.setPage("stockwarehouse");
        }}
      >
        <h1 className={styles.title}>Warehouse</h1>
        <img className={styles.img} src="/storage.png"></img>
      </div>
    </div>
  );
};
