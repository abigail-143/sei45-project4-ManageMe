import React, { useContext, useState } from "react";
import UserContext from "../context/user";

import { Header } from "../Components/Header";
import { NavBar } from "../Components/NavBar";
import { RegisterUser } from "../Components/ManagerOnly/RegisterUser";
import { DeliveryDisplay } from "../Components/DeliveryDisplay";
import { PurchaseDisplay } from "../Components/ManagerOnly/PurchaseDisplay";
import { NewPurchaseOrder } from "../Components/ManagerOnly/NewPurchaseOrder";
import { PurchaseOrderSummary } from "../Components/ManagerOnly/PurchaseOrderSummary";
import { NewDeliveryOrder } from "../Components/NewDeliveryOrder";
import { DeliveryOrderSummary } from "../Components/DeliveryOrderSummary";
import { StockLevelDisplay } from "../Components/StockLevelDisplay";
import { StockLevelWarehouse } from "../Components/StockLevelWarehouse";
import { StockLevelStore } from "../Components/StockLevelStore";
import { DashboardManager } from "../Components/DashboardManager";
import { ProductsDisplay } from "../Components/ProductsDisplay";
import { ProductsAll } from "../Components/ProductsAll";
import { ProductStore } from "../Components/ProductStore";
import { ProductWarehouse } from "../Components/ProductWarehouse";

interface props {
  role: string;
  children?: React.ReactNode;
}

export const ManagerSite: React.FC<props> = (props) => {
  const [page, setPage] = useState<string>("warehouseproducts");
  const context = useContext(UserContext);
  const [poID, setPOID] = useState<number>(0);
  const [productID, setProductID] = useState<string>("");

  // navbar, onclick should set the page to something

  return (
    <>
      <Header role={props.role} setPage={setPage} page={page}></Header>
      <NavBar role={props.role} setPage={setPage} page={page}></NavBar>
      {page == "register" && <RegisterUser role={props.role}></RegisterUser>}
      {page == "purchase" && (
        <PurchaseDisplay
          poID={poID}
          setPOID={setPOID}
          setPage={setPage}
          page={page}
          productID={productID}
          setProductID={setProductID}
        ></PurchaseDisplay>
      )}
      {page == "newPO" && (
        <NewPurchaseOrder setPage={setPage} page={page}></NewPurchaseOrder>
      )}
      {page == "poSummary" && poID != 0 && (
        <PurchaseOrderSummary
          poID={poID}
          productID={productID}
        ></PurchaseOrderSummary>
      )}
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
      {page == "stocklevel" && (
        <StockLevelDisplay page={page} setPage={setPage}></StockLevelDisplay>
      )}
      {page == "stockwarehouse" && <StockLevelWarehouse></StockLevelWarehouse>}
      {page == "stockstore" && (
        <StockLevelStore role={props.role}></StockLevelStore>
      )}
      {page == "dashboard" && (
        <DashboardManager
          poID={poID}
          setPOID={setPOID}
          setPage={setPage}
          page={page}
          productID={productID}
          setProductID={setProductID}
        ></DashboardManager>
      )}
      {page == "products" && <ProductsDisplay></ProductsDisplay>}
      <div>{JSON.stringify(context)}</div>
      {page == "allproducts" && <ProductsAll></ProductsAll>}
      {page == "storeproducts" && <ProductStore></ProductStore>}
      {page == "warehouseproducts" && <ProductWarehouse></ProductWarehouse>}
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
