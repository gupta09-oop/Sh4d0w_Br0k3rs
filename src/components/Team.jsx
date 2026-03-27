import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const operatives = [
  {
    id: '01',
    name: 'Kshitij Gupta',
    handle: 'Exploiter404',
    skills: ['Web Exploitation', 'Pwn', 'Crypto', 'Rev'],
    linkedin: 'https://www.linkedin.com/in/kshitij-gupta-exploiter404',
    specialty: 'OFFENSIVE LEAD',
  },
  {
    id: '02',
    name: 'Noor Hassan',
    handle: 'Admin404',
    skills: ['OSINT', 'Forensics', 'Web', 'Recon'],
    linkedin: '#',
    specialty: 'INTELLIGENCE OPS',
  },
  {
    id: '03',
    name: 'Abraham Daniel',
    handle: 'Cyb3r_Ph4nt0mX',
    skills: ['Reverse Engineering', 'Malware', 'Crypto'],
    linkedin: '#',
    specialty: 'REVERSE ENGINEER',
  },
  {
    id: '04',
    name: 'Harsh Vardhan',
    handle: 'Gu13r1a',
    skills: ['Binary Exploitation', 'Pwn', 'Forensics'],
    linkedin: '#',
    specialty: 'EXPLOITATION UNIT',
  },
]

function OperativeCard({ op, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      className="operative-card corner-br p-5 group"
    >
      {/* ID + specialty header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="section-label mb-1">[ OPERATIVE {op.id} ]</div>
          <div className="h-px w-12 bg-red-hack opacity-50 mb-3" />
        </div>
        <div className="status-dot mt-1" />
      </div>

      {/* Name + handle */}
      <div className="mb-4">
        <h3
          className="text-white mb-1"
          style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.9rem', letterSpacing: '0.1em' }}
        >
          {op.name}
        </h3>
        <div className="text-xs" style={{ color: '#ff0033' }}>
          @{op.handle}
        </div>
      </div>

      {/* Specialty */}
      <div className="text-xs mb-4 pb-4 border-b border-gray-border" style={{ color: '#555', letterSpacing: '0.1em' }}>
        {op.specialty}
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs" style={{ color: '#444' }}>STATUS</span>
        <span className="text-xs" style={{ color: '#ff0033' }}>ACTIVE</span>
      </div>

      {/* Skills */}
      <div className="mb-5">
        <div className="text-xs mb-2" style={{ color: '#444', letterSpacing: '0.1em' }}>CAPABILITIES</div>
        <div className="flex flex-wrap gap-1">
          {op.skills.map((s) => (
            <span
              key={s}
              className="text-xs px-2 py-0.5 border border-gray-border"
              style={{ color: '#666', fontSize: '0.65rem', letterSpacing: '0.05em' }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* LinkedIn */}
      <a
        href={op.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-xs transition-colors hover:text-red-hack"
        style={{ color: '#333', letterSpacing: '0.1em' }}
      >
        <span>▸</span>
        <span>ACCESS PROFILE</span>
      </a>

      {/* Hover accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: 'linear-gradient(90deg, transparent, #ff0033, transparent)' }}
      />
    </motion.div>
  )
}

export default function Team() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="team" className="relative z-10 py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <span className="section-label">// 02</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #1a1a1a, transparent)' }} />
            <span
              className="text-2xl"
              style={{ fontFamily: 'Orbitron, monospace', color: '#fff', letterSpacing: '0.15em' }}
            >
              [ TEAM ROSTER ]
            </span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(270deg, #1a1a1a, transparent)' }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {operatives.map((op, i) => (
              <OperativeCard key={op.id} op={op} index={i} inView={inView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
