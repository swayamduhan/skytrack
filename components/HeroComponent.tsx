"use client"
import { useRouter } from "next/navigation";
import GradientButton from "./GradientButton";
import { motion } from "motion/react";

export default function HeroComponent() {
  const router = useRouter()
    return (
      <div className="backdrop-blur-md p-16 rounded-2xl flex flex-col lg:w-1/2 lg:max-w-[800px] items-center m-3 gap-14 shadow-2xl">
        <div className="max-w-full font-satoshi font-black text-5xl flex flex-col gap-4">
          <span>
            <motion.span initial={{opacity : 0, top : "10px"}} animate={{opacity:1, top : "0px"}} transition={{duration : 0.5}} className="relative">
              get flight{" "}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(45deg,#A9BCF5_9%,#89ABE3_25%,#6D82D1_51%,#5359BF_78%,#3A30A8_100%)] drop-shadow-[0_2px_15px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_0_15px_rgba(224,206,206,0.5)]">
                prices
              </span>
              . 
            </motion.span>
            <br />
            <motion.span initial={{opacity : 0, top : "10px"}} animate={{opacity:1, top : "0px"}} transition={{duration : 0.5, delay : 0.2}} className="relative">
              get{" "}
              <span className="text-transparent bg-clip-text bg-[linear-gradient(45deg,#A9BCF5_9%,#89ABE3_25%,#6D82D1_51%,#5359BF_78%,#3A30A8_100%)] drop-shadow-[0_2px_15px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_0_15px_rgba(224,206,206,0.5)]">
                notified
              </span>
              .
            </motion.span>
          </span>
          <motion.span className="text-xl font-normal text-slate-500 dark:text-white/60 pl-2 relative" initial={{opacity : 0, top : "10px"}} animate={{opacity:1, top : "0px"}} transition={{duration : 0.5, delay : 0.4}}>
            skytrack allows you to track flights for a specified timerange and notifies you when the price drops
          </motion.span>
        </div>
        <motion.div className="grid grid-cols-6 w-full items-center gap-6 relative" initial={{opacity : 0, top : "10px"}} animate={{opacity:1, top : "0px"}} transition={{duration : 0.5, delay : 0.6}}>
          <GradientButton label="continue without logging in" onClick={()=>router.push('/track')}/>
          <button className="col-span-2 border p-2 rounded-3xl text-lg px-8 dark:bg-white text-[var(--background)] bg-[var(--foreground)] dark:text-black font-satoshi font-bold border border-white border-[3px]" onClick={()=>router.push('/api/auth/signin')}>
            login
          </button>
        </motion.div>
      </div>
    );
  }
  