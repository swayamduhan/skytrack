import { useEffect, useRef } from "react"
import axios from "axios"
import { RequestData } from "@/app/api/scrapetwo/route"
import { useAtom, useSetAtom } from "jotai"
import { flightResult, loadingResults, showCards } from "@/store/atoms"
import { makeTimeString } from "@/app/lib/makeTimeString"


export function Button({ from, to, startTime, endTime, departureDate, checked } : { from : string, to : string, startTime : Date, endTime : Date, departureDate : Date, checked : boolean }){
    const submitRef = useRef<HTMLDivElement | null>(null)

    const setOutput = useSetAtom(flightResult)
    const [loading, setLoading] = useAtom(loadingResults)
    const setShowUserCards = useSetAtom(showCards)

    useEffect(()=>{
        const handleKeyDown = (e : KeyboardEvent) => {
            if(e.key === "Enter"){
                submitRef.current?.click()
            } 
        }
        document.addEventListener("keydown", handleKeyDown)

        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [])


    return (
        <div className={`p-2 rounded-md flex justify-center items-center bg-black/60 border-b border-r relative group ${loading ? "pointer-events-none opacity-50" : "cursor-pointer"}`} onClick={()=>handleSubmit(from, to, startTime, endTime, departureDate, checked, setOutput, setLoading, setShowUserCards)} ref={submitRef}>
            <div className="absolute bg-white inset-0 z-10 mix-blend-difference top-10 group-hover:top-0 duration-100 rounded-md"></div>
            <div className="relative">{loading ? "Loading ..." : "Submit"}</div>
        </div>
    )
}


async function handleSubmit(from : string, to : string, startTime : Date, endTime : Date, departureDate : Date, nonStop : boolean, setOutput : any, setLoading : any, setShowUserCards : any){
    const startString = makeTimeString(startTime)
    const endString = makeTimeString(endTime)
    const dateString = departureDate.toDateString()
    const requestBody : RequestData = {
        origin : from,
        destination : to,
        beginTime : startString,
        departureDate : dateString,
        endTime : endString,
        nonStop
    }

    try{
        setLoading(true)
        setShowUserCards(false)
        const response = await axios.post('api/scrapetwo', requestBody)
        setLoading(false)
        setOutput(response.data.flights)
    } catch (e) {
        setLoading(false)
        console.log(e)
    }
}

