import { favouriteCard } from "@/app/lib/favouriteCard";
import { Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";


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
    const { data : session, status } = useSession()

    function handleClick(){
        if(status === "unauthenticated"){
            toast("Login to favorite a card!")
            return;
        }
        //@ts-ignore
        favouriteCard(session?.user?.id, origin, destination, beginTime, endTime, departureDate, nonStop, setFavLoading)
    }
    
    return (
        <button className="border border-black p-2 rounded-md group relative bg-yellow-400 hover:rotate-[-3deg] duration-200 text-black" onClick={handleClick}>
            <Star fill="#FEE62F" color="#000" className="absolute left-20 top-[10px] group-hover:top-[-30px] group-hover:left-[180px] group-hover:right-0 group-hover:rotate-[-45deg] duration-200 ease-out h-5 w-5 group-hover:h-[60px] group-hover:w-[60px]"/>
            <span className="absolute top-[8px] left-[40%] group-hover:text-xl group-hover:left-[32%] duration-200">{favLoading ? "Favoriting..." : "Favorite"}</span>
        </button>
    )
}
