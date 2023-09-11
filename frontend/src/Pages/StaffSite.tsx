import React, { useEffect, useState } from "react";
import { Header } from "../Components/Header";
import { NavBar } from "../Components/NavBar";
import { DeliveryDisplay } from "../Components/DeliveryDisplay";
import { NewDeliveryOrder } from "../Components/NewDeliveryOrder";
import { DeliveryOrderSummary } from "../Components/DeliveryOrderSummary";
import { StockLevelStore } from "../Components/StockLevelStore";
import { DashboardStaff } from "../Components/DashboardStaff";
import { ProductStore } from "../Components/ProductStore";

interface props {
  role: string;
  children?: React.ReactNode;
}

export const StaffSite: React.FC<props> = (props) => {
  const [page, setPage] = useState<string>("dashboard");

  return (
    <>
      <Header role={props.role} setPage={setPage} page={page}></Header>
      <NavBar role={props.role} setPage={setPage} page={page}></NavBar>
      {page == "delivery" && (
        <DeliveryDisplay role={props.role}></DeliveryDisplay>
      )}
      {page == "newDO" && (
        <NewDeliveryOrder
          role={props.role}
          setPage={setPage}
          page={page}
        ></NewDeliveryOrder>
      )}
      {page == "doSummary" && (
        <DeliveryOrderSummary role={props.role}></DeliveryOrderSummary>
      )}
      {page == "stockstore" && (
        <StockLevelStore role={props.role}></StockLevelStore>
      )}
      {page == "dashboard" && <DashboardStaff></DashboardStaff>}
      {page == "storeproducts" && <ProductStore></ProductStore>}
    </>
  );
};

// <Header />
// <NavBar />
// <Dashboard />
// <StoreDelivery />
// <StockLevels />
// <Reports />
