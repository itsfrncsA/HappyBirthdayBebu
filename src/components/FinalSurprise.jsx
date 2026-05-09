import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// Confetti-like particle burst using pure JS/CSS
function ConfettiBurst({ active }) {
  const PARTICLES = 60
  const particles = Array.from({ length: PARTICLES }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: ['#E8527A', '#FFB7C5', '#9B72CF', '#C9B1E8', '#FFE4EC', '#fff'][Math.floor(Math.random() * 6)],
    size: Math.random() * 8 + 4,
    delay: Math.random() * 0.5,
    emoji: ['❤️', '💕', '🌸', '✨', '💖'][Math.floor(Math.random() * 5)],
  }))

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 pointer-events-none z-[150] overflow-hidden">
          {particles.map(p => (
            <motion.div
              key={p.id}
              className="absolute text-xl"
              style={{ left: `${50 + (Math.random() - 0.5) * 60}%`, top: '50%' }}
              initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [1, 1, 0],
                x: (Math.random() - 0.5) * window.innerWidth * 0.8,
                y: (Math.random() - 0.5) * window.innerHeight * 0.8,
                rotate: Math.random() * 720 - 360,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2 + Math.random(),
                delay: p.delay,
                ease: 'easeOut',
              }}
            >
              {p.emoji}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

function HeartExplosion({ active }) {
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    angle: (i / 20) * Math.PI * 2,
    distance: 80 + Math.random() * 120,
    size: Math.random() * 20 + 20,
    delay: Math.random() * 0.3,
  }))

  return (
    <AnimatePresence>
      {active && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          {hearts.map(h => (
            <motion.div
              key={h.id}
              className="absolute"
              style={{ fontSize: h.size }}
              initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0.5],
                opacity: [1, 1, 0],
                x: Math.cos(h.angle) * h.distance,
                y: Math.sin(h.angle) * h.distance,
              }}
              transition={{ duration: 1.5, delay: h.delay, ease: 'easeOut' }}
            >
              ❤️
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

export default function FinalSurprise() {
  const [showSurprise, setShowSurprise] = useState(false)
  const [showFinal, setShowFinal] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleReveal = () => {
    setShowSurprise(true)
    setConfetti(true)
    setTimeout(() => setConfetti(false), 3000)
    setTimeout(() => setShowFinal(true), 1500)
  }

  // Re-trigger confetti
  const replayConfetti = () => {
    setConfetti(true)
    setTimeout(() => setConfetti(false), 3000)
  }

  return (
    <section
      className="relative py-32 px-4 overflow-hidden min-h-screen flex items-center"
      id="final"
    >
      {/* Confetti */}
      <ConfettiBurst active={confetti} />

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 30%, rgba(232,82,122,0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 20% 80%, rgba(155,114,207,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(255,183,197,0.08) 0%, transparent 50%)
          `,
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10" ref={ref}>
        {/* Stars row */}
        <motion.div
          className="flex justify-center gap-3 text-2xl mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          {['⭐', '💕', '⭐', '💕', '⭐'].map((s, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>

        {/* Main quote */}
        <motion.h2
          className="font-dancing leading-tight mb-8"
          style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            background: 'linear-gradient(135deg, #FFB7C5, #E8527A, #C9B1E8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          "No matter where life takes us,
          <br />
          I'll always choose you."
        </motion.h2>

        <motion.p
          className="font-playfair text-white/60 text-lg italic mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          Every day, every moment, every breath — you.
        </motion.p>

        {/* The button */}
        {!showSurprise && (
          <motion.button
            onClick={handleReveal}
            className="relative group font-poppins font-semibold text-white px-12 py-5 rounded-full text-xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #E8527A, #9B72CF, #E8527A)',
              backgroundSize: '200%',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.8, type: 'spring', stiffness: 120 }}
            whileHover={{ scale: 1.06, backgroundPosition: '100% 50%' }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(232,82,122,0.5)',
                  '0 0 60px rgba(232,82,122,0.8), 0 0 100px rgba(155,114,207,0.4)',
                  '0 0 30px rgba(232,82,122,0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative">🎁 One Last Surprise</span>
          </motion.button>
        )}

        {/* Surprise reveal */}
        <AnimatePresence>
          {showSurprise && (
            <motion.div
              className="relative mt-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            >
              <HeartExplosion active={showSurprise} />

              {/* Big heart */}
              <motion.div
                className="text-8xl md:text-9xl mb-6 inline-block"
                animate={{
                  scale: [1, 1.2, 1, 1.2, 1],
                }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                ❤️
              </motion.div>

              {showFinal && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <p
                    className="font-dancing leading-tight mb-4"
                    style={{
                      fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                      background: 'linear-gradient(135deg, #FFB7C5, #E8527A)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    I love you endlessly ❤️
                  </p>
                  <p className="font-playfair text-white/60 text-lg italic mb-8">
                    Happy Birthday, my love. You deserve the entire universe. 🌙✨
                  </p>

                  <motion.button
                    onClick={replayConfetti}
                    className="font-poppins text-white/50 text-sm hover:text-white/80 transition-colors border border-white/10 rounded-full px-6 py-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    🎉 Celebrate Again!
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
        >
          <p className="font-poppins text-white/20 text-xs tracking-widest uppercase">
            Made with love, just for you 💕
          </p>
          <div className="flex justify-center gap-2 mt-3 text-white/10 text-xs">
            {['❤️', '💕', '🌸', '✨', '💖'].map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
