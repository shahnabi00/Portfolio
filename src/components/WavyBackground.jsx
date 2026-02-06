import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const WavyBackground = ({ 
  segments = 100, 
  color1 = '#6366f1', 
  color2 = '#8b5cf6',
  wireframe = false,
  amplitude = 0.5,
  speed = 1
}) => {
  const meshRef = useRef()
  
  // Create gradient colors for vertices
  const colors = useMemo(() => {
    const count = (segments + 1) * (segments + 1)
    const colors = new Float32Array(count * 3)
    const c1 = new THREE.Color(color1)
    const c2 = new THREE.Color(color2)
    
    for (let i = 0; i < count; i++) {
      const t = i / count
      const color = c1.clone().lerp(c2, t)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    
    return colors
  }, [segments, color1, color2])

  useFrame((state) => {
    if (!meshRef.current) return
    
    const time = state.clock.elapsedTime * speed
    const geometry = meshRef.current.geometry
    const position = geometry.attributes.position
    
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i)
      const y = position.getY(i)
      
      // Create wave effect
      const z = Math.sin(x * 0.5 + time) * amplitude + 
                Math.cos(y * 0.5 + time * 0.8) * amplitude * 0.5 +
                Math.sin((x + y) * 0.3 + time * 0.5) * amplitude * 0.3
      
      position.setZ(i, z)
    }
    
    position.needsUpdate = true
    geometry.computeVertexNormals()
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, -5]}>
      <planeGeometry args={[30, 30, segments, segments]}>
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </planeGeometry>
      <meshStandardMaterial
        vertexColors
        side={THREE.DoubleSide}
        wireframe={wireframe}
        transparent
        opacity={wireframe ? 0.3 : 0.6}
        roughness={0.4}
        metalness={0.6}
      />
    </mesh>
  )
}

// Animated ring
const AnimatedRing = ({ radius = 3, color = '#6366f1', thickness = 0.05 }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[radius, thickness, 16, 100]} />
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

// Multiple animated rings
const AnimatedRings = () => {
  return (
    <group>
      <AnimatedRing radius={2} color="#6366f1" thickness={0.03} />
      <AnimatedRing radius={2.5} color="#8b5cf6" thickness={0.02} />
      <AnimatedRing radius={3} color="#a855f7" thickness={0.02} />
    </group>
  )
}

export { WavyBackground, AnimatedRing, AnimatedRings }
export default WavyBackground
