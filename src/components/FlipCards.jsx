import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const REASONS = [
  { front: '💕', frontText: 'Reason #1', back: 'The way you laugh', backText: "Your laugh is the best sound in the world. Genuine, full, and contagious — it makes every room brighter." },
  { front: '🌸', frontText: 'Reason #2', back: 'Your kindness', backText: "You care so deeply about others. It's rare and beautiful — the way you make people feel seen and valued." },
  { front: '✨', frontText: 'Reason #3', back: 'Your resilience', backText: "You've been through so much, yet you keep going. Your strength inspires me every single day." },
  { front: '🌙', frontText: 'Reason #4', back: 'Late night you', backText: "When you're tired and soft and just yourself — that's my favorite version of you. No performance, just real." },
  { front: '🎀', frontText: 'Reason #5', back: 'How you love', backText: "You love hard and you love deep. Being on the receiving end of that love is the greatest gift." },
  { front: '🌹', frontText: 'Reason #6', back: 'Your passion', backText: "The way your eyes light up when you talk about the things you care about — I could watch that forever." },
  { front: '💝', frontText: 'Reason #7', back: "You're my peace", backText: "In a world of noise and chaos, you are my quiet place. Being with you feels like coming home." },
  { front: '🫶', frontText: 'Reason #8', back: 'Everything else', backText: "Honestly? I love you because you're you. Every flaw, every quirk, every wonderful imperfect piece of you." },
]

function Card({ item, index }) {
  const [flipped, setFlipped] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="flip-card h-48 cursor-pointer"
      onClick={() => setFlipped(f => !f)}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
        {/* Front */}
        <div
          className="flip-card-front flex flex-col items-center justify-center p-4 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,183,197,0.12), rgba(201,177,232,0.12))',
            border: '1px solid rgba(255,183,197,0.2)',
          }}
        >
          <motion.span
            className="text-4xl mb-2"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, delay: index * 0.3, repeat: Infinity }}
          >
            {item.front}
          </motion.span>
          <p className="font-dancing text-rose-300 text-xl">{item.frontText}</p>
          <p className="font-poppins text-white/30 text-xs mt-2">Tap to reveal 💕</p>
        </div>

        {/* Back */}
        <div
          className="flip-card-back flex flex-col items-center justify-center p-5 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(232,82,122,0.2), rgba(155,114,207,0.2))',
            border: '1px solid rgba(232,82,122,0.3)',
          }}
        >
          <p
            className="font-dancing text-2xl mb-2"
            style={{
              background: 'linear-gradient(135deg, #FFB7C5, #E8527A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {item.back}
          </p>
          <p className="font-playfair text-white/70 text-xs leading-relaxed italic">
            {item.backText}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function FlipCards() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 px-4" id="reasons">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-poppins text-rose-300 text-xs tracking-[0.4em] uppercase mb-3">
            💕 Just Because
          </p>
          <h2
            className="font-dancing text-5xl md:text-6xl"
            style={{
              background: 'linear-gradient(135deg, #FFB7C5, #E8527A)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Reasons I Love You
          </h2>
          <p className="font-poppins text-white/40 text-sm mt-3">
            Tap each card to reveal ✨
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {REASONS.map((item, i) => (
            <Card key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
