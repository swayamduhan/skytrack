import { NextResponse } from "next/server";

export async function GET(){
    const env = process.env.NEXT_PUBLIC_ENV
    return NextResponse.json({ message : "Server is up and running!", environment : env }, { status : 200 })
}