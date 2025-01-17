import { prisma } from "@/prisma/prisma";
import { verify } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    const body = await req.json()
    const { userOtp, email } : { userOtp : string, email : string } = body

    if(!userOtp || !email){
        return NextResponse.json({ message : "INVALID_INPUT"}, { status : 400 })
    }

    if(userOtp.length !== 4){
        return NextResponse.json({ message : "INCOMPLETE_OTP"}, { status : 400 })
    }

    try{
        const existingOtp = await prisma.oTP.findUnique({ where : { email }})
        if(!existingOtp){
            return NextResponse.json({ message : "INVALID_REQUEST", verified : false }, { status : 400 })
        }

        // if(existingOtp.verified){
        //     return NextResponse.json({ message : "Please request a new OTP!"}, { status : 400 })
        // }

        const now = new Date()

        if(now.getTime() > existingOtp.expiresAt.getTime()){
            return NextResponse.json({ message : "Your OTP has expired!", verified : false }, { status : 400 })
        }

        if(existingOtp.otp != userOtp){
            return NextResponse.json({ message : "Invalid OTP entered!", verified : false }, { status : 400 })
        }

        await prisma.oTP.update({
            where : { email },
            data : { verified : true }
        })

        return NextResponse.json({ message : "OTP_VERIFIED", verified : true }, { status : 200 })
    } catch ( err ){
        console.log(err)
        return NextResponse.json({ message : "OTP verification failed :("}, { status : 500 })
    }
}