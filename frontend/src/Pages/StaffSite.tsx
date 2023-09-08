import React from "react";
import { Header } from "../Components/Header";
import { NavBar } from "../Components/NavBar";

interface props {
  role: string;
  children?: React.ReactNode;
}

export const StaffSite: React.FC<props> = (props) => {
  return (
    <>
      <Header role={props.role}></Header>
      <NavBar role={props.role}></NavBar>
    </>
  );
};

// <Header />
// <NavBar />
// <Dashboard />
// <StoreDelivery />
// <StockLevels />
// <Reports />
