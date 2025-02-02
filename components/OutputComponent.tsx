'use client'

import { darkMode, flightResult, loadingResults, showCards } from "@/store/atoms"
import { useAtom, useAtomValue } from "jotai"
import { DisplayFlights } from "./DisplayFlights"
import { AnimatePresence, motion, Variants } from "motion/react"
import { CardComponent, CenteredText } from "./CardComponent"
import { SessionProvider } from "next-auth/react"
import { useState } from "react"
import { ArrowSVG } from "./Arrow"
import { X } from "lucide-react"

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
  const [open, isOpen] = useState(true)
  const isDark = useAtomValue(darkMode)

  return (
    <div className="bg-black/5 dark:bg-white/10 rounded-md">
      <AnimatePresence mode="wait">
        {loading ? (
          <div key="loading-flights">
            <CenteredText>
              Loading results...
            </CenteredText>
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
