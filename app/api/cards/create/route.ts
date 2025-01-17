import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const { origin, destination, beginTime, endTime, departureDate } = await req.json()

    if(!origin || !destination || !beginTime || !endTime || !departureDate){
        return NextResponse.json({ message : "Incomplete inputs!"}, { status : 400 })
    }

    try{
        const existingCard = await prisma.flightCard.findUnique({
            where : {
                origin,
                destination,
                fromTime : beginTime,
                toTime : endTime,
                
            }
        })

    } catch (err) {
        return NextResponse.json({ message : "Internal Server Error"}, { status : 500 })
    }
}