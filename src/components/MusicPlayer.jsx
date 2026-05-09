import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaMusic, FaPause, FaPlay, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [expanded, setExpanded] = useState(false)
  const [hasAudio, setHasAudio] = useState(true)
  const [autoplayFailed, setAutoplayFailed] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    
    audio.volume = volume
    audio.loop = true
    
    // Try to play with sound
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setPlaying(true)
        console.log('Audio playing with sound')
      }).catch(e => {
        console.log('Autoplay blocked by browser:', e)
        setAutoplayFailed(true)
        setPlaying(false)
      })
    }

    const handleError = () => setHasAudio(false)
    audio.addEventListener('error', handleError)
    return () => audio.removeEventListener('error', handleError)
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio || !hasAudio) return
    
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
        setAutoplayFailed(false)
      } catch (e) {
        console.log('Audio play blocked:', e)
      }
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !muted
      audioRef.current.muted = newMuted
      setMuted(newMuted)
    }
  }

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src="/audio/romantic.mp3" preload="auto" />

      {/* Fixed music button */}
      <div className="music-btn">
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="glass-pink rounded-2xl p-4 mb-3 min-w-[200px]"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Vinyl */}
              <div className="flex items-center gap-3 mb-3">
                <motion.div
                  className="relative w-12 h-12 rounded-full flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #1a0a24, #2d1040)' }}
                  animate={{ rotate: playing ? 360 : 0 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="vinyl-grooves absolute inset-0 rounded-full" />
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: 10, height: 10, top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: 'linear-gradient(135deg, #E8527A, #9B72CF)',
                    }}
                  />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="font-dancing text-rose-300 text-sm font-semibold truncate">
                    Our Song 🎵
                  </p>
                  <p className="font-poppins text-white/40 text-xs truncate">
                    {autoplayFailed ? '⚠️ Tap play to start' : 'Romantic Instrumental'}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #E8527A, #9B72CF)' }}
                >
                  {playing
                    ? <FaPause size={12} color="#fff" />
                    : <FaPlay size={12} color="#fff" />
                  }
                </button>
                <button onClick={toggleMute} className="text-white/50 hover:text-white/80 transition-colors">
                  {muted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  className="flex-1 h-1 rounded-full accent-pink-400 cursor-pointer"
                  style={{
                    background: 'linear-gradient(90deg, #E8527A, #9B72CF)',
                  }}
                />
              </div>

              {autoplayFailed && (
                <p className="font-poppins text-yellow-400/60 text-xs text-center">
                  ⚡ Browser blocked autoplay. Click play to hear music.
                </p>
              )}

              {!hasAudio && (
                <p className="font-poppins text-white/30 text-xs text-center">
                  Add /public/audio/romantic.mp3 to enable music 🎵
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          onClick={() => setExpanded(e => !e)}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative"
          style={{
            background: 'linear-gradient(135deg, #E8527A, #9B72CF)',
            boxShadow: playing
              ? '0 0 20px rgba(232,82,122,0.6), 0 0 40px rgba(155,114,207,0.4)'
              : '0 4px 20px rgba(0,0,0,0.4)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={playing ? { scale: [1, 1.05, 1] } : {}}
          transition={playing ? { duration: 1.4, repeat: Infinity } : {}}
        >
          <FaMusic size={20} color="#fff" />
          {autoplayFailed && !playing && (
            <motion.span
              className="absolute -top-1 -right-1 text-[10px] bg-red-500 rounded-full px-1"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ⚠️
            </motion.span>
          )}
        </motion.button>
      </div>
    </>
  )
}