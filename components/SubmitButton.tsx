import { useEffect, useRef } from "react"
import axios from "axios"
import { RequestData } from "@/app/api/scrape/route"
import { useAtom, useSetAtom } from "jotai"
import { flightResult, loadingResults, showCards } from "@/store/atoms"
import { makeTimeString } from "@/app/lib/makeTimeString"
import { toast } from "sonner"
import { getScrapeRoute } from "@/app/lib/scraperoute"
import { getUserCurrency } from "@/app/lib/getcurrency"


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
        <div className={`p-2 rounded-md flex justify-center items-center bg-black/10 dark:bg-black/60 isolate relative group ${loading ? "pointer-events-none opacity-50" : "cursor-pointer"}`} onClick={()=>handleSubmit(from, to, startTime, endTime, departureDate, checked, setOutput, setLoading, setShowUserCards)} ref={submitRef}>
            <div className="absolute inset-0 z-10 top-12 group-hover:top-0 duration-100 rounded-md" style={{
                backdropFilter : "invert(1)"
            }}></div>
            <div className="relative">{loading ? "Loading ..." : "Search"}</div>
        </div>
    )
}


async function handleSubmit(from : string, to : string, startTime : Date, endTime : Date, departureDate : Date, nonStop : boolean, setOutput : any, setLoading : any, setShowUserCards : any){

    if (!from || !to ){
        toast.error("Enter origin and destination!")
        return
    }
    const startString = makeTimeString(startTime)
    const endString = makeTimeString(endTime)
    const dateString = departureDate.toDateString()

    
    try{
        setLoading(true)
        setShowUserCards(false)
        const scrapeRoute = getScrapeRoute()
        const currency = await getUserCurrency()
        const requestBody : RequestData = {
            origin : from,
            destination : to,
            beginTime : startString,
            departureDate : dateString,
            endTime : endString,
            nonStop,
            currency
        }
        scrollToFlights()
        const response = await axios.post(`/api/${scrapeRoute}`, requestBody)
        setLoading(false)
        setOutput(response.data.flights)
    } catch (error : any) {
        setLoading(false)
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
    }
}




function scrollToFlights(){
    const el = document.getElementById("output")
    el?.scrollIntoView({ behavior : "smooth" })
}