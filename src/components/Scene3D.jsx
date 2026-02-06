import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

// Wrapper component for Three.js canvas
const Scene3D = ({ children, className = '', camera = { position: [0, 0, 5], fov: 75 } }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={camera}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene3D
