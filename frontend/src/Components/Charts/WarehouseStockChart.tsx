import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useFetch } from "../../hooks/useFetch";
import UserContext from "../../context/user";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export const WarehouseStockChart: React.FC = () => {
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const fetchData = useFetch();
  const context = useContext(UserContext);

  // storing the data
  const [productID, setProductID] = useState<string[]>([]);
  const [productQty, setProductQty] = useState<number[]>([]);

  // GET data from database
  const getWarehouseData = async () => {
    const res = await fetchData(
      "/warehouse/all",
      undefined,
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("fetch data ok");
      // console.log(res.data);

      const tempProductID: string[] = res.data.map(
        (item: {
          product_id: string;
          warehouse_quantity: number;
          warehouse_stocklevel: number | null;
          cost_per_uom: number;
          product_description: string;
          unit_of_measurement: string;
          piece_per_uom: number;
          supplier: string;
          in_use: boolean;
          supplier_leadtime: number;
        }) => {
          return item.product_id;
        }
      );
      setProductID(tempProductID);

      const tempProductQty: number[] = res.data.map(
        (item: {
          product_id: string;
          warehouse_quantity: number;
          warehouse_stocklevel: number | null;
          cost_per_uom: number;
          product_description: string;
          unit_of_measurement: string;
          piece_per_uom: number;
          supplier: string;
          in_use: boolean;
          supplier_leadtime: number;
        }) => {
          return item.warehouse_quantity;
        }
      );
      setProductQty(tempProductQty);

    } else {
      console.log("fetch data error");
      console.log(res.data);
    }
  };

  const chartData = {
    labels: productID,
    datasets: [
      {
        label: "Warehouse Quantities",
        data: productQty,
        backgroundColor: "rgb(124, 157, 187)", // Customize the color
        borderColor: "rgb(124, 157, 187)",
        borderWidth: 1,
        hoverBackgroundColor: "rgb(37, 112, 179)",
        hoverBorderColor: "rgb(37, 112, 179)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Warehouse Quantity",
        },
      },
      x: {
        title: {
          display: true,
          text: "Product ID",
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  useEffect(() => {
    getWarehouseData();
  }, []);

  return (
    <Bar
      className="warehouseChart"
      data={chartData}
      options={chartOptions}
      height="420px"
    ></Bar>
  );
};
