"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { AnimatePresence, motion, Variants } from "motion/react"
import { DarkModeButton } from "./DarkModeButton"

export function Sidebar({ status, setDrawerOpen, handleAuth, handleCards } : { status : "authenticated" | "loading" | "unauthenticated", setDrawerOpen : Dispatch<SetStateAction<boolean>>, handleAuth : ()=>Promise<void>, handleCards : ()=>void }){
    const [isOpen, setIsOpen] = useState(false)

    const barVariants : Variants = {
        open : {
            translateX : 0,
            transition : {
                staggerChildren : 0.07,
                delayChildren : 0.1,
                ease : "easeInOut",
                duration : 0.2
            }
        },
        closed : {
            translateX : "100%",
            transition : {
                staggerChildren : 0.07,
                duration : 0.2,
                ease : "easeInOut",
                staggerDirection : -1,
                when : "afterChildren"
            }
        }
    }

    const itemVariants : Variants = {
        open : {
            opacity : 1,
            y : 0,
            filter : "blur(0px)"
        },
        closed : {
            opacity : 0,
            y : "20px",
            filter: "blur(10px)"
        }
    }

    return (
        <>
        <button onClick={()=>setIsOpen(!isOpen)}>
            <div className="w-8 h-6 relative overflow-hidden z-[13]">
                {/* Upper Line */}
                <motion.div 
                    className="w-full absolute bg-neutral-500 h-0.5"
                    initial={{top : 0}}
                    animate={{top : isOpen ? 10 : 5, rotate: isOpen ? 45 : 0}}
                    
                />
                {/* Middle Line */}
                <motion.div 
                    className="w-full absolute bg-neutral-500 h-0.5"
                    initial={{top : 0}}
                    animate={{top : isOpen ? 0 : 10, translateX : isOpen ? 50 : 0}}
                />
                {/* Lower Line */}
                <motion.div 
                    className="w-full absolute bg-neutral-500 h-0.5"
                    initial={{top : 0}}
                    animate={{top : isOpen ? 9 : 15, rotate : isOpen ? -45 : 0}}
                />
            </div>
        </button>

        {/* Sidebar Panel */}
        <AnimatePresence mode="wait">
        {isOpen && 
        <motion.div
            className="inset-0 z-[10] fixed backdrop-blur-3xl flex justify-center items-center"
            variants={barVariants}
            key="sidebar"
            initial="closed"
            animate="open"
            exit="closed"
            >
            <div className="flex flex-col gap-10 text-2xl dark:text-white/65 tracking-[4px] font-mono">
                <motion.div 
                    key="contact"
                    className={`cursor-pointer relative`} 
                    onClick={()=>setDrawerOpen(prev => !prev)}
                    variants={itemVariants}
                    >
                    / contact
                </motion.div>

                <motion.div 
                    key="auth"
                    className={`cursor-pointer relative`} 
                    onClick={handleAuth}
                    variants={itemVariants}
                    >
                    / {status === "authenticated" ? "logout" : "login"}
                </motion.div>

                <motion.div 
                    key="darklight"
                    className={`cursor-pointer relative`}
                    variants={itemVariants}
                    >
                    <DarkModeButton />
                </motion.div>
                {status === "authenticated" && 
                <motion.div 
                key="saved"
                className={`cursor-pointer relative`} 
                onClick={handleCards}
                variants={itemVariants}
                >
                    / saved
                </motion.div>
                }
            </div>
        </motion.div>
        }
        </AnimatePresence>
        </>
    )
}