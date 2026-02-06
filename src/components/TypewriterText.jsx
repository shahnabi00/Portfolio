import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = [
  'Full Stack Developer',
  'UI/UX Designer',
  'React Expert',
  'Problem Solver',
  'Creative Thinker',
]

const TypewriterText = ({ className = '' }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWordIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(word.slice(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex])

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[3px] h-[1em] bg-accent ml-1 align-middle"
      />
    </span>
  )
}

export default TypewriterText
