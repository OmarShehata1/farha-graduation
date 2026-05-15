'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// Animated waveform bars
function Waveform({ isPlaying }: { isPlaying: boolean }) {
  const bars = 28

  return (
    <div className="flex items-center justify-center gap-[3px] h-10">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{ background: 'rgba(111,78,55,0.6)' }}
          animate={
            isPlaying
              ? {
                  height: [
                    4,
                    Math.random() * 28 + 6,
                    Math.random() * 18 + 4,
                    Math.random() * 32 + 8,
                    4,
                  ],
                }
              : { height: 4 }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.8 + Math.random() * 0.6,
                  repeat: Infinity,
                  delay: i * 0.04,
                  ease: 'easeInOut',
                }
              : { duration: 0.4 }
          }
        />
      ))}
    </div>
  )
}

// Voice message modal
function VoiceModal({ onClose }: { onClose: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Simulate audio playback (replace with real Audio() for actual audio)
  const togglePlay = () => {
    if (!hasStarted) setHasStarted(true)

    if (isPlaying) {
      setIsPlaying(false)
      audioRef.current?.pause()
    } else {
      setIsPlaying(true)
      audioRef.current?.play()
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Format time from progress (simulated 2:30 total)
  const totalSeconds = 150
  const currentSeconds = Math.floor((progress / 100) * totalSeconds)
  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <motion.div
      className="modal-backdrop fixed inset-0 z-[9995] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <audio ref={audioRef} src="/audio/everyHi.mp3" ></audio>
      <motion.div
        className="relative w-full max-w-sm"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal card */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255,248,240,0.97)',
            boxShadow:
              '0 40px 80px rgba(44,31,21,0.4), 0 8px 24px rgba(44,31,21,0.2)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Top decorative strip */}
          <div
            className="h-1 w-full"
            style={{
              background: 'linear-gradient(90deg, #6F4E37, #8B6347, #6F4E37)',
            }}
          />

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              {/* Animated mic icon */}
              <motion.div
                className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
                style={{ background: 'rgba(111,78,55,0.08)' }}
                animate={isPlaying ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6F4E37"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </motion.div>

              <p className="font-accent text-[10px] tracking-[0.35em] uppercase text-coffee/40 mb-2">
                voice note
              </p>
              <h3 className="font-display text-2xl text-soft-black italic">
                One last thing...
              </h3>
              <p className="font-body text-xs text-soft-black/40 mt-1">
                from someone who believes in you
              </p>
            </div>

            {/* Waveform */}
            <div
              className="rounded-2xl px-4 py-5 mb-6"
              style={{ background: 'rgba(111,78,55,0.04)' }}
            >
              <Waveform isPlaying={isPlaying} />

              {/* Progress bar */}
              <div className="mt-4 relative">
                <div
                  className="h-0.5 w-full rounded-full"
                  style={{ background: 'rgba(111,78,55,0.12)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #6F4E37, #8B6347)',
                    }}
                    transition={{ ease: 'linear' }}
                  />
                </div>

                {/* Time labels */}
                <div className="flex justify-between mt-2">
                  <span className="font-accent text-[9px] text-coffee/40 tracking-wide">
                    {formatTime(currentSeconds)}
                  </span>
                  <span className="font-accent text-[9px] text-coffee/30 tracking-wide">
                    {formatTime(totalSeconds)}
                  </span>
                </div>
              </div>
            </div>

            {/* Play / Pause button */}
            <motion.button
              onClick={togglePlay}
              className="w-full py-4 rounded-2xl font-accent text-sm tracking-wide text-beige relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #4A3425, #6F4E37)',
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              data-cursor="hover"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, rgba(139,99,71,0.4), transparent 70%)',
                }}
                animate={isPlaying ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <span className="relative z-10 flex items-center justify-center gap-3">
                {isPlaying ? (
                  <>
                    <PauseIcon />
                    pause
                  </>
                ) : progress === 100 ? (
                  <>
                    <ReplayIcon />
                    listen again
                  </>
                ) : (
                  <>
                    <PlayIcon />
                    {hasStarted ? 'resume' : 'play message'}
                  </>
                )}
              </span>
            </motion.button>

            {/* Placeholder note */}
            <p className="text-center font-body text-[10px] text-soft-black/25 mt-4 leading-relaxed">
              Replace with real audio in{' '}
              <code className="font-mono text-coffee/40">/public/audio/message.mp3</code>
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(44,31,21,0.7)',
            backdropFilter: 'blur(8px)',
          }}
          data-cursor="hover"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="rgba(245,230,211,0.7)"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>
  
      </motion.div>
    </motion.div>
  )
}

// SVG Icons
const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M3 2l10 5-10 5V2z" />
  </svg>
)
const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <rect x="2" y="2" width="4" height="10" rx="1" />
    <rect x="8" y="2" width="4" height="10" rx="1" />
  </svg>
)
const ReplayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M1 4v6h6" />
    <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
  </svg>
)

export default function VoiceSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <>
      <section
        id="voice"
        className="relative py-40 px-6 flex items-center justify-center overflow-hidden"
        style={{ background: '#FFF8F0' }}
      >
        {/* Soft background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 60%, rgba(245,230,211,0.6) 0%, transparent 70%)',
          }}
        />

        <div ref={sectionRef} className="relative z-10 text-center max-w-md mx-auto">
          {/* Top label */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-12"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <div className="h-px w-8 bg-coffee/20" />
            <span className="font-accent text-[10px] tracking-[0.35em] uppercase text-coffee/35">
              for your ears only
            </span>
            <div className="h-px w-8 bg-coffee/20" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="font-display text-4xl md:text-5xl text-soft-black italic mb-4"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Before you go...
          </motion.h2>
          <motion.p
            className="font-body text-sm text-soft-black/40 mb-14 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 1 }}
          >
            There's a voice note waiting for you. <br />
            Something I couldn't put into words.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              onClick={() => setModalOpen(true)}
              className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full font-accent text-sm tracking-widest uppercase text-beige overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #2C1F15 0%, #6F4E37 100%)',
                boxShadow: '0 8px 40px rgba(111,78,55,0.25)',
              }}
              whileHover={{
                y: -4,
                boxShadow: '0 20px 60px rgba(111,78,55,0.4)',
              }}
              whileTap={{ scale: 0.98 }}
              data-cursor="hover"
            >
              {/* Shimmer */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 30%, rgba(245,230,211,0.08) 50%, transparent 70%)',
                }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
              />

              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-beige/20"
                animate={{ scale: [1, 1.08], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Mic dot */}
              <motion.div
                className="w-2 h-2 rounded-full bg-beige/60"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />

              <span className="relative z-10">One last thing...</span>
            </motion.button>
          </motion.div>

          {/* Small note */}
          <motion.p
            className="font-display italic text-coffee/25 text-sm mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 1 }}
          >
            press play when you're ready ♡
          </motion.p>
        </div>

        {/* Footer */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <p className="font-accent text-[9px] tracking-[0.35em] uppercase text-coffee/20">
            Farha Tarek · Mass Communication · 2026 · ✦
          </p>
        </motion.div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && <VoiceModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
