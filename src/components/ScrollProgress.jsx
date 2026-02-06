import { motion, useScroll, useSpring } from 'framer-motion'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  
  // Ultra smooth spring for scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    mass: 0.5,
    restDelta: 0.0001
  })

  return (
    <>
      {/* Main Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[100] origin-left"
        style={{ 
          scaleX,
          background: 'linear-gradient(90deg, #00F5FF, #8A2BE2, #00F5FF, #8A2BE2, #00F5FF)',
          backgroundSize: '200% 100%',
          willChange: 'transform',
        }}
      />
      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[99] origin-left blur-sm opacity-60"
        style={{ 
          scaleX,
          background: 'linear-gradient(90deg, #00F5FF, #8A2BE2, #00F5FF)',
        }}
      />
    </>
  )
}

export default ScrollProgress
