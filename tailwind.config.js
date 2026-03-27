/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-hack': '#ff0033',
        'red-dim': '#cc0029',
        'gray-panel': '#0a0a0a',
        'gray-border': '#1a1a1a',
        'gray-text': '#888888',
      },
      fontFamily: {
        'mono': ['"Share Tech Mono"', 'Courier New', 'monospace'],
        'display': ['"Orbitron"', 'monospace'],
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'blink': 'blink 1s step-end infinite',
        'flicker': 'flicker 0.15s infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        flicker: {
          '0%': { opacity: '0.97' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.98' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px #ff0033, 0 0 10px #ff003333' },
          '50%': { boxShadow: '0 0 15px #ff0033, 0 0 30px #ff003366' },
        }
      }
    },
  },
  plugins: [],
}
