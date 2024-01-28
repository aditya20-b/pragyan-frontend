"use client";

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";

ChartJs.register(Tooltip, Title, ArcElement, Legend);

export default function Piechart({
  chemicalData,
}: {
  chemicalData: {
    NO: number;
    NO2: number;
    NOx: number;
    NH3: number;
    CO: number;
    SO2: number;
    O3: number;
    Benzene: number;
    Toluene: number;
    Xylene: number;
  };
}) {
  const [data, setData] = useState({
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ["red", "blue", "yellow", "green", "black", "orange"],
      },
    ],
    labels: ["Red", "Yellow", "Blue"],
  });
  useEffect(() => {
    const fetchData = () => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((data) => {
          const res = data.json();
          return res;
        })
        .then((res) => {
          console.log("resss", res);
          const label = [];
          const data = [];
          for (var i of res) {
            label.push(i.name);
            data.push(i.id);
          }
          const e = {
            NO: 69.16,
            NO2: 36.39,
            NOx: 110.59,
            NH3: 33.85,
            CO: 15.2,
            SO2: 9.25,
            O3: 41.68,
            Benzene: 14.36,
            Toluene: 24.86,
            Xylene: 9.84,
          };

          setData({
            datasets: [
              {
                data: Object.values(e),
                backgroundColor: ["red", "blue", "yellow"],
              },
            ],
            labels: Object.keys(e),
          });
        })
        .catch((e) => {
          console.log("error", e);
        });
    };
    fetchData();
  }, []);
  return (
    <div className="App col-span-4 bg-white">
      <Doughnut data={data} />
    </div>
  );
}
