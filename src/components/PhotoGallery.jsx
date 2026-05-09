import React, { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// Your actual photos from /public/images/
const PHOTOS = [
  { id: 1, src: '/images/photo1.jpg', label: 'Golden Hour 🌅', color: '#FFE4B5' },
  { id: 2, src: '/images/photo2.jpg', label: 'Happy Day 🌸', color: '#FFB7C5' },
  { id: 3, src: '/images/photo3.jpg', label: 'Beautiful Memory 💕', color: '#C9B1E8' },
  { id: 4, src: '/images/photo4.jpg', label: 'Sweet Moments 🍓', color: '#E8527A' },
  { id: 5, src: '/images/photo5.jpg', label: 'Magical Night ✨', color: '#9B72CF' },
  { id: 6, src: '/images/photo6.jpg', label: 'Late Night 🌙', color: '#FFB7C5' },
  { id: 7, src: '/images/photo7.jpg', label: 'Our Adventure 🌊', color: '#A8D8EA' },
  { id: 8, src: '/images/photo8.jpg', label: 'Cozy Moments ☕', color: '#D4A574' },
  { id: 9, src: '/images/photo9.jpg', label: 'Endless Love 💖', color: '#E8527A' },
  { id: 10, src: '/images/photo10.jpg', label: 'Forever Us 💝', color: '#9B72CF' },
]

function PhotoCard({ photo, index, onClick }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      ref={ref}
      className="masonry-item relative group cursor-pointer rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${photo.color}22, ${photo.color}11)`,
        border: '1px solid rgba(255,255,255,0.08)',
        minHeight: '200px',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: Math.min(index * 0.07, 0.5) }}
      onClick={() => onClick(photo)}
      whileHover={{ scale: 1.02 }}
    >
      {/* Loading placeholder */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-pink-400 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={photo.src}
        alt={photo.label}
        className={`w-full h-auto object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
        style={{ minHeight: '200px' }}
      />

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.6) 0%, transparent 60%)' }}
      >
        <p className="font-dancing text-white text-lg">{photo.label}</p>
      </motion.div>

      {/* Heart hover pop */}
      <motion.div
        className="absolute top-3 right-3 text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
            {PHOTOS.length} beautiful moments captured 🎀
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

        {/* Photo modal - full size view when clicked */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={() => setSelected(null)}
              />
              <motion.div
                className="relative rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh]"
                style={{
                  background: `linear-gradient(135deg, ${selected.color}33, ${selected.color}11)`,
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {/* Full image */}
                <div className="relative flex items-center justify-center">
                  <img
                    src={selected.src}
                    alt={selected.label}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                </div>
                
                {/* Caption */}
                <div className="p-6 text-center">
                  <h3 className="font-dancing text-3xl text-white mb-1">{selected.label}</h3>
                  <p className="font-poppins text-white/60 text-sm">A beautiful memory with you 💕</p>
                </div>
                
                {/* Close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl transition-colors"
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