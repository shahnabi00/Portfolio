import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'

const HoverCard = ({ children, className = '' }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`group relative rounded-2xl border border-white/10 bg-slate-900/50 overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(99, 102, 241, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Border Gradient */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              rgba(6, 182, 212, 0.4),
              transparent 80%
            )
          `,
          mask: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export default HoverCard
