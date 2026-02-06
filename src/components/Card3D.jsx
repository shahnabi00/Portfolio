import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

const Card3D = ({ children, className = '', intensity = 15 }) => {
  const ref = useRef(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Ultra smooth spring configuration
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const mouseXSpring = useSpring(x, springConfig)
  const mouseYSpring = useSpring(y, springConfig)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`])
  
  // Add subtle scale and glow based on hover position
  const scale = useTransform(
    [mouseXSpring, mouseYSpring],
    ([latestX, latestY]) => {
      const distance = Math.sqrt(latestX * latestX + latestY * latestY)
      return 1 + distance * 0.05
    }
  )

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        scale,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        willChange: 'transform',
      }}
      className={`relative transition-shadow duration-500 ${className}`}
    >
      <div
        style={{
          transform: 'translateZ(50px)',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
      {/* Subtle reflection/shine effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          background: useTransform(
            [mouseXSpring, mouseYSpring],
            ([latestX, latestY]) => 
              `radial-gradient(circle at ${50 + latestX * 100}% ${50 + latestY * 100}%, rgba(255,255,255,0.15) 0%, transparent 50%)`
          ),
          opacity: 0.8,
        }}
      />
    </motion.div>
  )
}

export default Card3D
