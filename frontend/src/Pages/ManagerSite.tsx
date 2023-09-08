import React, { useState } from "react";
import { Header } from "../Components/Header";
import { NavBar } from "../Components/NavBar";
import { RegisterUser } from "../Components/ManagerOnly/RegisterUser";

interface props {
  role: string;
  children?: React.ReactNode;
}

export const ManagerSite: React.FC<props> = (props) => {
  const [page, setPage] = useState<string>("register");

  // navbar, onclick should set the page to something

  return (
    <>
      <Header role={props.role}></Header>
      <NavBar role={props.role}></NavBar>
      {page == "register" && <RegisterUser role={props.role}></RegisterUser>}
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
