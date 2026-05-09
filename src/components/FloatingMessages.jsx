import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MESSAGES = [
  'I love you 💕',
  'You make me happy ✨',
  'Forever us 🌸',
  'My favorite person ❤️',
  'You are my world 💖',
  "I'm so lucky 🍀",
  'You are beautiful 🌹',
  'My heart belongs to you 💝',
  'Always & forever 🌙',
  "You're my sunshine ☀️",
]

let counter = 0

export default function FloatingMessages() {
  const [messages, setMessages] = useState([])

  const spawn = useCallback(() => {
    const id = counter++
    const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
    const x = Math.random() * 70 + 5
    const y = Math.random() * 70 + 10
    setMessages(m => [...m.slice(-8), { id, msg, x, y }])
    // Remove after 5s
    setTimeout(() => setMessages(m => m.filter(item => item.id !== id)), 5000)
  }, [])

  useEffect(() => {
    const interval = setInterval(spawn, 4000)
    return () => clearInterval(interval)
  }, [spawn])

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <AnimatePresence>
        {messages.map(({ id, msg, x, y }) => (
          <motion.div
            key={id}
            className="absolute glass-pink rounded-full px-4 py-2"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 0.85, scale: 1, y: [10, 0, -5] }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.8, exit: { duration: 0.8 } }}
          >
            <p className="font-dancing text-rose-200 text-sm whitespace-nowrap">
              {msg}
            </p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
