import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useFetch } from "../../hooks/useFetch";
import UserContext from "../../context/user";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

interface props {
  productID: string;
  children?: React.ReactNode;
}

export const POChart: React.FC<props> = (props) => {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const fetchData = useFetch();
  const context = useContext(UserContext);

  // storing the data
  const [months, setMonths] = useState<string[]>([]);
  const [orderQuantity, setOrderQuantity] = useState<string[]>([]);

  // GET data from database
  const getPOData = async () => {
    const res = await fetchData(
      "/po/chart/" + props.productID,
      "POST",
      undefined,
      context?.accessToken
    );
    if (res.ok) {
      console.log("fetch data ok");
      console.log(res.data);

      const tempMonths = res.data.map(
        (item: {
          product_id: string;
          month: Date;
          total_order_quantity: number;
        }) => {
          return item.month;
        }
      );
      const tempMonthsAmend = tempMonths.map((item: string) => {
        return item.split("T")[0];
      });
      setMonths(tempMonthsAmend);

      const tempQuantities = res.data.map(
        (item: {
          product_id: string;
          month: Date;
          total_order_quantity: number;
        }) => {
          return item.total_order_quantity;
        }
      );
      setOrderQuantity(tempQuantities);
    } else {
      console.log("fetch data error");
      console.log(res.data);
    }
  };

  const chartData = {
    labels: months,
    datasets: [
      {
        label: props.productID,
        data: orderQuantity,
        fill: false,
        borderColor: "rgb(37, 112, 179)",
        backgroundColor: "rgb(37, 112, 179)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "PO Quantity",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Total PO Order Quantities",
      },
    },
  };

  useEffect(() => {
    getPOData();
  }, [props.productID]);

  return <Line data={chartData} options={chartOptions}></Line>;
  //   return <div>hello world</div>;
};
