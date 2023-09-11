import React, { useContext, useState } from "react";
import styles from "./LoginPage.module.css";
import { useFetch } from "../hooks/useFetch";
import UserContext from "../context/user";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface props {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

export const LoginPage: React.FC<props> = (props) => {
  const [username, setUsername] = useState<string>("testUser");
  const [password, setPassword] = useState<string>("testUser");
  const fetchData = useFetch();
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const userLogin = async () => {
    const res = await fetchData(
      "/user/login",
      "POST",
      { username, password },
      undefined
    );

    if (res.ok) {
      console.log("ok");
      console.log(res.data);

      const decoded = jwtDecode<JwtPayload | any>(res.data.access);
      console.log("decoded");
      console.log(decoded);
      context?.setAccessToken(res.data.access);
      context?.setUserID(decoded.user_id);
      context?.setUsername(decoded.username);
      context?.setEmail(decoded.email);
      context?.setCompany(decoded.company);
      context?.setUserStatus(decoded.user_status);
      context?.setAccountType(decoded.account_type);

      props.setRole(decoded.account_type);
      props.setLogin(true);
      navigate("/main");
    } else {
      console.log("error");
      console.log(res.data);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div>{JSON.stringify(context)}</div>
      <div className={styles.loginImgDiv}>
        <img
          className={styles.loginImg}
          src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3024&q=80"
          alt="inventory"
        ></img>
        d
      </div>
      <div className={styles.loginFormDiv}>
        <img className={styles.companyLogo} src="/simulation.png"></img>
        <div className={styles.loginForm}>
          <h1 className={styles.companyName}>ManageMe</h1>
          <div className={styles.loginUsername}>
            <p className={styles.p}>Username</p>
            <input
              className={styles.input}
              placeholder="username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            ></input>
          </div>
          <div className={styles.loginPassword}>
            <p className={styles.p}>Password</p>
            <input
              className={styles.input}
              placeholder="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></input>
          </div>
          <button className={styles.loginBtn} onClick={userLogin}>
            Login
          </button>
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
