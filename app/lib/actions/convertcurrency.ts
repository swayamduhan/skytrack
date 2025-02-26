"use server"

import axios from "axios"


// how to handle exchangeRates in free tier
// for routined scrapes, fetch all rates for USD against currency and cache it on the backend


export async function getExchangeRates() : Promise<Record<string, number>> {
    const res = await axios("https://v6.exchangerate-api.com/v6/c5e33f4e41395c948224a1e4/latest/USD")
    return res.data.conversion_rates
}