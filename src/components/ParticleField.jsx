import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ParticleField = ({ count = 500, color = '#6366f1', size = 0.02 }) => {
  const mesh = useRef()
  const light = useRef()
  
  // Generate random positions for particles
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 20
      temp.push({ time, factor, speed, x, y, z })
    }
    return temp
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Create particles geometry
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    
    const time = state.clock.elapsedTime
    
    particles.forEach((particle, i) => {
      const { factor, speed, x, y, z } = particle
      
      // Animate each particle
      const t = (particle.time += speed)
      
      dummy.position.set(
        x + Math.sin((t / 10) * factor) * 0.5,
        y + Math.cos((t / 10) * factor) * 0.5,
        z + Math.sin((t / 10) * factor) * 0.5
      )
      
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    
    mesh.current.instanceMatrix.needsUpdate = true
    
    // Rotate light around
    if (light.current) {
      light.current.position.x = Math.sin(time * 0.3) * 10
      light.current.position.z = Math.cos(time * 0.3) * 10
    }
  })

  return (
    <>
      <pointLight ref={light} distance={40} intensity={2} color={color} />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereGeometry args={[size, 8, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          roughness={0.5}
          metalness={0.5}
        />
      </instancedMesh>
    </>
  )
}

// Glowing particles with trails
const GlowingParticles = ({ count = 100 }) => {
  const points = useRef()
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      
      // Random colors between purple and pink
      colors[i * 3] = 0.4 + Math.random() * 0.4
      colors[i * 3 + 1] = 0.2 + Math.random() * 0.2
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2
    }
    
    return { positions, colors }
  }, [count])

  useFrame((state) => {
    if (!points.current) return
    
    const time = state.clock.elapsedTime
    const positions = points.current.geometry.attributes.position.array
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.002
      positions[i3] += Math.cos(time + i * 0.1) * 0.001
    }
    
    points.current.geometry.attributes.position.needsUpdate = true
    points.current.rotation.y = time * 0.02
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particlesPosition.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export { ParticleField, GlowingParticles }
export default ParticleField
