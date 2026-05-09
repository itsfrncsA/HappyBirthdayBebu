import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EMOJIS = ['❤️', '💕', '💗', '💖', '💝', '💘', '🌸', '✨']

function Heart({ id, x, emoji, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 7000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed pointer-events-none select-none z-50"
      style={{ left: `${x}%`, bottom: 0, fontSize: `${Math.random() * 12 + 14}px` }}
      initial={{ y: 0, opacity: 0, scale: 0 }}
      animate={{
        y: -window.innerHeight - 100,
        opacity: [0, 0.8, 0.8, 0],
        scale: [0, 1, 1, 0.5],
        x: [0, Math.sin(id) * 60, Math.cos(id) * -40, Math.sin(id * 2) * 30],
      }}
      transition={{ duration: 6 + Math.random() * 2, ease: 'easeOut' }}
    >
      {emoji}
    </motion.div>
  )
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])
  const counterRef = React.useRef(0)

  useEffect(() => {
    const spawn = () => {
      const id = counterRef.current++
      setHearts(h => [
        ...h.slice(-15),
        {
          id,
          x: Math.random() * 90 + 5,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        }
      ])
    }

    // Spawn hearts periodically
    const interval = setInterval(spawn, 2200)
    return () => clearInterval(interval)
  }, [])

  const removeHeart = (id) => {
    setHearts(h => h.filter(heart => heart.id !== id))
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {hearts.map(heart => (
          <Heart
            key={heart.id}
            {...heart}
            onDone={() => removeHeart(heart.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
