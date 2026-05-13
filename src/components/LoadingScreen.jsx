import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const hearts = ['❤️', '💕', '💗', '💖', '💝', '🌸']

// ── Birthday loader (May 11 only) ─────────────────────────────────────────────

function BirthdayLoader({ onComplete }) {
  const [phase, setPhase] = useState(0)
  const [dots,  setDots]  = useState('')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600)
    const t2 = setTimeout(() => setPhase(2), 2800)
    
    // After 3.5 seconds (when loader finishes), call onComplete to show the site
    const t3 = setTimeout(() => {
      if (onComplete) onComplete()
    }, 3500)
    
    return () => { 
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 400)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{ background: 'radial-gradient(ellipse at center, #2d0a3e 0%, #0d0615 70%)' }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Orbiting hearts */}
        {hearts.map((h, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale:   [0, 1, 1, 0],
              x: Math.cos((i / hearts.length) * Math.PI * 2) * 120,
              y: Math.sin((i / hearts.length) * Math.PI * 2) * 120,
            }}
            transition={{
              delay:       0.3 + i * 0.15,
              duration:    2.5,
              repeat:      Infinity,
              repeatDelay: 0.5,
            }}
          >
            {h}
          </motion.div>
        ))}

        {/* Central heart pulse */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: 'spring', stiffness: 120 }}
        >
          <motion.div
            className="text-7xl"
            animate={{ scale: [1, 1.25, 1, 1.25, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            💜
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(232,82,122,0.4)',
                '0 0 0 30px rgba(232,82,122,0)',
              ],
            }}
            transition={{ duration: 1.4, repeat: Infinity }}
            style={{ transform: 'translate(-50%,-50%)', top: '50%', left: '50%', width: 80, height: 80 }}
          />
        </motion.div>

        {/* Text */}
        <AnimatePresence mode="wait">
          {phase >= 1 && (
            <motion.div
              key="text"
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p
                className="font-dancing text-4xl mb-3"
                style={{
                  background: 'linear-gradient(135deg, #FFB7C5, #E8527A, #C9B1E8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Something special is loading
              </p>
              <p className="font-poppins text-white/50 text-sm tracking-widest uppercase">
                Just for you{dots}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-16 w-48 h-0.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #E8527A, #9B72CF)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ── Exported component: gates by date ────────────────────────────────────────

export default function LoadingScreen({ onComplete }) {
  // Always show the birthday loader - no date restrictions
  return <BirthdayLoader onComplete={onComplete} />
}