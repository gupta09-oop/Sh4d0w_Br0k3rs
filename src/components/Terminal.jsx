import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

// Easter egg hidden in terminal output
const COMMANDS = {
  help: {
    output: [
      '╔══════════════════════════════════════╗',
      '║         SB-TERMINAL v2.4.0           ║',
      '╚══════════════════════════════════════╝',
      '',
      '  Available Commands:',
      '',
      '  whoami    → Unit identification',
      '  members   → List team roster',
      '  stats     → Performance metrics',
      '  contact   → Establish channel',
      '  join      → Recruitment protocol',
      '  flag      → ??? ',
      '  clear     → Clear terminal',
      '',
    ],
  },
  whoami: {
    output: [
      '> Unit: Sh4d0w Br0k3rs',
      '> Classification: Elite CTF Unit',
      '> Status: ACTIVE — OPERATIONAL',
      '> Clearance: ROOT',
      '> Threat Level: CRITICAL',
      '> Origin: Forged in the dark web of competition.',
      '',
      '  "We don\'t just solve challenges.',
      '   We dismantle the entire system."',
      '',
    ],
  },
  members: {
    output: [
      '> Querying operative database...',
      '',
      '  [ OPERATIVE 01 ] Kshitij Gupta   @Exploiter404   → WEB | CRYPTO | PWN',
      '  [ OPERATIVE 02 ] Noor Hassan     @Admin404       → OSINT | FORENSICS',
      '  [ OPERATIVE 03 ] Abraham Daniel  @Cyb3r_Ph4nt0mX → REV | MALWARE',
      '  [ OPERATIVE 04 ] Harsh Vardhan   @Gu13r1a        → BINARY | EXPLOIT',
      '',
      '  Total operatives: 4 | Status: All ACTIVE',
      '',
    ],
  },
  stats: {
    output: [
      '> Pulling mission analytics...',
      '',
      '  ┌─────────────────────────────────┐',
      '  │ CTFs Completed   : 12+          │',
      '  │ Top 10 Finishes  : 4            │',
      '  │ Events Organized : 1            │',
      '  │ Domains Covered  : ALL          │',
      '  │ Flags Captured   : [REDACTED]   │',
      '  │ Systems Breached : ■■■■■ 100%  │',
      '  └─────────────────────────────────┘',
      '',
    ],
  },
  contact: {
    output: [
      '> Opening secure channel...',
      '',
      '  Email  : guptakshitij472@gmail.com',
      '  Medium : medium.com/@guptakshitij4723',
      '',
      '  PGP: [KEY REDACTED — CLEARANCE REQUIRED]',
      '',
      '  "Only contact with mission-critical intel."',
      '',
    ],
  },
  join: {
    output: [
      '> Initiating recruitment protocol...',
      '',
      '  Requirements:',
      '  ✓ Proficiency in at least one CTF domain',
      '  ✓ Hunger. Not ambition. Hunger.',
      '  ✓ Ability to operate under pressure',
      '  ✓ No ego. Only execution.',
      '',
      '  → Scroll down to submit REQUEST ACCESS',
      '  → Or email: guptakshitij472@gmail.com',
      '',
    ],
  },
  flag: {
    output: [
      '> Initiating flag decryption...',
      '> Bypassing access controls...',
      '> Extracting payload...',
      '',
      '  ██████████████████████ 100%',
      '',
      '  FLAG EXTRACTED:',
      '  CTF{sh4d0w_recruitment_access}',
      '',
      '  [EASTER EGG UNLOCKED]',
      '  You were curious enough to look.',
      '  That\'s the first qualification.',
      '',
    ],
    color: '#ff0033',
  },
  clear: { clear: true },
}

const UNKNOWN = (cmd) => [
  `> Command not found: '${cmd}'`,
  `> Type 'help' for available commands.`,
  '',
]

