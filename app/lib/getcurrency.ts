import axios from "axios";

export async function getUserCurrency(){
    const res = await axios("https://ipapi.co/json/")
    return res.data.currency
}