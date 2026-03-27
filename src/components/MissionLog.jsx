import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const missions = [
  {
    id: 'MSN-001',
    event: 'ENCRYPTED CTF',
    result: 'RANK 5 — GLOBAL',
    type: 'COMPETITION',
    status: 'COMPLETE',
    date: '2025',
  },
  {
    id: 'MSN-002',
    event: 'QUICK HEAL CTF',
    result: 'RANK 6 — NATIONAL',
    type: 'COMPETITION',
    status: 'COMPLETE',
    date: '2025',
  },
  {
    id: 'MSN-003',
    event: 'CYBERHUNT',
    result: 'RANK 5 — REGIONAL',
    type: 'COMPETITION',
    status: 'COMPLETE',
    date: '2024',
  },
  {
    id: 'MSN-004',
    event: 'TRIVARNA CTF',
    result: 'ORGANIZED & EXECUTED',
    type: 'OPERATION',
    status: 'COMPLETE',
    date: '2024',
  },
]

export default function MissionLog() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="missions" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <span className="section-label">// 03</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #1a1a1a, transparent)' }} />
            <span
              className="text-2xl"
              style={{ fontFamily: 'Orbitron, monospace', color: '#fff', letterSpacing: '0.15em' }}
            >
              [ MISSION LOG ]
            </span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(270deg, #1a1a1a, transparent)' }} />
          </div>

          {/* Terminal-style log */}
          <div className="panel corner-br p-6">
            {/* Terminal header bar */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-border">
              <div className="w-2 h-2 rounded-full bg-red-hack" />
              <div className="w-2 h-2 rounded-full" style={{ background: '#333' }} />
              <div className="w-2 h-2 rounded-full" style={{ background: '#222' }} />
              <span className="text-xs ml-3" style={{ color: '#333', fontFamily: 'Share Tech Mono' }}>
                sh4d0w@root:~$ cat mission_log.txt
              </span>
            </div>

            {/* Log entries */}
            <div className="space-y-0">
              {missions.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className="mission-item py-4"
                >
                  <div className="flex flex-wrap items-start gap-x-4 gap-y-1 mb-1">
                    <span className="text-xs" style={{ color: '#333' }}>[{m.id}]</span>
                    <span className="text-xs glow-red">{'>'}</span>
                    <span
                      className="text-sm"
                      style={{ fontFamily: 'Orbitron, monospace', color: '#ccc', letterSpacing: '0.1em', fontSize: '0.8rem' }}
                    >
                      {m.event}
                    </span>
                    <span className="text-xs" style={{ color: '#ff0033' }}>→</span>
                    <span className="text-sm" style={{ color: '#ccc', letterSpacing: '0.05em' }}>
                      {m.result}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs" style={{ color: '#333', letterSpacing: '0.1em' }}>
                    <span>TYPE: {m.type}</span>
                    <span>STATUS: <span style={{ color: '#ff0033' }}>{m.status}</span></span>
                    <span>YEAR: {m.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Ongoing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="mt-6 pt-4 border-t border-gray-border"
            >
              <div className="flex items-center gap-2">
                <div className="status-dot" />
                <span className="text-xs" style={{ color: '#555' }}>
                  sh4d0w@root:~$ <span style={{ color: '#888' }}>Monitoring new targets... Standing by.</span>
                  <span className="animate-blink" style={{ color: '#ff0033' }}>█</span>
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
