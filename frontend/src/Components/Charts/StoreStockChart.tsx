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

interface props {
  role: string;
  children?: React.ReactNode;
}

export const StoreStockChart: React.FC<props> = (props) => {
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
  const [productID, setProductID] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);

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
      // console.log(res.data);
      // setStoreStockData(res.data);

      const tempProductID = res.data.map(
        (item: {
          store_id: number;
          store_quantity: number;
          product_id: string;
          product_description: string;
          unit_of_measurement: string;
          piece_per_uom: number;
          in_use: boolean;
        }) => {
          return item.product_id;
        }
      );
      setProductID(tempProductID);

      const tempProductQuantity = res.data.map(
        (item: {
          store_id: number;
          store_quantity: number;
          product_id: string;
          product_description: string;
          unit_of_measurement: string;
          piece_per_uom: number;
          in_use: boolean;
        }) => {
          return item.store_quantity;
        }
      );
      setProductQuantity(tempProductQuantity);
    } else {
      console.log("fetch data error");
      console.log(res.data);
    }
  };

  const chartData = {
    labels: productID,
    datasets: [
      {
        label: "Store Quantities",
        data: productQuantity,
        backgroundColor:
          props.role == "Manager" ? "rgb(124, 157, 187)" : "rgb(180, 205, 147)", // Customize the color
        borderColor:
          props.role == "Manager" ? "rgb(124, 157, 187)" : "rgb(180, 205, 147)",
        borderWidth: 1,
        hoverBackgroundColor:
          props.role == "Manager" ? "rgb(37, 112, 179)" : "rgb(66, 121, 91)",
        hoverBorderColor:
          props.role == "Manager" ? "rgb(37, 112, 179)" : "rgb(66, 121, 91)",
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
    maintainAspectRatio: false,
    responsive: true,
  };

  useEffect(() => {
    getStoreData();
  }, []);

  return <Bar data={chartData} options={chartOptions} height="420px"></Bar>;
};
