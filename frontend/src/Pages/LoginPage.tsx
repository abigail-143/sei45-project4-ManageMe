import React from "react";
import styles from "./LoginPage.module.css";

export const LoginPage: React.FC = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginImgDiv}>
        <img
          className={styles.loginImg}
          src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3024&q=80"
          alt="inventory"
        ></img>
      </div>
      <div className={styles.loginFormDiv}>
        <img className={styles.companyLogo} src="/simulation.png"></img>
        <div className={styles.loginForm}>
          <h1 className={styles.companyName}>ManageMe</h1>
          <div className={styles.loginUsername}>
            <p className={styles.p}>Username</p>
            <input className={styles.input} placeholder="username"></input>
          </div>
          <div className={styles.loginPassword}>
            <p className={styles.p}>Password</p>
            <input className={styles.input} placeholder="password"></input>
          </div>
          <button className={styles.loginBtn}>Login</button>
        </div>
        <div className={styles.smallInfo}>
          <small>
            Don't have an account?{" "}
            <span className={styles.span}>Contact us</span>
          </small>
        </div>
      </div>
    </div>
  );
};
