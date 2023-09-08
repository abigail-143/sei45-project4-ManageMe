import React from "react";
import { Header } from "../Header";
import { NavBar } from "../NavBar";

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
      <div key={index} className="listBodyRows">
        <p className="column username">{user.username}</p>
        <p className="column email">{user.email}</p>
        <p className="column status">{user.userStatus}</p>
      </div>
    );
  });

  return (
    <>
      <Header role="Manager"></Header>
      <NavBar role="Manager"></NavBar>
      <div className="registerPage">
        <div className="formSection">
          <div className="registerForm">
            <h1 className="register">Register New User</h1>
            <div className="registerInput">
              <label className="label">Username:</label>
              <input className="input" placeholder="username"></input>
            </div>
            <div className="registerInput">
              <label className="label">Email:</label>
              <input className="input" placeholder="email"></input>
            </div>
            <div className="registerInput">
              <label className="label">Password:</label>
              <input className="input" placeholder="password"></input>
            </div>
            <div className="registerInput">
              <label className="label">Company:</label>
              <input className="input" placeholder="company"></input>
            </div>
            <div className="registerInput">
              <label className="label">Status:</label>
              <input className="input" placeholder="status"></input>
            </div>
            <div className="registerInput">
              <label className="label">Account Type:</label>
              <input className="input" placeholder="active"></input>
            </div>
            <div className="btnDiv">
              <button className="registerBtn">Register</button>
            </div>
          </div>
        </div>
        <div className="listSection">
          {/* this is the manager list */}
          <div className="userList">
            <h2 className="listName">Manager Accounts</h2>
            <div className="listHeaders">
              <div className="listBodyRows">
                <p className="column header username">Username</p>
                <p className="column header email">Email</p>
                <p className="column header status">User Status</p>
              </div>
            </div>
            <div className="listBody">
              {staff}
              {staff}
            </div>
          </div>
          {/* this is the staff list */}
          <div className="userList">
            <h2 className="listName">Staff Accounts</h2>
            <div className="listHeaders">
              <div className="listBodyRows">
                <p className="column header username">Username</p>
                <p className="column header email">Email</p>
                <p className="column header status">User Status</p>
              </div>
            </div>
            <div className="listBody">
              {staff}
              {staff}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
