"use client";

import { Unbounded } from "next/font/google";

const fUnbounded = Unbounded({
  weight: "variable",
  subsets: ["latin"],
});

import { useState } from "react";
import InitiativeDropdown from "./_components/InitativeDataTable";
import LineChart from "./_components/LineChart";
import Navbar from "./_components/Navbar";
import Piechart from "./_components/Piechart";
import { chartDataPoints } from "./_data/chartDataPoints";
import Card from "./_components/Card";

export default function Home() {
  const [defaultCity, setDefaultCity] = useState({
    City: "Chennai",
    chemicalData: {
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
    },
  });

  return (
    <main className="max-w-[1000px] mx-auto">
      <Navbar setDefaultCity={setDefaultCity} />
      <div className="grid grid-cols-2 place-items-center gap-x-5">
        <div className="col-span-1 text-center flex flex-col h-full w-full">
          <p
            className="flex flex-col my-8"
            style={{
              ...fUnbounded.style,
            }}
          >
            <span className="text-lg font-light">Project</span>
            <span className="text-5xl font-bold">Genesis</span>
            <span className="text-sm font-light"><br></br>Make the uninhabitable, habitable</span>
          </p>

          <div className="grid flex-grow gap-5 grid-cols-2">
            <Card title="Current AQI Level" value="High" subtext="+20.1% from last month" />
            <Card title="Predicted AQI Level" value="Medium" subtext="-19.4% from this month" />
            <Card title="Total budget" value="6435 Crores" subtext="+20% from last month" />
            <Card title="Adjusted budget" value="5148 Crores" subtext="-19% from this month" />
          </div>
        </div>
          {/* <p className="text-md mb-4 max-w-xl mx-auto">
            This is the description of the project. Here you can add more information about the goals, .
          </p> */}
        <InitiativeDropdown dispCity={defaultCity.City} />
      </div>
      <div className="grid grid-cols-12 gap-x-4">
        <LineChart data={chartDataPoints} />
        <Piechart chemicalData={defaultCity.chemicalData} />
      </div>
      <iframe
        width="1000px"
        height="418px"
        className="py-10"
        allowFullScreen={true}
        src="https://lab.concord.org/embeddable.html#interactives/air-pollution/air-pollution-master.json"
      ></iframe>
    </main>
  );
}
