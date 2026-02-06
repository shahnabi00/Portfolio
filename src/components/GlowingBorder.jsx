import { motion } from 'framer-motion'

const GlowingBorder = ({ children, className = '' }) => {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated gradient border */}
      <motion.div
        className="absolute -inset-[2px] rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(90deg, #6366f1, #06b6d4, #8b5cf6, #ec4899, #6366f1)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '200% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative bg-dark rounded-3xl">
        {children}
      </div>
    </div>
  )
}

export default GlowingBorder
