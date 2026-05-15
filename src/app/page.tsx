'use client'

import { useLenis } from '@/hooks/useLenis'
import CustomCursor from '@/components/CustomCursor'
import LoadingScreen from '@/components/LoadingScreen'
import ScrollProgress from '@/components/ScrollProgress'
import HeroSection from '@/sections/HeroSection'
import JourneySection from '@/sections/JourneySection'
import MessageSection from '@/sections/MessageSection'
import GallerySection from '@/sections/GallerySection'
import GraduationMoment from '@/sections/GraduationMoment'
import VoiceSection from '@/sections/VoiceSection'

export default function Home() {
  // Initialize Lenis smooth scroll
  useLenis()

  return (
    <>
      {/* Grain texture overlay — fixed over everything */}
      <div className="grain-overlay" aria-hidden />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Cinematic loading screen */}
      <LoadingScreen />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Main content */}
      <main>
        <HeroSection />
        <JourneySection />
        <MessageSection />
        <GallerySection />
        <GraduationMoment />
        <VoiceSection />
      </main>
    </>
  )
}
