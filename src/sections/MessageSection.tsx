'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// The intimate message lines — each typed one by one
const messageLines = [
  { text: 'I know how hard you worked.', pause: 1200 },
  { text: 'The nights no one saw.', pause: 900 },
  { text: 'The drafts you scrapped at 2am.', pause: 1000 },
  { text: 'The doubt that whispered — maybe not.', pause: 1400 },
  { text: '', pause: 600 },
  { text: 'But you kept going.', pause: 900 },
  { text: 'Quietly. Beautifully. Stubbornly.', pause: 1100 },
  { text: '', pause: 600 },
  { text: 'And I wish you could see yourself', pause: 800 },
  { text: 'the way I do.', pause: 1500 },
  { text: '', pause: 400 },
  { text: "Because from where I'm standing...", pause: 900 },
  { text: "you've always been extraordinary.", pause: 2000 },
]

function TypewriterLine({ text, onComplete }: { text: string; onComplete: () => void }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (text === '') {
      const t = setTimeout(() => {
        setDone(true)
        onComplete()
      }, 300)
      return () => clearTimeout(t)
    }

    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
        onComplete()
      }
    }, 38)
    return () => clearInterval(interval)
  }, [text])

  if (text === '') return <div className="h-6" />

  return (
    <span>
      {displayed}
      {!done && (
        <motion.span
          className="inline-block w-0.5 h-5 bg-coffee/60 ml-0.5 align-middle"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  )
}

export default function MessageSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -100px 0px' })

  const [currentLine, setCurrentLine] = useState(-1)
  const [completedLines, setCompletedLines] = useState<number[]>([])
  const [started, setStarted] = useState(false)

  // Start typing when section comes into view
  useEffect(() => {
    if (isInView && !started) {
      const t = setTimeout(() => {
        setStarted(true)
        setCurrentLine(0)
      }, 600)
      return () => clearTimeout(t)
    }
  }, [isInView, started])

  const handleLineComplete = (index: number) => {
    setCompletedLines(prev => [...prev, index])
    const pause = messageLines[index]?.pause || 800
    setTimeout(() => {
      if (index < messageLines.length - 1) {
        setCurrentLine(index + 1)
      }
    }, pause)
  }

  return (
    <section
      id="message"
      className="relative min-h-screen flex items-center justify-center px-6 py-32 overflow-hidden"
      style={{ background: '#FFF8F0' }}
    >
      {/* Ambient light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(245,230,211,0.5) 0%, transparent 70%)',
        }}
      />

      {/* Big decorative quote mark */}
      <div
        className="absolute top-20 left-8 md:left-20 font-display text-[16rem] leading-none text-coffee/4 pointer-events-none select-none"
        aria-hidden
      >
       {'"'}
      </div>

      <div ref={sectionRef} className="relative z-10 max-w-xl mx-auto w-full">
        {/* Label */}
        <motion.div
          className="flex items-center gap-3 mb-14"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="h-px w-8 bg-coffee/30" />
          <span className="font-accent text-[10px] tracking-[0.35em] uppercase text-coffee/40">
            a quiet letter
          </span>
        </motion.div>

        {/* Typewriter text block */}
        <div className="space-y-3">
          {messageLines.map((line, i) => (
            <AnimatePresence key={i}>
              {(currentLine >= i || completedLines.includes(i)) && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-display text-xl md:text-2xl leading-relaxed ${
                    line.text === '' ? '' : 'text-soft-black/80'
                  } ${
                    i >= 5 && i <= 6 ? 'text-coffee font-semibold' : ''
                  } ${
                    i === 12 ? 'italic text-coffee' : ''
                  }`}
                  style={i === 12 ? { fontStyle: 'italic' } : {}}
                >
                  {currentLine === i && !completedLines.includes(i) ? (
                    <TypewriterLine
                      text={line.text}
                      onComplete={() => handleLineComplete(i)}
                    />
                  ) : (
                    line.text
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Signature */}
        <AnimatePresence>
          {completedLines.length >= messageLines.length && (
            <motion.div
              className="mt-14 flex flex-col gap-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="h-px w-12 bg-coffee/20 mb-4" />
              <p
                className="font-display text-lg text-coffee/60 italic"
              >
                with love,
              </p>
              <p
                className="font-display text-2xl text-coffee italic"
              >
                always yours ✦
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
