import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, ContactShadows, Environment } from '@react-three/drei'
import * as THREE from 'three'

// Geometric Robot Component
const Robot = ({ isTyping, hasMatched, mousePosition }) => {
  const groupRef = useRef()
  const headRef = useRef()
  const leftEyeRef = useRef()
  const rightEyeRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const antennaRef = useRef()
  
  // Animation state
  const animationState = useRef({
    jumpProgress: 0,
    isJumping: false,
    idleTime: 0,
    blinkTimer: 0,
    isBlinking: false
  })

  // Colors
  const colors = useMemo(() => ({
    body: '#1a1a2e',
    accent: '#00F5FF',
    secondary: '#8A2BE2',
    dark: '#0d0d1a',
    glow: '#00F5FF'
  }), [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    const anim = animationState.current
    anim.idleTime += delta
    
    // Idle breathing animation
    const breathe = Math.sin(anim.idleTime * 2) * 0.02
    groupRef.current.position.y = breathe
    
    // Head follows mouse subtly
    if (headRef.current) {
      const targetRotationY = (mousePosition.x - 0.5) * 0.5
      const targetRotationX = (mousePosition.y - 0.5) * 0.3
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotationY, 0.05)
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetRotationX, 0.05)
    }
    
    // Eye glow pulsing
    if (leftEyeRef.current && rightEyeRef.current) {
      const glowIntensity = isTyping 
        ? 3 + Math.sin(anim.idleTime * 10) * 1 // Fast pulse when typing
        : 2 + Math.sin(anim.idleTime * 2) * 0.5 // Slow pulse idle
      
      leftEyeRef.current.material.emissiveIntensity = glowIntensity
      rightEyeRef.current.material.emissiveIntensity = glowIntensity
      
      // Eye scale (surprised when typing)
      const eyeScale = isTyping ? 1.2 : 1
      leftEyeRef.current.scale.setScalar(THREE.MathUtils.lerp(leftEyeRef.current.scale.x, eyeScale, 0.1))
      rightEyeRef.current.scale.setScalar(THREE.MathUtils.lerp(rightEyeRef.current.scale.x, eyeScale, 0.1))
    }
    
    // Arm animations
    if (leftArmRef.current && rightArmRef.current) {
      if (isTyping) {
        // Typing animation - arms move like typing
        leftArmRef.current.rotation.x = Math.sin(anim.idleTime * 15) * 0.3 - 0.5
        rightArmRef.current.rotation.x = Math.sin(anim.idleTime * 15 + Math.PI) * 0.3 - 0.5
      } else {
        // Idle arm sway
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, Math.sin(anim.idleTime * 1.5) * 0.1, 0.05)
        rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, Math.sin(anim.idleTime * 1.5 + 1) * 0.1, 0.05)
      }
    }
    
    // Antenna wobble
    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(anim.idleTime * 3) * 0.1
      antennaRef.current.rotation.x = Math.cos(anim.idleTime * 2) * 0.1
    }
    
    // Jump animation when matched
    if (hasMatched && !anim.isJumping) {
      anim.isJumping = true
      anim.jumpProgress = 0
    }
    
    if (anim.isJumping) {
      anim.jumpProgress += delta * 3
      
      // Jump arc
      const jumpHeight = Math.sin(anim.jumpProgress * Math.PI) * 0.5
      groupRef.current.position.y = jumpHeight + breathe
      
      // Spin during jump
      groupRef.current.rotation.y = anim.jumpProgress * Math.PI * 2
      
      // Arms up during jump
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.z = -Math.sin(anim.jumpProgress * Math.PI) * 1
        rightArmRef.current.rotation.z = Math.sin(anim.jumpProgress * Math.PI) * 1
      }
      
      if (anim.jumpProgress >= 1) {
        anim.isJumping = false
        groupRef.current.rotation.y = 0
        if (leftArmRef.current) leftArmRef.current.rotation.z = 0
        if (rightArmRef.current) rightArmRef.current.rotation.z = 0
      }
    }
  })

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.8, 1, 0.5]} />
        <meshStandardMaterial 
          color={colors.body} 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Body accent lines */}
      <mesh position={[0, 0, 0.26]}>
        <boxGeometry args={[0.6, 0.05, 0.01]} />
        <meshStandardMaterial 
          color={colors.accent} 
          emissive={colors.accent}
          emissiveIntensity={1}
        />
      </mesh>
      <mesh position={[0, -0.15, 0.26]}>
        <boxGeometry args={[0.4, 0.03, 0.01]} />
        <meshStandardMaterial 
          color={colors.secondary} 
          emissive={colors.secondary}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Chest light */}
      <mesh position={[0, 0.2, 0.26]}>
        <circleGeometry args={[0.1, 32]} />
        <meshStandardMaterial 
          color={hasMatched ? '#22c55e' : colors.accent} 
          emissive={hasMatched ? '#22c55e' : colors.accent}
          emissiveIntensity={hasMatched ? 3 : 1.5}
        />
      </mesh>
      
      {/* Head */}
      <group ref={headRef} position={[0, 0.85, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.5, 0.4]} />
          <meshStandardMaterial 
            color={colors.body} 
            metalness={0.8} 
            roughness={0.2}
          />
        </mesh>
        
        {/* Face plate */}
        <mesh position={[0, 0, 0.21]}>
          <boxGeometry args={[0.5, 0.4, 0.02]} />
          <meshStandardMaterial 
            color={colors.dark} 
            metalness={0.9} 
            roughness={0.1}
          />
        </mesh>
        
        {/* Left Eye */}
        <mesh ref={leftEyeRef} position={[-0.12, 0.05, 0.23]}>
          <circleGeometry args={[0.08, 32]} />
          <meshStandardMaterial 
            color={colors.accent} 
            emissive={colors.accent}
            emissiveIntensity={2}
          />
        </mesh>
        
        {/* Right Eye */}
        <mesh ref={rightEyeRef} position={[0.12, 0.05, 0.23]}>
          <circleGeometry args={[0.08, 32]} />
          <meshStandardMaterial 
            color={colors.accent} 
            emissive={colors.accent}
            emissiveIntensity={2}
          />
        </mesh>
        
        {/* Mouth - changes with state */}
        <mesh position={[0, -0.12, 0.23]}>
          <boxGeometry args={[hasMatched ? 0.2 : 0.15, 0.03, 0.01]} />
          <meshStandardMaterial 
            color={hasMatched ? '#22c55e' : colors.secondary} 
            emissive={hasMatched ? '#22c55e' : colors.secondary}
            emissiveIntensity={hasMatched ? 2 : 1}
          />
        </mesh>
        
        {/* Antenna */}
        <group ref={antennaRef} position={[0, 0.35, 0]}>
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 0.2]} />
            <meshStandardMaterial color={colors.body} metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.15, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial 
              color={isTyping ? colors.secondary : colors.accent} 
              emissive={isTyping ? colors.secondary : colors.accent}
              emissiveIntensity={isTyping ? 3 : 1.5}
            />
          </mesh>
        </group>
        
        {/* Ear pieces */}
        <mesh position={[-0.32, 0, 0]}>
          <boxGeometry args={[0.05, 0.2, 0.15]} />
          <meshStandardMaterial color={colors.accent} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.32, 0, 0]}>
          <boxGeometry args={[0.05, 0.2, 0.15]} />
          <meshStandardMaterial color={colors.accent} metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      
      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.55, 0.1, 0]}>
        <mesh position={[0, -0.25, 0]} castShadow>
          <boxGeometry args={[0.15, 0.5, 0.15]} />
          <meshStandardMaterial color={colors.body} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.55, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={colors.accent} metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      
      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.55, 0.1, 0]}>
        <mesh position={[0, -0.25, 0]} castShadow>
          <boxGeometry args={[0.15, 0.5, 0.15]} />
          <meshStandardMaterial color={colors.body} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.55, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={colors.accent} metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      
      {/* Legs */}
      <mesh position={[-0.2, -0.7, 0]} castShadow>
        <boxGeometry args={[0.2, 0.4, 0.2]} />
        <meshStandardMaterial color={colors.body} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.2, -0.7, 0]} castShadow>
        <boxGeometry args={[0.2, 0.4, 0.2]} />
        <meshStandardMaterial color={colors.body} metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Feet */}
      <mesh position={[-0.2, -0.95, 0.05]}>
        <boxGeometry args={[0.22, 0.1, 0.3]} />
        <meshStandardMaterial color={colors.accent} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.2, -0.95, 0.05]}>
        <boxGeometry args={[0.22, 0.1, 0.3]} />
        <meshStandardMaterial color={colors.accent} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

// Main Component with Canvas
const AssistantRobot = ({ isTyping = false, hasMatched = false }) => {
  const mousePosition = useRef({ x: 0.5, y: 0.5 })
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mousePosition.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    }
  }

  return (
    <div 
      className="w-full h-full"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        shadows
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-3, 2, 2]} intensity={0.5} color="#00F5FF" />
        <pointLight position={[3, 2, 2]} intensity={0.5} color="#8A2BE2" />
        
        {/* Robot */}
        <Float
          speed={2}
          rotationIntensity={0.2}
          floatIntensity={0.3}
          floatingRange={[-0.05, 0.05]}
        >
          <Robot 
            isTyping={isTyping} 
            hasMatched={hasMatched}
            mousePosition={mousePosition.current}
          />
        </Float>
        
        {/* Ground shadow */}
        <ContactShadows
          position={[0, -1.1, 0]}
          opacity={0.6}
          scale={3}
          blur={2}
          far={2}
          color="#00F5FF"
        />
        
        {/* Environment for reflections */}
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}

export default AssistantRobot
