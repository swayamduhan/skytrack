'use client'

import { fetchUserCards } from "@/app/lib/fetchUserCards"
import { cards, darkMode, loadingResults } from "@/store/atoms"
import { useAtom, useAtomValue } from "jotai"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import arrow from "@/public/arrow.svg"
import { ArrowSVG } from "./Arrow"

interface CardInfo {
    origin : string;
    destination : string;
    startTime : string;
    endTime : string;
    nonStop : boolean;
    departureDate : string;
}

const decoyCards : CardInfo[] = [
    {
        origin : "Delhi",
        destination : "Dubai",
        startTime : "1400",
        endTime : "1800",
        nonStop : true,
        departureDate : "19 Jan 2025"
    },
    {
        origin : "Delhi",
        destination : "Dubai",
        startTime : "1400",
        endTime : "1800",
        nonStop : true,
        departureDate : "19 Jan 2025"
    },
    {
        origin : "Delhi",
        destination : "Dubai",
        startTime : "1400",
        endTime : "1800",
        nonStop : true,
        departureDate : "19 Jan 2025"
    },
    {
        origin : "Delhi",
        destination : "Dubai",
        startTime : "1400",
        endTime : "1800",
        nonStop : true,
        departureDate : "19 Jan 2025"
    },
    {
        origin : "Delhi",
        destination : "Dubai",
        startTime : "1400",
        endTime : "1800",
        nonStop : true,
        departureDate : "19 Jan 2025"
    }
]

export function CardComponent(){
    const [userCards, setUserCards] = useAtom(cards)
    const [loading, setLoading] = useState(loadingResults)
    const { data : session, status } = useSession()

    useEffect(()=>{
        // @ts-ignore
        fetchUserCards(setUserCards, setLoading, session?.user?.id)
    }, [])

    return (
        <div className="w-full h-full max-h-[600px] py-4 font-satoshi text-black dark:text-white">
            {status === "unauthenticated" ?
            <CenteredText>Please login first!</CenteredText>
            :
            (
                decoyCards.length === 0 ?
                <CenteredText>Fill the details and click on Favourite button to save a card!</CenteredText>
                : 
                <Cards userCards={decoyCards}/>
            )}
        </div>
    )
}

const CenteredText = ({children} : { children : any}) => {
    return (
        <div className="h-full flex justify-center items-center">
            <p className="text-2xl p-48 font-bold">
                {children}
            </p>
        </div>
    )
}


const Cards = ({ userCards } : { userCards : CardInfo[]}) => {
    const isDark = useAtomValue(darkMode)
    return (
        <div className="h-full w-full grid grid-cols-2 p-6 gap-6 overflow-y-auto">
            {userCards.map((card, index)=>(
                <div key={index} className="rounded-md p-4 min-h-[200px] flex flex-col shadow-md dark:shadow-xl border border-slate-700">
                    <div className="flex justify-around items-center text-xl font-bold">
                        <div>{card.origin}</div>
                        <ArrowSVG fill={isDark ? "#fff" : "#000"}/>
                        <div>{card.destination}</div>
                    </div>
                    <div className="w-full border-b dark:border-slate-700 border-slate-300"></div>
                    <div>
                        Range : {card.startTime} - {card.endTime}
                    </div>
                </div>
            ))}
        </div>
    )
}


