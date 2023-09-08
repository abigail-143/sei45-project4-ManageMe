import React, { PropsWithChildren, useState } from "react";
import { Header } from "./Header";
import { NavBar } from "./NavBar";

interface IProps {
  role: string;
}

export const ManagerSite: React.FC<IProps> = ({ role }) => {
  return (
    <>
      <Header role={role}></Header>
      <NavBar role={role}></NavBar>
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
