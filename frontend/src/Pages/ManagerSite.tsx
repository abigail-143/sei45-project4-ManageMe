import React, { useState } from "react";
import { Header } from "../Components/Header";
import { NavBar } from "../Components/NavBar";
import { RegisterUser } from "../Components/ManagerOnly/RegisterUser";
import { DeliveryDisplay } from "../Components/DeliveryDisplay";
import { PurchaseDisplay } from "../Components/ManagerOnly/PurchaseDisplay";
import { NewPurchaseOrder } from "../Components/ManagerOnly/NewPurchaseOrder";
import { PurchaseOrderSummary } from "../Components/ManagerOnly/PurchaseOrderSummary";
import { NewDeliveryOrder } from "../Components/NewDeliveryOrder";
import { DeliveryOrderSummary } from "../Components/DeliveryOrderSummary";

interface props {
  role: string;
  children?: React.ReactNode;
}

export const ManagerSite: React.FC<props> = (props) => {
  const [page, setPage] = useState<string>("doSummary");

  // navbar, onclick should set the page to something

  return (
    <>
      <Header role={props.role}></Header>
      <NavBar role={props.role}></NavBar>
      {page == "register" && <RegisterUser role={props.role}></RegisterUser>}
      {page == "purchase" && <PurchaseDisplay></PurchaseDisplay>}
      {page == "newPO" && <NewPurchaseOrder></NewPurchaseOrder>}
      {page == "poSummary" && <PurchaseOrderSummary></PurchaseOrderSummary>}
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
// <PurchaseOrder />
// <StockLevels />
// <Register />
// <Reports />
