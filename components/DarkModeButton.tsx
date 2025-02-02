'use client'
import { darkMode } from "@/store/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

export function DarkModeButton(){
    const [isDark, setIsDark] = useAtom(darkMode)
    useEffect(()=>{
        const darkPresent = document.body.classList.contains("dark")
        setIsDark(darkPresent)
    }, [])
    function handleDarkMode(){
        setIsDark(!isDark)
        document.body.classList.toggle('dark')
    }

    return (
        <div className="cursor-pointer" onClick={handleDarkMode}>{isDark ? "/ lightmode" : "/ darkmode"}</div>
    )
}