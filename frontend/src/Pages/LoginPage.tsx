import React from "react";

export const LoginPage: React.FC = () => {
  return (
    <div className="loginPage">
      <div className="loginImgDiv">
        <img
          className="loginImg"
          src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3024&q=80"
          alt="inventory"
        ></img>
      </div>
      <div className="loginFormDiv">
        <img className="companyLogo" src="/simulation.png"></img>
        <div className="loginForm">
          <h1 className="companyName">ManageMe</h1>
          <div className="loginUsername">
            <p>Username</p>
            <input placeholder="username"></input>
          </div>
          <div className="loginPassword">
            <p>Password</p>
            <input placeholder="password"></input>
          </div>
          <button className="loginBtn">Login</button>
        </div>
        <div className="smallInfo">
          <small>
            Don't have an account? <span>Contact us</span>
          </small>
        </div>
      </div>
    </div>
  );
};
