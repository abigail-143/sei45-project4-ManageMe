import React, { useState } from "react";
import { Header } from "../Components/Header";
import { NavBar } from "../Components/NavBar";
import { DeliveryDisplay } from "../Components/DeliveryDisplay";
import { NewDeliveryOrder } from "../Components/NewDeliveryOrder";

interface props {
  role: string;
  children?: React.ReactNode;
}

export const StaffSite: React.FC<props> = (props) => {
  const [page, setPage] = useState<string>("delivery");
  return (
    <>
      <Header role={props.role}></Header>
      <NavBar role={props.role}></NavBar>
      {page == "delivery" && (
        <DeliveryDisplay role={props.role}></DeliveryDisplay>
      )}
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
