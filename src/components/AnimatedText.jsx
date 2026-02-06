import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const AnimatedText = ({ 
  text, 
  className = '', 
  delay = 0,
  type = 'words' // 'words', 'letters', 'lines'
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const words = text.split(' ')
  const letters = text.split('')

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: type === 'letters' ? 0.03 : 0.12,
        delayChildren: delay,
      },
    }),
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }

  if (type === 'letters') {
    return (
      <motion.span
        ref={ref}
        className={`inline-block ${className}`}
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block"
            style={{ transformOrigin: 'center bottom' }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.span>
    )
  }

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block mr-2"
          style={{ transformOrigin: 'center bottom' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default AnimatedText
