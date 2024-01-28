import { LocationData } from "@/app/_components/LocationButton";
import { NextRequest, NextResponse } from "next/server";

export async function POST(postReq: NextRequest) {
  const reqJson = await postReq.json();

  const predictDate: string = reqJson.predictDate;

  const fetchedData = await (
    await fetch(`${process.env.BACKEND_URL}/predict`, {
      method: "POST",
      body: JSON.stringify({
        date: predictDate,
      }),
    })
  ).json();

  return NextResponse.json({
    status: 200,
    message: "success",
    data: fetchedData,
  });
}
