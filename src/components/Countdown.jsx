import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function getTimeLeft() {
  const now = new Date()
  const currentYear = now.getFullYear()
  let target = new Date(currentYear, 4, 11, 0, 0, 0) // May = month 4

  // If May 11 already passed this year, go to next year
  if (now >= target) {
    target = new Date(currentYear + 1, 4, 11, 0, 0, 0)
  }

  const diff = target - now
  const isBirthday = diff <= 0

  if (isBirthday) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, isBirthday: false }
}

function TimerCard({ value, label, color, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="flex-1 min-w-[70px]"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        className="rounded-2xl p-4 md:p-6 text-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color}22, ${color}11)`,
          border: `1px solid ${color}44`,
          boxShadow: `0 0 30px ${color}22`,
        }}
      >
        {/* Glow */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${color}66, transparent 60%)`,
          }}
        />

        <motion.p
          className="font-poppins font-bold relative z-10"
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            color,
            textShadow: `0 0 20px ${color}88`,
          }}
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {String(value).padStart(2, '0')}
        </motion.p>
        <p className="font-poppins text-white/50 text-xs tracking-widest uppercase mt-1 relative z-10">
          {label}
        </p>
      </div>
    </motion.div>
  )
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const cards = [
    { value: timeLeft.days, label: 'Days', color: '#FFB7C5' },
    { value: timeLeft.hours, label: 'Hours', color: '#C9B1E8' },
    { value: timeLeft.minutes, label: 'Minutes', color: '#E8527A' },
    { value: timeLeft.seconds, label: 'Seconds', color: '#9B72CF' },
  ]

  return (
    <section className="py-24 px-4" id="countdown">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-poppins text-rose-300 text-xs tracking-[0.4em] uppercase mb-3">
            🎂 The Big Day
          </p>
          <h2
            className="font-dancing text-5xl md:text-6xl"
            style={{
              background: 'linear-gradient(135deg, #FFB7C5, #E8527A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Birthday Countdown
          </h2>
          <p className="font-playfair text-white/50 italic mt-3 text-lg">
            Until May 11 — Your Special Day 🌸
          </p>
        </motion.div>

        {timeLeft.isBirthday ? (
          <motion.div
            className="text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 150 }}
          >
            <p className="font-dancing text-6xl md:text-8xl shimmer-text mb-4">
              🎉 Happy Birthday! 🎉
            </p>
            <p className="font-poppins text-white/70 text-xl">
              Today is your day, my love! ❤️
            </p>
          </motion.div>
        ) : (
          <div className="flex gap-3 md:gap-6 justify-center">
            {cards.map((card, i) => (
              <TimerCard key={card.label} {...card} index={i} />
            ))}
          </div>
        )}

        {/* Bottom note */}
        {!timeLeft.isBirthday && (
          <motion.p
            className="text-center font-dancing text-white/30 text-xl mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            Every second brings me closer to celebrating you 💕
          </motion.p>
        )}
      </div>
    </section>
  )
}
