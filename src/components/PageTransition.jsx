import { motion } from 'framer-motion'

// Ultra smooth easing curves
const smoothEasing = [0.43, 0.13, 0.23, 0.96]
const elasticEasing = [0.34, 1.56, 0.64, 1]

const pageVariants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.98,
    filter: 'blur(10px)',
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: smoothEasing,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.98,
    filter: 'blur(5px)',
    transition: {
      duration: 0.5,
      ease: smoothEasing,
    },
  },
}

const childVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: elasticEasing,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: smoothEasing,
    },
  },
}

const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="min-h-screen will-change-transform"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

export { childVariants }
export default PageTransition
