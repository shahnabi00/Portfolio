import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

const TextScramble = ({ text, className = '', delay = 0 }) => {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(true)
      let iteration = 0
      const interval = setInterval(() => {
        setDisplayText(prev =>
          text
            .split('')
            .map((char, index) => {
              if (index < iteration) {
                return text[index]
              }
              if (char === ' ') return ' '
              return characters[Math.floor(Math.random() * characters.length)]
            })
            .join('')
        )
        
        if (iteration >= text.length) {
          clearInterval(interval)
          setIsAnimating(false)
        }
        
        iteration += 1/3
      }, 30)

      return () => clearInterval(interval)
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [text, delay])

  return (
    <motion.span 
      className={`font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {displayText}
    </motion.span>
  )
}

export default TextScramble
