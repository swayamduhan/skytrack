import { NextResponse } from "next/server";

export async function GET() {
  console.log("Request received at:", new Date().toISOString());
  
  // Simulate a 5-second delay
  await new Promise((resolve) => setTimeout(resolve, 5000));
  
  console.log("Request completed at:", new Date().toISOString());
  
  return NextResponse.json({ message: "REQUEST_SUCCESS" }, { status: 200 });
}
