import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

const MorphingCursor = () => {
  const cursorRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const [cursorVariant, setCursorVariant] = useState('default')
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 400 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Track hoverable elements
    const handleElementHover = () => {
      const hoveredElement = document.elementFromPoint(mouseX.get(), mouseY.get())
      
      if (hoveredElement) {
        // Check for data attributes
        const cursorType = hoveredElement.closest('[data-cursor]')
        const cursorTextEl = hoveredElement.closest('[data-cursor-text]')
        
        if (cursorType) {
          setCursorVariant(cursorType.getAttribute('data-cursor'))
          setIsHovering(true)
        } else if (hoveredElement.closest('a, button, [role="button"]')) {
          setCursorVariant('link')
          setIsHovering(true)
        } else if (hoveredElement.closest('input, textarea')) {
          setCursorVariant('text')
          setIsHovering(true)
        } else {
          setCursorVariant('default')
          setIsHovering(false)
        }

        if (cursorTextEl) {
          setCursorText(cursorTextEl.getAttribute('data-cursor-text'))
        } else {
          setCursorText('')
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    const hoverInterval = setInterval(handleElementHover, 50)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      clearInterval(hoverInterval)
    }
  }, [mouseX, mouseY])

  const variants = {
    default: {
      width: 20,
      height: 20,
      backgroundColor: 'transparent',
      border: '2px solid rgba(99, 102, 241, 0.8)',
      mixBlendMode: 'difference',
    },
    link: {
      width: 60,
      height: 60,
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      border: '2px solid rgba(99, 102, 241, 1)',
      mixBlendMode: 'normal',
    },
    text: {
      width: 4,
      height: 30,
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
      border: 'none',
      borderRadius: '2px',
      mixBlendMode: 'normal',
    },
    project: {
      width: 100,
      height: 100,
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      border: '2px solid rgba(99, 102, 241, 0.8)',
      mixBlendMode: 'normal',
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(99, 102, 241, 0.9)',
      border: 'none',
      mixBlendMode: 'normal',
    },
  }

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          ...variants[cursorVariant],
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-white text-xs font-semibold"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9998] bg-gradient-to-r from-primary to-accent"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 2 : 1,
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />
    </>
  )
}

export default MorphingCursor
