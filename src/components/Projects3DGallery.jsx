import { useRef, Suspense, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, useTexture, RoundedBox, Text3D, Center } from '@react-three/drei'
import * as THREE from 'three'

// 3D Project Card
const ProjectCard3D = ({ project, index, onClick, isHovered, setHovered }) => {
  const meshRef = useRef()
  const { viewport } = useThree()
  
  // Calculate position in a grid
  const col = index % 3
  const row = Math.floor(index / 3)
  const spacing = 3.5
  const offsetX = (col - 1) * spacing
  const offsetY = -row * 4

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime
      
      // Hover animation
      if (isHovered) {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          Math.sin(time) * 0.1,
          0.1
        )
        meshRef.current.position.z = THREE.MathUtils.lerp(
          meshRef.current.position.z,
          1,
          0.1
        )
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          0,
          0.1
        )
        meshRef.current.position.z = THREE.MathUtils.lerp(
          meshRef.current.position.z,
          0,
          0.1
        )
      }
      
      // Subtle floating
      meshRef.current.position.y = offsetY + Math.sin(time + index) * 0.1
    }
  })

  return (
    <group position={[offsetX, offsetY, 0]}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <RoundedBox
          ref={meshRef}
          args={[3, 2.2, 0.2]}
          radius={0.1}
          smoothness={4}
          onPointerOver={() => setHovered(index)}
          onPointerOut={() => setHovered(null)}
          onClick={() => onClick(project)}
        >
          <meshStandardMaterial
            color={project.color}
            roughness={0.2}
            metalness={0.8}
            emissive={project.color}
            emissiveIntensity={isHovered ? 0.3 : 0.1}
          />
        </RoundedBox>
        
        {/* Emoji */}
        <Center position={[0, 0.2, 0.15]}>
          <mesh>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        </Center>
        
        {/* Glow effect when hovered */}
        {isHovered && (
          <mesh position={[0, 0, -0.2]}>
            <planeGeometry args={[3.5, 2.7]} />
            <meshBasicMaterial
              color={project.color}
              transparent
              opacity={0.3}
            />
          </mesh>
        )}
      </Float>
    </group>
  )
}

// Scene with all project cards
const ProjectsScene = ({ projects, onSelectProject }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation based on mouse
      const mouseX = state.mouse.x * 0.1
      const mouseY = state.mouse.y * 0.05
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseX,
        0.05
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mouseY,
        0.05
      )
    }
  })

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      {projects.slice(0, 6).map((project, index) => (
        <ProjectCard3D
          key={project.id}
          project={project}
          index={index}
          onClick={onSelectProject}
          isHovered={hoveredIndex === index}
          setHovered={setHoveredIndex}
        />
      ))}
    </group>
  )
}

// Main component
const Projects3DGallery = ({ projects, onSelectProject, className = '' }) => {
  return (
    <div className={`w-full h-[600px] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.3} color="#6366f1" />
          <pointLight position={[5, -5, 5]} intensity={0.3} color="#ec4899" />
          
          {/* Projects */}
          <ProjectsScene 
            projects={projects} 
            onSelectProject={onSelectProject} 
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Projects3DGallery
