import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const { userId } = await req.json()
    if(!userId) return NextResponse.json({ message : "INVALID_ID"}, { status : 400 })
    try{
        const userCards = await prisma.flightCard.findMany({ where : { userId }})
        return NextResponse.json({ message : "Cards fetched successfully!", cards : userCards }, { status : 200 })
    } catch(err) {
        return NextResponse.json({ message : "Failed to fetch cards!", error : err }, { status : 500 })
    }
}