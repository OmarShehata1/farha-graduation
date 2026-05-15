'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// Placeholder image data — replace with real photos
const galleryItems = [
  {
    src: 'images/farha.jpeg',
    caption: 'the beginning',
    date: 'Sept 2022',
    rotate: '-3deg',
    delay: 0,
  },
  {
    src: 'images/f5.jpeg',
    caption: 'golden hour study',
    date: 'Nov 2022',
    rotate: '2.5deg',
    delay: 0.1,
  },
  {
    src: 'images/farha2.jpeg',
    caption: 'words & pages',
    date: 'Feb 2023',
    rotate: '-1.5deg',
    delay: 0.2,
  },
  {
    src: 'images/f4.jpeg',
    caption: 'behind the lens',
    date: 'Oct 2023',
    rotate: '3deg',
    delay: 0.15,
  },
  {
    src: 'images/f2.jpeg',
    caption: 'behind the lens',
    date: 'Mar 2024',
    rotate: '-2deg',
    delay: 0.25,
  },
  {
    src: 'images/f6.jpeg',
    caption: 'we made it',
    date: 'May 2026',
    rotate: '1.5deg',
    delay: 0.3,
    isFinal: true,
  },
]

function PolaroidCard({
  item,
  index,
}: {
  item: (typeof galleryItems)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="polaroid rounded-sm overflow-visible"
      style={{
        rotate: item.rotate,
        transformOrigin: 'center bottom',
      }}
      initial={{ opacity: 0, y: 60, rotate: item.rotate }}
      animate={isInView ? { opacity: 1, y: 0, rotate: item.rotate } : {}}
      transition={{
        duration: 0.9,
        delay: item.delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        rotate: '0deg',
        y: -12,
        scale: 1.04,
        zIndex: 20,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Polaroid frame */}
      <div className="bg-white p-3 pb-10 shadow-lg relative" style={{ width: 220 }}>
        {/* Film frame top strip */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1.05' }}>
          {/* Film grain overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
              mixBlendMode: 'overlay',
            }}
          />

          {/* Film border vignette */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)',
            }}
          />

          {/* Image */}
          <img
            src={item.src}
            alt={item.caption}
            className="w-full h-full object-cover"
            style={{
              filter: isHovered
                ? 'saturate(1.1) contrast(1.02)'
                : 'saturate(0.85) sepia(0.1)',
              transition: 'filter 0.4s ease',
            }}
          />

          {/* Final card heart */}
          {item.isFinal && (
            <motion.div
              className="absolute top-2 right-2 z-20 text-white text-xs bg-coffee/60 rounded-full px-2 py-0.5 backdrop-blur-sm"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦
            </motion.div>
          )}
        </div>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-2">
          <p
            className="font-display italic text-sm text-soft-black/60 text-center leading-tight"
          >
            {item.caption}
          </p>
          <p className="font-accent text-[9px] tracking-widest uppercase text-coffee/30 text-center mt-0.5">
            {item.date}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function GallerySection() {
  const titleRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true })

  return (
    <section
      id="gallery"
      className="relative py-32 px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F5E6D3 0%, #FFF8F0 50%, #F5E6D3 100%)',
      }}
    >
      {/* Decorative corner elements */}
      <div
        className="absolute top-0 left-0 w-48 h-48 pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle at top left, #6F4E37, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none opacity-10"
        style={{
          background: 'radial-gradient(circle at bottom right, #6F4E37, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-accent text-[10px] tracking-[0.4em] uppercase text-coffee/40 mb-4">
            captured moments
          </p>
          <h2 className="font-display text-fluid-title text-soft-black italic mb-4">
            The Gallery
          </h2>
          <p className="font-body text-sm text-soft-black/40 max-w-xs mx-auto">
            Frames from four years of beautiful chaos.
          </p>
        </motion.div>

        {/* Polaroid grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 px-4">
          {galleryItems.map((item, i) => (
            <PolaroidCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center font-display italic text-coffee/30 text-sm mt-20"
          initial={{ opacity: 0 }}
          animate={isTitleInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
        >
          every photo holds a whole world
        </motion.p>
      </div>
    </section>
  )
}
