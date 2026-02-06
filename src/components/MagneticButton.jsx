import { motion, useSpring, useMotionValue } from 'framer-motion'
import { useRef } from 'react'

const MagneticButton = ({ children, className = '', onClick, strength = 0.3 }) => {
  const ref = useRef(null)
  
  // Motion values for smooth animation
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Ultra smooth spring configuration
  const springConfig = { stiffness: 300, damping: 25, mass: 0.5 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    
    x.set(deltaX * strength)
    y.set(deltaY * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      className={`${className} will-change-transform`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: xSpring,
        y: ySpring,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: 'spring', 
        stiffness: 500, 
        damping: 25,
        mass: 0.5
      }}
    >
      {children}
    </motion.button>
  )
}

export default MagneticButton
