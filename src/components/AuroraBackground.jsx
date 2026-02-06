import { motion } from 'framer-motion'

const AuroraBackground = () => {
  return (
    <div className="aurora-container">
      {/* Aurora Waves */}
      <div className="aurora">
        <motion.div
          className="aurora-wave aurora-wave-1"
          animate={{
            x: ['-20%', '20%', '-20%'],
            y: ['-10%', '10%', '-10%'],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="aurora-wave aurora-wave-2"
          animate={{
            x: ['20%', '-20%', '20%'],
            y: ['10%', '-10%', '10%'],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="aurora-wave aurora-wave-3"
          animate={{
            x: ['-10%', '15%', '-10%'],
            y: ['5%', '-15%', '5%'],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Animated Stars */}
      <div className="stars">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Shooting Stars */}
      <motion.div
        className="shooting-star"
        animate={{
          x: ['-100px', '100vw'],
          y: ['-100px', '100vh'],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 8,
          ease: 'easeOut',
        }}
      />
      <motion.div
        className="shooting-star"
        style={{ animationDelay: '4s' }}
        animate={{
          x: ['50vw', '100vw'],
          y: ['-50px', '50vh'],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 12,
          delay: 5,
          ease: 'easeOut',
        }}
      />
    </div>
  )
}

export default AuroraBackground
