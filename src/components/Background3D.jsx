import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef()
  const count = 3000

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.02
    ref.current.rotation.y = state.clock.elapsedTime * 0.01
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ff0033"
        size={0.015}
        sizeAttenuation
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  )
}

function WireframeSphere({ mousePos }) {
  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    meshRef.current.rotation.x = t * 0.1
    meshRef.current.rotation.y = t * 0.15
    // Mouse parallax
    meshRef.current.position.x = mousePos.current.x * 0.8
    meshRef.current.position.y = -mousePos.current.y * 0.8
  })

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.8, 3]} />
      <meshBasicMaterial
        color="#ff0033"
        wireframe
        opacity={0.12}
        transparent
      />
    </mesh>
  )
}

function GridPlane() {
  const ref = useRef()
  useFrame((state) => {
    ref.current.position.z = (state.clock.elapsedTime * 0.3) % 2
  })

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const vertices = []
    const size = 20
    const divisions = 20

    for (let i = -divisions; i <= divisions; i++) {
      const x = (i / divisions) * size
      vertices.push(x, -3, -size)
      vertices.push(x, -3, size)
      vertices.push(-size, -3, x)
      vertices.push(size, -3, x)
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geo
  }, [])

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#ff0033" opacity={0.06} transparent />
    </lineSegments>
  )
}

function MovingLines() {
  const group = useRef()

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const vertices = []
    for (let i = 0; i < 40; i++) {
      const x = (Math.random() - 0.5) * 15
      const y = (Math.random() - 0.5) * 10
      const z = -Math.random() * 5
      vertices.push(x, y, z, x + Math.random() * 2 - 1, y + Math.random() * 2 - 1, z)
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geo
  }, [])

  useFrame((state) => {
    group.current.rotation.y = state.clock.elapsedTime * 0.03
  })

  return (
    <group ref={group}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="#ff0033" opacity={0.08} transparent />
      </lineSegments>
    </group>
  )
}

function SceneSetup({ mousePos }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} color="#ff0033" intensity={2} distance={10} />
      <ParticleField />
      <WireframeSphere mousePos={mousePos} />
      <GridPlane />
      <MovingLines />
    </>
  )
}

export default function Background3D({ mousePos }) {
  return (
    <div className="fixed inset-0 z-0" style={{ background: '#000' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneSetup mousePos={mousePos} />
      </Canvas>
    </div>
  )
}
