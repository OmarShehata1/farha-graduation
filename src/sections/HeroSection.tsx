'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Ambient floating particle
function Particle({
  size, x, y, duration, delay,
}: {
  size: number; x: string; y: string; duration: number; delay: number
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: `radial-gradient(circle, rgba(111,78,55,0.10) 0%, transparent 70%)`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 12, 0],
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

// Word reveal animation
const heroLines = [
  { text: '2026...', delay: 0.2, italic: true },
  { text: "wasn't just your graduation year.", delay: 0.5 },
  { text: 'it was the year you became', delay: 0.8 },
  { text: 'everything beautiful.', delay: 1.1, italic: true, highlight: true },
]

const wordVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

function AnimatedLine({
  text,
  baseDelay,
  italic,
  highlight,
}: {
  text: string; baseDelay: number; italic?: boolean; highlight?: boolean
}) {
  const words = text.split(' ')
  return (
    <div className={`flex flex-wrap gap-x-3 gap-y-1 justify-center ${italic ? 'italic' : ''}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: baseDelay + i * 0.08 }}
          className={`inline-block ${
            highlight
              ? 'text-coffee-gradient font-semibold'
              : 'text-soft-black/80'
          }`}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  // Subtle parallax on scroll
  useEffect(() => {
    const el = parallaxRef.current
    if (!el) return

    const onScroll = () => {
      const scrolled = window.scrollY
      el.style.transform = `translateY(${scrolled * 0.3}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 60% 40%, #F5E6D3 0%, #FFF8F0 55%, #FAF0E6 100%)',
      }}
    >
      {/* Ambient background light blobs */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none">
        <Particle size={300} x="10%" y="15%" duration={8} delay={0} />
        <Particle size={200} x="75%" y="10%" duration={11} delay={1.5} />
        <Particle size={160} x="80%" y="65%" duration={9} delay={0.8} />
        <Particle size={240} x="5%" y="70%" duration={12} delay={2} />
        <Particle size={120} x="50%" y="5%" duration={7} delay={0.3} />
        <Particle size={90} x="35%" y="85%" duration={10} delay={1} />
      </div>

      {/* Subtle top line decoration */}
      <motion.div
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(111,78,55,0.12), transparent)' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Navigation dots — top right */}
      <motion.div
        className="absolute top-10 right-10 flex flex-col gap-2 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        {['hero', 'journey', 'message', 'gallery', 'moment'].map((id, i) => (
          <a key={id} href={`#${id}`}>
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-coffee/30 hover:bg-coffee/70 transition-colors"
              whileHover={{ scale: 1.5 }}
            />
          </a>
        ))}
      </motion.div>

      {/* Small top label */}
      <motion.p
        className="absolute top-10 left-10 font-accent text-[10px] tracking-[0.35em] uppercase text-coffee/40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        Mass Communication — 2026
      </motion.p>

      {/* Hero Text */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Decorative small label */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="h-px w-10 bg-coffee/30" />
          <span className="font-accent text-[11px] tracking-[0.3em] uppercase text-coffee/50">
            A story worth telling
          </span>
          <div className="h-px w-10 bg-coffee/30" />
        </motion.div>

        {/* Main headline */}
        <div className="font-display text-fluid-hero text-soft-black leading-[1.05] space-y-2 mb-12">
          {heroLines.map((line, i) => (
            <AnimatedLine
              key={i}
              text={line.text}
              baseDelay={line.delay}
              italic={line.italic}
              highlight={line.highlight}
            />
          ))}
        </div>

        {/* Subtext */}
        <motion.p
          className="font-body text-soft-black/40 text-sm tracking-wide max-w-sm mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          for Farha Tarek
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-transparent via-coffee/40 to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="font-accent text-[9px] tracking-[0.35em] uppercase text-coffee/30">
          scroll
        </span>
      </motion.div>

      {/* Bottom decorative coffee ring */}
      <motion.div
        className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-5 pointer-events-none"
        style={{ border: '80px solid #6F4E37', transform: 'translate(30%, 30%)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ delay: 1, duration: 2 }}
      />
    </section>
  )
}
