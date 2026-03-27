export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-gray-border py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-red-hack" style={{ boxShadow: '0 0 6px #ff0033' }} />
            <span
              className="text-xs tracking-widest glow-red"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              Sh4d0w Br0k3rs
            </span>
          </div>

          <div className="text-xs text-center" style={{ color: '#333' }}>
            <span>guptakshitij472@gmail.com</span>
            <span className="mx-3">·</span>
            <a
              href="https://medium.com/@guptakshitij4723"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-hack transition-colors"
            >
              medium.com/@guptakshitij4723
            </a>
          </div>

          <div className="text-xs" style={{ color: '#222', letterSpacing: '0.1em' }}>
            BORN IN SILENCE. EXECUTED IN ROOT.
          </div>
        </div>

        <div className="h-px mt-8" style={{ background: 'linear-gradient(90deg, transparent, #1a1a1a, transparent)' }} />

        <div className="mt-4 text-center text-xs" style={{ color: '#1a1a1a', letterSpacing: '0.05em' }}>
          {/* hidden easter egg comment in source: CTF{sh4d0w_recruitment_access} */}
          © 2025 Sh4d0w Br0k3rs. All systems operational.
        </div>
      </div>
    </footer>
  )
}
