import { motion } from 'framer-motion'

// Ultra smooth easing
const smoothEase = [0.43, 0.13, 0.23, 0.96]

const PageLoader = () => {
  return (
    <motion.div
      className="page-loader"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: 'blur(10px)',
      }}
      transition={{ duration: 0.8, ease: smoothEase }}
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full filter blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
            top: '-20%',
            left: '-10%',
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full filter blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
            bottom: '-20%',
            right: '-10%',
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full filter blur-[80px]"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            top: '40%',
            left: '30%',
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Animated Ring */}
      <motion.div
        className="absolute w-40 h-40 rounded-full border-2 border-primary/30"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
      <motion.div
        className="absolute w-40 h-40 rounded-full border-2 border-accent/30"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
          delay: 0.5,
        }}
      />

      {/* Logo */}
      <motion.div
        className="relative z-10 mb-8"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <motion.div
          className="text-5xl font-bold font-display"
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 50%, #8b5cf6 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          SSN
        </motion.div>
      </motion.div>

      {/* Loading Text */}
      <motion.p
        className="text-gray-400 text-sm tracking-widest uppercase mb-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Loading Experience
      </motion.p>

      {/* Animated Dots */}
      <div className="flex gap-2 mb-8 relative z-10">
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full"
            style={{
              background: `linear-gradient(135deg, #6366f1, #06b6d4)`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: index * 0.1,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="loader-bar relative z-10">
        <motion.div
          className="loader-progress"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </div>

      {/* Loading Text */}
      <motion.p
        className="text-gray-400 mt-4 text-sm relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading amazing stuff...
      </motion.p>
    </motion.div>
  )
}

export default PageLoader
