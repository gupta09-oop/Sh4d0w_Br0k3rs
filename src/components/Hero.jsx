import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const subtexts = [
  'Born in Silence. Executed in Root.',
  'Every flag has an owner. We are the owner.',
  'We don\'t choose categories. We conquer them.',
]

function TypewriterText({ text, speed = 50, delay = 0 }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed, started])

  return (
    <span>
      {displayed}
      <span className="animate-blink" style={{ color: '#ff0033' }}>█</span>
    </span>
  )
}

export default function Hero() {
  const [subtextIndex, setSubtextIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtextIndex(i => (i + 1) % subtexts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6"
      style={{ paddingTop: '56px' }}
    >
      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #ff0033, transparent)', transformOrigin: 'left' }}
      />

      {/* System status header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex items-center gap-4 mb-12"
      >
        <div className="flex items-center gap-2">
          <div className="status-dot" />
          <span className="section-label">System Active</span>
        </div>
        <div className="w-16 h-px bg-gray-border" />
        <span className="section-label" style={{ color: '#555' }}>Unit: SB-ALPHA</span>
        <div className="w-16 h-px bg-gray-border" />
        <span className="section-label" style={{ color: '#555' }}>Clearance: ROOT</span>
      </motion.div>

      {/* Main title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="mb-4"
      >
        <h1
          className="glow-red leading-none tracking-wider"
          style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
            fontWeight: 900,
            letterSpacing: '0.05em',
          }}
        >
          Sh4d0w
        </h1>
        <h1
          className="leading-none tracking-wider"
          style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(2.5rem, 8vw, 7rem)',
            fontWeight: 900,
            letterSpacing: '0.05em',
            color: '#ccc',
          }}
        >
          Br0k3rs
        </h1>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="w-48 h-px mb-8"
        style={{ background: 'linear-gradient(90deg, transparent, #ff0033, transparent)' }}
      />

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="text-gray-text mb-4"
        style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.85rem', letterSpacing: '0.2em' }}
      >
        WE DON'T CHOOSE CATEGORIES. WE CONQUER THEM.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-sm mb-16"
        style={{ color: '#666' }}
      >
        {'>'}&nbsp;
        <TypewriterText
          key={subtextIndex}
          text={subtexts[subtextIndex]}
          speed={45}
          delay={200}
        />
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4 }}
        className="flex items-center gap-0 border border-gray-border"
      >
        {[
          { label: 'Operatives', value: '04' },
          { label: 'CTFs Completed', value: '12+' },
          { label: 'Top Finishes', value: '04' },
          { label: 'Domains', value: 'ALL' },
        ].map((s, i) => (
          <div
            key={i}
            className="px-6 py-4 text-center border-r border-gray-border last:border-r-0"
            style={{ minWidth: '120px' }}
          >
            <div className="num-glow text-xl mb-1">{s.value}</div>
            <div className="text-xs" style={{ color: '#444', letterSpacing: '0.1em' }}>{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="section-label" style={{ color: '#333' }}>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8"
          style={{ background: 'linear-gradient(180deg, #ff0033, transparent)' }}
        />
      </motion.div>
    </section>
  )
}
