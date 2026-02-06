import { motion } from 'framer-motion'

const techStack = [
  { name: 'HTML', icon: '🌐' },
  { name: 'CSS', icon: '🎨' },
  { name: 'Java', icon: '☕' },
  { name: 'Tailwind CSS', icon: '🌊' },
  { name: 'Python', icon: '🐍' },
  { name: 'C++', icon: '⚡' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Pandas', icon: '🐼' },
]

const InfiniteMarquee = ({ direction = 'left', speed = 25 }) => {
  const marqueeVariants = {
    animate: {
      x: direction === 'left' ? [0, -1920] : [-1920, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: speed,
          ease: 'linear',
        },
      },
    },
  }

  return (
    <div className="relative overflow-hidden py-8">
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark to-transparent z-10" />
      
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        variants={marqueeVariants}
        animate="animate"
      >
        {[...techStack, ...techStack, ...techStack, ...techStack].map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-6 py-3 glass rounded-full"
          >
            <span className="text-2xl">{tech.icon}</span>
            <span className="text-white font-medium">{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default InfiniteMarquee
