import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO at TechStart',
    avatar: '👩‍💼',
    content: 'Working with this developer was an absolute pleasure. The attention to detail and creative solutions exceeded our expectations. Our website is now a true reflection of our brand.',
    rating: 5,
    color: '#6366f1',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager at InnovateCo',
    avatar: '👨‍💻',
    content: 'Exceptional work! The project was delivered on time with outstanding quality. The communication throughout the process was clear and professional.',
    rating: 5,
    color: '#8b5cf6',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Founder at DesignHub',
    avatar: '👩‍🎨',
    content: 'A true professional who brings both technical expertise and creative vision. The final product was beyond what we imagined. Highly recommended!',
    rating: 5,
    color: '#ec4899',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'CTO at StartupX',
    avatar: '👨‍🔬',
    content: 'The code quality and architecture were impeccable. They not only met our requirements but also suggested improvements that made our app even better.',
    rating: 5,
    color: '#06b6d4',
  },
]

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <motion.div
      className={`relative glass rounded-3xl p-8 md:p-10 ${isActive ? 'scale-100' : 'scale-90 opacity-50'}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isActive ? 1 : 0.5, 
        scale: isActive ? 1 : 0.9,
      }}
      transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      {/* Glow effect */}
      <div 
        className="absolute -inset-1 rounded-3xl opacity-20 blur-xl"
        style={{ background: `linear-gradient(135deg, ${testimonial.color}, transparent)` }}
      />
      
      {/* Content */}
      <div className="relative">
        {/* Quote icon */}
        <div 
          className="absolute -top-4 -left-2 text-6xl opacity-20 font-serif"
          style={{ color: testimonial.color }}
        >
          "
        </div>
        
        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <FiStar className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </motion.div>
          ))}
        </div>
        
        {/* Testimonial text */}
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8">
          {testimonial.content}
        </p>
        
        {/* Author */}
        <div className="flex items-center gap-4">
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center text-3xl"
            style={{ backgroundColor: `${testimonial.color}20` }}
          >
            {testimonial.avatar}
          </div>
          <div>
            <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
            <p className="text-gray-400">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const TestimonialsSlider = ({ className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const intervalRef = useRef(null)

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection(1)
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(intervalRef.current)
  }, [])

  const handlePrev = () => {
    clearInterval(intervalRef.current)
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    clearInterval(intervalRef.current)
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
    }),
  }

  return (
    <div className={`relative ${className}`}>
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      {/* Slider container */}
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            className="w-full max-w-3xl mx-auto"
          >
            <TestimonialCard 
              testimonial={testimonials[activeIndex]} 
              isActive={true}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        {/* Prev button */}
        <motion.button
          onClick={handlePrev}
          className="p-3 glass rounded-full hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronLeft className="w-6 h-6 text-white" />
        </motion.button>
        
        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                clearInterval(intervalRef.current)
                setDirection(index > activeIndex ? 1 : -1)
                setActiveIndex(index)
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === activeIndex 
                  ? 'bg-gradient-to-r from-primary to-accent' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              whileHover={{ scale: 1.2 }}
              animate={{
                width: index === activeIndex ? 24 : 12,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        
        {/* Next button */}
        <motion.button
          onClick={handleNext}
          className="p-3 glass rounded-full hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronRight className="w-6 h-6 text-white" />
        </motion.button>
      </div>
      
      {/* Progress bar */}
      <div className="w-full max-w-md mx-auto mt-6 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
          key={activeIndex}
        />
      </div>
    </div>
  )
}

export default TestimonialsSlider
