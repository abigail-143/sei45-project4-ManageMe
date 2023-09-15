import React from "react";
import styles from "./Header.module.css";

interface props {
  role: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  page: string;
  children?: React.ReactNode;
}

export const Header: React.FC<props> = (props) => {
  return (
    <>
      {props.role === "Manager" ? (
        <div className={styles.headerBar}>
          {/* build next time */}
          {/* <div className={styles.searchBar}>
            <img className={styles.searchIcon} src="search.png"></img>
            <input
              className={styles.input}
              placeholder="Search Product, Order, Delivery"
            ></input>
          </div> */}
          <button
            className={`${styles.button} ${styles.purchase}  ${styles.blue}`}
            onClick={() => props.setPage("newPO")}
          >
            New Purchase
          </button>
          <button
            className={`${styles.button} ${styles.delivery}  ${styles.blue}`}
            onClick={() => props.setPage("newDO")}
          >
            New Delivery
          </button>
          <img
            className={styles.profilePic}
            src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          ></img>
        </div>
      ) : (
        <div className={styles.headerBar}>
          {/* build next time */}
          {/* <div className={styles.searchBar}>
            <img className={styles.searchIcon} src="search.png"></img>
            <input
              className={styles.input}
              placeholder="Search Product, Order, Delivery"
            ></input>
          </div> */}
          <button
            className={`${styles.button} ${styles.delivery}  ${styles.green}`}
            onClick={() => props.setPage("newDO")}
          >
            New Delivery
          </button>
          <img
            className={styles.profilePic}
            src="https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGNhdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          ></img>
        </div>
      )}
    </>
  );
};

// if manager <SearchBar/> 2x <OrderButton> <img></img>
// if staff <SearchBar /> 1x <OrderButton> <img></img>
