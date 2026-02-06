import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  
  // Use motion values for smoother animation
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  // Ultra smooth spring animations - optimized for butter-smooth feel
  const springConfig = { damping: 35, stiffness: 400, mass: 0.3 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  
  // Even smoother spring for the follower ring - creates nice trail effect
  const followerConfig = { damping: 25, stiffness: 120, mass: 0.6 }
  const followerXSpring = useSpring(cursorX, followerConfig)
  const followerYSpring = useSpring(cursorY, followerConfig)
  
  // Outer glow follows even slower
  const glowConfig = { damping: 20, stiffness: 80, mass: 0.8 }
  const glowXSpring = useSpring(cursorX, glowConfig)
  const glowYSpring = useSpring(cursorY, glowConfig)

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.innerWidth <= 768) return

    const updateMousePosition = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea, [data-cursor-hover]')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, input, textarea, [data-cursor-hover]')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY])

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null
  }

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed pointer-events-none z-[10000] rounded-full mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: 12,
          height: 12,
          backgroundColor: '#fff',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.7 : isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 600, damping: 35, mass: 0.2 },
          opacity: { duration: 0.15, ease: 'easeOut' },
        }}
      />
      
      {/* Cursor Follower Ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{
          x: followerXSpring,
          y: followerYSpring,
          width: 40,
          height: 40,
          translateX: '-50%',
          translateY: '-50%',
          border: '2px solid',
          borderColor: isHovering ? 'rgba(6, 182, 212, 0.8)' : 'rgba(99, 102, 241, 0.5)',
          willChange: 'transform',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isVisible ? (isClicking ? 0.5 : 0.8) : 0,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 400, damping: 25, mass: 0.3 },
          opacity: { duration: 0.15, ease: 'easeOut' },
          borderColor: { duration: 0.2, ease: 'easeOut' },
        }}
      />
      
      {/* Outer glow ring - creates smooth trail effect */}
      <motion.div
        className="fixed pointer-events-none z-[9996] rounded-full"
        style={{
          x: glowXSpring,
          y: glowYSpring,
          width: 60,
          height: 60,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          willChange: 'transform',
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{
          scale: { type: 'spring', stiffness: 200, damping: 20 },
          opacity: { duration: 0.2 },
        }}
      />
      
      {/* Glow effect when hovering */}
      {isHovering && (
        <motion.div
          className="fixed pointer-events-none z-[9995] rounded-full"
          style={{
            x: glowXSpring,
            y: glowYSpring,
            width: 80,
            height: 80,
            translateX: '-50%',
            translateY: '-50%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
            willChange: 'transform, opacity',
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      )}
    </>
  )
}

export default CustomCursor
