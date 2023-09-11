import React from "react";

export const ProductStore: React.FC = () => {
  return (
    <div className="storeProductsPage">
      <div className="firstRow">
        <div className="addForm">
          <h1 className="formTitle">Add New Product To Store</h1>
          <div className="formInput">
            <label className="label">Product ID:</label>
            <input className="input" placeholder="input"></input>
          </div>
          <div className="formInput">
            <label className="label">Quantity</label>
            <input className="input" placeholder="input"></input>
          </div>
          <button className="addBtn">Add To Store</button>
        </div>
      </div>
      <div className="secondRow">
        <div className="productList">
          <h2 className="listTitle">Store Products</h2>
          <div className="listHeaders">
            <div className="listRows">
              <p className="headerInput first">Product ID</p>
              <p className="headerInput middle">Product Description</p>
              <p className="headerInput middle">UOM</p>
              <p className="headerInput middle">Piece per UOM</p>
              <p className="headerInput middle">Cost per UOM</p>
              <p className="headerInput middle">Supplier</p>
              <p className="headerInput middle">Supplier Leadtime</p>
              <p className="headerInput last">In Use</p>
            </div>
          </div>
          <div className="listBody">
            <div className="listRows">
              <p className="bodyInput first">Product ID</p>
              <p className="bodyInput middle">Product Description</p>
              <p className="bodyInput middle">UOM</p>
              <p className="bodyInput middle">Piece per UOM</p>
              <p className="bodyInput middle">Cost per UOM</p>
              <p className="bodyInput middle">Supplier</p>
              <p className="bodyInput middle">Supplier Leadtime</p>
              <p className="bodyInput last">In Use</p>
            </div>
            <div className="listRows">
              <p className="bodyInput first">Product ID</p>
              <p className="bodyInput middle">Product Description</p>
              <p className="bodyInput middle">UOM</p>
              <p className="bodyInput middle">Piece per UOM</p>
              <p className="bodyInput middle">Cost per UOM</p>
              <p className="bodyInput middle">Supplier</p>
              <p className="bodyInput middle">Supplier Leadtime</p>
              <p className="bodyInput last">In Use</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
