import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto"
import { prisma } from "@/prisma/prisma";
import axios from "axios";

function generateOtp() : string{
    const buffer = randomBytes(2)
    const otp = (buffer.readUInt16BE(0) & 0xFFFF) % 10000;
    return otp.toString().padStart(4, '0')
}

export async function POST(req : NextRequest){
    const body = await req.json()
    const { email } : { email : string } = body

    if(!email){
        return NextResponse.json({ message : "Invalid email!"}, { status : 400 })
    }

    const username = body.name || "User"

    try{
        const otp = generateOtp()
        const existingOtp = await prisma.oTP.findUnique({ where : { email }})
    
        const now = new Date()
        const cooldownTime = 1*60*1000
    
        if(existingOtp && !existingOtp.verified && now.getTime() - existingOtp.lastSentAt.getTime() < cooldownTime){
            return NextResponse.json({ message : "Wait for 1 minute before trying again"}, { status : 400 })
        }
    
        const expiresAt = new Date(Date.now() + 10*60*1000)
    
        if(existingOtp){
            await prisma.oTP.update({
                where : { email },
                data : {
                    otp, expiresAt, lastSentAt : now, verified : false
                }
            })
        } else {
            await prisma.oTP.create({
                data : {
                    otp, email, expiresAt, lastSentAt : now
                }
            })
        }
        
        await axios.post(`${process.env.NEXTAUTH_URL}api/mail`, { 
            username,
            email,
            otp,
            type : "SEND_OTP"
        })
        
    
        return NextResponse.json({ message : "OTP_SENT"}, { status : 200})
    } catch ( err : any ){
        return NextResponse.json({ message : err.response.data.message || "SERVER_ERROR"}, { status : 500 })
    }
}