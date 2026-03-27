import { useEffect, useRef, useState } from 'react'
import Background3D from './components/Background3D'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SystemProfile from './components/SystemProfile'
import Team from './components/Team'
import MissionLog from './components/MissionLog'
import Terminal from './components/Terminal'
import Writeups from './components/Writeups'
import Recruit from './components/Recruit'
import Footer from './components/Footer'

export default function App() {
  const mousePos = useRef({ x: 0, y: 0 })
  const dotRef = useRef()
  const ringRef = useRef()

  useEffect(() => {
    const move = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      mousePos.current = { x: nx, y: ny }

      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX + 'px'
        ringRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div className="relative min-h-screen bg-black scanlines grid-bg">
      {/* Custom cursor */}
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />

      {/* 3D Background */}
      <Background3D mousePos={mousePos} />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <SystemProfile />
        <Team />
        <MissionLog />
        <Terminal />
        <Writeups />
        <Recruit />
        <Footer />
      </div>
    </div>
  )
}
