// create notification routine
import { sendEmail } from "@/app/lib/email";
import { NextRequest, NextResponse } from "next/server"

export async function POST(req : NextRequest){
    const body = await req.json()
    let text, subject;
    const { type, username, email } = body

    if(type === "NEW_USER"){
        subject = "Welcome";
        text = `Hi ${username}, Welcome to Skytrack.\nThank you for creating an account with us!\n\nRegards,\nSwayam Duhan\nCEO, Skytrack`
    } else if(type === "SEND_OTP"){
        subject = "OTP for Skytrack Verification"
        text = `Hi ${username},\nYour OTP for Skytrack is ${body.otp}. Valid for 10 minutes.`
    } else if ( type === "FLIGHT_DROP" ){
        subject = "Flight prices dropped!"
        text = `Hi ${username},\nYour flight from ${body.from} to ${body.to} on ${body.date} at ${body.time} has dropped below ${body.threshold} INR! Current price is ${body.price} Consider booking your flight ✈️\n\nRegards,\nSkytrack`
    } else if (type === "FLIGHT_DISCOUNT"){
        subject = "Flights at discount!"
        text = `Hi ${username},\nYour starred flight from ${body.from} to ${body.to} on ${body.date} at ${body.time} is available at a discounted price ${body.price} INR, slightly higher than your threshold ${body.threshold}.\n\nRegards,\nSkytrack`
    } else if (type === "ROUTINE_ERROR"){
        subject = "Flight tracking failed!"
        text = `Hi ${username},\nSorry to inform that your saved flight track is failing.\nPlease recheck details.\n\nRegards,\nSkytrack`
    } else {
        return NextResponse.json({ message : "Invalid TYPE"}, { status : 500 })
    }



    try{
        await sendEmail(email, subject, text)
        return NextResponse.json({ message : "email was sent!"}, { status : 200})
    } catch (err){
        console.log(err)
        return NextResponse.json({ message : "INVALID EMAIL / SERVER ERROR"}, { status : 411})
    }
}