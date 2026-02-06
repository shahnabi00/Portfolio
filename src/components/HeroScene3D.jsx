import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Float, 
  MeshDistortMaterial, 
  Sphere, 
  Stars,
  Environment,
  PerformanceMonitor
} from '@react-three/drei'
import * as THREE from 'three'
import { ParticleField, GlowingParticles } from './ParticleField'

// Main animated sphere
const AnimatedSphere = () => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={[2.5, 0, 0]}>
        <MeshDistortMaterial
          color="#6366f1"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

// Floating torus
const FloatingTorus = ({ position, color, size = 1 }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[size, size * 0.3, 16, 100]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  )
}

// Rotating octahedron
const RotatingOctahedron = ({ position, color, size = 0.5 }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={3} rotationIntensity={1} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>
    </Float>
  )
}

// Mouse follow light
const MouseLight = () => {
  const lightRef = useRef()
  const { viewport, mouse } = useThree()
  
  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = (mouse.x * viewport.width) / 2
      lightRef.current.position.y = (mouse.y * viewport.height) / 2
    }
  })

  return (
    <pointLight
      ref={lightRef}
      color="#8b5cf6"
      intensity={2}
      distance={10}
      position={[0, 0, 3]}
    />
  )
}

// Scene content
const SceneContent = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <MouseLight />
      
      {/* Stars background */}
      <Stars
        radius={50}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      
      {/* Main shapes */}
      <AnimatedSphere />
      <FloatingTorus position={[-3, 1, -2]} color="#8b5cf6" size={0.8} />
      <FloatingTorus position={[3, -1.5, -3]} color="#ec4899" size={0.6} />
      <RotatingOctahedron position={[-2, -1, -1]} color="#6366f1" size={0.6} />
      <RotatingOctahedron position={[1, 2, -2]} color="#a855f7" size={0.4} />
      <RotatingOctahedron position={[-1, 1.5, -3]} color="#ec4899" size={0.5} />
      
      {/* Particles */}
      <GlowingParticles count={150} />
    </>
  )
}

// Main component
const HeroScene3D = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          <PerformanceMonitor>
            <SceneContent />
          </PerformanceMonitor>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default HeroScene3D
