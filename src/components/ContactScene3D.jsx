import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, ContactShadows, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Floating envelope
const FloatingEnvelope = () => {
  const groupRef = useRef()
  const { mouse } = useThree()

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      
      // Follow mouse
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.3,
        0.05
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouse.y * 0.2,
        0.05
      )
      
      // Floating animation
      groupRef.current.position.y = Math.sin(time) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Envelope body */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh>
          <boxGeometry args={[2, 1.3, 0.1]} />
          <meshStandardMaterial
            color="#6366f1"
            roughness={0.2}
            metalness={0.8}
            emissive="#6366f1"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Envelope flap */}
        <mesh position={[0, 0.65, 0.05]} rotation={[Math.PI / 6, 0, 0]}>
          <boxGeometry args={[2, 0.8, 0.05]} />
          <meshStandardMaterial
            color="#8b5cf6"
            roughness={0.2}
            metalness={0.8}
            emissive="#8b5cf6"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* @ symbol - represented as a torus */}
        <mesh position={[0, 0, 0.1]}>
          <torusGeometry args={[0.25, 0.08, 16, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
      
      {/* Orbiting particles */}
      <OrbitingParticles />
    </group>
  )
}

// Orbiting particles around envelope
const OrbitingParticles = () => {
  const groupRef = useRef()
  const particleCount = 20

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: particleCount }).map((_, i) => {
        const angle = (i / particleCount) * Math.PI * 2
        const radius = 1.5 + Math.random() * 0.5
        const y = (Math.random() - 0.5) * 1
        
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              y,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#6366f1' : '#ec4899'}
              emissive={i % 2 === 0 ? '#6366f1' : '#ec4899'}
              emissiveIntensity={0.5}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Animated background sphere
const BackgroundSphere = () => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Sphere ref={meshRef} args={[3, 64, 64]} position={[0, 0, -3]}>
      <MeshDistortMaterial
        color="#1a1a2e"
        attach="material"
        distort={0.3}
        speed={1}
        roughness={0.8}
        wireframe
        transparent
        opacity={0.1}
      />
    </Sphere>
  )
}

// Main component
const ContactScene3D = ({ className = '' }) => {
  return (
    <div className={`w-full h-full min-h-[400px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, 0, 5]} intensity={0.5} color="#6366f1" />
          <pointLight position={[5, 0, -5]} intensity={0.5} color="#ec4899" />
          
          {/* Main content */}
          <FloatingEnvelope />
          <BackgroundSphere />
          
          {/* Shadow */}
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.3}
            scale={5}
            blur={2}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ContactScene3D
