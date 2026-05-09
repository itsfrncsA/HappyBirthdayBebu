import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECRET_MESSAGES = [
  "I still think about our first kiss on the bus 💋",
  "Thank you for making distance feel smaller every single day 💜",
  "Heartopia with you will always be one of my favorite memories 🎮",
  "Even after all our Valorant games, I’d still queue with you every time 😭",
  "I could stay on call with you forever and never get bored 📞",
  "I still smile whenever your notification pops up 💕",
  "Meeting you in Cebu felt unreal in the best way possible ✈️",
  "That movie recommendation really changed my whole life 🎬",
  "I honestly miss you more than I can explain sometimes.",
  "No matter how hard LDR gets, I still choose you every single time ❤️",
]

export default function EasterEgg() {
  const [open, setOpen] = useState(false)
  const [messageIndex, setMessageIndex] = useState(0)
  const [clicked, setClicked] = useState(0)
  const [timeTogether, setTimeTogether] = useState('')

  // Relationship date
  useEffect(() => {
    const updateTime = () => {
      const startDate = new Date('2026-02-20T00:00:00')
      const now = new Date()

      const diff = now - startDate

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor(
        (diff % (1000 * 60 * 60)) / (1000 * 60)
      )

      setTimeTogether(`${days} days, ${hours} hours, ${minutes} minutes`)
    }

    updateTime()

    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    setClicked((c) => c + 1)
    setMessageIndex(
      Math.floor(Math.random() * SECRET_MESSAGES.length)
    )
    setOpen(true)
  }

  return (
    <>
      {/* Floating secret button */}
      <motion.button
  className="easter-heart"  // ← Only this class - CSS handles positioning
  onClick={handleClick}
  aria-label="Secret message"
  title="Psst... click me 🤫"
  whileHover={{ scale: 1.2, rotate: 10 }}
  whileTap={{ scale: 0.9 }}
  animate={{ 
    scale: [1, 1.1, 1],
    rotate: [0, 5, -5, 0]
  }}
  transition={{ 
    duration: 2, 
    repeat: Infinity,
    repeatDelay: 1
  }}
>
  <div className="relative">
    <span className="text-3xl">💗</span>
    {clicked > 0 && (
      <motion.span 
        className="absolute -top-2 -right-2 text-[10px] bg-pink-500 rounded-full w-4 h-4 flex items-center justify-center text-white font-bold text-[8px]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        {clicked}
      </motion.span>
    )}
  </div>
</motion.button>
      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Floating particles */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-pink-300/30 text-xl pointer-events-none"
                initial={{
                  opacity: 0,
                  y: 40,
                  x: Math.random() * 300 - 150,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  y: -220,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              >
                {['💖', '✨', '💕', '🌸'][i % 4]}
              </motion.span>
            ))}

            {/* Main Card */}
            <motion.div
              className="relative rounded-3xl p-8 max-w-sm w-full text-center overflow-hidden"
              style={{
                background: `
                  linear-gradient(
                    135deg,
                    rgba(255,255,255,0.1),
                    rgba(255,183,197,0.08),
                    rgba(201,177,232,0.08)
                  )
                `,
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                border: '1px solid rgba(255,183,197,0.25)',
                boxShadow:
                  '0 8px 60px rgba(232,82,122,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
              initial={{ scale: 0.5, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 18,
              }}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at top, rgba(255,183,197,0.15), transparent 70%)',
                }}
              />

              {/* Emoji */}
              <motion.div
                className="text-6xl mb-4 relative z-10"
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                💜
              </motion.div>

              {/* Title */}
              <h3
                className="font-dancing text-4xl mb-3 relative z-10"
                style={{
                  background:
                    'linear-gradient(135deg, #FFB7C5, #E8527A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Secret Message ✨
              </h3>

              {/* Relationship timer */}
              <div className="mb-5 relative z-10">
                <p className="font-poppins text-white/40 text-xs uppercase tracking-[0.2em] mb-1">
                  Together Since
                </p>

                <p className="font-playfair text-rose-300 text-sm">
                  February 20, 2026 💜
                </p>

                <p className="font-poppins text-white/70 text-xs mt-2">
                  {timeTogether}
                </p>
              </div>

              {/* Secret Message */}
              <motion.p
                key={messageIndex}
                className="font-playfair text-white/80 text-sm leading-relaxed italic relative z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {SECRET_MESSAGES[messageIndex]}
              </motion.p>

              {/* Spam click reactions */}
              {clicked >= 5 && clicked < 10 && (
                <motion.p
                  className="font-poppins text-rose-300 text-xs mt-5 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  you really like clicking this huh 😭💜
                </motion.p>
              )}

              {clicked >= 10 && clicked < 15 && (
                <motion.p
                  className="font-poppins text-rose-300 text-xs mt-5 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  okay bebu i know you miss me already 💋
                </motion.p>
              )}

              {clicked >= 15 && (
                <motion.p
                  className="font-poppins text-rose-300 text-xs mt-5 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  stop spam clicking and come cuddle me instead 😭❤️
                </motion.p>
              )}

              {/* Footer */}
              <p className="font-dancing text-rose-300 text-xl mt-6 relative z-10">
                — Your Franky 💌
              </p>

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="mt-6 font-poppins text-white/50 text-xs hover:text-white/90 transition-colors relative z-10"
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}