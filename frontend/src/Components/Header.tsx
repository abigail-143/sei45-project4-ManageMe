import React, { useState } from "react";
import styles from "./Header.module.css";

interface props {
  role: string;
  children?: React.ReactNode;
}

export const Header: React.FC<props> = (props) => {

  return (
    <>
      {props.role === "Manager" ? (
        <div className={styles.headerBar}>
          <div className={styles.searchBar}>
            <img className={styles.searchIcon} src="search.png"></img>
            <input
              className={styles.input}
              placeholder="Search Product, Order, Delivery"
            ></input>
          </div>
          <button
            className={`${styles.button} ${styles.purchase}  ${styles.blue}`}
          >
            New Purchase
          </button>
          <button
            className={`${styles.button} ${styles.delivery}  ${styles.blue}`}
          >
            New Delivery
          </button>
          <img
            className={styles.profilePic}
            src="https://images.unsplash.com/photo-1570117268106-8e369647c733?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2635&q=80"
          ></img>
        </div>
      ) : (
        <div className={styles.headerBar}>
          <div className={styles.searchBar}>
            <img className={styles.searchIcon} src="search.png"></img>
            <input
              className={styles.input}
              placeholder="Search Product, Order, Delivery"
            ></input>
          </div>
          <button
            className={`${styles.button} ${styles.delivery}  ${styles.green}`}
          >
            New Delivery
          </button>
          <img
            className={styles.profilePic}
            src="https://images.unsplash.com/photo-1570117268106-8e369647c733?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2635&q=80"
          ></img>
        </div>
      )}
    </>
  );
};

// if manager <SearchBar/> 2x <OrderButton> <img></img>
// if staff <SearchBar /> 1x <OrderButton> <img></img>
