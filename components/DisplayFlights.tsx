import { Flight } from "@/app/api/scrape/route";
import { Clock } from "lucide-react";
import { motion, Variants } from "motion/react";

const containerVariants : Variants = {
    hidden : {
        opacity : 0,
        transition : {
            duration : 0,
            staggerChildren : 0.2,
            staggerDirection : 1,
            when : "afterChildren"
        }
    },
    visible : {
        opacity : 1,
        transition : {
            duration : 0,
            staggerChildren : 0.2,
            staggerDirection : 1,
            when : "beforeChildren"
        }
    },
    exit : {
        opacity : 0,
        transition : {
            duration : 0,
            staggerChildren : 0.1,
            staggerDirection : 1,
            when : "afterChildren"
        }
    }
}

const childVariants : Variants = {
    hidden : {
        top : "40px",
        opacity : 0,
        transition : {
            duration : 0.3
        }
    },
    visible : {
        opacity : 1,
        top : "0px",
        transition : {
            duration : 0.3
        }
    },
    exit : {
        opacity : 0,
        top : "-20px",
        transition : {
            duration : 0.1
        }
    }
}

export function DisplayFlights({ flights, setFlights, setShowCards } : { flights : Flight[], setFlights : any, setShowCards : any}){
    return (
        <div id="flights" className="flex flex-col h-full font-satoshi text-black dark:text-white">
            <div className="flex-1">
                    {flights.length === 0 ? 
                    <motion.div key="flights-unavailable" className="flex justify-center items-center h-full">FLIGHTS_UNAVAILABLE_FOR_THE_SEARCH</motion.div>
                    : 
                    <motion.div key="flights" className="flex flex-col gap-4 p-4 max-h-[540px] overflow-y-auto" variants={containerVariants} initial="hidden" animate="visible" exit="exit">
                        {flights.map(flight => {
                            return <motion.div variants={childVariants} key={flight.id} className="text-sm sm:text-md relative border flex justify-between items-center p-6 rounded-md bg-white/5 shadow-xl">
                                <div className="flex flex-col">
                                    <div className="text-lg sm:text-xl font-bold">{flight.airline}</div>
                                    {showStop(flight.stop)}
                                </div>
                                <div className="font-bold flex items-center gap-1">
                                    <Clock className="h-4 w-4"/>
                                    {flight.beginTime} - {flight.endTime}
                                </div>
                                <div className="font-bold">{flight.price}</div>
                            </motion.div>
                        })}
                    </motion.div>
                    }
            </div>

            <div className="flex p-2 px-4">
                <button className="p-2 border border-black dark:border-white rounded-md bg-white dark:bg-black font-bold px-4" onClick={()=>{
                    setFlights([])
                    setShowCards(true)
                }}>Clear Flights</button>
            </div>
        </div>
    )
}


function showStop(stop : boolean){
    return (
        <div className="text-xs bg-[linear-gradient(45deg,#A9BCF5_9%,#89ABE3_25%,#6D82D1_51%,#5359BF_78%,#3A30A8_100%)] text-black font-bold flex justify-center items-center p-1 px-2 rounded-xl w-[5rem]">
            {stop ? "Has Stops" : "NonStop"}
        </div>
    )
}