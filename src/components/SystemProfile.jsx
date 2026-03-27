import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fields = [
  { key: 'STATUS', value: 'ACTIVE', color: '#ff0033' },
  { key: 'UNIT TYPE', value: 'ADAPTIVE CTF UNIT', color: '#ccc' },
  { key: 'CLASSIFICATION', value: 'ELITE / TOP-TIER', color: '#ccc' },
  { key: 'DOMAINS', value: 'WEB | CRYPTO | PWNING | FORENSICS | OSINT | REV', color: '#ccc' },
  { key: 'APPROACH', value: 'UNDEFINED — ADAPTS TO THREAT', color: '#ccc' },
  { key: 'ORIGIN', value: 'SILENCE', color: '#555' },
  { key: 'EXECUTION', value: 'ROOT ACCESS', color: '#555' },
]

const capabilities = [
  'Web Exploitation',
  'Cryptography',
  'Binary Exploitation',
  'Reverse Engineering',
  'Digital Forensics',
  'OSINT',
  'Steganography',
  'Network Analysis',
]

export default function SystemProfile() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="profile" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-12">
            <span className="section-label">// 01</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #1a1a1a, transparent)' }} />
            <span
              className="text-2xl"
              style={{ fontFamily: 'Orbitron, monospace', color: '#fff', letterSpacing: '0.15em' }}
            >
              [ SYSTEM PROFILE ]
            </span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(270deg, #1a1a1a, transparent)' }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Data table */}
            <div className="panel corner-br p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="status-dot" />
                <span className="section-label">Unit Data</span>
              </div>
              
              <div className="space-y-0">
                {fields.map((f, i) => (
                  <motion.div
                    key={f.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start py-3 border-b border-gray-border last:border-b-0"
                  >
                    <span className="w-44 text-xs shrink-0" style={{ color: '#444', letterSpacing: '0.1em' }}>
                      {f.key}
                    </span>
                    <span className="text-xs" style={{ color: f.color, letterSpacing: '0.05em' }}>
                      {f.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Capabilities + description */}
            <div className="flex flex-col gap-6">
              <div className="panel corner-br p-6 flex-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="status-dot" />
                  <span className="section-label">Capability Matrix</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {capabilities.map((cap, i) => (
                    <motion.div
                      key={cap}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.4 + i * 0.06 }}
                      className="flex items-center gap-2 text-xs py-1.5"
                      style={{ color: '#666' }}
                    >
                      <span className="text-red-hack">▸</span>
                      <span>{cap}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="panel corner-br p-6">
                <div className="text-xs leading-loose" style={{ color: '#555' }}>
                  <span style={{ color: '#ff0033' }}>{'>'}</span>{' '}
                  Sh4d0w Br0k3rs is a competitive CTF unit forged for one purpose:
                  <span style={{ color: '#ccc' }}> total domain coverage</span>.
                  No category is foreign. No system is sacred.
                  <br /><br />
                  <span style={{ color: '#ff0033' }}>{'>'}</span>{' '}
                  From web exploitation to binary pwning, we operate in
                  <span style={{ color: '#ccc' }}> all threat surfaces</span>.
                  Every capture is a statement. Every flag is a signature.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
