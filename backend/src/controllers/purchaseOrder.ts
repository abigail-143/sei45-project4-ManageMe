import { Request, Response } from "express";
import { pool } from "../db/database";

// GET all purchase orders
export const getAllPurchaseOrders = async (req: Request, res: Response) => {
  try {
    const allPurchaseOrders = await pool.query("SELECT * FROM purchase_order");

    res.json(allPurchaseOrders.rows);
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// GET all COMPLETED purchase orders
export const getAllCompletedPurchaseOrders = async (
  req: Request,
  res: Response
) => {
  try {
    const allCompletedPO = await pool.query(
      "SELECT * FROM purchase_order WHERE fulfilled = TRUE"
    );

    res.json(allCompletedPO.rows);
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// GET all PENDING purchase orders
export const getAllPendingPurchaseOrders = async (
  req: Request,
  res: Response
) => {
  try {
    const allPendingPO = await pool.query(
      "SELECT * FROM purchase_order WHERE fulfilled IS NULL OR fulfilled = FALSE"
    );

    res.json(allPendingPO.rows);
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// POST one purchase order
export const getOnePurchaseOrder = async (req: Request, res: Response) => {
  try {
    const order_id: number = Number(req.params.poID);

    // check if purchase order exists
    const onePurchaseOrder = await pool.query(
      "SELECT purchase_order.order_id, purchase_order.username, purchase_order.product_id, purchase_order.order_quantity, purchase_order.order_placed_date, purchase_order.estimated_receive_date, purchase_order.received_date, purchase_order.fulfilled, product_inventory.product_description, product_inventory.supplier, product_inventory.supplier_leadtime, product_inventory.unit_of_measurement FROM purchase_order JOIN product_inventory ON purchase_order.product_id = product_inventory.product_id WHERE purchase_order.order_id = ($1);",
      [order_id]
    );

    if (onePurchaseOrder.rows.length != 0) {
      res.json(onePurchaseOrder.rows);
    } else {
      res.json({ status: "error", message: "no such order" });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// PUT adding a new purchase order
export const addNewPurchaseOrder = async (req: Request, res: Response) => {
  try {
    const username: string = req.body.username;
    const product_id: string = req.body.productID.toUpperCase();
    const order_quantity: number = req.body.orderQuantity;
    const order_placed_date: Date = new Date(req.body.orderPlacedDate);

    // getting leadtime duration in days from product_inventory table
    const leadtime = await pool.query(
      "SELECT supplier_leadtime FROM product_inventory WHERE product_id = ($1)",
      [product_id]
    );
    const leadtimeInDays: number = leadtime.rows[0].supplier_leadtime;

    // calculate new Date using the time (milliseconds)
    const estimated_receive_date: Date = new Date(
      order_placed_date.getTime() + leadtimeInDays * 24 * 60 * 60 * 1000
    );

    // adding a new purchase order
    const placeNewPurchaseOrder = await pool.query(
      "INSERT INTO purchase_order(username, product_id, order_quantity, order_placed_date, estimated_receive_date) VALUES ($1, $2, $3, $4, $5) RETURNING order_id, username, product_id, order_quantity, order_placed_date, estimated_receive_date",
      [
        username,
        product_id,
        order_quantity,
        order_placed_date,
        estimated_receive_date,
      ]
    );

    res.json({
      status: "ok",
      message: "new purchase order created",
      order: placeNewPurchaseOrder.rows[0],
    });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// PATCH updating purchase order
export const updatePurchaseOrderWhenReceived = async (
  req: Request,
  res: Response
) => {
  // take from req
  const received_date: Date = new Date(req.body.receivedDate);
  const fulfilled: boolean = req.body.fulfilled;
  const order_id: Number = Number(req.params.poID);

  // retrieve estimated date for the order to compare with received date
  const estimated_receive_date = await pool.query(
    "SELECT estimated_receive_date FROM purchase_order WHERE order_id = ($1)",
    [order_id]
  );
  const estimated: Date = estimated_receive_date.rows[0].estimated_receive_date;

  // function to compare 2 dates
  const compareDates = (estimated: Date, received: Date): boolean => {
    if (estimated > received) {
      return true;
    } else if (received > estimated) {
      return false;
    } else {
      return true;
    }
  };

  // the function will determine if the order was on_time or late
  const on_time: boolean = compareDates(estimated, received_date);

  const updateOnePurchaseOrder = await pool.query(
    "UPDATE purchase_order SET received_date = ($1), fulfilled = ($2), on_time = ($3) WHERE order_id = ($4) RETURNING *",
    [received_date, fulfilled, on_time, order_id]
  );

  res.json({
    status: "ok",
    message: "PO updated",
    order: updateOnePurchaseOrder.rows[0],
  });
  try {
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// POST data for chart
export const getChartDataPO = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.params.productID.toUpperCase();

    const chartDataPO = await pool.query(
      "SELECT product_id, date_trunc('month', order_placed_date) AS month, SUM(order_quantity) AS total_order_quantity FROM purchase_order WHERE product_id=($1) GROUP BY product_id, month ORDER BY product_id, month;",
      [product_id]
    );

    if (chartDataPO.rows.length != 0) {
      res.json(chartDataPO.rows);
    } else {
      res.json({ status: "error", message: "no data for product" });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
