import { X } from "lucide-react";
import { AnimatePresence, Variants } from "motion/react";
import { motion } from "motion/react";

const backdropVariants : Variants = {
    closed : {
        backdropFilter : "blur(0px)",
        transition : {
            duration : 0.2,
            ease : "easeOut"
        }
    },
    open : {
        backdropFilter : "blur(10px)",
        transition : {
            duration : 0.2,
            ease : "easeOut"
        }
    }
}

const drawerVariants : Variants = {
    closed : {
        bottom : "-50vh",
        transition : {
            duration : 0.2,
            ease : "easeOut"
        }
    },
    open : {
        bottom : "0px",
        transition : {
            duration : 0.2,
            ease : "easeOut"
        }
    },
}

export function Drawer({ children,  drawerOpen, setDrawerOpen } : { children : any, drawerOpen : boolean, setDrawerOpen : any}){
    return (
        <>
        <AnimatePresence>
            {drawerOpen && (
                <motion.div className="fixed z-[12] inset-0 bg-black/20 dark:bg-black/50" onClick={()=>setDrawerOpen(false)} variants={backdropVariants} initial="closed" animate="open" exit="closed">
                    <motion.div className="absolute z-[13] w-full min-h-[300px] max-h-[50vh] bg-white dark:bg-[var(--background-dark)] rounded-t-[50px] px-16 py-10" onClick={(e) => e.stopPropagation()} variants={drawerVariants}>
                        {children} 
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        </>
    )
}