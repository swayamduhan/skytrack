import { getExchangeRates } from "@/app/lib/actions/convertcurrency";
import { getScrapeRoute } from "@/app/lib/scraperoute";
import { prisma } from "@/prisma/prisma";
import axios from "axios";
import { NextResponse } from "next/server";

// send email to user to notify if error in doing routines
// only need to do currency stuff in prod env

export interface FlightCard {
    id: string;
    userId: number;
    origin: string;
    destination : string;
    beginTime : string;
    endTime : string;
    departureDate : string;
    nonStop : boolean;
    notify : boolean;
    currency : string;
    threshold : number | null;
    createdAt : Date;
}

interface FlightSchema {
    airline: string;
    beginTime: string;
    endTime: string;
    price: string,
    stop: boolean;
    id: number
}


interface MailProps {
    type? : "FLIGHT_DROP" | "FLIGHT_DISCOUNT";
    username : string;
    email : string;
    from : string;
    to : string;
    date : string;
    time : string;
    threshold : number | null;
    price : string;
    currency : string;
}


const currency_rates = new Map()



function forexParse(s : string){
    return parseFloat(s.replace(/[^0-9.-]/g, ""))
}

function hasExpired(dateString : string, currentDate : Date) : boolean {
    // a = flight data, b = today data
    // removing cards that have exceeded current date by 1, this way no need to
    // check with the UTC time zone conversions with extensive code

    const cardDate = new Date(dateString)
    const optimisedDate = new Date(cardDate.getTime() + 24 * 60 * 60 * 1000)

    if(currentDate > optimisedDate){
        return true
    } else {
        return false
    }
}

async function fetchAndMail(card : FlightCard){
    const requestBody = {
        origin : card.origin,
        destination : card.destination,
        beginTime : card.beginTime,
        departureDate : card.departureDate,
        endTime : card.endTime,
        nonStop : card.nonStop
    }

    try {
        const scrapeRoute = getScrapeRoute()
        const response = await axios.post(`${process.env.NEXTAUTH_URL}api/${scrapeRoute}`, requestBody)
        const flights : FlightSchema[] = response.data.flights
        if(flights.length === 0) {
            return
        }

        // @ts-ignore already checked if threshold is present when putting in filteredCards
        const optimisedThreshold = parseInt(card.threshold * 1.1)

        // get minimum price
        let minimumPrice = forexParse(flights[0].price)
        let minimumPriceIndex = 0;

        for(let i = 1; i < flights.length; i++){
            if(flights[i].price == "Price unavailable") continue;
            const price = forexParse(flights[i].price)
            if(price < minimumPrice){
                minimumPrice = price
                minimumPriceIndex = i
            }
        }

        // convert price to clients currency
        // fetch currency_rates if not available
        if ( process.env.NEXT_PUBLIC_ENV == "prod" && currency_rates.size === 0 ) {
            await setCurrencyRates()
        }

        // convert
        if ( process.env.NEXT_PUBLIC_KEY == "prod" ) {
            const rate = currency_rates.get(card.currency)
            minimumPrice = rate * minimumPrice
        }


        // populate data to mail user, if below threshold
        let reqBody : MailProps;
        if(minimumPrice < optimisedThreshold){
            const user = await prisma.user.findUnique({ where : { id : card.userId }})
            if(!user){
                throw new Error("USER_DOESNT_EXIST")
            }
            reqBody = {
                username : user.name,
                email : user.email,
                from : card.origin,
                to : card.destination,
                date : card.departureDate,
                time : flights[minimumPriceIndex].beginTime,
                threshold : card.threshold,
                price : flights[minimumPriceIndex].price,
                currency : card.currency
            }
        } else {
            console.log("NOT AVAILABLE AT DISCOUNT")
            return
        }

        // mail price and discount to user
        console.log("Sending email to user ....")
        // @ts-ignore
        if(minimumPrice < card.threshold){
            reqBody.type = "FLIGHT_DROP"
            await axios.post(`${process.env.NEXTAUTH_URL}api/mail`, reqBody)
        } else {
            reqBody.type = "FLIGHT_DISCOUNT"
            await axios.post(`${process.env.NEXTAUTH_URL}api/mail`, reqBody)
        }

    } catch ( error ) {
        console.log("SCRAPE ROUTINE FOR " + card.id + " FAILED!")
        console.log("Error : ", error)
        try {
            console.log("sending error mail to user")
            // send error mail brah
        } catch (e) {
            console.log(e)
        }
        // mail the user about it
    }
}

export async function GET(){
    try {
        const allCards = await prisma.flightCard.findMany()
        if(allCards.length === 0){
            return NextResponse.json({ message : "NO CARDS EXIST"}, { status : 400 })
        }
        const now = new Date()

        const deleteRequests : any = []
        const filteredCards : FlightCard[] = []

        // filter valid cards with notify and threshold present
        allCards.forEach((card) => {
            if(hasExpired(card.departureDate, now)){
                deleteRequests.push(prisma.flightCard.delete({ where : { id : card.id }}))
            } else if (card.notify === true) {
                if(card.threshold && card.threshold > 0) {
                    filteredCards.push(card)
                }
            }
        })

        // delete all expired cards
        await Promise.all(deleteRequests)

        if(filteredCards.length === 0) return NextResponse.json({ message : "ROUTINE_COMPLETE", at : (new Date()).toISOString() }, { status : 200 })

        // run a routine to fetch prices and mail it out
        const searchRoutines : any = []
        filteredCards.forEach((card) => {
            searchRoutines.push(fetchAndMail(card))
        })

        await Promise.all(searchRoutines)
        
        return NextResponse.json({ message : "ROUTINE_COMPLETE", at : (new Date()).toISOString() }, { status : 200 })
    } catch ( err ) {
        return NextResponse.json({ message : "ERROR_OCCURED", error : err }, { status : 500 })
    }
}


async function setCurrencyRates(){
    const exchangeRates = await getExchangeRates()
    for ( let key in exchangeRates ) {
        currency_rates.set(key, exchangeRates[key])
    } 
}