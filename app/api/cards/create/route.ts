import { prisma } from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

interface createCardProps {
    userId : number;
    origin : string;
    destination : string;
    beginTime : string;
    endTime : string;
    departureDate : string;
    nonStop : boolean;
    notify : boolean,
    threshold : number
}

export async function POST(req : NextRequest){
    const { userId, origin, destination, beginTime, endTime, departureDate, nonStop, notify, threshold } : createCardProps = await req.json()

    if(!userId){
        return NextResponse.json({ message : "USER_NOT_LOGGED_IN"}, { status : 400 })
    }

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
                nonStop,
                threshold
            }
        })
        
        if(existingCard){
            return NextResponse.json({ message : "Card already exists!"}, { status : 400 })
        }

        await prisma.flightCard.create({
            data : {
                userId,
                origin,
                destination,
                beginTime,
                endTime,
                departureDate,
                nonStop,
                notify,
                threshold
            }
        })

        return NextResponse.json({ message : "Card created successfully!" }, { status : 200 })

    } catch (err) {
        return NextResponse.json({ message : "Internal Server Error"}, { status : 500 })
    }
}