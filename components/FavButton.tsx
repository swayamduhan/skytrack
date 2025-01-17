import axios from "axios";
import { Star } from "lucide-react";

export function FavButton(){
    return (
        <button className="border border-black p-2 rounded-md group relative bg-yellow-400 hover:rotate-[-3deg] duration-200 text-black" onClick={sendParallelRequests}>
            <Star fill="#FEE62F" color="#000" className="absolute left-20 top-[10px] group-hover:top-[-30px] group-hover:left-[180px] group-hover:right-0 group-hover:rotate-[-45deg] duration-200 ease-out h-5 w-5 group-hover:h-[60px] group-hover:w-[60px]"/>
            <span className="absolute top-[8px] left-[40%] group-hover:text-xl group-hover:left-[32%] duration-200">Favourite</span>
        </button>
    )
}

const sendParallelRequests = async () => {
    try{
        await Promise.all([
            axios("http://localhost:3005/"),
            axios("http://localhost:3005/"),
            axios("http://localhost:3005/"),
            axios("http://localhost:3005/"),
            axios("http://localhost:3005/")
        ])
    } catch(err) {
        console.log(err)
    }
};