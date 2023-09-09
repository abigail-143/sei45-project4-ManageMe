import React from "react";
import styles from "./RegisterUser.module.css";

interface props {
  role: string;
  children?: React.ReactNode;
}

export const RegisterUser: React.FC<props> = (props) => {
  const staffList: { username: string; email: string; userStatus: string }[] = [
    { username: "user1", email: "user1@staff.com", userStatus: "active" },
    { username: "user2", email: "user2@staff.com", userStatus: "active" },
    { username: "user3", email: "user3@staff.com", userStatus: "active" },
    { username: "user4", email: "user4@staff.com", userStatus: "inactive" },
  ];

  // map out the data from backend to get the table rows
  const staff = staffList.map((user, index) => {
    return (
      <div key={index} className={styles.listBodyRows}>
        <p className={`${styles.column} ${styles.username}`}>{user.username}</p>
        <p className={`${styles.column} ${styles.email}`}>{user.email}</p>
        <p className={`${styles.column} ${styles.status}`}>{user.userStatus}</p>
      </div>
    );
  });

  return (
    <>
      <div className={styles.registerPage}>
        <div className={styles.formSection}>
          <div className={styles.registerForm}>
            <h1 className={styles.register}>Register New User</h1>
            <div className={styles.registerInput}>
              <label className={styles.label}>Username:</label>
              <input className={styles.input} placeholder="username"></input>
            </div>
            <div className={styles.registerInput}>
              <label className={styles.label}>Email:</label>
              <input className={styles.input} placeholder="email"></input>
            </div>
            <div className={styles.registerInput}>
              <label className={styles.label}>Password:</label>
              <input className={styles.input} placeholder="password"></input>
            </div>
            <div className={styles.registerInput}>
              <label className={styles.label}>Company:</label>
              <input className={styles.input} placeholder="company"></input>
            </div>
            <div className={styles.registerInput}>
              <label className={styles.label}>Status:</label>
              <input className={styles.input} placeholder="status"></input>
            </div>
            <div className={styles.registerInput}>
              <label className={styles.label}>Account Type:</label>
              <input className={styles.input} placeholder="active"></input>
            </div>
            <div className={styles.btnDiv}>
              <button className={styles.registerBtn}>Register</button>
            </div>
          </div>
        </div>
        <div className={styles.listSection}>
          {/* this is the manager list */}
          <div className={styles.userList}>
            <h2 className={styles.listName}>Manager Accounts</h2>
            <div className={styles.listHeaders}>
              <div className={styles.listBodyRows}>
                <p
                  className={`${styles.column} ${styles.header} ${styles.username}`}
                >
                  Username
                </p>
                <p
                  className={`${styles.column} ${styles.header} ${styles.email}`}
                >
                  Email
                </p>
                <p
                  className={`${styles.column} ${styles.header} ${styles.status}`}
                >
                  User Status
                </p>
              </div>
            </div>
            <div className={styles.listBody}>
              {staff}
              {staff}
            </div>
          </div>
          {/* this is the staff list */}
          <div className={styles.userList}>
            <h2 className={styles.listName}>Staff Accounts</h2>
            <div className={styles.listHeaders}>
              <div className={styles.listBodyRows}>
                <p
                  className={`${styles.column} ${styles.header} ${styles.username}`}
                >
                  Username
                </p>
                <p
                  className={`${styles.column} ${styles.header} ${styles.email}`}
                >
                  Email
                </p>
                <p
                  className={`${styles.column} ${styles.header} ${styles.status}`}
                >
                  User Status
                </p>
              </div>
            </div>
            <div className={styles.listBody}>
              {staff}
              {staff}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
