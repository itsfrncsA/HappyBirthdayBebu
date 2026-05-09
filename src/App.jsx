import React, { useState } from 'react'
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
  const [showBirthdayContent, setShowBirthdayContent] = useState(false)

  // When LoadingScreen completes (either after loader or bypass), show the site
  const handleShowContent = () => {
    setShowBirthdayContent(true)
  }

  // If birthday content isn't ready yet, show LoadingScreen
  // LoadingScreen will handle the lock vs loader logic internally
  if (!showBirthdayContent) {
    return <LoadingScreen onComplete={handleShowContent} />
  }

  // Show full birthday site
  return (
    <div className="relative min-h-screen bg-[#0d0615] overflow-x-hidden">
      {/* Global star background */}
      <StarBackground />

      {/* Fixed overlays */}
      <MusicPlayer />
      <FloatingHearts />
      <FloatingMessages />
      <EasterEgg />

      {/* Page sections */}
      <div
        className="relative z-10"
        style={{ animation: 'fadeIn 1.2s ease-out forwards' }}
      >
        <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
        <HeroSection />
        <LoveLetter />
        <Timeline />
        <FlipCards />
        <Countdown />
        <PhotoGallery />
        <Playlist />
        <FinalSurprise />
      </div>
    </div>
  )
}