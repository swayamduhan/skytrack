import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export interface NotificationProps {
    cardId : string;
    notis : boolean;
    threshold? : number
}

// turn off notifications when notis = false and vice versa

export async function POST( req : NextRequest ){
    const body : NotificationProps = await req.json()
    if(!body.cardId || body.notis == null) return NextResponse.json({ message : "INCOMPLETE_INPUTS"}, { status : 400 })

    const session = await getServerSession(NEXT_AUTH_CONFIG)
    if(!session || !session.user) return NextResponse.json({ message : "UNAUTHORIZED"}, { status : 400 })

    try {
        const card = await prisma.flightCard.findUnique({ where : { id : body.cardId }})
        if(!card) return NextResponse.json({ message : "CARD_NOT_EXIST" }, { status : 400 })
        
        if(!body.notis){
            // turn off notis
            await prisma.flightCard.update({
                where : { id : body.cardId},
                data : { notify : false, threshold : -1 }
            })
        } else {
            // turn on notis
            if(body.threshold == null) return NextResponse.json({ message : "PLEASE_PROVIDE_THRESHOLD" }, { status : 400 })
            await prisma.flightCard.update({
                where : { id : body.cardId },
                data : { notify : true, threshold : body.threshold}
            })
        }

        return NextResponse.json({ message : "SUCCESS" }, { status : 200 })
    } catch (err) {
        return NextResponse.json({ message : "ERROR_ENCOUNTERED", error : err }, { status : 500 })
    }
}