import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const LETTER_PARAGRAPHS = [
  "My dearest love, on this very special day, I want you to know that you are the most wonderful person I have ever had the privilege of knowing. Every morning I wake up grateful that somehow, in this vast universe, our paths crossed.",
  "You are my calm in the chaos. When everything feels like too much, just thinking about your smile makes everything lighter. You've given me a kind of happiness I didn't know existed before you.",
  "The way you laugh at your own jokes before you even finish telling them. The way you get excited about little things. The way you care so deeply — not just for me, but for everyone around you. These are the things I fall in love with over and over again.",
  "I know we don't always have it easy. Some days are hard. Some nights feel long. But I would walk through every single one of them with you. You are not just my partner — you are my home.",
  "On your birthday, I want you to feel as loved as you make me feel every day. I hope this year brings you everything you deserve — joy, peace, adventure, and a ridiculous amount of good food. 😊",
  "I love you. More than words. More than songs. More than this letter can hold. But I'll keep trying to show you, every day for the rest of my life.",
]

function LetterParagraph({ text, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.p
      ref={ref}
      className="font-playfair text-white/80 leading-relaxed text-base md:text-lg"
      style={{ fontStyle: index === LETTER_PARAGRAPHS.length - 1 ? 'normal' : 'normal' }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      {text}
    </motion.p>
  )
}

export default function LoveLetter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="love-letter" className="py-24 px-4 relative">
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(232,82,122,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-2xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-poppins text-rose-300 text-xs tracking-[0.4em] uppercase mb-3">
            ✉️ A Letter For You
          </p>
          <h2
            className="font-dancing text-5xl md:text-6xl"
            style={{
              background: 'linear-gradient(135deg, #FFB7C5, #E8527A, #C9B1E8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            My Love Letter
          </h2>
        </motion.div>

        {/* Letter card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40, rotateX: 5 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Paper shadow layers */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              transform: 'translate(6px, 6px)',
              background: 'rgba(232,82,122,0.08)',
              filter: 'blur(4px)',
            }}
          />
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              transform: 'translate(3px, 3px)',
              background: 'rgba(255,183,197,0.06)',
            }}
          />

          {/* Main card */}
          <div
            className="relative rounded-3xl p-8 md:p-12"
            style={{
              background: `
                linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,183,197,0.05) 50%, rgba(201,177,232,0.06) 100%)
              `,
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,183,197,0.2)',
              boxShadow: '0 8px 60px rgba(232,82,122,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            {/* Decorative corners */}
            {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
              <span key={i} className={`absolute ${pos} text-rose-300/30 text-lg pointer-events-none`}>
                🌸
              </span>
            ))}

            {/* Greeting */}
            <motion.p
              className="font-dancing text-3xl text-rose-300 mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              To my favorite person in the world,
            </motion.p>

            {/* Paragraphs */}
            <div className="space-y-5">
              {LETTER_PARAGRAPHS.map((para, i) => (
                <LetterParagraph key={i} text={para} index={i} />
              ))}
            </div>

            {/* Signature */}
            <motion.div
              className="mt-10 text-right"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5 }}
            >
              <p className="font-poppins text-white/40 text-sm mb-1">With all my love,</p>
              <p
                className="font-dancing text-4xl"
                style={{
                  background: 'linear-gradient(135deg, #E8527A, #9B72CF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Yours, forever ❤️
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
