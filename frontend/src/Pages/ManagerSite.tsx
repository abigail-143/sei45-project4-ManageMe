import React from "react";
import { Header } from "../Components/Header";
import { NavBar } from "../Components/NavBar";

interface props {
  role: string;
  children?: React.ReactNode;
}

export const ManagerSite: React.FC<props> = (props) => {
  return (
    <>
      <Header role={props.role}></Header>
      <NavBar role={props.role}></NavBar>
      <h1>manager site</h1>
    </>
  );
};

// <Header />
// <NavBar />
// <Dashboard />
// <StoreDelivery />
// <PurchaseOrder />
// <StockLevels />
// <Register />
// <Reports />
