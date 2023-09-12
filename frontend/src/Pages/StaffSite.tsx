import React, { useState } from "react";
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
  const [doID, setDOID] = useState<number>(0);

  return (
    <>
      <Header role={props.role} setPage={setPage} page={page}></Header>
      <NavBar role={props.role} setPage={setPage} page={page}></NavBar>
      {page == "delivery" && (
        <DeliveryDisplay
          role={props.role}
          doID={doID}
          setDOID={setDOID}
          setPage={setPage}
        ></DeliveryDisplay>
      )}
      {page == "newDO" && (
        <NewDeliveryOrder
          role={props.role}
          setPage={setPage}
          page={page}
        ></NewDeliveryOrder>
      )}
      {page == "doSummary" && (
        <DeliveryOrderSummary
          role={props.role}
          doID={doID}
          setDOID={setDOID}
        ></DeliveryOrderSummary>
      )}
      {page == "stockstore" && (
        <StockLevelStore role={props.role}></StockLevelStore>
      )}
      {page == "dashboard" && (
        <DashboardStaff
          setPage={setPage}
          doID={doID}
          setDOID={setDOID}
        ></DashboardStaff>
      )}
      {page == "storeproducts" && (
        <ProductStore role={props.role}></ProductStore>
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
