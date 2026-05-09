import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LETTER_PARAGRAPHS = [
  "Happy birthday, bebu 💜",

  "I still can’t believe I got lucky enough to meet someone like you. Out of everyone in this world, somehow our paths crossed, and ever since then, my life honestly hasn’t been the same in the best way possible.",

  "Even though we’re far from each other, you somehow make me feel loved and comforted every single day. There are moments where I wish I could just teleport beside you, hold your hand, hug you, or annoy you in person instead of through a screen. But even with all the distance between us, my feelings for you never changed even once.",

  "You became such a huge part of my life without even trying. One message from you can instantly make my whole day better. Hearing your voice on call feels comforting to me now, like it’s something I never want to lose.",

  "Some of my favorite moments with you are honestly the simplest ones — playing Heartopia together, playing Valorant, laughing at random nonsense, staying on call almost 24/7, and just spending time together even when we’re doing nothing. Those moments might seem small, but to me they mean everything.",

 "I love the moments where we can just be ourselves together. Whether we’re teasing each other, talking about random things, playing games, or sitting quietly on call, those moments are the ones I always end up thinking about the most.",
  "I know LDR isn’t easy. We’ll have difficult days, misunderstandings, and moments where we miss each other too much. But no matter what happens, I still choose you every single time, bebu. Always.",

  "You’re not just my girlfriend to me. You’re my comfort, my favorite notification, my best friend, and the person I want beside me no matter where life takes us.",

  "I hope today makes you feel extra loved because you deserve nothing less than that. I wish you happiness, peace, success, good health, and of course lots and lots of good food. 😊",

  "I love you so much, JaiJai. More than words can properly explain. And no matter how far away we are from each other right now, I’ll keep loving you the same way I always have.",
]

function LetterParagraph({ text }) {
  const ref = useRef(null)

  const isInView = useInView(ref, {
    once: true,
    margin: '-50px',
  })

  return (
    <motion.p
      ref={ref}
      className="font-playfair text-white/80 leading-relaxed text-[15px] md:text-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      {text}
    </motion.p>
  )
}

export default function LoveLetter() {
  const ref = useRef(null)

  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
  })

  return (
    <section id="love-letter" className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(232,82,122,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-14"
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
              background:
                'linear-gradient(135deg, #FFB7C5, #E8527A, #C9B1E8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            For My JaiJai 💜
          </h2>
        </motion.div>

        {/* Letter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Shadow layers */}
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              transform: 'translate(6px, 6px)',
              background: 'rgba(232,82,122,0.08)',
              filter: 'blur(6px)',
            }}
          />

          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              transform: 'translate(3px, 3px)',
              background: 'rgba(255,183,197,0.05)',
            }}
          />

          {/* Main Card */}
          <div
            className="relative rounded-3xl pt-14 pb-8 px-7 md:px-12 md:pt-16 md:pb-12"
            style={{
              background: `
                linear-gradient(
                  135deg,
                  rgba(255,255,255,0.08) 0%,
                  rgba(255,183,197,0.05) 50%,
                  rgba(201,177,232,0.06) 100%
                )
              `,
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,183,197,0.2)',
              boxShadow:
                '0 8px 60px rgba(232,82,122,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            {/* Decorative flowers */}
            {[
              'top-4 left-4',
              'top-4 right-4',
              'bottom-4 left-4',
              'bottom-4 right-4',
            ].map((pos, i) => (
              <span
                key={i}
                className={`absolute ${pos} text-rose-300/30 text-lg pointer-events-none`}
              >
                🌸
              </span>
            ))}

            {/* Greeting */}
            <motion.p
  className="font-dancing text-2xl md:text-3xl text-rose-300 mb-5 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              To my bebu, JaiJai 💜 
            </motion.p>

            {/* Paragraphs */}
            <div className="space-y-5">
              {LETTER_PARAGRAPHS.map((para, index) => (
                <LetterParagraph
                  key={index}
                  text={para}
                />
              ))}
            </div>

            {/* Signature */}
            <motion.div
              className="mt-10 text-right"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
            >
              <p className="font-poppins text-white/40 text-sm mb-1">
                Forever yours,
              </p>

              <p
                className="font-dancing text-4xl"
                style={{
                  background:
                    'linear-gradient(135deg, #E8527A, #9B72CF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Your Franky 💜 
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}