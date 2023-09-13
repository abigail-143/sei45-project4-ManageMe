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
  const [warehouseStockData, setWarehouseStockData] = useState<
    {
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
    }[]
  >([]);

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
      console.log(res.data);
      setWarehouseStockData(res.data);
    } else {
      console.log("fetch data error");
      console.log(res.data);
    }
  };

  const productIDs = warehouseStockData.map((item) => item.product_id);
  const productQuantities = warehouseStockData.map(
    (item) => item.warehouse_quantity
  );

  const chartData = {
    labels: productIDs,
    datasets: [
      {
        label: "Warehouse Quantities",
        data: productQuantities,
        backgroundColor: "rgba(75,192,192,0.6)", // Customize the color
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.8)",
        hoverBorderColor: "rgba(75,192,192,1)",
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
  };

  useEffect(() => {
    getWarehouseData();
  }, []);

  return <Bar data={chartData} options={chartOptions}></Bar>;
};
