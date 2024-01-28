"use client";

import React, { SVGProps, useState } from "react";
import { Outfit } from "next/font/google";
import { Button } from "@/components/ui/button";

export const fontOutfit = Outfit({
  weight: "variable",
  subsets: ["latin"],
});

// Define a type for the location data
export type LocationData = {
  latitude: number;
  longitude: number;
};

export function MaterialSymbolsLocationOnRounded(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 21.325q-.35 0-.7-.125t-.625-.375Q9.05 19.325 7.8 17.9t-2.087-2.762q-.838-1.338-1.275-2.575T4 10.2q0-3.75 2.413-5.975T12 2q3.175 0 5.588 2.225T20 10.2q0 1.125-.437 2.363t-1.275 2.575Q17.45 16.475 16.2 17.9t-2.875 2.925q-.275.25-.625.375t-.7.125M12 12q.825 0 1.413-.587T14 10q0-.825-.587-1.412T12 8q-.825 0-1.412.588T10 10q0 .825.588 1.413T12 12"
      ></path>
    </svg>
  );
}

export const LocationButton = ({
  setDefaultCity,
}: {
  setDefaultCity: CallableFunction;
}) => {
  const [location, setLocation] = useState<LocationData | null>(null);

  async function getAndSendLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
    if (location) {
      const fetchedLocation = await (
        await fetch(`/api/location`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(location),
        })
      ).json();

      return fetchedLocation.data.City;
    }
  }

  return (
    <div className="col-span-2">
      <Button
        onClick={async () => {
          setDefaultCity(getAndSendLocation());
        }}
      >
        <MaterialSymbolsLocationOnRounded className="text-xl" />
        <p className="ml-2">Location</p>
      </Button>
    </div>
  );
};
