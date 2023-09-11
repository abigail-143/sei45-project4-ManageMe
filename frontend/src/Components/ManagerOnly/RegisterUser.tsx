import React, { useContext, useEffect, useState } from "react";
import styles from "./RegisterUser.module.css";
import { useFetch } from "../../hooks/useFetch";
import UserContext from "../../context/user";

interface props {
  role: string;
  children?: React.ReactNode;
}

export const RegisterUser: React.FC<props> = (props) => {
  const fetchData = useFetch();
  const context = useContext(UserContext);
  const [users, setUsers] = useState<
    {
      username: string;
      email: String;
      company: Date;
      user_status: Boolean;
      account_type: string;
    }[]
  >([]);
  const [staffAccounts, setStaffAccounts] = useState<
    {
      username: string;
      email: String;
      company: Date;
      user_status: Boolean;
      account_type: string;
    }[]
  >([]);
  const [managerAccounts, setManagerAccounts] = useState<
    {
      username: string;
      email: String;
      company: Date;
      user_status: Boolean;
      account_type: string;
    }[]
  >([]);

  // GET all data in user_list table
  const pullAllUsers = async () => {
    const res = await fetchData(
      "/user/all",
      "GET",
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("all users ok");
      console.log(res.data);
      setUsers(res.data);
    } else {
      console.log("all users error");
      console.log(res.data);
    }

    // get users that are "staff"
    const staffUsers = await res.data.filter(
      (user: {
        username: string;
        email: String;
        company: Date;
        user_status: Boolean;
        account_type: string;
      }) => {
        return user.account_type == "Staff";
      }
    );
    setStaffAccounts(staffUsers);

    // get users that are "managers"
    const managerUsers = await res.data.filter(
      (user: {
        username: string;
        email: String;
        company: Date;
        user_status: Boolean;
        account_type: string;
      }) => {
        return user.account_type == "Manager";
      }
    );
    setManagerAccounts(managerUsers);
  };

  useEffect(() => {
    pullAllUsers();
  }, []);

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
              {managerAccounts.map((user, index) => {
                return (
                  <div key={index} className={styles.listBodyRows}>
                    <p className={`${styles.column} ${styles.username}`}>
                      {user.username}
                    </p>
                    <p className={`${styles.column} ${styles.email}`}>
                      {user.email}
                    </p>
                    <p className={`${styles.column} ${styles.status}`}>
                      {user.user_status ? "Active" : "Not Active"}
                    </p>
                  </div>
                );
              })}
              {/* {staff}
              {staff} */}
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
              {staffAccounts.map((user, index) => {
                return (
                  <div key={index} className={styles.listBodyRows}>
                    <p className={`${styles.column} ${styles.username}`}>
                      {user.username}
                    </p>
                    <p className={`${styles.column} ${styles.email}`}>
                      {user.email}
                    </p>
                    <p className={`${styles.column} ${styles.status}`}>
                      {user.user_status ? "Active" : "Not Active"}
                    </p>
                  </div>
                );
              })}
              {/* {staff}
              {staff} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
