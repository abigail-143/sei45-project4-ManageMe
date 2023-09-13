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

export const StoreStockChart: React.FC = () => {
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
  const [storeStockData, setStoreStockData] = useState<
    {
      store_id: number;
      store_quantity: number;
      product_id: string;
      product_description: string;
      unit_of_measurement: string;
      piece_per_uom: number;
      in_use: boolean;
    }[]
  >([]);

  // GET data from database
  const getStoreData = async () => {
    const res = await fetchData(
      "/store/all",
      undefined,
      undefined,
      context?.accessToken
    );

    if (res.ok) {
      console.log("fetch data ok");
      console.log(res.data);
      setStoreStockData(res.data);
    } else {
      console.log("fetch data error");
      console.log(res.data);
    }
  };

  const productIDs = storeStockData.map((item) => item.product_id);
  const productQuantities = storeStockData.map((item) => item.store_quantity);

  const chartData = {
    labels: productIDs,
    datasets: [
      {
        label: "Store Quantities",
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
          text: "Store Quantity",
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
    getStoreData();
  }, []);

  return <Bar data={chartData} options={chartOptions}></Bar>;
};
