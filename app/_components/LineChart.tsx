"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = ({ data }: { data: any }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Air Quality Index Prediction Over Time",
      },
    },
  };

  // Assuming 'data' is an array of objects with 'date' and 'aqi' properties
  const chartData = {
    labels: data.map((d: any) => d.date),
    datasets: [
      {
        label: "AQI",
        data: data.map((d: any) => d.aqi),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return (
    <div className="col-span-8 bg-white">
      <Line
      // @ts-ignore
        options={options}
        data={chartData}
        style={{
          width: "100%",
        }}
      />
    </div>
  );
};

export default LineChart;
