'use client'

import { fetchUserCards } from "@/app/lib/fetchUserCards"
import { cards, darkMode, flightResult, loadingResults, showCards } from "@/store/atoms"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import arrow from "@/public/arrow.svg"
import { ArrowSVG } from "./Arrow"
import { FlightCard } from "@/app/api/routine/route"
import { MoveRight } from "lucide-react"
import { RequestData } from "@/app/api/scrape/route"
import axios from "axios"
import { toast } from "sonner"

export function CardComponent(){
    const [userCards, setUserCards] = useAtom(cards)
    const [loading, setLoading] = useState(false)
    const { data : session, status } = useSession()

    useEffect(()=>{
        if(status === "unauthenticated" || status === "loading") return
        // @ts-ignore
        fetchUserCards(setUserCards, setLoading, session?.user?.id)
    }, [status])

    return (
        <div className="w-full h-full py-4 font-satoshi text-black dark:text-white">
            {status === "unauthenticated" ?
            <CenteredText>Please login first!</CenteredText>
            :
            (
                loading ? (
                    <CenteredText>Loading, please wait!</CenteredText>
                ) :
                (
                    userCards.length === 0 ?
                    <CenteredText>Fill the details and click on Favourite button to save a card!</CenteredText>
                    : 
                    <Cards userCards={userCards}/>
                )
            )}
        </div>
    )
}

export const CenteredText = ({children} : { children : any}) => {
    return (
        <div className="h-full flex justify-center items-center text-black dark:text-white">
            <p className="text-2xl p-48 font-bold">
                {children}
            </p>
        </div>
    )
}


const Cards = ({ userCards } : { userCards : FlightCard[]}) => {
    const isDark = useAtomValue(darkMode)
    const setOutput = useSetAtom(flightResult)
    const [loading, setLoading] = useAtom(loadingResults)
    const setShowUserCards = useSetAtom(showCards)

    async function handleSearch(origin : string, destination : string, beginTime : string, endTime : string, departureDate : string, nonStop : boolean){
        const requestBody : RequestData = {
            origin,
            destination,
            beginTime,
            endTime,
            departureDate,
            nonStop
        }
        try{
            setLoading(true)
            setShowUserCards(false)
            const response = await axios.post('/api/scrape', requestBody)
            setOutput(response.data.flights)
        } catch (error : any) {
            if (error.response) {
                console.log('Error Response:', error.response); 
                console.log('Error Message:', error.response.data.message); 
                toast.error(error.response.data.message); 
            } else if (error.request) {
                console.log('Error Request:', error.request);
                toast.error("No response from the server. Please try again.");
            } else {
                console.log('Error Message:', error.message);
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false)
        }
    }
    function convertTo12Hour(timeInput : string) : string{
        let hrs = Number(timeInput.substring(0,2))
        const mins = Number(timeInput.substring(2))
        if(hrs > 12){
            hrs -= 12;
            return `${hrs}:${mins} PM`
        } else {
            return `${hrs}:${mins} AM`
        }
    }

    return (
        <div className="w-full max-h-[600px] grid grid-cols-1 xl:grid-cols-2 p-6 gap-6 overflow-y-auto">
            {userCards.map((card, index)=>(
                <div key={index} className="relative rounded-md p-4 min-h-[150px] flex flex-col gap-2 shadow-lg dark:shadow-xl border border-gray-400">
                    <div className="flex justify-between items-center font-bold">
                        <div className="flex items-center justify-center text-lg gap-2">
                            <div>{card.origin}</div>
                                <MoveRight fill={isDark ? "#fff" : "#000"}/>
                            <div>{card.destination}</div>
                        </div>
                        <div className="text-sm">
                            {card.nonStop ? "nonstop" : "with stops"}
                        </div>
                    </div>
                    <div className="w-full border-b dark:border-gray-400 border-gray-300"></div>
                    <div className="text-gray-700 dark:text-gray-300 text-sm"> 
                        Tracking from <span className="text-black dark:text-white font-bold">{convertTo12Hour(card.beginTime)}</span> to <span className="text-black dark:text-white font-bold">{convertTo12Hour(card.endTime)}</span><br></br>on <span className="text-black dark:text-white font-bold">{card.departureDate}</span><br></br>Notifications : <span className="font-bold dark:text-white text-black">{card.notify ? "ON" : "OFF"}</span>
                    </div>
                    <button className={`absolute bottom-0 right-0 m-2 border p-1 rounded-md px-2 text-sm bg-black text-white dark:bg-white dark:text-black font-bold ${loading ? "pointer-events-none" : ""}`} onClick={()=>handleSearch(card.origin, card.destination, card.beginTime, card.endTime, card.departureDate, card.nonStop)}>Search</button>
                </div>
            ))}
        </div>
    )
}


