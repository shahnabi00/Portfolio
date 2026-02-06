import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  Float, 
  MeshDistortMaterial,
  MeshWobbleMaterial,
  RoundedBox,
  Environment,
  ContactShadows
} from '@react-three/drei'
import * as THREE from 'three'

// Stylized 3D Avatar representation
const AvatarModel = () => {
  const groupRef = useRef()
  const headRef = useRef()
  const { mouse } = useThree()
  
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
    if (headRef.current) {
      // Follow mouse slightly
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        mouse.x * 0.3,
        0.05
      )
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -mouse.y * 0.2,
        0.05
      )
    }
  })

  return (
    <group ref={groupRef}>
      {/* Head */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <group ref={headRef} position={[0, 0.8, 0]}>
          {/* Main head shape */}
          <mesh>
            <sphereGeometry args={[0.8, 32, 32]} />
            <MeshDistortMaterial
              color="#6366f1"
              attach="material"
              distort={0.2}
              speed={1.5}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          
          {/* Eyes */}
          <mesh position={[-0.25, 0.1, 0.65]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0.25, 0.1, 0.65]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
          </mesh>
          
          {/* Pupils */}
          <mesh position={[-0.25, 0.1, 0.75]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
          <mesh position={[0.25, 0.1, 0.75]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#1a1a2e" />
          </mesh>
          
          {/* Glasses */}
          <mesh position={[0, 0.1, 0.7]}>
            <torusGeometry args={[0.35, 0.02, 8, 32]} />
            <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      </Float>
      
      {/* Body */}
      <mesh position={[0, -0.5, 0]}>
        <capsuleGeometry args={[0.5, 0.8, 8, 16]} />
        <MeshWobbleMaterial
          color="#8b5cf6"
          attach="material"
          factor={0.1}
          speed={1}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      
      {/* Floating code symbols around */}
      <CodeSymbols />
      
      {/* Orbiting rings */}
      <OrbitingRing radius={1.5} color="#6366f1" speed={1} />
      <OrbitingRing radius={1.8} color="#8b5cf6" speed={-0.7} tilt={Math.PI / 4} />
    </group>
  )
}

// Floating code symbols
const CodeSymbols = () => {
  const symbols = ['</', '/>', '{ }', '( )', '[ ]', '< >']
  
  return (
    <group>
      {symbols.map((symbol, i) => (
        <FloatingSymbol 
          key={i} 
          symbol={symbol} 
          index={i} 
          total={symbols.length}
        />
      ))}
    </group>
  )
}

const FloatingSymbol = ({ symbol, index, total }) => {
  const meshRef = useRef()
  const angle = (index / total) * Math.PI * 2
  const radius = 2
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      meshRef.current.position.x = Math.cos(angle + time * 0.3) * radius
      meshRef.current.position.z = Math.sin(angle + time * 0.3) * radius
      meshRef.current.position.y = Math.sin(time + index) * 0.3
      meshRef.current.rotation.y = -angle - time * 0.3 + Math.PI
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef}>
        <RoundedBox args={[0.4, 0.3, 0.05]} radius={0.02}>
          <meshStandardMaterial
            color="#1a1a2e"
            emissive="#6366f1"
            emissiveIntensity={0.2}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
      </group>
    </Float>
  )
}

// Orbiting ring
const OrbitingRing = ({ radius, color, speed, tilt = 0 }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * speed
    }
  })

  return (
    <mesh ref={meshRef} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.01, 8, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

// Main component
const Avatar3D = ({ className = '' }) => {
  return (
    <div className={`w-full h-full min-h-[400px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.3} color="#8b5cf6" />
          <pointLight position={[5, -5, 5]} intensity={0.3} color="#ec4899" />
          
          {/* Avatar */}
          <AvatarModel />
          
          {/* Contact shadow */}
          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.4}
            scale={5}
            blur={2}
            far={4}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Avatar3D
