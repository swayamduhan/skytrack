import puppeteer from "puppeteer-core"
import chromium from "@sparticuz/chromium"
import { NextRequest, NextResponse } from "next/server";
import { getExchangeRates } from "@/app/lib/actions/convertcurrency";

export interface RequestData {
    origin : string;
    destination : string;
    departureDate : string;
    beginTime : string;
    endTime : string;
    nonStop : boolean;
    currency : string;
}

export interface Flight {
    airline: string | null | undefined;
    beginTime: string | null | undefined;
    endTime: string | null | undefined;
    price: string | null | undefined;
    stop: boolean;
    id?: number;
};


// add currency handling

const currency_rates = new Map()


export async function POST(req : NextRequest){
    const data : RequestData = await req.json()
    const { origin, destination, departureDate, beginTime, endTime, nonStop, currency } = data
    if(!(origin && destination && departureDate)){
        return NextResponse.json({ error : "MISSING_INPUT"}, { status : 400 })
    }

    try{
        console.log("Request received...")
        const browser = await puppeteer.launch({
            args: [
                '--disable-gpu',
                '--disable-software-rasterizer',
                '--disable-extensions',
                '--disable-images',
                '--no-sandbox',
                '--disable-background-networking',
                '--disable-flash',
                '--disable-webgl',
                '--disable-site-isolation-trials',
                '--js-flags="--max-old-space-size=512"',
                '--window-size=1280x720'
            ],
            defaultViewport : chromium.defaultViewport,
            executablePath : await chromium.executablePath(),
            headless : true,
        });
        console.log("Browser initiated!")

        const page = await browser.newPage()
        await page.goto("https://www.google.com/travel/flights", {
            waitUntil : 'domcontentloaded'
        });
        console.log("Page loaded")
        // await page.reload()


        console.log("Filling fields . . .\n ")

        // Set one way
        const dropdown = await page.waitForSelector('.RLVa8.GeHXyb')
        await dropdown?.click()
        const oneway = await page.waitForSelector("::-p-xpath(//span[text()='One way'])", { visible : true })
        await oneway?.click()
        console.log("One way selected!")


        // Where from?
        const whereFrom = await page.locator('.II2One.j0Ppje.zmMKJ.LbIaRd[aria-label*="from"]')
        await whereFrom.fill(origin)
        try{
            await page.waitForSelector(".ZGEB9c.yRXJAe.P0ukfb.a4gL0d.TFC9me.PRvvEd.Otspu.iWO5td.BDJ8fb", { visible : true, timeout : 2000 })
        } catch {
            console.log("WRONG_ORIGIN_ENTERED")
            return NextResponse.json({ message : "INVALID_ORIGIN"}, { status : 400 })
        }
        await page.keyboard.press("Enter")
        console.log("Origin filled!")
        
        // Where to?
        const whereTo = await page.locator('.II2One.j0Ppje.zmMKJ.LbIaRd[aria-label*="to"]')
        await whereTo.fill(destination)
        try{
            await page.waitForSelector(".ZGEB9c.yRXJAe.P0ukfb.a4gL0d.TFC9me.PRvvEd.Otspu.iWO5td.BDJ8fb", { visible : true, timeout : 2000 })
        } catch {
            console.log("Wrong destination entered!")
            return NextResponse.json({ message : "INVALID_DESTINATION"}, { status : 411 })
        }
        await page.keyboard.press("Enter")
        console.log("Destination filled!")

        // Departure date
        const dep = await page.locator('.TP4Lpb.eoY5cb.j0Ppje[aria-label="Departure"]')
        await dep.fill(departureDate)
        await page.keyboard.press("Enter")
        console.log("Date filled!")
        await new Promise(r => setTimeout(r, 1000))
        
        
        // Submit
        await page.locator('.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-Bz112c-M1Soyc.nCP5yc.AjY5Oe.LQeN7.TUT4y.zlyfOd[aria-label="Search"]').click()
        console.log("Fields filled and submitted!")

        // Scrape prices
        console.log("Scraping flight price ...")
        try{
            await page.waitForSelector('.Rk10dc', {timeout : 3000})
        } catch {
            await page.reload()
            await page.waitForSelector('.Rk10dc')
        }
        const allFlights = await page.evaluate(()=>{
            const nodeList = Array.from(document.querySelectorAll('.pIav2d'))
            const visibleData =  nodeList.filter(el => el.checkVisibility() == true)

            const flights = visibleData.map(el => {
                const rawData = el.querySelector('.KhL0De')
                const airline = rawData?.querySelector('.sSHqwe.tPgKwe.ogfYpf')?.querySelector('span')?.textContent
                const beginTime = rawData?.querySelector('span[aria-label*="Departure time"]')?.textContent
                const endTime = rawData?.querySelector('span[aria-label*="Arrival time"]')?.textContent
                const priceDiv = rawData?.querySelector('.YMlIz.FpEdX')
                const price = priceDiv?.querySelector('span')?.textContent
                const stop = rawData?.querySelector('span[aria-label*="stop"]')?.textContent === "Nonstop" ? false : true
                return {
                    airline, beginTime, endTime, price, stop
                }
            })
            return flights
        })


        // functions to make time range comparable 
        function parseFlightTime(timeString : string){
            const cleanedString = timeString.replace(/\u202F/g, ' ').trim();
            const [time, period] = cleanedString.split(' ')
            const [hours, minutes] = time.split(':')
            let hrs24 = parseInt(hours);
            if(period == "PM" && hours != "12"){
                hrs24 += 12
            } else if ( period == "AM" && hours == "12"){
                hrs24 = 0
            }

            hrs24 = hrs24*100 + parseInt(minutes)
            return hrs24
        }


        let rangeStart = beginTime, rangeEnd = endTime;
        if(beginTime === endTime){
            rangeStart = "0000"
            rangeEnd = "2400"
        }

        if(endTime === "0000"){
            rangeEnd = "2359"
        }

        // filter out flights within time range
        let relevantFlights : Flight[] = allFlights.filter(x => {
            const flightTime = parseFlightTime(x.beginTime || "12:00 AM")
            if(flightTime >= parseInt(rangeStart) && flightTime <= parseInt(rangeEnd)) return x;
        })

        // filter non stop flights
        if(nonStop){
            relevantFlights = relevantFlights.filter(x => x.stop === false)
        }

        if ( currency_rates.size === 0 ) {
            await setCurrencyRates()
        }


        let id = 1;
        relevantFlights.forEach(x => {
            x.id = id++;
            if (x.price){
                x.price = (Number(x.price) * currency_rates.get(currency)).toString()
            }
        })


        return NextResponse.json({ message : "FLIGHT_SUCCESS", flights : relevantFlights}, { status : 200})
    } catch(err){
        console.log(err)
        return NextResponse.json({ error : 'FLIGHT_ERROR'}, { status : 500})
    }
};


async function setCurrencyRates(){
    const exchangeRates = await getExchangeRates()
    for ( const key in exchangeRates ) {
        currency_rates.set(key, exchangeRates[key])
    } 
}