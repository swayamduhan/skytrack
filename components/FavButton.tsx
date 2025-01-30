import { favouriteCard } from "@/app/lib/favouriteCard";
import { Star, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowSVG } from "./Arrow";
import { useAtomValue } from "jotai";
import { darkMode } from "@/store/atoms";
import { Checkbox } from "./CustomCheckbox";


interface FavButtonProps {
    origin : string;
    destination : string;
    beginTime : string;
    endTime : string;
    departureDate : string;
    nonStop : boolean;
}

export function FavButton({ origin, destination, beginTime, endTime, departureDate, nonStop } : FavButtonProps){
    const [favLoading, setFavLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const isDark = useAtomValue(darkMode)
    const [checked, setChecked] = useState(false)
    const [threshold, setThreshold] = useState(0)
    const { data : session, status } = useSession()

    async function handleClick(){
        if(checked && threshold == 0){
            toast.error("Please enter your discount requirement :)")
        }
        //@ts-ignore
        await favouriteCard(session?.user?.id, origin, destination, beginTime, endTime, departureDate, nonStop, setFavLoading, threshold)
        setIsOpen(false)
    }

    function handleFavorite(){
        if(status === "unauthenticated"){
            toast("Login to favorite a card!")
            return;
        }
        if(!origin || !destination || !beginTime || !endTime || !departureDate){
            toast.error("Please enter fields first!")
            return
        }
        setIsOpen(true)
    }
    
    return (
        <>
            <button className="border border-black p-2 rounded-md group relative bg-yellow-400 hover:rotate-[-3deg] duration-200 text-black" onClick={handleFavorite}>
                <Star fill="#FEE62F" color="#000" className="absolute left-20 top-[10px] group-hover:top-[-30px] group-hover:left-[180px] group-hover:right-0 group-hover:rotate-[-45deg] duration-200 ease-out h-5 w-5 group-hover:h-[60px] group-hover:w-[60px]"/>
                <span className="absolute top-[8px] left-[40%] group-hover:text-xl group-hover:left-[32%] duration-200">{favLoading ? "Favoriting..." : "Favorite"}</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 dark:bg-black/30 bg-black/10 backdrop-blur-[2px] dark:backdrop-blur-xl flex items-center justify-center">
                    <div className="flex flex-col gap-5 items-center shadow-md bg-[var(--background)] dark:bg-[var(--background-dark)] rounded-md relative dark:text-white text-black overflow-hidden">
                    <div className="absolute top-[-100px] w-full h-full bg-gradient-to-br from-black/30 dark:from-white/30 via-black/5 dark:via-white/5 to-transparent blur-3xl pointer-events-none" />
                        <div className="absolute h-10 w-10 top-0 right-0 flex items-center justify-center cursor-pointer" onClick={()=>setIsOpen(false)}>
                            <X />
                        </div>
                        <div className="flex items-center justify-center gap-10 text-2xl w-full py-5 bg-black/5 dark:bg-white/5">
                            <div>{origin}</div>
                            <ArrowSVG fill={isDark ? "#fff" : "#000"}/>
                            <div>{destination}</div>
                        </div>
                        <div className="py-4 px-8 flex flex-col gap-10">
                            <div className="text-gray-700 dark:text-gray-400 font-normal">Track flights between <span className="font-bold">{beginTime}</span> and <span className="font-bold">{endTime}</span> on <span className="font-bold">{departureDate}</span></div>
                            <div className="flex flex-col gap-4">
                                <Checkbox checked={checked} setChecked = {setChecked} label="Wish to get notified?"/>
                                {checked && (
                                    <input type="number" className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none bg-inherit border font-normal rounded-md p-1" placeholder="enter discount threshold" onChange={(e)=>setThreshold(Number(e.target.value))}/>
                                )}
                            </div>
                        </div>
                        <div className="w-full text-right px-8 mb-4">
                            <button className={`p-2 rounded-md bg-black dark:bg-white text-white dark:text-black px-6 ${favLoading ? "pointer-events-none opacity-50" : ""}`} onClick={handleClick}>{favLoading ? "Saving..." : "Favorite"}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
