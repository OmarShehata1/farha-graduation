'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 400)
          return 100
        }
        return prev + Math.random() * 18 + 4
      })
    }, 120)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Coffee steam / ambient circle */}
          <motion.div
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(111,78,55,0.15) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Name / logo */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Year */}
            <motion.p
              className="text-coffee/40 font-accent text-xs tracking-[0.35em] uppercase mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              class of
            </motion.p>

            {/* Big year */}
            <motion.h1
              className="font-display text-beige text-[clamp(3rem,10vw,7rem)] leading-none tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              2026
            </motion.h1>

            {/* Divider */}
            <motion.div
              className="h-px w-0 bg-coffee/30 mx-auto my-6"
              animate={{ width: '80px' }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Name */}
            <motion.p
              className="text-beige/60 font-accent text-sm tracking-[0.25em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Farha Tarek
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="h-px bg-coffee/20 w-full rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-beige/50 rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
            <p className="text-coffee/30 text-[10px] font-accent tracking-widest text-center mt-3 uppercase">
              Loading memories...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
