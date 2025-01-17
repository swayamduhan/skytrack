import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function Checkbox({ checked, setChecked } : { checked : boolean, setChecked : any }){
    console.log(checked)
    return (
        <label className="flex cursor-pointer items-center gap-4 group">
            <input type="checkbox" className="peer sr-only" checked={checked} onChange={()=>setChecked(!checked)}/>
            <div className="h-6 w-6 dark:border-white border border-black rounded-md p-1 flex items-center justify-center group-hover:shadow-[0_0_5px_2px_rgba(255,255,255,0.4)] transition-all duration-300 overflow-hidden">
                <AnimatePresence>
                    {checked && 
                        <motion.div
                            className="relative"
                            initial={{top : "20px"}}
                            animate={{top : "0px"}}
                            exit={{top : "-20px"}}
                            transition={{duration : 0.1, type : "spring", bounce : 0.25, damping : 5, mass : 0.5}}
                        >
                            <Check className="h-4 w-4"/>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
            <span className="text-white/70 group-hover:text-white transition-colors duration-300">Show NonStop flights only</span>
        </label>
    )
}