'use client'
import { darkMode } from "@/store/atoms";
import { useAtom } from "jotai";

export function DarkModeButton(){
    const [isDark, setIsDark] = useAtom(darkMode)
    function handleDarkMode(){
        setIsDark(!isDark)
        document.body.classList.toggle('dark')
    }

    return (
        <div className="cursor-pointer" onClick={handleDarkMode}>{isDark ? "/ lightmode" : "/ darkmode"}</div>
    )
}