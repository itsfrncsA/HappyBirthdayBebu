import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TYPEWRITER_TEXT = "Every moment with you feels like my favorite memory."

function TypewriterText({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 55)
    return () => clearInterval(interval)
  }, [started, text])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="typewriter-cursor" />
      )}
    </span>
  )
}

function FloatingPetal({ delay, x, size }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${x}%`, top: '-5%', fontSize: size }}
      animate={{
        y: ['0vh', '110vh'],
        x: [0, Math.sin(x) * 60],
        rotate: [0, 360],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 5,
        ease: 'easeInOut',
      }}
    >
      🌸
    </motion.div>
  )
}

const petals = [
  { x: 10, delay: 0, size: '14px' },
  { x: 25, delay: 1.5, size: '18px' },
  { x: 40, delay: 0.8, size: '12px' },
  { x: 55, delay: 2.2, size: '16px' },
  { x: 70, delay: 0.3, size: '20px' },
  { x: 85, delay: 3.0, size: '14px' },
  { x: 95, delay: 1.1, size: '12px' },
]

export default function HeroSection() {
  const [showSurprise, setShowSurprise] = useState(false)

  const handleSurprise = () => {
    setShowSurprise(true)
    document.getElementById('love-letter')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Petals */}
      {petals.map((p, i) => <FloatingPetal key={i} {...p} />)}

      {/* Radial glow center */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '80vw',
          height: '80vw',
          maxWidth: '700px',
          maxHeight: '700px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(232,82,122,0.12) 0%, rgba(155,114,207,0.08) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        {/* Sparkle row */}
        <motion.div
          className="flex gap-3 mb-6 text-xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
        >
          {['✨', '🌸', '💕', '🌸', '✨'].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="font-dancing font-bold leading-tight mb-2"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
        >
          <span className="shimmer-text">Happy Birthday</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #FFB7C5, #E8527A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            My Bebu ❤️
          </span>
        </motion.h1>

        {/* Date badge */}
        <motion.div
          className="glass-pink rounded-full px-6 py-2 mt-4 mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <p className="font-poppins text-rose-200 text-sm tracking-[0.3em] uppercase">
            🎂 May 11 🎂
          </p>
        </motion.div>

        {/* Subtitle with typewriter */}
        <motion.p
          className="font-playfair text-white/70 mb-12 leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', fontStyle: 'italic' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <TypewriterText text={TYPEWRITER_TEXT} delay={1800} />
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={handleSurprise}
          className="relative group font-poppins font-semibold text-white px-10 py-4 rounded-full text-lg overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #E8527A, #9B72CF)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                '0 0 20px rgba(232,82,122,0.4)',
                '0 0 40px rgba(232,82,122,0.7), 0 0 80px rgba(155,114,207,0.3)',
                '0 0 20px rgba(232,82,122,0.4)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Shimmer overlay */}
          <span
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2), transparent)',
            }}
          />
          <span className="relative">✨ Open My Surprise ✨</span>
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <p className="font-poppins text-white/30 text-xs tracking-widest uppercase">Scroll down</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white/30 text-lg"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
