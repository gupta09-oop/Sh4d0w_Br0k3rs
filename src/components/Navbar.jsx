import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Profile', href: '#profile' },
  { label: 'Team', href: '#team' },
  { label: 'Missions', href: '#missions' },
  { label: 'Terminal', href: '#terminal' },
  { label: 'Writeups', href: '#writeups' },
  { label: 'Recruit', href: '#recruit' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-gray-border' : ''
      }`}
      style={{
        background: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-red-hack" style={{ boxShadow: '0 0 8px #ff0033' }} />
          <span
            className="text-xs tracking-widest uppercase glow-red"
            style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.7rem' }}
          >
            Sh4d0w_Br0k3rs
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
          <a
            href="mailto:guptakshitij472@gmail.com"
            className="px-4 py-1.5 text-xs tracking-widest uppercase border border-red-hack text-red-hack hover:bg-red-hack hover:text-black transition-all duration-200"
            style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.65rem' }}
          >
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`block w-5 h-px bg-red-hack transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-5 h-px bg-red-hack transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-red-hack transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-gray-border overflow-hidden"
            style={{ background: 'rgba(0,0,0,0.95)' }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-4 text-xs tracking-widest uppercase border-b border-gray-border text-gray-text hover:text-red-hack transition-colors"
              >
                &gt; {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
