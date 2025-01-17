import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const { userId, origin, destination, beginTime, endTime, departureDate, nonStop } = await req.json()

    if(!origin || !destination || !beginTime || !endTime || !departureDate){
        return NextResponse.json({ message : "Incomplete inputs!"}, { status : 400 })
    }

    try{
        const existingCard = await prisma.flightCard.findFirst({
            where : {
                userId,
                origin,
                destination,
                beginTime,
                endTime,
                departureDate,
                nonStop
            }
        })
        if(existingCard){
            return NextResponse.json({ message : "Card already exists!"}, { status : 400 })
        }

        const newCard = await prisma.flightCard.create({
            data : {
                userId,
                origin,
                destination,
                beginTime,
                endTime,
                departureDate,
                nonStop
            }
        })

        return NextResponse.json({ message : "Card created successfully!"}, { status : 200 })

    } catch (err) {
        return NextResponse.json({ message : "Internal Server Error"}, { status : 500 })
    }
}