'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

export default function GraduationMoment() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -100px 0px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Parallax for background elements
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section
      id="moment"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #2C1F15 0%, #4A3425 35%, #6F4E37 65%, #4A3425 100%)',
      }}
    >
      {/* Cinematic vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(20,12,8,0.7) 100%)',
        }}
      />

      {/* Animated background light blobs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(111,78,55,0.25) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,99,71,0.2) 0%, transparent 70%)',
          }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Floating sparkles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-beige/20 text-xs pointer-events-none select-none"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            delay: i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ✦
        </motion.div>
      ))}

      {/* Main content */}
      <div ref={sectionRef} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Faculty label */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="h-px w-10 bg-beige/20" />
          <span className="font-accent text-[10px] tracking-[0.4em] uppercase text-beige/40">
            Faculty of Mass Communication
          </span>
          <div className="h-px w-10 bg-beige/20" />
        </motion.div>

        {/* Big name reveal */}
        <div className="overflow-hidden mb-4">
          <motion.h2
            className="font-display text-beige leading-none"
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              fontStyle: 'italic',
              textShadow: '0 0 80px rgba(245,230,211,0.15)',
            }}
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Farha Tarek
          </motion.h2>
        </div>

        {/* Class year */}
        <motion.p
          className="font-accent text-sm tracking-[0.4em] uppercase text-beige/40 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Class of 2026
        </motion.p>

        {/* Divider */}
        <motion.div
          className="h-px mx-auto mb-14"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(245,230,211,0.25), transparent)' }}
          initial={{ width: 0 }}
          animate={isInView ? { width: '100%' } : {}}
          transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Emotional tagline */}
        <div className="space-y-3">
          {[
            'You didn\'t just graduate...',
            'you became a story worth telling.',
          ].map((line, i) => (
            <motion.p
              key={i}
              className={`font-display leading-snug ${
                i === 0
                  ? 'text-beige/50 text-xl md:text-2xl'
                  : 'text-beige text-2xl md:text-4xl italic'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 + i * 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Bottom glow button scroll */}
        <motion.a
          href="#voice"
          className="inline-flex items-center gap-3 mt-20 group"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.6, duration: 1 }}
          whileHover={{ y: -3 }}
        >
          <span className="font-accent text-[11px] tracking-[0.3em] uppercase text-beige/40 group-hover:text-beige/70 transition-colors">
            there's one more thing
          </span>
          <motion.div
            className="w-1 h-1 rounded-full bg-beige/40"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.a>
      </div>
    </section>
  )
}
