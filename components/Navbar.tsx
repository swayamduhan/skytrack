"use client"
import { Plane } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { DarkModeButton } from "./DarkModeButton"
import { useAtomValue } from "jotai"
import { darkMode } from "@/store/atoms"

export default function Navbar(){
    const { data : session, status } = useSession()
    const router = useRouter()
    const isDark = useAtomValue(darkMode)


    async function handleAuth(){
        if(status === "authenticated"){
            await signOut({
                callbackUrl : "/"
            })
        } else {
            router.push('/api/auth/signin')
        }
    }

    function handleCards(){
        if(status === "unauthenticated"){
            console.log("you are not logged in! toast")
        } else {
            router.push('/cards')
        }
    }

    return (
        <div className="bg-slate-100/10 dark:bg-[#0a0a0a]/30 w-full max-w-screen overflow-auto h-24 flex absolute z-10 justify-between px-8 items-center">
            <div className="text-3xl font-bold font-conforto flex items-center dark:text-white ">
                <Plane fill={isDark ? "white" : "black"} color={isDark ? "white" : "black"}/>
                sky<span className="text-black/60 dark:text-white/60">track</span>
            </div>
            <div className="flex gap-10 text-lg dark:text-white/65 tracking-[4px] font-mono">
                <div className="cursor-pointer">/ contact</div>
                <div className="cursor-pointer" onClick={handleAuth}>/ {status === "authenticated" ? "logout" : "login"}</div>
                <DarkModeButton />
                {status === "authenticated" && <div className="cursor-pointer" onClick={handleCards}>/ saved</div>}
            </div>
        </div>
    )
}
