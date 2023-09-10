import React, { useState } from "react";
import { Header } from "../Components/Header";
import { NavBar } from "../Components/NavBar";
import { NewDeliveryOrder } from "../Components/NewDeliveryOrder";

interface props {
  role: string;
  children?: React.ReactNode;
}

export const StaffSite: React.FC<props> = (props) => {
  const [page, setPage] = useState<string>("newDO");
  return (
    <>
      <Header role={props.role}></Header>
      <NavBar role={props.role}></NavBar>
      {page == "newDO" && (
        <NewDeliveryOrder role={props.role}></NewDeliveryOrder>
      )}
    </>
  );
};

// <Header />
// <NavBar />
// <Dashboard />
// <StoreDelivery />
// <StockLevels />
// <Reports />
