import React from "react";
import styles from "./NavBar.module.css";

export const NavBar: React.FC = () => {
  return (
    <div className={styles.navbar}>
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
  );
};

// if manager 5-6 links
// if staff 3-4 links
