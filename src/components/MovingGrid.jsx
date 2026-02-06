import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

const MovingGrid = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 50, stiffness: 100 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)
  
  const gridX = useTransform(smoothX, [0, window.innerWidth], [-20, 20])
  const gridY = useTransform(smoothY, [0, window.innerHeight], [-20, 20])

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* True Black Background */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Moving Grid */}
      <motion.div 
        className="absolute inset-0"
        style={{
          x: gridX,
          y: gridY,
        }}
      >
        {/* Main Grid */}
        <div 
          className="absolute inset-[-50px] opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 245, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 245, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Secondary Smaller Grid */}
        <div 
          className="absolute inset-[-50px] opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(138, 43, 226, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(138, 43, 226, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
        />
      </motion.div>

      {/* Subtle Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Radial Gradient Overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%)`,
        }}
      />

      {/* Subtle glow orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, #00F5FF 0%, transparent 70%)',
          left: '10%',
          top: '20%',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, #8A2BE2 0%, transparent 70%)',
          right: '10%',
          bottom: '20%',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export default MovingGrid
