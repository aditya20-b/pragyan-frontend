import { LocationData } from "@/app/_components/LocationButton";
import { NextRequest, NextResponse } from "next/server";

export async function POST(postReq: NextRequest) {
  const reqJson: LocationData = await postReq.json();
  const posLongitude = reqJson.longitude;
  const posLattitude = reqJson.latitude;

  const fetchedData = await (
    await fetch(`${process.env.BACKEND_URL}/location`, {
      method: "POST",
      body: JSON.stringify({
        lat: posLattitude,
        long: posLongitude,
      }),
    })
  ).json();

  return NextResponse.json({
    status: 200,
    message: "success",
    data: fetchedData,
  });
}

// {City: Cityname, chemicalData: Data}
//
//

// Done

// Now next is InitiativeDropdown, we will populate you with a list of around 50 initiatives, the UI needs t

// Purle
