import React from "react";

export const DeliveryDisplay: React.FC = () => {
  const deliveredOrders: {
    orderID: number;
    orderDate: string;
    deliveredDate: string;
    orderUser: string;
  }[] = [
    {
      orderID: 1,
      orderDate: new Date().toISOString().split("T")[0],
      deliveredDate: new Date().toISOString().split("T")[0],
      orderUser: "user1",
    },
    {
      orderID: 2,
      orderDate: new Date().toISOString().split("T")[0],
      deliveredDate: new Date().toISOString().split("T")[0],
      orderUser: "user1",
    },
    {
      orderID: 3,
      orderDate: new Date().toISOString().split("T")[0],
      deliveredDate: new Date().toISOString().split("T")[0],
      orderUser: "user1",
    },
    {
      orderID: 4,
      orderDate: new Date().toISOString().split("T")[0],
      deliveredDate: new Date().toISOString().split("T")[0],
      orderUser: "user1",
    },
  ];

  const orders = deliveredOrders.map((item) => {
    return (
      <div className="listBodyRows">
        <p className="orderID">{item.orderID}</p>
        <p className="orderDate">{item.orderDate}</p>
        <p className="deliveredDate">{item.deliveredDate}</p>
        <p className="orderUser">{item.orderUser}</p>
      </div>
    );
  });
  return (
    <div className="deliveryPage">
      <div className="deliveryListDiv left">
        <div className="listTitle">
          <h1 className="titleName">Completed Deliveries</h1>
          <div className="searchBar">
            <img className="searchBarImg" src="/search.png"></img>
            <input
              className="searchBarInput"
              placeholder="Search Delivery"
            ></input>
          </div>
        </div>
        <div className="listBody">
          <div className="listBodyRowsHeader">
            <p className="orderID">Order ID</p>
            <p className="orderDate">Ordered Date</p>
            <p className="deliveredDate">Delivered Date</p>
            <p className="orderUser">Placed By</p>
          </div>
          <div className="listBodyInput">
            {orders}
            {orders}
            {orders}
            {orders}
            {orders}
            {orders}
            {orders}
          </div>
        </div>
      </div>
      <div className="deliveryListDiv right">
        <div className="listTitle">
          <h1 className="titleName">Pending Deliveries</h1>
          <div className="searchBar">
            <img className="searchBarImg" src="/search.png"></img>
            <input
              className="searchBarInput"
              placeholder="Search Delivery"
            ></input>
          </div>
        </div>
        <div className="listBody">
          <div className="listBodyRowsHeader">
            <p className="orderID">Order ID</p>
            <p className="orderDate">Ordered Date</p>
            <p className="deliveredDate">Delivered Date</p>
            <p className="orderUser">Placed By</p>
          </div>
          <div className="listBodyInput">
            {orders}
            {orders}
            {orders}
            {orders}
            {orders}
            {orders}
            {orders}
          </div>
        </div>
      </div>
    </div>
  );
};
