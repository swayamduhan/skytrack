import { NEXT_AUTH_CONFIG } from "@/app/lib/auth";
import { prisma } from "@/prisma/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const { cardId } = await req.json()
    if(!cardId) return NextResponse.json({ message : "Invalid card id"}, { status : 400 })

    const session = await getServerSession(NEXT_AUTH_CONFIG)

    if(!session || !session.user){
        return NextResponse.json({ message : "User not logged in!"}, { status : 400 })
    }

    try {
        const card = await prisma.flightCard.findUnique({ where : { id : cardId }})
        if(!card){
            return NextResponse.json({ message : "CARD_NOT_EXIST"} , { status : 400 })
        }
        // @ts-expect-error
        if(card.userId != session.user.id) {
            return NextResponse.json({ message : "UNAUTHORIZED"}, { status : 400 })
        }
        await prisma.flightCard.delete({ where : { id : cardId }})
        return NextResponse.json({ message : "Card deleted!" }, { status : 200 })
    } catch (err) {
        return NextResponse.json({ message : "Unable to delete card!", error : err }, { status : 500 })
    }
}