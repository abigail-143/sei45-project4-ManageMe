import React, { useState } from "react";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { RegisterUser } from "./ManagerOnly/RegisterUser";

// export interface props {
//   role: string;
//   children?: React.ReactNode;
// }

export const ManagerSite: React.FunctionComponent = () => {
  const [role, setRole] = useState<string>("Manager");

  return (
    <>
      <Header></Header>
      <NavBar></NavBar>
      <RegisterUser></RegisterUser>
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
