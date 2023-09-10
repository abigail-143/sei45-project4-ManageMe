import React, { useState } from "react";
import { Header } from "../Components/Header";
import { NavBar } from "../Components/NavBar";
import { DeliveryDisplay } from "../Components/DeliveryDisplay";
import { NewDeliveryOrder } from "../Components/NewDeliveryOrder";
import { DeliveryOrderSummary } from "../Components/DeliveryOrderSummary";

interface props {
  role: string;
  children?: React.ReactNode;
}

export const StaffSite: React.FC<props> = (props) => {
  const [page, setPage] = useState<string>("doSummary");
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
      {page == "doSummary" && (
        <DeliveryOrderSummary role={props.role}></DeliveryOrderSummary>
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
