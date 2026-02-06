import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

// Text reveal animation - characters slide up
const TextReveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const words = children.split(' ')

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-2">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : { y: '100%' }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.1,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Letter by letter stagger animation
const StaggerText = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  const letters = children.split('')

  return (
    <span ref={ref} className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
            ease: [0.33, 1, 0.68, 1],
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  )
}

// Blur reveal animation
const BlurReveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, filter: 'blur(20px)', y: 30 }}
      animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.33, 1, 0.68, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// Slide reveal with mask
const MaskReveal = ({ children, className = '', direction = 'up', delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const directions = {
    up: { initial: { y: '100%' }, animate: { y: 0 } },
    down: { initial: { y: '-100%' }, animate: { y: 0 } },
    left: { initial: { x: '100%' }, animate: { x: 0 } },
    right: { initial: { x: '-100%' }, animate: { x: 0 } },
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={directions[direction].initial}
        animate={isInView ? directions[direction].animate : directions[direction].initial}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Scale reveal
const ScaleReveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.33, 1, 0.68, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// Parallax wrapper
const ParallaxReveal = ({ children, className = '', speed = 0.5, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 100 * speed }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1,
        delay,
        ease: [0.33, 1, 0.68, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

// Gradient text animation
const GradientReveal = ({ children, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      className={`bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent ${className}`}
      initial={{ backgroundPosition: '200% 0' }}
      animate={isInView ? { backgroundPosition: '0% 0' } : {}}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.span>
  )
}

// Split text reveal (each line appears separately)
const SplitLineReveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  // Split by newlines or treat as single line
  const lines = typeof children === 'string' ? children.split('\n') : [children]

  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.15,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  )
}

export {
  TextReveal,
  StaggerText,
  BlurReveal,
  MaskReveal,
  ScaleReveal,
  ParallaxReveal,
  GradientReveal,
  SplitLineReveal,
}
