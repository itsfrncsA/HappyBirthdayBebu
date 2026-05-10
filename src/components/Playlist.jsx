import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaPlay, FaPause, FaHeart } from 'react-icons/fa'

const SONGS = [
  {
    title: 'Perfect',
    artist: 'Ed Sheeran',
    duration: '4:23',
    emoji: '💕',
    file: '/audio/Ed Sheeran - Perfect.mp3',
  },
  {
    title: 'All of Me',
    artist: 'John Legend',
    duration: '4:29',
    emoji: '🌹',
    file: '/audio/John Legend - All of Me.mp3',
  },
  {
    title: 'A Thousand Years',
    artist: 'Christina Perri',
    duration: '4:45',
    emoji: '💫',
    file: '/audio/Christina Perri - A Thousand Years.mp3',
  },
  {
    title: 'Thinking Out Loud',
    artist: 'Ed Sheeran',
    duration: '4:41',
    emoji: '🌙',
    file: '/audio/ed sheeran thinking out loud .mp3',
  },
  {
    title: "Can't Help Falling in Love",
    artist: 'Elvis Presley',
    duration: '3:01',
    emoji: '✨',
    file: "/audio/Elvis Presley - Can't Help Falling in Love.mp3",
  },
  {
    title: 'At Last',
    artist: 'Etta James',
    duration: '3:03',
    emoji: '🌸',
    file: '/audio/Etta James - At Last.mp3',
  },
  {
    title: 'Make You Feel My Love',
    artist: 'Adele',
    duration: '3:32',
    emoji: '💖',
    file: '/audio/Adele - Make You Feel My Love .mp3',
  },
  {
    title: 'Lucky',
    artist: 'Jason Mraz & Colbie Caillat',
    duration: '3:07',
    emoji: '🍀',
    file: '/audio/Jason Mraz - Lucky.mp3',
  },
]

function VinylRecord({ spinning }) {
  return (
    <div className="relative w-32 h-32 md:w-44 md:h-44 flex-shrink-0">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, #3d1f5a, #1a0a2e),
            conic-gradient(from 0deg, #2d1040, #1a0a2e, #2d1040)
          `,
          boxShadow: spinning
            ? '0 0 35px rgba(155,114,207,0.45)'
            : '0 4px 30px rgba(0,0,0,0.5)',
        }}
        animate={{ rotate: spinning ? 360 : 0 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="vinyl-grooves absolute inset-0 rounded-full" />

        <div
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)',
          }}
        />

        <div
          className="absolute rounded-full flex items-center justify-center"
          style={{
            width: '38%',
            height: '38%',
            top: '31%',
            left: '31%',
            background: 'linear-gradient(135deg, #E8527A, #9B72CF)',
          }}
        >
          <span className="text-xl md:text-2xl">💜</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute"
        style={{
          width: 2,
          height: 70,
          background: 'linear-gradient(180deg, #C9B1E8, transparent)',
          top: -20,
          right: -10,
          transformOrigin: 'top center',
          borderRadius: 2,
        }}
        animate={spinning ? { rotate: [25, 22] } : { rotate: 25 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}

function SongRow({ song, index, isPlaying, onClick }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-white/5 group"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <div className="w-8 text-center flex-shrink-0">
        {isPlaying ? (
          <motion.div
            className="text-rose-400"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <FaPause size={12} />
          </motion.div>
        ) : (
          <>
            <span className="font-poppins text-white/30 text-sm group-hover:hidden">
              {index + 1}
            </span>

            <FaPlay
              size={12}
              className="text-rose-400 hidden group-hover:block mx-auto"
            />
          </>
        )}
      </div>

      <span className="text-xl">{song.emoji}</span>

      <div className="flex-1 min-w-0">
        <p
          className={`font-poppins text-sm font-medium truncate ${
            isPlaying ? 'text-rose-300' : 'text-white/90'
          }`}
        >
          {song.title}
        </p>

        <p className="font-poppins text-white/40 text-xs truncate">
          {song.artist}
        </p>
      </div>

      <FaHeart
        size={12}
        className="text-rose-400/40 group-hover:text-rose-400 transition-colors"
      />

      <p className="font-poppins text-white/30 text-xs ml-2">
        {song.duration}
      </p>
    </motion.div>
  )
}

export default function Playlist() {
  const [currentSong, setCurrentSong] = useState(null)

  const audioRef = useRef(null)
  const sectionRef = useRef(null)

  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  })

  useEffect(() => {
    if (currentSong === null) {
      audioRef.current?.pause()
      return
    }

    audioRef.current.src = SONGS[currentSong].file
    audioRef.current.play()
  }, [currentSong])

  const toggleSong = (index) => {
    if (currentSong === index) {
      audioRef.current.pause()
      setCurrentSong(null)
    } else {
      setCurrentSong(index)
    }
  }

  const activeSong =
    currentSong !== null ? SONGS[currentSong] : null

  return (
    <section className="py-24 px-4" id="playlist">
      <audio ref={audioRef} />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          ref={sectionRef}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="font-poppins text-lavender-soft text-xs tracking-[0.4em] uppercase mb-3">
            🎵 Songs That Remind Me Of You
          </p>

          <h2
            className="font-dancing text-5xl md:text-6xl"
            style={{
              background:
                'linear-gradient(135deg, #C9B1E8, #9B72CF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Playlist 💜
          </h2>
        </motion.div>

        {/* Player */}
        <motion.div
          className="glass rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Top */}
          <div
            className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8"
            style={{
              background:
                'linear-gradient(135deg, rgba(155,114,207,0.15), rgba(232,82,122,0.1))',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <VinylRecord spinning={currentSong !== null} />

            <div className="flex-1 min-w-0 text-center md:text-left">
              {activeSong ? (
                <>
                  <p className="font-poppins text-white/50 text-xs uppercase tracking-widest mb-1">
                    Now Playing
                  </p>

                  <motion.h3
                    key={activeSong.title}
                    className="font-dancing text-3xl text-white mb-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {activeSong.title}
                  </motion.h3>

                  <motion.p
                    key={activeSong.artist}
                    className="font-poppins text-white/50 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {activeSong.artist}
                  </motion.p>

                  <div className="flex items-end justify-center md:justify-start gap-1 mt-4 h-6">
                    {[...Array(16)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 rounded-full"
                        style={{
                          background:
                            'linear-gradient(180deg, #E8527A, #9B72CF)',
                        }}
                        animate={{
                          height: [4, Math.random() * 18 + 4, 4],
                        }}
                        transition={{
                          duration: 0.5 + Math.random() * 0.5,
                          delay: i * 0.05,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <p
                    className="font-dancing text-3xl mb-1"
                    style={{
                      background:
                        'linear-gradient(135deg, #FFB7C5, #9B72CF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Songs for my bebu 💕
                  </p>

                  <p className="font-poppins text-white/40 text-sm">
                    Click any song to play
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Song List */}
          <div className="p-4">
            {SONGS.map((song, i) => (
              <SongRow
                key={i}
                song={song}
                index={i}
                isPlaying={currentSong === i}
                onClick={() => toggleSong(i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}