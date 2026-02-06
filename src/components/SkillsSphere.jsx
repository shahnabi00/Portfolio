import { useRef, useMemo, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, Float, Html } from '@react-three/drei'
import * as THREE from 'three'

// Individual skill orb
const SkillOrb = ({ position, skill, color, index, totalSkills }) => {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  const angle = (index / totalSkills) * Math.PI * 2
  const radius = 3
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      
      // Orbit around center
      meshRef.current.position.x = Math.cos(angle + time * 0.3) * radius
      meshRef.current.position.z = Math.sin(angle + time * 0.3) * radius
      meshRef.current.position.y = Math.sin(time * 0.5 + index) * 0.5
      
      // Pulse effect
      const scale = hovered ? 1.3 : 1 + Math.sin(time * 2 + index) * 0.1
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          roughness={0.2}
          metalness={0.8}
        />
        {hovered && (
          <Html center distanceFactor={10}>
            <div className="bg-dark/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10 whitespace-nowrap">
              <span className="text-white text-sm font-medium">{skill.name}</span>
              <div className="w-full bg-white/20 rounded-full h-1 mt-1">
                <div 
                  className="h-1 rounded-full" 
                  style={{ width: `${skill.level}%`, backgroundColor: color }}
                />
              </div>
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  )
}

// Central glowing core
const CentralCore = () => {
  const meshRef = useRef()
  const glowRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
    }
  })

  return (
    <group>
      {/* Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>
      
      {/* Glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  )
}

// Connecting lines
const ConnectionLines = ({ skills }) => {
  const linesRef = useRef()
  
  const points = useMemo(() => {
    const pts = []
    skills.forEach((_, i) => {
      const angle = (i / skills.length) * Math.PI * 2
      pts.push(new THREE.Vector3(0, 0, 0))
      pts.push(new THREE.Vector3(
        Math.cos(angle) * 3,
        0,
        Math.sin(angle) * 3
      ))
    })
    return pts
  }, [skills])

  useFrame((state) => {
    if (linesRef.current) {
      const positions = linesRef.current.geometry.attributes.position.array
      const time = state.clock.elapsedTime
      
      skills.forEach((_, i) => {
        const angle = (i / skills.length) * Math.PI * 2 + time * 0.3
        const idx = i * 6 + 3 // Skip the center point
        positions[idx] = Math.cos(angle) * 3
        positions[idx + 1] = Math.sin(time * 0.5 + i) * 0.5
        positions[idx + 2] = Math.sin(angle) * 3
      })
      
      linesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.3} />
    </lineSegments>
  )
}

// Main Skills Sphere component
const SkillsSphere = ({ skills = [] }) => {
  const groupRef = useRef()
  
  const defaultSkills = [
    { name: 'React', level: 95, color: '#61DAFB' },
    { name: 'JavaScript', level: 90, color: '#F7DF1E' },
    { name: 'TypeScript', level: 85, color: '#3178C6' },
    { name: 'Node.js', level: 88, color: '#339933' },
    { name: 'Python', level: 80, color: '#3776AB' },
    { name: 'CSS/Tailwind', level: 90, color: '#06B6D4' },
    { name: 'Three.js', level: 75, color: '#000000' },
    { name: 'GraphQL', level: 78, color: '#E535AB' },
  ]
  
  const displaySkills = skills.length > 0 ? skills : defaultSkills

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
      
      {/* Central core */}
      <CentralCore />
      
      {/* Connection lines */}
      <ConnectionLines skills={displaySkills} />
      
      {/* Skill orbs */}
      {displaySkills.map((skill, index) => (
        <SkillOrb
          key={skill.name}
          skill={skill}
          color={skill.color}
          index={index}
          totalSkills={displaySkills.length}
        />
      ))}
    </group>
  )
}

export default SkillsSphere
