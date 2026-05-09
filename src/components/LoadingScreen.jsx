import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const hearts = ['❤️', '💕', '💗', '💖', '💝', '🌸']

// ── helpers ──────────────────────────────────────────────────────────────────

function isMay11() {
  const now = new Date()
  return now.getMonth() === 4 && now.getDate() === 11 // month is 0-indexed
}

function getTimeUntilMay11() {
  const now  = new Date()
  const year = now.getMonth() > 4 || (now.getMonth() === 4 && now.getDate() > 11)
    ? now.getFullYear() + 1
    : now.getFullYear()
  const target = new Date(year, 4, 11, 0, 0, 0)
  const diff   = target - now

  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

// ── Locked gate (not May 11) ──────────────────────────────────────────────────

function LockedGate() {
  const [time, setTime] = useState(getTimeUntilMay11())
  const pad = n => String(n).padStart(2, '0')

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeUntilMay11()), 1000)
    return () => clearInterval(interval)
  }, [])

  const tileColors = ['#FFB7C5', '#C9B1E8', '#E8527A', '#9B72CF']

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #2d0a3e 0%, #0d0615 70%)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Twinkling stars */}
      {[...Array(35)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            width:  (i % 3 === 0 ? 2.5 : 1.5),
            height: (i % 3 === 0 ? 2.5 : 1.5),
            left:   `${(i * 37 + 7) % 100}%`,
            top:    `${(i * 53 + 11) % 100}%`,
          }}
          animate={{ opacity: [0.1, 1, 0.1] }}
          transition={{
            duration: 2 + (i % 4),
            delay:    (i * 0.17) % 2,
            repeat:   Infinity,
            ease:     'easeInOut',
          }}
        />
      ))}

      {/* Floating hearts drifting up */}
      {hearts.map((h, i) => (
        <motion.div
          key={`fh-${i}`}
          className="absolute text-lg pointer-events-none select-none"
          style={{ left: `${8 + i * 14}%`, bottom: '-4%' }}
          animate={{
            y:       [0, -(window.innerHeight * 1.1)],
            opacity: [0, 0.5, 0],
            x:       [0, (i % 2 === 0 ? 30 : -30)],
          }}
          transition={{
            duration:    6 + i,
            delay:       i * 0.9,
            repeat:      Infinity,
            repeatDelay: i * 0.4,
            ease:        'easeOut',
          }}
        >
          {h}
        </motion.div>
      ))}

      {/* Lock */}
      <motion.div
        className="text-6xl md:text-7xl mb-5 select-none"
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.4, type: 'spring', stiffness: 160 }}
      >
        🔒
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="font-dancing text-center leading-tight mb-3"
        style={{
          fontSize: 'clamp(2rem, 7vw, 3.5rem)',
          background: 'linear-gradient(135deg, #FFB7C5, #E8527A, #C9B1E8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
      >
        This is locked until
        <br />
        May 11 💜
      </motion.h1>

      <motion.p
        className="font-playfair text-white/45 italic text-center mb-10 max-w-xs leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        Something very special is waiting for you on your birthday…
      </motion.p>

      {/* Live countdown tiles */}
      <motion.div
        className="flex gap-2 md:gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        {[
          { value: time.days,    label: 'Days' },
          { value: time.hours,   label: 'Hours' },
          { value: time.minutes, label: 'Mins' },
          { value: time.seconds, label: 'Secs' },
        ].map(({ value, label }, i) => (
          <div
            key={label}
            className="flex flex-col items-center rounded-2xl px-3 py-3 md:px-5 md:py-4 min-w-[58px]"
            style={{
              background: 'rgba(255,183,197,0.07)',
              border:     `1px solid ${tileColors[i]}33`,
              boxShadow:  `0 0 24px ${tileColors[i]}18`,
            }}
          >
            <motion.span
              key={value}
              className="font-poppins font-bold"
              style={{
                fontSize:   'clamp(1.5rem, 5vw, 2.2rem)',
                color:      tileColors[i],
                textShadow: `0 0 14px ${tileColors[i]}99`,
              }}
              initial={{ scale: 1.25, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {pad(value)}
            </motion.span>
            <span className="font-poppins text-white/25 text-[10px] tracking-widest uppercase mt-1">
              {label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Soft hint */}
      <motion.p
        className="font-dancing text-white/18 text-xl mt-14 select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        Come back on May 11 🌸
      </motion.p>
    </motion.div>
  )
}

// ── Birthday loader (May 11 only) ─────────────────────────────────────────────

function BirthdayLoader() {
  const [phase, setPhase] = useState(0)
  const [dots,  setDots]  = useState('')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600)
    const t2 = setTimeout(() => setPhase(2), 2800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

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

export default function LoadingScreen() {
  // Developer bypass
  const params = new URLSearchParams(window.location.search)

  const bypass =
    window.location.hostname === "localhost" ||
    params.get("dev") === "francis"

  // If not May 11 and no bypass → locked
  if (!isMay11() && !bypass) {
    return <LockedGate />
  }

  // Otherwise show the birthday loader
  return <BirthdayLoader />
}