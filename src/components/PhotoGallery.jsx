import React, { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// Photo placeholders — replace src with your actual image paths under /public/images/
// Add your images as: /public/images/photo1.jpg, photo2.jpg, etc.
const PHOTOS = [
  { id: 1, emoji: '🌅', label: 'Golden Hour', color: '#FFE4B5', height: 'h-48' },
  { id: 2, emoji: '🌸', label: 'Spring Day', color: '#FFB7C5', height: 'h-32' },
  { id: 3, emoji: '🌙', label: 'Late Night', color: '#C9B1E8', height: 'h-44' },
  { id: 4, emoji: '☕', label: 'Morning Coffee', color: '#D4A574', height: 'h-36' },
  { id: 5, emoji: '🎵', label: 'Our Song', color: '#B5EAD7', height: 'h-52' },
  { id: 6, emoji: '🌊', label: 'By the Sea', color: '#A8D8EA', height: 'h-40' },
  { id: 7, emoji: '🍓', label: 'Sweet Moments', color: '#E8527A', height: 'h-36' },
  { id: 8, emoji: '✨', label: 'Magical Night', color: '#9B72CF', height: 'h-48' },
  { id: 9, emoji: '🌻', label: 'Sunny Days', color: '#FFD93D', height: 'h-40' },
]

function PhotoCard({ photo, index, onClick }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      className={`masonry-item relative group cursor-pointer rounded-2xl overflow-hidden ${photo.height}`}
      style={{
        background: `linear-gradient(135deg, ${photo.color}44, ${photo.color}22)`,
        border: '1px solid rgba(255,255,255,0.08)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      onClick={() => onClick(photo)}
      whileHover={{ scale: 1.02 }}
    >
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl md:text-6xl">{photo.emoji}</span>

        {/* NOTE: Replace the emoji with an actual <img> tag when you have photos:
          <img src={`/images/${photo.src}`} alt={photo.label}
               className="w-full h-full object-cover" />
        */}
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, transparent 60%)' }}
      >
        <p className="font-dancing text-white text-lg">{photo.label} 💕</p>
      </motion.div>

      {/* Heart hover pop */}
      <motion.div
        className="absolute top-3 right-3 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        whileHover={{ scale: 1.3 }}
      >
        ❤️
      </motion.div>
    </motion.div>
  )
}

export default function PhotoGallery() {
  const [selected, setSelected] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 px-4" id="gallery">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-poppins text-rose-300 text-xs tracking-[0.4em] uppercase mb-3">
            📷 Our Memories
          </p>
          <h2
            className="font-dancing text-5xl md:text-6xl"
            style={{
              background: 'linear-gradient(135deg, #FFB7C5, #C9B1E8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Gallery
          </h2>
          <p className="font-poppins text-white/40 text-sm mt-3">
            Add your photos to /public/images/ to fill this gallery with real memories ✨
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="masonry-grid">
          {PHOTOS.map((photo, i) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={i}
              onClick={setSelected}
            />
          ))}
        </div>

        {/* Photo modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelected(null)}
              />
              <motion.div
                className="relative rounded-3xl overflow-hidden max-w-sm w-full"
                style={{
                  background: `linear-gradient(135deg, ${selected.color}33, ${selected.color}11)`,
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <div className="flex items-center justify-center h-64">
                  <span className="text-8xl">{selected.emoji}</span>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-dancing text-3xl text-white mb-1">{selected.label}</h3>
                  <p className="font-poppins text-white/50 text-sm">A beautiful memory 💕</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
