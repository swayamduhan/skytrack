'use client'
import { NotificationProps } from "@/app/api/cards/toggle-noti/route";
import { JotaiProvider } from "@/app/JotaiProvider";
import { fetchUserCards } from "@/app/lib/fetchUserCards";
import { AuthProvider } from "@/app/provider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { cards, darkMode } from "@/store/atoms";
import axios from "axios";
import { useAtom } from "jotai";
import { Bell, MoveRight, PlaneTakeoff, X } from "lucide-react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function convertTo12Hour(timeInput : string) : string{
    let hrs = Number(timeInput.substring(0,2))
    let mins = Number(timeInput.substring(2))
    if(hrs > 12){
        hrs -= 12;
        return `${hrs}:${mins} PM`
    } else {
        return `${hrs}:${mins} AM`
    }
}

export default function Saved(){
    return (
        <SessionProvider>
            <SavedCards />
        </SessionProvider>
    )
}

function SavedCards(){
    const { data : session, status } = useSession()
    const router = useRouter()
    const [userCards, setUserCards] = useAtom(cards)
    const [loading, setLoading] = useState(false)
    const [render, rerender] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [cardString, setCardString] = useState("")
    const [removeLoading, setRemoveLoading] = useState<{[key : number] : boolean}>({})
    const [thres, setThres] = useState(-1)
    const [notisLoading, setNotisLoading] = useState<{[key : number] : boolean}>({})
    const [modalLoading, setModalLoading] = useState(false)
    console.log(darkMode)

    useEffect(()=>{
        if(status === "unauthenticated"){
            router.push("/track")
            return
        }
    
        // @ts-ignore
        fetchUserCards(setUserCards, setLoading, session?.user?.id)
    }, [status, render])

    async function handleDeleteCard(cardId : string, index : number){
        setRemoveLoading(prev => ({...prev, [index] : true}))
        try {
            await axios.post("/api/cards/delete", { cardId })
            rerender(prev => prev + 1)
            toast.success("Card deleted successfully!")
        } catch ( err : any ) {
            toast.error("Error deleting card :(")
            console.log(err.response.message || err)
        } finally {
            setRemoveLoading(prev => {
                const updated = {...prev}
                delete updated[index]
                return updated
            })
        }
    }

    async function handleNotisOn(cardId : string){
        if(thres <= 0){
            toast.error("Enter valid price!")
            return
        }
        if(cardString == ""){
            toast.error("Error reading card! please re-open window")
            return
        }
        setModalLoading(true)
        const reqBody : NotificationProps = {
            cardId,
            notis : true,
            threshold : thres
        }
        try {
            await axios.post("/api/cards/toggle-noti", reqBody)
            setIsOpen(false)
            rerender(prev => prev + 1)
            toast.success("Notifications turned on!")
        } catch (err : any) {
            toast.error("Unable to turn on notifications at the moment :(")
            console.log(err.response.message || err)
        } finally {
            setModalLoading(false)
        }
    }

    async function handleNotisOff(cardId : string, index : number){
        setNotisLoading(prev => ({...prev, [index] : true}))
        const reqBody : NotificationProps = {
            cardId,
            notis : false
        }
        try {
            await axios.post("/api/cards/toggle-noti", reqBody)
            rerender(prev => prev + 1)
            toast.success("Notifications turned off!")
        } catch (err : any) {
            toast.error("Unable to process at the moment :(")
            console.log(err.response.message || err)
        } finally {
            setNotisLoading(prev => {
                const updated = {...prev}
                delete updated[index]
                return updated
            })
        }
    }

    return (
            <div className="dark:bg-[var(--background-dark)] min-h-screen inset-0 relative dark:text-[var(--foreground-dark)]">
                <JotaiProvider>
                    <AuthProvider>
                        <Navbar />
                    </AuthProvider>
                </JotaiProvider>
                <div className="min-h-screen flex justify-center py-32 ">
                    <div className="w-full w-1/2 max-w-[1000px] flex flex-col items-center p-4 font-satoshi gap-10">
                        <h1 className="text-5xl font-black bg-gradient-to-b from-gray-800 dark:from-white to-gray-400 bg-clip-text text-transparent">Your saved cards</h1>
                        {loading ? (
                            <div>Loading please wait brah :O</div>
                        ) : (
                        <div className="w-full grid grid-cols-2 gap-4 overflow-y-auto max-h-[60vh] pr-2">
                            {userCards.map((card, index)=>{
                                return (
                                    <div key={index} className="border border-gray-600 p-4 rounded-md flex flex-col gap-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2 font-bold">
                                                <PlaneTakeoff className="text-gray-600"/>
                                                <span>{card.origin}</span>
                                                <MoveRight />
                                                <span>{card.destination}</span>
                                                <div>{card.nonStop ? "( nonstop )" : ""}</div>
                                            </div>
                                            <button className={`rounded-md p-1 ${removeLoading[index] ? "bg-gray-600 dark:bg-gray-400 pointer-events-none" : "bg-black dark:bg-white"} text-white dark:text-black font-bold text-sm`} onClick={()=>{
                                                handleDeleteCard(card.id, index)
                                            }}>{removeLoading[index] ? "Removing" : "Remove"}</button>
                                        </div>
                                        <div>
                                            <div>Track all flights between <span className="font-bold">{convertTo12Hour(card.beginTime)}</span> - <span className="font-bold">{convertTo12Hour(card.endTime)}</span></div>
                                            <div>on date : <span className="font-bold">{card.departureDate}</span></div>
                                        </div>
                                        <div>
                                            {card.notify ? (
                                                <div className="flex justify-between">
                                                    <div>Desired price : <span className="font-bold">{card.threshold}</span></div>
                                                    <button className={`underline text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-200 ${notisLoading[index] ? "pointer-events-none" : ""}`} onClick={()=>{
                                                        handleNotisOff(card.id, index)
                                                    }}>{notisLoading[index] ? "turning off..." : "turn off notis?"}</button>                                                
                                                    </div>
                                            ) : (
                                                <div className="flex justify-between">
                                                    <div>Notis are off</div>
                                                    <div className="flex items-center cursor-pointer gap-1 underline text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-200" onClick={()=>{
                                                        setIsOpen(true)
                                                        setCardString(card.id)
                                                    }}>
                                                        <Bell className="h-4 w-4"/>
                                                        <div>get notified?</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        )}
                    </div>
                </div>

                {/* noti on popup code here */}
                {isOpen && (
                    <div className="absolute inset-0 backdrop-blur-lg flex justify-center items-center">
                        <div className="flex flex-col gap-5 items-center shadow-md bg-[var(--background)] dark:bg-[var(--background-dark)] rounded-md relative dark:text-white text-black overflow-hidden w-1/3 max-w-[720px]">
                        <div className="absolute top-[-100px] w-full h-full bg-gradient-to-br from-black/30 dark:from-white/30 via-black/5 dark:via-white/5 to-transparent blur-3xl pointer-events-none" />
                            <div className="absolute h-10 w-10 top-0 right-0 flex items-center justify-center cursor-pointer" onClick={()=>setIsOpen(false)}>
                                <X />
                            </div>
                            <div className="flex items-center justify-center gap-10 text-2xl w-full py-5 bg-black/5 dark:bg-white/5 font-bold">
                                get notified
                            </div>
                            <div className="py-4 pb-10 w-full px-10 flex gap-10 justify-center items-center">
                                <input type="number" className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none bg-inherit border font-normal rounded-md p-1 w-2/3" placeholder="desired price?" onChange={(e)=>setThres(Number(e.target.value))}/>
                                <button className={`p-1 border rounded-md bg-black dark:bg-white text-white dark:text-black px-6 ${modalLoading ? "pointer-events-none opacity-50" : ""}`} onClick={()=>handleNotisOn(cardString)}>turn on</button>
                            </div>
                        </div>
                    </div>
                )}
                <Footer />
            </div>
        )
}
