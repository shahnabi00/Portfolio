import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Smooth scroll indicator with animated line
const SmoothScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
      setIsVisible(window.scrollY < 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <span className="text-xs text-gray-400 tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-gradient-to-b from-primary to-accent rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Horizontal scroll progress bar
const ScrollProgressBar = ({ color = 'from-primary to-accent' }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress((window.scrollY / totalHeight) * 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <motion.div
        className={`h-full bg-gradient-to-r ${color}`}
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  )
}

// Section indicator dots
const SectionDots = ({ sections = [], activeSection = 0 }) => {
  const scrollToSection = (index) => {
    const section = document.getElementById(sections[index]?.id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {sections.map((section, index) => (
        <motion.button
          key={section.id}
          onClick={() => scrollToSection(index)}
          className="group flex items-center gap-3"
          whileHover={{ x: -5 }}
        >
          <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
            {section.label}
          </span>
          <motion.div
            className={`w-3 h-3 rounded-full border-2 transition-colors ${
              activeSection === index
                ? 'bg-primary border-primary'
                : 'bg-transparent border-white/30 hover:border-primary'
            }`}
            animate={{
              scale: activeSection === index ? 1.2 : 1,
            }}
          />
        </motion.button>
      ))}
    </div>
  )
}

// Floating back to top button
const BackToTop = ({ showAfter = 300 }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfter)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAfter])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Parallax scroll wrapper
const ParallaxScroll = ({ children, speed = 0.5, className = '' }) => {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const scrolled = window.scrollY
        const elementTop = rect.top + scrolled
        const relativeScroll = scrolled - elementTop
        setOffset(relativeScroll * speed)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div style={{ y: offset }}>{children}</motion.div>
    </div>
  )
}

// Scroll-triggered counter
const ScrollCounter = ({ end, duration = 2, suffix = '', prefix = '', className = '' }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          
          const startTime = Date.now()
          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / (duration * 1000), 1)
            
            // Easing function
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * end))
            
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          
          animate()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}

// Horizontal scroll section
const HorizontalScroll = ({ children, className = '' }) => {
  const containerRef = useRef(null)
  const [scrollX, setScrollX] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e) => {
      const rect = container.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0
      
      if (isInView) {
        e.preventDefault()
        container.scrollLeft += e.deltaY
        setScrollX(container.scrollLeft)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <div
      ref={containerRef}
      className={`overflow-x-auto scrollbar-hide ${className}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <div className="flex gap-8 px-8">{children}</div>
    </div>
  )
}

export {
  SmoothScrollIndicator,
  ScrollProgressBar,
  SectionDots,
  BackToTop,
  ParallaxScroll,
  ScrollCounter,
  HorizontalScroll,
}
