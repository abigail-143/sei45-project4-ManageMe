import React, { useState } from "react";
import styles from "./NavBar.module.css";

interface props {
  role: string;
  children?: React.ReactNode;
}

export const NavBar: React.FC<props> = (props) => {
  // const [role, setRole] = useState<string>("Manager");
  return (
    <>
      {props.role === "Manager" ? (
        <div className={`${styles.navbar} ${styles.blue}`}>
          <div className={styles.companyLogo}>
            <img className={styles.companyImg} src="/simulation.png"></img>
            <p className={styles.companyName}>ManageMe</p>
          </div>

          <ul className={styles.navlinks}>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Store Delivery</a>
            </li>
            <li>
              <a href="#">Purchase Orders</a>
            </li>
            <li>
              <a href="#">Stock Levels</a>
            </li>
            <li>
              <a href="#">Reports</a>
            </li>
            <li>
              <a href="#">Register User</a>
            </li>
          </ul>
        </div>
      ) : (
        <div className={`${styles.navbar} ${styles.green}`}>
          <div className={styles.companyLogo}>
            <img className={styles.companyImg} src="/simulation.png"></img>
            <p className={styles.companyName}>ManageMe</p>
          </div>

          <ul className={styles.navlinks}>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Store Delivery</a>
            </li>
            <li>
              <a href="#">Stock Levels</a>
            </li>
            <li>
              <a href="#">Reports</a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

// if manager 5-6 links
// if staff 3-4 links
