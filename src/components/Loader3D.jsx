import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, Trail, Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

// Animated 3D Logo/Text
const Logo3D = ({ text = 'SSN', color = '#6366f1' }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Main text mesh - using simple geometry instead of Text3D for compatibility */}
        <mesh>
          <torusKnotGeometry args={[0.8, 0.3, 128, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        
        {/* Glow effect */}
        <mesh scale={1.1}>
          <torusKnotGeometry args={[0.8, 0.3, 64, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.1} />
        </mesh>
      </group>
    </Float>
  )
}

// Orbiting rings around logo
const OrbitingRings = () => {
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()

  useFrame((state) => {
    const time = state.clock.elapsedTime
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.5
      ring1Ref.current.rotation.y = time * 0.3
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = time * 0.3
      ring2Ref.current.rotation.z = time * 0.5
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = time * 0.4
      ring3Ref.current.rotation.z = time * 0.2
    }
  })

  return (
    <>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2, 0.02, 16, 64]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.5} transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.3, 0.015, 16, 64]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.6, 0.01, 16, 64]} />
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} transparent opacity={0.3} />
      </mesh>
    </>
  )
}

// Particle trail following a path
const TrailParticle = ({ startPosition, color }) => {
  const meshRef = useRef()
  const time = useRef(Math.random() * 100)

  useFrame((state, delta) => {
    time.current += delta
    if (meshRef.current) {
      const t = time.current
      meshRef.current.position.x = Math.sin(t) * 3
      meshRef.current.position.y = Math.cos(t * 0.7) * 2
      meshRef.current.position.z = Math.sin(t * 0.5) * 2
    }
  })

  return (
    <Trail
      width={0.2}
      length={8}
      color={color}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef} position={startPosition}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
    </Trail>
  )
}

// Loading progress ring
const LoadingRing = ({ progress = 0 }) => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime
    }
  })

  const segments = 64
  const filledSegments = Math.floor((progress / 100) * segments)

  return (
    <group ref={meshRef}>
      {/* Background ring */}
      <mesh>
        <torusGeometry args={[1.5, 0.08, 16, segments]} />
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.5} />
      </mesh>
      
      {/* Progress ring */}
      <mesh>
        <torusGeometry args={[1.5, 0.08, 16, filledSegments, Math.PI * 2 * (progress / 100)]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}

// Scene content
const LoaderScene = ({ progress }) => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#6366f1" />
      
      {/* Stars */}
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      
      {/* Main logo */}
      <Logo3D />
      
      {/* Orbiting rings */}
      <OrbitingRings />
      
      {/* Trail particles */}
      <TrailParticle startPosition={[2, 0, 0]} color="#6366f1" />
      <TrailParticle startPosition={[-2, 0, 0]} color="#ec4899" />
      <TrailParticle startPosition={[0, 2, 0]} color="#8b5cf6" />
      
      {/* Loading ring */}
      <group position={[0, -2.5, 0]}>
        <LoadingRing progress={progress} />
      </group>
    </>
  )
}

// Main component
const Loader3D = ({ progress = 0, className = '' }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <LoaderScene progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Loader3D
