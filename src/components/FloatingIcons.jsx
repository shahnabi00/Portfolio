import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

// Single floating icon component with parallax
const FloatingIcon = ({ icon, smoothX, smoothY }) => {
  const parallaxX = useTransform(
    smoothX, 
    [0, typeof window !== 'undefined' ? window.innerWidth : 1920], 
    [-30 * icon.parallaxMultiplier * 100, 30 * icon.parallaxMultiplier * 100]
  )
  const parallaxY = useTransform(
    smoothY, 
    [0, typeof window !== 'undefined' ? window.innerHeight : 1080], 
    [-30 * icon.parallaxMultiplier * 100, 30 * icon.parallaxMultiplier * 100]
  )
  
  return (
    <motion.div
      className="absolute text-3xl opacity-20 hover:opacity-40 transition-opacity"
      style={{ 
        left: icon.x, 
        top: icon.y,
        x: parallaxX,
        y: parallaxY,
      }}
      animate={{
        y: [0, -30, 0],
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: icon.duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: icon.delay,
      }}
    >
      {icon.emoji}
    </motion.div>
  )
}

const FloatingIcons = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 30, stiffness: 100 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const icons = [
    { emoji: '⚛️', x: '10%', y: '20%', duration: 4, parallaxMultiplier: 0.02, delay: 0 },
    { emoji: '🚀', x: '85%', y: '15%', duration: 5, parallaxMultiplier: 0.03, delay: 0.3 },
    { emoji: '💻', x: '75%', y: '75%', duration: 4.5, parallaxMultiplier: 0.025, delay: 0.6 },
    { emoji: '🎨', x: '15%', y: '70%', duration: 5.5, parallaxMultiplier: 0.015, delay: 0.9 },
    { emoji: '⚡', x: '90%', y: '45%', duration: 4.2, parallaxMultiplier: 0.035, delay: 1.2 },
    { emoji: '🔥', x: '5%', y: '45%', duration: 4.8, parallaxMultiplier: 0.02, delay: 1.5 },
    { emoji: '✨', x: '50%', y: '10%', duration: 5.2, parallaxMultiplier: 0.04, delay: 1.8 },
    { emoji: '🌟', x: '60%', y: '85%', duration: 4.3, parallaxMultiplier: 0.025, delay: 2.1 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map((icon, index) => (
        <FloatingIcon 
          key={index} 
          icon={icon} 
          smoothX={smoothX} 
          smoothY={smoothY} 
        />
      ))}
    </div>
  )
}

export default FloatingIcons
