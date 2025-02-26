"use client"

import { useState } from "react"
import InputBox from "./InputBox"
import { DatePicker } from "./DatePicker"
import { Button } from "./SubmitButton"
import { TimePicker } from "./TimePicker"
import { FavButton } from "./FavButton"
import { Checkbox } from "./CustomCheckbox"
import { makeTimeString } from "@/app/lib/makeTimeString"
import { SessionProvider } from "next-auth/react"
import { Info } from "lucide-react"
import { Drawer } from "./Drawer"

export default function InputComponent(){
    const [from, setFrom] = useState<string>("")
    const [to, setTo] = useState<string>("")
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [checked, setChecked] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
        <div className="bg-black/5 max-w-[100vw] dark:bg-white/10 rounded-md py-10 px-6 sm:px-10 flex flex-col gap-6 sm:gap-10 font-satoshi text-[var(--foreground)] dark:text-[var(--foreground-dark)] relative">
            <Drawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}>
                <div className="sm:grid sm:grid-cols-2 w-full gap-6 xl:gap-48 text-md xl:text-xl mb-10">
                    <div>
                        <h1 className="text-xl xl:text-3xl font-bold border-b pb-2 border-gray-600">How to search?</h1>
                        <ol className="mt-4 list-decimal pl-[1rem]">
                            <li>by default, your saved flight cards are displayed on the right ( if you are logged in )</li>
                            <li>enter origin and destination city {"( "}use airport abbreviations wherever possible. data is scraped directly from google flights, some city names can cause wrong results {")"}.</li>
                            <li>enter time range inbetween which you wish to track flights.</li>
                            <li>enter departure date.</li>
                            <li>check the box if you wish to track only nonstop flights.</li>
                            <li>click search.</li>
                        </ol>
                    </div>
                    <div className="mt-6 sm:mt-0">
                        <h1 className="text-xl xl:text-3xl font-bold border-b pb-2 border-gray-600">Getting notified & additional info</h1>
                        <ol className="mt-4 list-decimal pl-[1rem]">
                            <li>TO GET NOTIFIED : 
                                <ul className="list-disc pl-[1.5rem]">
                                    <li>enter details on the left, and click favorite. ensure correct details before favoriting by clicking on "search" once for a smooth experience.</li>
                                    <li>further check the "notify" box and enter the price under you would like to be notified.</li>
                                    <li>all notifications are sent via mail as per now.</li>
                                </ul>
                            </li>
                            <li>you can directly click on search button on your saved flight cards to track prices.</li>
                            <li>click on "/ saved" button on the navbar to delete / set up notifications for existing cards.</li>
                        </ol>
                    </div>
                </div>
            </Drawer>
            <div className="absolute top-2 left-2 sm:left-[unset] sm:top-5 sm:right-5">
                <div className="flex justify-center items-center gap-2 font-bold cursor-pointer text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-200" onClick={()=>setDrawerOpen(true)}>
                    <Info className="w-6 h-6"/>
                    <div>how to use?</div>
                </div>
            </div>
            <div className="font-black text-2xl sm:text-3xl">Enter Flight Details</div>
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-20">
                <InputBox state={from} setState={setFrom} label="Origin" placeholder="DEL"/>
                <InputBox state={to} setState={setTo} label="Destination" placeholder="GOA"/>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-20">
                    <div className="flex flex-col gap-2">
                        <div className="font-bold">Time Range Start</div>
                        <TimePicker value={startTime} onChange={setStartTime}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="font-bold">Time Range End</div>
                        <TimePicker value={endTime} onChange={setEndTime}/>
                    </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="font-bold">Date : </div>
                <DatePicker selectedDate={selectedDate} onChange={setSelectedDate}/>
            </div>
            <div className="flex">
                <Checkbox checked={checked} setChecked={setChecked} label="Show NonStop flights only"/>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:gap-20 mt-2 sm:mt-0 font-bold">
                <Button from={from} to={to} departureDate={selectedDate} startTime={startTime} endTime={endTime} checked={checked}/>
                <SessionProvider>
                <FavButton origin={from} destination={to} departureDate={selectedDate.toDateString()} beginTime={makeTimeString(startTime)} endTime={makeTimeString(endTime)} nonStop={checked}/>
                </SessionProvider>
            </div>
        </div>
    )
}