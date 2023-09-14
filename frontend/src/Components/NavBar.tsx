import React from "react";
import styles from "./NavBar.module.css";

interface props {
  role: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  page: string;
  children?: React.ReactNode;
}

export const NavBar: React.FC<props> = (props) => {
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
              <a
                href="javascript:void(0)"
                onClick={() => props.setPage("dashboard")}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                onClick={() => {
                  props.setPage("delivery");
                  console.log(props.page);
                }}
              >
                Store Delivery
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                onClick={() => {
                  props.setPage("purchase");
                  console.log(props.page);
                }}
              >
                Purchase Orders
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                onClick={() => {
                  props.setPage("stocklevel");
                  console.log(props.page);
                }}
              >
                Stock Levels
              </a>
            </li>
            {/* build next time */}
            {/* <li>
              <a
                href="javascript:void(0)"
                onClick={() => {
                  props.setPage("report");
                  console.log(props.page);
                }}
              >
                Reports
              </a>
            </li> */}
            <li>
              <a
                href="javascript:void(0)"
                onClick={() => {
                  props.setPage("register");
                  console.log(props.page);
                }}
              >
                Register User
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                onClick={() => {
                  props.setPage("products");
                  console.log(props.page);
                }}
              >
                Products
              </a>
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
              <a
                href="javascript:void(0)"
                onClick={() => {
                  props.setPage("dashboard");
                  console.log(props.page);
                }}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                onClick={() => {
                  props.setPage("delivery");
                  console.log(props.page);
                }}
              >
                Store Delivery
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                onClick={() => {
                  props.setPage("stockstore");
                  console.log(props.page);
                }}
              >
                Stock Levels
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                onClick={() => {
                  props.setPage("report");
                  console.log(props.page);
                }}
              >
                Reports
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                onClick={() => {
                  props.setPage("storeproducts");
                  console.log(props.page);
                }}
              >
                Products
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

// if manager 5-6 links
// if staff 3-4 links
