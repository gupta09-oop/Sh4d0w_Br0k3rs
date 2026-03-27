import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const skillOptions = ['Web Exploitation', 'Cryptography', 'Pwn / Binary', 'Reverse Engineering', 'Forensics', 'OSINT', 'Steganography', 'Other']

export default function Recruit() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [form, setForm] = useState({
    name: '',
    email: '',
    skills: [],
    reason: '',
    resume: null,
  })
  const [submitted, setSubmitted] = useState(false)

  const toggleSkill = (skill) => {
    setForm((f) => ({
      ...f,
      skills: f.skills.includes(skill)
        ? f.skills.filter((s) => s !== skill)
        : [...f.skills, skill],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="recruit" className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <span className="section-label">// 06</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #1a1a1a, transparent)' }} />
            <span
              className="text-2xl"
              style={{ fontFamily: 'Orbitron, monospace', color: '#fff', letterSpacing: '0.15em' }}
            >
              [ RECRUITMENT PROTOCOL ]
            </span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(270deg, #1a1a1a, transparent)' }} />
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-12 text-center"
            >
              <div
                className="text-4xl mb-4 glow-red"
                style={{ fontFamily: 'Orbitron, monospace' }}
              >
                REQUEST RECEIVED
              </div>
              <div className="text-xs mb-6" style={{ color: '#555' }}>
                Your application has been logged. Operatives will review your profile.
              </div>
              <div className="text-xs" style={{ color: '#ff0033' }}>
                {'>'} Expect contact within 48 hours if your profile matches requirements.
              </div>
            </motion.div>
          ) : (
            <div className="glass-panel p-8 relative corner-br">
              {/* Decorative top label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="status-dot" />
                <span className="section-label">ACCESS REQUEST FORM</span>
                <div className="h-px flex-1" style={{ background: '#1a1a1a' }} />
                <span className="text-xs" style={{ color: '#333' }}>ENCRYPTED</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-2" style={{ color: '#444', letterSpacing: '0.1em' }}>
                      OPERATIVE NAME
                    </label>
                    <input
                      type="text"
                      className="hack-input"
                      placeholder="Full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-2" style={{ color: '#444', letterSpacing: '0.1em' }}>
                      SECURE EMAIL
                    </label>
                    <input
                      type="email"
                      className="hack-input"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-xs mb-3" style={{ color: '#444', letterSpacing: '0.1em' }}>
                    CAPABILITY DOMAINS <span style={{ color: '#333' }}>(select all that apply)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className="text-xs px-3 py-1.5 border transition-all"
                        style={{
                          fontFamily: 'Share Tech Mono, monospace',
                          fontSize: '0.7rem',
                          letterSpacing: '0.05em',
                          border: form.skills.includes(skill)
                            ? '1px solid #ff0033'
                            : '1px solid #1a1a1a',
                          color: form.skills.includes(skill) ? '#ff0033' : '#555',
                          background: form.skills.includes(skill)
                            ? 'rgba(255,0,51,0.05)'
                            : 'transparent',
                          boxShadow: form.skills.includes(skill)
                            ? '0 0 8px rgba(255,0,51,0.15)'
                            : 'none',
                        }}
                      >
                        {form.skills.includes(skill) ? '✓ ' : ''}{skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <label className="block text-xs mb-2" style={{ color: '#444', letterSpacing: '0.1em' }}>
                    MISSION STATEMENT <span style={{ color: '#333' }}>(why do you want to join?)</span>
                  </label>
                  <textarea
                    className="hack-input resize-none"
                    rows={4}
                    placeholder="Why should we grant you access..."
                    value={form.reason}
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                    required
                    style={{ lineHeight: '1.8' }}
                  />
                </div>

                {/* Resume */}
                <div>
                  <label className="block text-xs mb-2" style={{ color: '#444', letterSpacing: '0.1em' }}>
                    CREDENTIALS FILE <span style={{ color: '#333' }}>(resume / optional)</span>
                  </label>
                  <div
                    className="border border-dashed p-4 text-center text-xs transition-all hover:border-red-hack"
                    style={{ borderColor: '#222', color: '#444', cursor: 'pointer' }}
                    onClick={() => document.getElementById('resume-upload').click()}
                  >
                    {form.resume
                      ? <span style={{ color: '#ff0033' }}>✓ {form.resume.name}</span>
                      : '▸ Click to upload resume (PDF, max 5MB)'
                    }
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => setForm({ ...form, resume: e.target.files[0] })}
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 text-sm border border-red-hack text-red-hack hover:bg-red-hack hover:text-black transition-all relative group overflow-hidden"
                    style={{
                      fontFamily: 'Orbitron, monospace',
                      fontSize: '0.75rem',
                      letterSpacing: '0.25em',
                    }}
                  >
                    <span className="relative z-10">REQUEST ACCESS</span>
                    <div
                      className="absolute inset-0 translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                      style={{ background: '#ff0033' }}
                    />
                  </motion.button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
