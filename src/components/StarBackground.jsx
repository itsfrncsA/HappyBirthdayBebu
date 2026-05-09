import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

function Star({ x, y, size, delay, duration }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
      }}
      animate={{
        opacity: [0.1, 1, 0.1],
        scale: [0.8, 1.3, 0.8],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

function ShootingStar({ delay }) {
  return (
    <motion.div
      className="absolute h-px rounded-full"
      style={{
        background: 'linear-gradient(90deg, transparent, #fff, transparent)',
        top: `${Math.random() * 50}%`,
        left: '-10%',
        width: '150px',
      }}
      animate={{
        x: ['0vw', '120vw'],
        y: ['0', '40px'],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 12 + 8,
        ease: 'easeOut',
      }}
    />
  )
}

export default function StarBackground() {
  // Generate stars deterministically
  const stars = useMemo(() => {
    const arr = []
    const seed = [
      [12, 23, 2, 0.5, 3.2], [34, 67, 1.5, 1.2, 4.1], [56, 12, 3, 0.8, 2.8],
      [78, 45, 1, 0.3, 5.0], [23, 89, 2.5, 1.8, 3.5], [90, 34, 1.5, 0.6, 4.3],
      [45, 78, 2, 1.0, 2.9], [67, 23, 1, 0.4, 3.7], [11, 56, 3, 1.5, 4.8],
      [89, 90, 1.5, 0.9, 3.1], [33, 44, 2, 0.7, 2.5], [55, 67, 1, 1.3, 4.6],
      [77, 11, 2.5, 0.2, 3.9], [22, 33, 1.5, 1.6, 2.7], [44, 88, 2, 0.5, 5.2],
      [66, 55, 1, 0.8, 3.4], [88, 22, 3, 1.1, 4.0], [10, 77, 1.5, 0.3, 2.6],
      [30, 10, 2, 1.4, 3.8], [70, 66, 1, 0.6, 4.5], [50, 39, 2.5, 1.7, 3.0],
      [80, 55, 1.5, 0.9, 4.2], [20, 80, 2, 0.4, 5.1], [60, 28, 1, 1.2, 2.9],
      [40, 73, 3, 0.7, 3.6], [5, 50, 1.5, 1.5, 4.7], [95, 18, 2, 0.2, 3.3],
      [15, 95, 1, 0.8, 4.9], [85, 43, 2.5, 1.0, 2.8], [25, 62, 1.5, 0.5, 3.5],
      [75, 7, 2, 1.3, 4.1], [35, 85, 1, 0.4, 2.7], [65, 30, 3, 0.9, 5.3],
      [3, 38, 1.5, 1.6, 3.2], [93, 72, 2, 0.3, 4.4], [48, 15, 1, 1.1, 3.8],
      [58, 95, 2.5, 0.6, 2.5], [18, 20, 1.5, 1.4, 4.6], [82, 60, 2, 0.7, 3.1],
      [42, 48, 1, 0.8, 5.0], [72, 83, 3, 1.2, 3.7], [28, 5, 1.5, 0.5, 4.3],
      [62, 70, 2, 1.8, 2.9], [8, 65, 1, 0.3, 3.5], [98, 35, 2.5, 1.0, 4.8],
      [38, 52, 1.5, 0.6, 3.0], [68, 17, 2, 1.5, 4.2], [2, 90, 1, 0.9, 2.6],
      [52, 25, 3, 0.4, 3.9], [17, 42, 1.5, 1.3, 5.1],
    ]
    seed.forEach(([x, y, size, delay, duration], i) => {
      arr.push({ x, y, size, delay, duration, id: i })
    })
    return arr
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(45, 10, 62, 0.8) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 80%, rgba(13, 4, 30, 0.9) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 0%, rgba(30, 5, 50, 0.6) 0%, transparent 50%),
            #0d0615
          `,
        }}
      />

      {/* Stars */}
      {stars.map(s => (
        <Star key={s.id} {...s} />
      ))}

      {/* Shooting stars */}
      <ShootingStar delay={5} />
      <ShootingStar delay={14} />
      <ShootingStar delay={23} />

      {/* Nebula glow spots */}
      <div
        className="absolute rounded-full"
        style={{
          width: '600px',
          height: '600px',
          top: '10%',
          left: '60%',
          background: 'radial-gradient(circle, rgba(155,114,207,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '500px',
          height: '500px',
          top: '50%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(232,82,122,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  )
}
