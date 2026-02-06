import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Floating Icosahedron with distortion
const FloatingIcosahedron = ({ position, color, speed = 1, distort = 0.3 }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

// Floating Torus Knot
const FloatingTorusKnot = ({ position, color, speed = 1 }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1 * speed
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        <torusKnotGeometry args={[0.8, 0.25, 128, 16]} />
        <MeshWobbleMaterial
          color={color}
          attach="material"
          factor={0.3}
          speed={1}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  )
}

// Floating Octahedron
const FloatingOctahedron = ({ position, color, speed = 1 }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25 * speed
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.15 * speed
    }
  })

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  )
}

// Wireframe Sphere
const WireframeSphere = ({ position, color, scale = 1 }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
    </mesh>
  )
}

// Main component combining all shapes
const FloatingGeometry = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />
      <pointLight position={[10, -10, 5]} intensity={0.5} color="#8b5cf6" />
      
      {/* Main Shapes */}
      <FloatingIcosahedron position={[-3, 1, -2]} color="#6366f1" speed={0.8} distort={0.4} />
      <FloatingTorusKnot position={[3, -1, -3]} color="#8b5cf6" speed={0.6} />
      <FloatingOctahedron position={[0, 2, -4]} color="#a855f7" speed={1} />
      <FloatingOctahedron position={[-2, -2, -3]} color="#6366f1" speed={0.7} />
      <FloatingIcosahedron position={[2.5, 1.5, -2]} color="#ec4899" speed={0.9} distort={0.3} />
      
      {/* Background wireframe */}
      <WireframeSphere position={[0, 0, -8]} color="#6366f1" scale={3} />
    </>
  )
}

export default FloatingGeometry
