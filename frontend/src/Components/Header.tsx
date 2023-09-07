import React from "react";

export const Header: React.FC = () => {
  return (
    <div className="headerBar">
      <input className="searchBar" placeholder="Search Product, Order, Delivery"></input>
      <button className="button">New Purchase</button>
      <button className="button">New Delivery</button>
      <img className="profilePic" src="https://images.unsplash.com/photo-1570117268106-8e369647c733?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2635&q=80"></img>
    </div>
  );
};

// if manager <SearchBar/> 2x <OrderButton> <img></img>
// if staff <SearchBar /> 1x <OrderButton> <img></img>
