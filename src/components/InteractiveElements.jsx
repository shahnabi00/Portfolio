import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'

// Magnetic wrapper that pulls elements toward cursor
const Magnetic = ({ children, strength = 0.5, className = '' }) => {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 20, stiffness: 300 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    
    x.set(deltaX)
    y.set(deltaY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

// Tilt card with 3D perspective
const TiltCard = ({ 
  children, 
  className = '', 
  tiltAmount = 15,
  glareEnabled = true,
  glareColor = 'rgba(255, 255, 255, 0.2)',
  scale = 1.02,
}) => {
  const ref = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)
  
  const springConfig = { damping: 20, stiffness: 300 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    
    rotateX.set((0.5 - y) * tiltAmount)
    rotateY.set((x - 0.5) * tiltAmount)
    glareX.set(x * 100)
    glareY.set(y * 100)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{ scale: isHovered ? scale : 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
        
        {/* Glare effect */}
        {glareEnabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-inherit overflow-hidden"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([x, y]) => 
                  `radial-gradient(circle at ${x}% ${y}%, ${glareColor} 0%, transparent 50%)`
              ),
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ opacity: { duration: 0.3 } }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

// Hover card with floating effect
const FloatingCard = ({ children, className = '', floatAmount = 20 }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: isHovered ? -floatAmount : 0,
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(99, 102, 241, 0.25)'
          : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    >
      {children}
    </motion.div>
  )
}

// Button with ripple effect
const RippleButton = ({ children, className = '', onClick }) => {
  const [ripples, setRipples] = useState([])

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = {
      x,
      y,
      id: Date.now(),
    }
    
    setRipples([...ripples, newRipple])
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)
    
    onClick?.(e)
  }

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
            animate={{ 
              width: 500, 
              height: 500, 
              x: -250, 
              y: -250, 
              opacity: 0 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  )
}

// Shine effect on hover
const ShineCard = ({ children, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false)
  const shineX = useMotionValue(-100)

  useEffect(() => {
    if (isHovered) {
      shineX.set(-100)
      const timeout = setTimeout(() => shineX.set(200), 0)
      return () => clearTimeout(timeout)
    }
  }, [isHovered, shineX])

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          x: shineX.get() + '%',
        }}
        animate={{ x: isHovered ? '200%' : '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}

// Gradient border animation
const GradientBorder = ({ children, className = '', borderWidth = 2 }) => {
  return (
    <div className={`relative p-[${borderWidth}px] rounded-inherit ${className}`}>
      <div className="absolute inset-0 rounded-inherit bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient" />
      <div className="relative bg-dark rounded-inherit">
        {children}
      </div>
    </div>
  )
}

// Underline animation on hover
const AnimatedLink = ({ children, className = '', href = '#' }) => {
  return (
    <motion.a
      href={href}
      className={`relative inline-block ${className}`}
      whileHover="hover"
    >
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent"
        initial={{ width: 0 }}
        variants={{
          hover: { width: '100%' },
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </motion.a>
  )
}

export {
  Magnetic,
  TiltCard,
  FloatingCard,
  RippleButton,
  ShineCard,
  GradientBorder,
  AnimatedLink,
}
