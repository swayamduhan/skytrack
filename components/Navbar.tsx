"use client"
import { Plane } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { DarkModeButton } from "./DarkModeButton"
import { useAtomValue } from "jotai"
import { darkMode } from "@/store/atoms"
import { useEffect, useState } from "react"
import { Drawer } from "./Drawer"
import Image from "next/image"
import { Sidebar } from "./Sidebar"

export default function Navbar(){
    const { data : session, status } = useSession()
    const router = useRouter()
    const isDark = useAtomValue(darkMode)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [hoverIndex, setHoverIndex] = useState<number>(-1)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
      
      return () => window.removeEventListener("resize", handleResize);
    }, []);


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
            router.push('/saved')
        }
    }

    function handleLogoClick(){
        if(status === "authenticated"){
            router.push('/track')
        } else {
            router.push('/')
        }
    }

    return (
        <>
            <div className="bg-slate-100/10 dark:bg-[#0a0a0a]/30 w-full max-w-screen overflow-auto h-24 flex absolute z-[15] justify-between px-8 items-center">
                <div className="text-3xl font-bold font-conforto flex items-center dark:text-white cursor-pointer" onClick={handleLogoClick}>
                    <Plane fill={isDark ? "white" : "black"} color={isDark ? "white" : "black"}/>
                    sky<span className="text-black/60 dark:text-white/60">track</span>
                </div>
                {isMobile ? (
                    <>
                        <Sidebar status={status} handleAuth={handleAuth} handleCards={handleCards} setDrawerOpen={setDrawerOpen}/>
                    </>
                ) : (
                <div className="flex gap-10 text-lg dark:text-white/65 tracking-[4px] font-mono">
                    <div className={`cursor-pointer ${hoverIndex != -1 && hoverIndex != 0 ? "blur-[3px]" : ""} transition-all duration-300`} onMouseOver={()=>setHoverIndex(0)} onMouseLeave={()=>setHoverIndex(-1)} onClick={()=>setDrawerOpen(prev => !prev)}>/ contact</div>
                    <div className={`cursor-pointer ${hoverIndex != -1 && hoverIndex != 1 ? "blur-[3px]" : ""} transition-all duration-300`} onMouseOver={()=>setHoverIndex(1)} onMouseLeave={()=>setHoverIndex(-1)} onClick={handleAuth}>/ {status === "authenticated" ? "logout" : "login"}</div>
                    <div className={`cursor-pointer ${hoverIndex != -1 && hoverIndex != 2 ? "blur-[3px]" : ""} transition-all duration-300`} onMouseOver={()=>setHoverIndex(2)} onMouseLeave={()=>setHoverIndex(-1)}>
                        <DarkModeButton />
                    </div>
                    {status === "authenticated" && <div className={`cursor-pointer ${hoverIndex != -1 && hoverIndex != 3 ? "blur-[3px]" : ""} transition-all duration-300`} onMouseOver={()=>setHoverIndex(3)} onMouseLeave={()=>setHoverIndex(-1)} onClick={handleCards}>/ saved</div>}
                </div>
                )}
            </div>

            {/* Drawer for contact */}
            <Drawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}>
                <div className="dark:text-white flex justify-center">
                    <div className="flex flex-col gap-8 w-full items-center">
                        <h1 className="text-3xl font-bold border-b pb-2 border-gray-600 max-w-[50%] text-center">/ Contact - Swayam Duhan</h1>
                        <div className="flex justify-around gap-20">
                            <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={()=>window.open("https://github.com/swayamduhan", "_blank")}>
                                <div className="border p-1 rounded-full dark:bg-white">
                                    <Image src="/github-logo.png" alt="email" width={50} height={50}/>
                                </div>
                                Github
                            </div>
                            <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={()=>window.open("https://www.linkedin.com/in/swayam-duhan-5a86bb127/", "_blank")}>
                                <div className="p-1 bg-white rounded-full">
                                    <Image src="/linked-logo.png" alt="email" width={50} height={50}/>
                                </div>
                                LinkedIn
                            </div>
                            <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={()=>window.open("mailto:swayam.duhan10@gmail.com", "_blank")}>
                                <div className="border p-1 rounded-full bg-white">
                                    <Image src="/gmail-logo.png" alt="email" width={50} height={50}/>
                                </div>
                                Email
                            </div>
                            <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={()=>window.open("https://x.com/swayambuilds", "_blank")}>
                                <div className="border p-1 rounded-full bg-white">
                                    <Image src="/x-logo.png" alt="email" width={50} height={50}/>
                                </div>
                                X
                            </div>
                        
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    )
}
