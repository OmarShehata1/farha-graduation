'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const timelineItems = [
  {
    year: 'Year 1',
    emoji: '☕',
    title: 'First Lecture',
    subtitle: 'The beginning of something golden',
    description:
      'The nerves, the excitement, the notebook that felt too blank to fill. You walked in not knowing how much you\'d grow.',
    rotation: '-1.5deg',
    align: 'right',
  },
  {
    year: 'Year 2',
    emoji: '🌙',
    title: 'Sleepless Projects',
    subtitle: 'When 3am became your office',
    description:
      'Coffee cups stacked, screens glowing at midnight. Every all-nighter was a love letter to your craft.',
    rotation: '1.2deg',
    align: 'left',
  },
  {
    year: 'Year 3',
    emoji: '🎬',
    title: 'Camera & Edits',
    subtitle: 'Finding your eye',
    description:
      'You learned to tell stories through a lens. Frame by frame, you found a language that was entirely yours.',
    rotation: '-0.8deg',
    align: 'right',
  },
  {
    year: 'Year 4',
    emoji: '🌧️',
    title: 'Stress & Breakdowns',
    subtitle: 'The chapters you almost didn\'t survive',
    description:
      'But you did. And those broken moments — they\'re why the light looks so much warmer now.',
    rotation: '2deg',
    align: 'left',
  },
  {
    year: '2026',
    emoji: '🎓',
    title: 'Graduation',
    subtitle: 'The ending that\'s a beginning',
    description:
      'You made it. Every single quiet struggle, every doubt, every late-night breakdown led exactly here.',
    rotation: '-1deg',
    align: 'right',
    isFinal: true,
  },
]

function TimelineCard({
  item,
  index,
}: {
  item: (typeof timelineItems)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <motion.div
      ref={ref}
      className={`flex items-center gap-8 md:gap-16 ${
        item.align === 'left' ? 'flex-row' : 'flex-row-reverse'
      }`}
      initial={{ opacity: 0, x: item.align === 'left' ? -60 : 60, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 1,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Card */}
      <motion.div
        className="relative flex-1 glass-card rounded-2xl p-7 md:p-9"
        style={{ rotate: item.rotation, transformOrigin: 'center' }}
        whileHover={{
          rotate: '0deg',
          y: -6,
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        {/* Year badge */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span
            className="font-accent text-[10px] tracking-[0.3em] uppercase px-3 py-1 rounded-full"
            style={{ background: 'rgba(111,78,55,0.08)', color: 'var(--coffee)' }}
          >
            {item.year}
          </span>
          <span className="text-lg">{item.emoji}</span>
        </div>

        {/* Title */}
        <h3
          className="font-display text-2xl md:text-3xl text-soft-black mb-1"
          style={{ fontStyle: 'italic' }}
        >
          {item.title}
        </h3>
        <p className="font-accent text-[11px] tracking-widest uppercase text-coffee/50 mb-4">
          {item.subtitle}
        </p>

        {/* Description */}
        <p className="font-body text-sm text-soft-black/55 leading-relaxed">
          {item.description}
        </p>

        {/* Final highlight glow */}
        {item.isFinal && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(111,78,55,0.04) 0%, rgba(245,230,211,0.3) 100%)',
            }}
          />
        )}
      </motion.div>

      {/* Timeline node */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0">
        <motion.div
          className={`w-3 h-3 rounded-full border-2 ${
            item.isFinal
              ? 'bg-coffee border-coffee shadow-lg'
              : 'bg-beige border-coffee/40'
          }`}
          animate={item.isFinal ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Spacer for alignment */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  )
}

export default function JourneySection() {
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })

  return (
    <section
      id="journey"
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF8F0 0%, #F5E6D3 100%)' }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #6F4E37 0%, transparent 70%)',
          transform: 'translate(40%, -40%)',
        }}
      />

      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-accent text-[10px] tracking-[0.4em] uppercase text-coffee/40 mb-4">
            four years
          </p>
          <h2 className="font-display text-fluid-title text-soft-black italic mb-4">
            The Journey
          </h2>
          <p className="font-body text-sm text-soft-black/40 max-w-xs mx-auto leading-relaxed">
            Every chapter that built you into who you are today.
          </p>

          {/* Decorative line */}
          <motion.div
            className="h-px mx-auto mt-8 bg-gradient-to-r from-transparent via-coffee/20 to-transparent"
            initial={{ width: 0 }}
            animate={isTitleInView ? { width: '120px' } : {}}
            transition={{ delay: 0.4, duration: 1 }}
          />
        </motion.div>

        {/* Vertical timeline line */}
        <div className="relative">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(111,78,55,0.15) 15%, rgba(111,78,55,0.15) 85%, transparent 100%)',
            }}
          />

          {/* Timeline items */}
          <div className="space-y-14 md:space-y-20">
            {timelineItems.map((item, i) => (
              <TimelineCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
