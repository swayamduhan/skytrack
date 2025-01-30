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

export default function InputComponent(){
    const [from, setFrom] = useState<string>("")
    const [to, setTo] = useState<string>("")
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [startTime, setStartTime] = useState(new Date())
    const [endTime, setEndTime] = useState(new Date())
    const [checked, setChecked] = useState(false)

    return (
        <div className="bg-black/5 dark:bg-white/10 rounded-md p-10 flex flex-col gap-10 font-satoshi text-[var(--foreground)] dark:text-[var(--foreground-dark)]">
            <div className="font-black text-3xl">Enter Flight Details</div>
            <div className="grid grid-cols-2 gap-20">
                <InputBox state={from} setState={setFrom} label="Origin" placeholder="DEL"/>
                <InputBox state={to} setState={setTo} label="Destination" placeholder="GOA"/>
            </div>
            <div className="grid grid-cols-2 gap-20">
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
            <div className="grid grid-cols-2 gap-20 font-bold">
                <Button from={from} to={to} departureDate={selectedDate} startTime={startTime} endTime={endTime} checked={checked}/>
                <SessionProvider>
                <FavButton origin={from} destination={to} departureDate={selectedDate.toDateString()} beginTime={makeTimeString(startTime)} endTime={makeTimeString(endTime)} nonStop={checked}/>
                </SessionProvider>
            </div>
        </div>
    )
}