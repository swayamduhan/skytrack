'use client'

import { flightResult, loadingResults, showCards } from "@/store/atoms"
import { useAtom, useAtomValue } from "jotai"
import { DisplayFlights } from "./DisplayFlights"
import { AnimatePresence, motion, Variants } from "motion/react"
import { CardComponent } from "./CardComponent"
import { SessionProvider } from "next-auth/react"

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: { staggerChildren: 0.2, staggerDirection: -1 },
  },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, staggerDirection: 1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.2, staggerDirection: -1 },
  }
}

export function OutputComponent() {
  const [output, setOutput] = useAtom(flightResult)
  const [showUserCards, setShowUserCards] = useAtom(showCards)
  const loading = useAtomValue(loadingResults)

  return (
    <div className="bg-white/10 rounded-md">
      <AnimatePresence mode="wait">
        {loading ? (
          <div key="loading-flights">
            Loading results...
          </div>
        ) : showUserCards ? (
          <div
            key="show-cards"
            className="h-full w-full"
          >
            <SessionProvider>
              <CardComponent />
            </SessionProvider>
          </div>
        ) : (
          <motion.div
            key="flight-data"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <DisplayFlights
              flights={output}
              setFlights={setOutput}
              setShowCards={setShowUserCards}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
