import axios from "axios";
import { toast } from "sonner";

export const favouriteCard = async (userId : number, origin : string, destination : string, beginTime : string, endTime : string, departureDate : string, nonStop : boolean, setFavLoading : any) => {
    setFavLoading(true)
    try{
        const reqBody = {
            // @ts-ignore
            userId,
            origin,
            destination,
            beginTime,
            endTime,
            departureDate,
            nonStop
        }
        console.log(reqBody)
        await axios.post("/api/cards/create", reqBody)
    } catch(error : any) {
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
        setFavLoading(false)
    }
};