import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'

const FloatingCards = ({ children, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative"
      >
        {/* Floating Glow */}
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-3xl blur-2xl"
          animate={{
            opacity: isHovered ? 0.6 : 0.2,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Card Content */}
        <div className="relative glass-premium rounded-2xl overflow-hidden">
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent)',
              }}
              animate={{
                x: isHovered ? ['0%', '200%'] : '0%',
              }}
              transition={{
                duration: 1.5,
                repeat: isHovered ? Infinity : 0,
                ease: 'linear',
              }}
            />
          </div>
          
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FloatingCards
