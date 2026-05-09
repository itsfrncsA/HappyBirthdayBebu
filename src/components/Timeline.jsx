import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const MILESTONES = [
  {
    emoji: '🎬',
    date: 'How It Started',
    title: 'One Random Recommendation',

desc:
  "Who knew a simple movie recommendation would lead me to meeting someone as special as you? Looking back now, that small conversation was the start of everything between us.",
    color: '#FFB7C5',
    rotate: -2,
  },

  {
    emoji: '⛈️',
    date: 'That Stormy Day',
    title: 'Checking On You',
    desc:
      "There was a storm heading to Cebu, and I remember asking if you were okay. After that, we just kept talking every day like we had already known each other for so long.",
    color: '#C9B1E8',
    rotate: 2,
  },

  {
    emoji: '📞',
    date: 'Soon After',
    title: '24/7 Calls',
    desc:
      "Our conversations slowly turned into staying on call almost all the time. Your voice became something I looked forward to every single day.",
    color: '#A8D8EA',
    rotate: -1.5,
  },

  {
    emoji: '🎮',
    date: 'Our Bonding',
    title: 'Gaming Together',
    desc:
      "Heartopia, Valorant, random chaos, laughing at nothing some of my happiest memories are just us spending time together online.",
    color: '#FFE4B5',
    rotate: 1.5,
  },

  {
    emoji: '✈️',
    date: 'Finally Meeting',
    title: 'Seeing You In Cebu',
    desc:
      "Finally seeing you in person in Cebu felt unreal. After all the calls and messages, being beside you for real was something I’ll never forget.",
    color: '#B5EAD7',
    rotate: -2,
  },

  {
    emoji: '💋',
    date: 'A Core Memory',
    title: 'Our First Kiss',
    desc:
      "I still can’t forget our first kiss on the bus. Everything about that moment felt so genuine and special, and honestly, I replay it in my head all the time.",
    color: '#FFD6E0',
    rotate: 1.5,
  },

  {
    emoji: '❤️',
    date: 'February 20, 2026',
    title: 'Officially Yours',
    desc:
      "The day I became your boyfriend will always be one of the most special days of my life. Out of every moment we’ve shared, this is one I’ll never forget.",
    color: '#FFB7C5',
    rotate: -2,
  },
]

function TimelineItem({ item, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-4 md:gap-8 mb-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'} md:flex-row`}
    >
      {/* Polaroid card */}
      <motion.div
        className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-left`}
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div
          className="polaroid inline-block max-w-[240px] md:max-w-[280px]"
          style={{ transform: `rotate(${item.rotate}deg)` }}
        >
          {/* Photo area */}
          <div
            className="w-full h-36 rounded-sm mb-2 flex items-center justify-center relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${item.color}33, ${item.color}66)` }}
          >
            <span className="text-5xl">{item.emoji}</span>
            {/* Photo overlay shimmer */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 60%)',
              }}
            />
          </div>
          {/* Caption area */}
          <div className="text-center">
            <p className="font-dancing text-gray-800 text-lg font-bold">{item.title}</p>
            <p className="font-poppins text-gray-500 text-xs mt-0.5">{item.date}</p>
          </div>
        </div>
      </motion.div>

      {/* Center dot */}
      <motion.div
        className="relative z-10 flex-shrink-0"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${item.color}, rgba(155,114,207,0.8))`,
            boxShadow: `0 0 20px ${item.color}66`,
          }}
        >
          <span className="text-xl">{item.emoji}</span>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="glass-pink rounded-2xl p-4 md:p-5">
          <h4
            className="font-dancing text-2xl mb-2"
            style={{ color: item.color }}
          >
            {item.title}
          </h4>
          <p className="font-playfair text-white/70 text-sm leading-relaxed italic">
            {item.desc}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function Timeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 px-4 relative overflow-hidden" id="timeline">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(155,114,207,0.07) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-poppins text-lavender-soft text-xs tracking-[0.4em] uppercase mb-3">
            📸 Our Journey
          </p>
          <h2
            className="font-dancing text-5xl md:text-6xl"
            style={{
              background: 'linear-gradient(135deg, #C9B1E8, #9B72CF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Story
          </h2>
          <p className="font-poppins text-white/40 text-sm mt-3">
            Every chapter, every moment, every memory
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 timeline-line rounded-full pointer-events-none"
            style={{ transform: 'translateX(-50%)' }}
          />

          {/* Items */}
          {MILESTONES.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
