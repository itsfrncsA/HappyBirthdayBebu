import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const REASONS = [
  {
    front: '🎮',
    frontText: 'Reason #1',
    back: 'Gaming with you',
    backText:
      "Playing Heartopia and Valorant with you will always be some of my favorite memories. Even simple games become special because I'm with you.",
  },

  {
    front: '📞',
    frontText: 'Reason #2',
    back: 'Our calls',
    backText:
      "We literally stay on call almost 24/7 and somehow I still never get tired of hearing your voice. You became part of my everyday life.",
  },

  {
    front: '💕',
    frontText: 'Reason #3',
    back: 'The way you love',
    backText:
      "You love so genuinely and deeply. Even from far away, you always make me feel cared for, appreciated, and safe.",
  },

  {
    front: '😂',
    frontText: 'Reason #4',
    back: 'Your laugh',
    backText:
      "Your laugh is honestly one of my favorite sounds ever. Especially when you laugh so hard you can barely finish your sentence.",
  },

  {
    front: '🌸',
    frontText: 'Reason #5',
    back: 'Your soft side',
    backText:
      "My favorite moments are the quiet ones with you late night talks, random silence on call, and just existing together comfortably.",
  },

  {
    front: '✨',
    frontText: 'Reason #6',
    back: 'You understand me',
    backText:
      "You understand me in a way most people never could. Even on bad days, you somehow know how to make things feel lighter.",
  },

  {
    front: '🫶',
    frontText: 'Reason #7',
    back: 'You choose us',
    backText:
      "LDR isn’t easy, but you still stay, still try, and still choose us every day. That means more to me than words can explain.",
  },

  {
    front: '❤️',
    frontText: 'Reason #8',
    back: 'Simply you',
    backText:
      "At the end of the day, I just love you for being you, Jeallaine. Your personality, your energy, your flaws, your little habits  all of it.",
  },
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