export default function Terminal() {
  const sectionRef = useRef()
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })
  const inputRef = useRef()
  const bottomRef = useRef()

  const [history, setHistory] = useState([
    { type: 'system', text: 'SB-TERMINAL v2.4.0 — Authenticated as root' },
    { type: 'system', text: 'Type "help" for available commands.' },
    { type: 'empty' },
  ])
  const [inputVal, setInputVal] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const runCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    const newHistory = [...history]

    newHistory.push({ type: 'input', text: `sh4d0w@root:~$ ${cmd}` })

    if (trimmed === '') {
      newHistory.push({ type: 'empty' })
      setHistory(newHistory)
      return
    }

    const def = COMMANDS[trimmed]
    if (def) {
      if (def.clear) {
        setHistory([{ type: 'system', text: 'Terminal cleared.' }, { type: 'empty' }])
      } else {
        def.output.forEach((line) => {
          newHistory.push({ type: 'output', text: line, color: def.color })
        })
        setHistory(newHistory)
      }
    } else {
      UNKNOWN(trimmed).forEach((line) => {
        newHistory.push({ type: 'output', text: line })
      })
      setHistory(newHistory)
    }

    setCmdHistory((prev) => [trimmed, ...prev])
    setHistIdx(-1)
    setInputVal('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      runCommand(inputVal)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const newIdx = Math.min(histIdx + 1, cmdHistory.length - 1)
      setHistIdx(newIdx)
      setInputVal(cmdHistory[newIdx] || '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const newIdx = Math.max(histIdx - 1, -1)
      setHistIdx(newIdx)
      setInputVal(newIdx === -1 ? '' : cmdHistory[newIdx])
    }
  }

  return (
    <section id="terminal" className="relative z-10 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-12">
            <span className="section-label">// 04</span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #1a1a1a, transparent)' }} />
            <span
              className="text-2xl"
              style={{ fontFamily: 'Orbitron, monospace', color: '#fff', letterSpacing: '0.15em' }}
            >
              [ TERMINAL MODULE ]
            </span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(270deg, #1a1a1a, transparent)' }} />
          </div>

          {/* Terminal window */}
          <div
            className="panel corner-br overflow-hidden"
            onClick={() => inputRef.current?.focus()}
            style={{ cursor: 'text' }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-border" style={{ background: '#080808' }}>
              <div className="w-2.5 h-2.5 rounded-full bg-red-hack" style={{ boxShadow: '0 0 6px #ff0033' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#2a2a2a' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#1a1a1a' }} />
              <span className="ml-4 text-xs" style={{ color: '#333' }}>sh4d0w-terminal — root@shadowbrokers</span>
              <div className="ml-auto flex items-center gap-2">
                <div className="status-dot" />
                <span className="section-label" style={{ fontSize: '0.55rem' }}>SECURE</span>
              </div>
            </div>

            {/* Output area */}
            <div className="p-4 overflow-y-auto" style={{ height: '380px', fontFamily: 'Share Tech Mono, monospace' }}>
              {history.map((entry, i) => {
                if (entry.type === 'empty') return <div key={i} className="h-3" />
                if (entry.type === 'system') {
                  return (
                    <div key={i} className="text-xs mb-1" style={{ color: '#444' }}>
                      # {entry.text}
                    </div>
                  )
                }
                if (entry.type === 'input') {
                  return (
                    <div key={i} className="text-xs mb-1" style={{ color: '#ccc' }}>
                      {entry.text}
                    </div>
                  )
                }
                return (
                  <div
                    key={i}
                    className="text-xs leading-loose"
                    style={{ color: entry.color || '#666', whiteSpace: 'pre' }}
                  >
                    {entry.text}
                  </div>
                )
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input line */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-t border-gray-border"
              style={{ background: '#040404' }}
            >
              <span className="text-xs shrink-0" style={{ color: '#ff0033' }}>
                sh4d0w@root:~$
              </span>
              <input
                ref={inputRef}
                className="terminal-input text-xs flex-1"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </div>
          </div>

          <div className="mt-3 text-xs text-center" style={{ color: '#333' }}>
            Click terminal and type commands. Try: help → whoami → flag
          </div>
        </motion.div>
      </div>
    </section>
  )
}
