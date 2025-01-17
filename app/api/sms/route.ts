import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio"

const accountSID = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = twilio(accountSID, authToken)

export async function POST(req : NextRequest){
    const body = await req.json()
    let text;
    const { type, username, phone } = body
    if(type === "OTP_VERIFY"){
        text = `Hi ${username},\nYour otp for Skytrack is ${body.otp}. Valid for 10 minutes.`
    } else if ( type === "FLIGHT_DROP" ){
        text = `Hi ${username},\n Your flight from ${body.from} to ${body.to} on ${body.date} at ${body.time} has dropped below ${body.threshold} INR! Current price is ${body.price} Consider booking your flight ✈️\n\nRegards,\nSkytrack`
    } else if (type === "FLIGHT_DISCOUNT"){
        text = `Hi ${username},\nYour starred flight from ${body.from} to ${body.to} on ${body.date} at ${body.time} is available at a discounted price ${body.price} INR, slightly higher than your threshold.\n\nRegards,\nSkytrack`
    } else if (type === "FLIGHT_DROP_MULTIPLE"){
        text = `Hi ${username},\nMultiple flights from ${body.from} to ${body.to} on ${body.date} in your timerange have dropped below your threshold ${body.threshold} INR. Consider checking them out and confirm your booking soon ✈️\n\nRegards,\nSkytrack`
    } else if (type === "FLIGHT_DISCOUNT_MULTIPLE"){
        text = `Hi ${username},\nMultiple flights from ${body.from} to ${body.to} on ${body.date} are available at a discounted price, slightly higher than your threshold ${body.threshold} INR. Consider checking them out 😊\n\nRegards,\nSkytrack`
    }else {
        return NextResponse.json({ message : "Invalid TYPE"}, { status : 500 })
    }

    console.log("Text body generated!, Sending SMS ...")
    try{
        const message = await client.messages.create({
            body : text,
            from : '+12314488995',
            to : phone
        })

        console.log("SMS sent!")

        return NextResponse.json({ message : "SMS_SENT", sid : message.sid }, { status : 200 })
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message : "SMS_ERROR"}, { status : 411 })
    }
}