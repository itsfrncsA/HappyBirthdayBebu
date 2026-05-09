import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EasterEgg() {
  const [open, setOpen] = useState(false)
  const [clicked, setClicked] = useState(0)

  const handleClick = () => {
    setClicked(c => c + 1)
    setOpen(true)
  }

  return (
    <>
      {/* Hidden heart button */}
      <button
        className="easter-heart text-3xl"
        onClick={handleClick}
        aria-label="Secret message"
        title="Psst... click me 🤫"
      >
        💗
      </button>

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
              className="absolute inset-0 bg-black/70"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />

            {/* Modal card */}
            <motion.div
              className="relative glass-pink rounded-3xl p-8 max-w-sm w-full text-center"
              style={{ border: '1px solid rgba(255,183,197,0.3)' }}
              initial={{ scale: 0.5, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* Hearts burst */}
              {['❤️', '💕', '💖', '💗', '💝'].map((h, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl pointer-events-none"
                  style={{ top: '50%', left: '50%' }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{
                    x: Math.cos((i / 5) * Math.PI * 2) * 80,
                    y: Math.sin((i / 5) * Math.PI * 2) * 80,
                    opacity: [1, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.05 }}
                >
                  {h}
                </motion.span>
              ))}

              <motion.div
                className="text-5xl mb-4"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              >
                🤫
              </motion.div>

              <h3
                className="font-dancing text-3xl mb-3"
                style={{
                  background: 'linear-gradient(135deg, #FFB7C5, #E8527A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                You found my secret! 💕
              </h3>

              <p className="font-playfair text-white/80 text-sm italic leading-relaxed mb-2">
                {clicked <= 1
                  ? "I hid this here just for you. No matter how many miles, how many sleepless nights, how many bad days... I would still choose you, every single time. 🌙"
                  : clicked <= 3
                  ? "You keep clicking... I think you just want to see this message again. And honestly? I'm not complaining. 😄❤️"
                  : "Okay okay, I see you! I love you too, infinitely much. 💖✨"
                }
              </p>

              <p className="font-dancing text-rose-300 text-lg mt-4">
                — Always yours 💌
              </p>

              <button
                onClick={() => setOpen(false)}
                className="mt-6 font-poppins text-white/60 text-xs hover:text-white/90 transition-colors"
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
