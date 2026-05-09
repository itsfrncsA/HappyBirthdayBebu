import React, { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import MusicPlayer from './components/MusicPlayer'
import FloatingHearts from './components/FloatingHearts'
import FloatingMessages from './components/FloatingMessages'
import EasterEgg from './components/EasterEgg'
import HeroSection from './components/HeroSection'
import LoveLetter from './components/LoveLetter'
import Timeline from './components/Timeline'
import FlipCards from './components/FlipCards'
import Countdown from './components/Countdown'
import PhotoGallery from './components/PhotoGallery'
import Playlist from './components/Playlist'
import FinalSurprise from './components/FinalSurprise'
import StarBackground from './components/StarBackground'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Minimum 3s loading screen, then fade in
    const timer = setTimeout(() => {
      setLoading(false)
      setTimeout(() => setShowContent(true), 500)
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#0d0615] overflow-x-hidden">
      {/* Global star background */}
      <StarBackground />

      {/* Loading screen */}
      {loading && <LoadingScreen />}

      {/* Main content */}
      {showContent && (
        <div
          className="relative z-10"
          style={{ animation: 'fadeIn 1.2s ease-out forwards' }}
        >
          <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>

          {/* Fixed overlays */}
          <MusicPlayer />
          <FloatingHearts />
          <FloatingMessages />
          <EasterEgg />

          {/* Page sections */}
          <HeroSection />
          <LoveLetter />
          <Timeline />
          <FlipCards />
          <Countdown />
          <PhotoGallery />
          <Playlist />
          <FinalSurprise />
        </div>
      )}
    </div>
  )
}
