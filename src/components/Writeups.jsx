import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const categories = [
  { label: 'Web Exploitation', icon: '⬡' },
  { label: 'Cryptography', icon: '⬡' },
  { label: 'Forensics', icon: '⬡' },
  { label: 'OSINT', icon: '⬡' },
  { label: 'Binary / Pwn', icon: '⬡' },
  { label: 'Reverse Engineering', icon: '⬡' },
]

export default function Writeups() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="writeups" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <span className="section-label">// 05</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #1a1a1a, transparent)' }} />
            <span
              className="text-2xl"
              style={{ fontFamily: 'Orbitron, monospace', color: '#fff', letterSpacing: '0.15em' }}
            >
              [ KNOWLEDGE BASE ]
            </span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(270deg, #1a1a1a, transparent)' }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Description panel */}
            <div className="panel corner-br p-6 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="status-dot" />
                <span className="section-label">Data Source</span>
              </div>
              <p className="text-xs leading-loose mb-6" style={{ color: '#555' }}>
                Tactical writeups, challenge walkthroughs, and methodology documentation published by unit operatives.
              </p>
              <div className="h-px mb-6" style={{ background: '#1a1a1a' }} />
              <div className="text-xs mb-2" style={{ color: '#333' }}>PLATFORM</div>
              <a
                href="https://medium.com/@guptakshitij4723"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-red-hack transition-colors group"
                style={{ color: '#888' }}
              >
                <span className="glow-red">▸</span>
                <span>Medium — @guptakshitij4723</span>
              </a>
              <div className="mt-6">
                <a
                  href="https://medium.com/@guptakshitij4723"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-red-hack text-red-hack text-xs hover:bg-red-hack hover:text-black transition-all"
                  style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.65rem', letterSpacing: '0.1em' }}
                >
                  ACCESS DATABASE →
                </a>
              </div>
            </div>

            {/* Categories grid */}
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="operative-card p-4 group"
                >
                  <div className="text-xs mb-3" style={{ color: '#ff0033' }}>
                    →
                  </div>
                  <div className="text-sm mb-2" style={{ color: '#ccc', letterSpacing: '0.05em', fontSize: '0.8rem' }}>
                    {cat.label}
                  </div>
                  <div
                    className="text-lg"
                    style={{ fontFamily: 'Orbitron, monospace', color: '#333' }}
                  >
                    {cat.count}
                  </div>
                  <div className="text-xs mt-1" style={{ color: '#333' }}>writeups</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
