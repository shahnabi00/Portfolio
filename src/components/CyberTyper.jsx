import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlay, FiRefreshCw } from 'react-icons/fi'

// Tech words to type - expanded list for variety
const TECH_WORDS = [
  'react', 'nextjs', 'threejs', 'tailwind', 'typescript', 'nodejs',
  'graphql', 'mongodb', 'docker', 'kubernetes', 'aws', 'vercel',
  'prisma', 'redux', 'zustand', 'vite', 'webpack', 'eslint',
  'jest', 'cypress', 'postgresql', 'redis', 'socketio', 'express',
  'fastapi', 'django', 'flask', 'rust', 'go', 'python',
  'javascript', 'html', 'css', 'scss', 'git', 'linux',
  'firebase', 'supabase', 'stripe', 'oauth', 'jwt', 'api',
  'component', 'function', 'variable', 'constant', 'array', 'object',
  'string', 'number', 'boolean', 'null', 'undefined', 'promise',
  'async', 'await', 'import', 'export', 'default', 'module',
  'class', 'interface', 'type', 'enum', 'generic', 'props',
  'state', 'effect', 'hook', 'context', 'reducer', 'action',
  'dispatch', 'selector', 'middleware', 'thunk', 'saga', 'query',
  'mutation', 'subscription', 'schema', 'resolver', 'directive', 'scalar',
  'server', 'client', 'request', 'response', 'header', 'body',
  'endpoint', 'route', 'controller', 'service', 'repository', 'model',
  'database', 'table', 'column', 'index', 'constraint', 'relation',
  'deploy', 'build', 'test', 'debug', 'compile', 'bundle',
  'optimize', 'minify', 'transpile', 'polyfill', 'shim', 'loader',
  'plugin', 'config', 'environment', 'variable', 'secret', 'token'
]

// Shuffle array helper
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Generate words for the test
const generateWords = (count = 100) => {
  const words = []
  while (words.length < count) {
    const shuffled = shuffleArray(TECH_WORDS)
    words.push(...shuffled)
  }
  return words.slice(0, count)
}

// PlayStation Controller Icon SVG
const PlayStationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    <path d="M17.5 14a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    <path d="M14.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    <path d="M20.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    <path d="M9 8v6M6 11h6" />
    <rect x="2" y="4" width="20" height="16" rx="4" />
  </svg>
)

const CyberTyper = () => {
  const inputRef = useRef(null)
  const wordsContainerRef = useRef(null)
  
  // Game state
  const [words, setWords] = useState([])
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentInput, setCurrentInput] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [startTime, setStartTime] = useState(null)
  const [typedChars, setTypedChars] = useState([]) // Track each character typed per word
  const [correctChars, setCorrectChars] = useState(0)
  const [incorrectChars, setIncorrectChars] = useState(0)
  const [completedWords, setCompletedWords] = useState(0)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)
  const [highScore, setHighScore] = useState(0)
  const [testDuration, setTestDuration] = useState(60) // 15, 30, 60, or 120 seconds
  
  // Timer ref
  const timerRef = useRef(null)
  
  // Initialize words
  useEffect(() => {
    setWords(generateWords(100))
    setTypedChars(new Array(100).fill([]))
  }, [])
  
  // Timer countdown
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isPlaying) {
      endGame()
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [isPlaying, timeLeft])
  
  // Calculate WPM in real-time
  useEffect(() => {
    if (startTime && isPlaying) {
      const elapsedMinutes = (Date.now() - startTime) / 60000
      if (elapsedMinutes > 0) {
        // WPM = (correct characters / 5) / elapsed minutes
        const calculatedWpm = Math.round((correctChars / 5) / elapsedMinutes)
        setWpm(calculatedWpm)
      }
      
      // Calculate accuracy
      const totalChars = correctChars + incorrectChars
      if (totalChars > 0) {
        setAccuracy(Math.round((correctChars / totalChars) * 100))
      }
    }
  }, [correctChars, incorrectChars, startTime, isPlaying])
  
  // Auto-scroll to current word
  useEffect(() => {
    if (wordsContainerRef.current && isPlaying) {
      const currentWordElement = wordsContainerRef.current.querySelector(`[data-word-index="${currentWordIndex}"]`)
      if (currentWordElement) {
        currentWordElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [currentWordIndex, isPlaying])
  
  // Focus input when playing
  useEffect(() => {
    if (isPlaying && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isPlaying])
  
  // Start the game
  const startGame = useCallback(() => {
    const newWords = generateWords(100)
    setWords(newWords)
    setTypedChars(new Array(100).fill([]))
    setCurrentWordIndex(0)
    setCurrentInput('')
    setIsPlaying(true)
    setIsFinished(false)
    setTimeLeft(testDuration)
    setStartTime(Date.now())
    setCorrectChars(0)
    setIncorrectChars(0)
    setCompletedWords(0)
    setWpm(0)
    setAccuracy(100)
    
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [testDuration])
  
  // End the game
  const endGame = useCallback(() => {
    setIsPlaying(false)
    setIsFinished(true)
    
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    
    // Update high score
    if (wpm > highScore) {
      setHighScore(wpm)
    }
  }, [wpm, highScore])
  
  // Handle input change
  const handleInputChange = (e) => {
    if (!isPlaying) return
    
    const value = e.target.value
    const currentWord = words[currentWordIndex]
    
    // Handle space - move to next word
    if (value.endsWith(' ')) {
      const typedWord = value.trim()
      
      // Calculate correct/incorrect for this word
      let correct = 0
      let incorrect = 0
      
      for (let i = 0; i < Math.max(typedWord.length, currentWord.length); i++) {
        if (i < typedWord.length && i < currentWord.length) {
          if (typedWord[i] === currentWord[i]) {
            correct++
          } else {
            incorrect++
          }
        } else if (i < typedWord.length) {
          incorrect++ // Extra characters
        } else {
          incorrect++ // Missing characters
        }
      }
      
      // Add space as correct char (word separator)
      correct++
      
      setCorrectChars(prev => prev + correct)
      setIncorrectChars(prev => prev + incorrect)
      setCompletedWords(prev => prev + 1)
      
      // Store typed chars for this word
      const newTypedChars = [...typedChars]
      newTypedChars[currentWordIndex] = typedWord.split('')
      setTypedChars(newTypedChars)
      
      // Move to next word
      setCurrentWordIndex(prev => prev + 1)
      setCurrentInput('')
      return
    }
    
    setCurrentInput(value)
  }
  
  // Handle key down for special keys
  const handleKeyDown = (e) => {
    if (!isPlaying) {
      // Start game on any key press when not playing
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        startGame()
      }
      return
    }
  }
  
  // Render word with character highlighting
  const renderWord = (word, wordIndex) => {
    const isCurrentWord = wordIndex === currentWordIndex
    const isPastWord = wordIndex < currentWordIndex
    const typed = isPastWord ? typedChars[wordIndex] || [] : (isCurrentWord ? currentInput.split('') : [])
    
    return (
      <span
        key={wordIndex}
        data-word-index={wordIndex}
        className={`inline-block mr-3 mb-2 text-xl md:text-2xl font-mono transition-all duration-150 ${
          isCurrentWord ? 'bg-white/10 rounded px-1 -mx-1' : ''
        }`}
      >
        {word.split('').map((char, charIndex) => {
          let charClass = 'text-gray-500' // Default - not typed yet
          
          if (isPastWord || (isCurrentWord && charIndex < typed.length)) {
            const typedChar = typed[charIndex]
            if (typedChar === char) {
              charClass = 'text-cyan-400' // Correct
            } else if (typedChar !== undefined) {
              charClass = 'text-red-500' // Incorrect
            }
          }
          
          // Cursor position
          const isCursor = isCurrentWord && charIndex === typed.length
          
          return (
            <span
              key={charIndex}
              className={`${charClass} ${isCursor ? 'border-l-2 border-cyan-400 animate-pulse' : ''}`}
            >
              {char}
            </span>
          )
        })}
        {/* Show extra typed characters */}
        {isCurrentWord && typed.length > word.length && (
          <span className="text-red-500 bg-red-500/20">
            {typed.slice(word.length).join('')}
          </span>
        )}
        {isPastWord && (typedChars[wordIndex]?.length || 0) > word.length && (
          <span className="text-red-500 bg-red-500/20">
            {typedChars[wordIndex].slice(word.length).join('')}
          </span>
        )}
      </span>
    )
  }
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20"
      id="cyber-typer"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">Test Your </span>
            <span className="gradient-text">Typing Speed</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Type as many tech words as you can! See your WPM and accuracy in real-time.
          </p>
        </motion.div>
        
        {/* Terminal Window */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl overflow-hidden shadow-2xl" style={{ boxShadow: '0 0 60px rgba(0, 245, 255, 0.1)' }}>
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a2e] border-b border-white/10">
              {/* Traffic lights */}
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setIsPlaying(false); setIsFinished(false) }}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                  />
                  <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" />
                  <button 
                    onClick={startGame}
                    className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
                  />
                </div>
              </div>
              
              {/* Terminal title */}
              <div className="flex items-center gap-2 text-gray-400 text-sm font-mono">
                <span>~/typing-test.sh</span>
              </div>
              
              {/* PlayStation icon */}
              <div className="text-gray-400 hover:text-cyan-400 transition-colors cursor-pointer">
                <PlayStationIcon />
              </div>
            </div>
            
            {/* Duration selector */}
            {!isPlaying && !isFinished && (
              <div className="flex items-center justify-center gap-4 py-3 bg-[#0d0d1a] border-b border-white/10">
                {[15, 30, 60, 120].map(duration => (
                  <button
                    key={duration}
                    onClick={() => setTestDuration(duration)}
                    className={`px-4 py-1 rounded font-mono text-sm transition-all ${
                      testDuration === duration
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {duration}s
                  </button>
                ))}
              </div>
            )}
            
            {/* Stats Bar - Always visible when playing */}
            {(isPlaying || isFinished) && (
              <div className="flex items-center justify-center gap-8 py-4 bg-[#0d0d1a] border-b border-white/10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 font-mono">{timeLeft}</div>
                  <div className="text-xs text-gray-500">seconds</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 font-mono">{wpm}</div>
                  <div className="text-xs text-gray-500">WPM</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 font-mono">{accuracy}%</div>
                  <div className="text-xs text-gray-500">accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 font-mono">{completedWords}</div>
                  <div className="text-xs text-gray-500">words</div>
                </div>
              </div>
            )}
            
            {/* Game Area */}
            <div 
              className="relative bg-[#0a0a15] cursor-text"
              style={{ minHeight: '300px' }}
              onClick={() => inputRef.current?.focus()}
            >
              {/* Words Display */}
              {isPlaying && (
                <div 
                  ref={wordsContainerRef}
                  className="p-8 h-[300px] overflow-hidden"
                >
                  <div className="leading-relaxed">
                    {words.slice(0, currentWordIndex + 30).map((word, index) => renderWord(word, index))}
                  </div>
                </div>
              )}
              
              {/* Hidden Input */}
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="absolute opacity-0 pointer-events-none"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              
              {/* Start Screen */}
              <AnimatePresence>
                {!isPlaying && !isFinished && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a15]"
                  >
                    {/* Animated grid background */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                        animation: 'gridMove 20s linear infinite'
                      }}
                    />
                    
                    {/* Game title */}
                    <motion.h3
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl md:text-5xl font-bold mb-4 font-mono"
                      style={{
                        color: '#00F5FF',
                        textShadow: '0 0 20px #00F5FF, 0 0 40px #00F5FF, 0 0 60px #00F5FF'
                      }}
                    >
                      TYPING TEST
                    </motion.h3>
                    
                    <motion.p
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-gray-400 mb-8 text-center max-w-md px-4"
                    >
                      Type as many words as you can in {testDuration} seconds.
                      Press space after each word to move to the next.
                    </motion.p>
                    
                    {/* High Score */}
                    {highScore > 0 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-cyan-400 mb-4 font-mono"
                      >
                        Best WPM: {highScore}
                      </motion.p>
                    )}
                    
                    {/* Start Button */}
                    <motion.button
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      className="relative px-12 py-4 rounded-full font-bold text-lg font-mono overflow-hidden group"
                      style={{
                        background: 'linear-gradient(135deg, #00F5FF, #8A2BE2)',
                        boxShadow: '0 0 30px rgba(0, 245, 255, 0.5), 0 0 60px rgba(138, 43, 226, 0.3)'
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-2 text-black">
                        <FiPlay className="w-5 h-5" />
                        START TYPING
                      </span>
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: 'linear-gradient(135deg, #8A2BE2, #00F5FF)'
                        }}
                      />
                    </motion.button>
                    
                    {/* Instructions */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="mt-8 text-gray-500 text-sm font-mono text-center"
                    >
                      <p>Type the words you see, press <span className="text-cyan-400">SPACE</span> after each word</p>
                      <p className="mt-1">Click anywhere to start typing</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Results Screen */}
              <AnimatePresence>
                {isFinished && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a15]/95 backdrop-blur-sm"
                  >
                    <motion.h3
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl md:text-4xl font-bold mb-8 font-mono text-white"
                    >
                      Test Complete!
                    </motion.h3>
                    
                    <div className="grid grid-cols-2 gap-8 mb-8">
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center"
                      >
                        <div className="text-5xl font-bold text-cyan-400 font-mono">{wpm}</div>
                        <div className="text-gray-400 mt-1">WPM</div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center"
                      >
                        <div className="text-5xl font-bold text-green-400 font-mono">{accuracy}%</div>
                        <div className="text-gray-400 mt-1">Accuracy</div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center"
                      >
                        <div className="text-5xl font-bold text-orange-400 font-mono">{completedWords}</div>
                        <div className="text-gray-400 mt-1">Words</div>
                      </motion.div>
                      
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center"
                      >
                        <div className="text-5xl font-bold text-purple-400 font-mono">{correctChars}</div>
                        <div className="text-gray-400 mt-1">Characters</div>
                      </motion.div>
                    </div>
                    
                    {wpm >= highScore && wpm > 0 && (
                      <motion.p
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6, type: 'spring' }}
                        className="text-yellow-400 font-bold mb-4 font-mono"
                      >
                        🎉 New High Score! 🎉
                      </motion.p>
                    )}
                    
                    <motion.button
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      className="flex items-center gap-2 px-8 py-3 rounded-full font-bold font-mono"
                      style={{
                        background: 'linear-gradient(135deg, #00F5FF, #8A2BE2)',
                        boxShadow: '0 0 20px rgba(0, 245, 255, 0.4)'
                      }}
                    >
                      <FiRefreshCw className="w-5 h-5 text-black" />
                      <span className="text-black">TRY AGAIN</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Bottom Bar */}
            <div className="flex items-center justify-between px-6 py-3 bg-[#0d0d1a] border-t border-white/10 font-mono text-sm">
              <div className="flex items-center gap-6">
                <span className="text-cyan-400">
                  WPM: <span className="text-white">{wpm}</span>
                </span>
                <span className="text-purple-400">
                  Accuracy: <span className="text-white">{accuracy}%</span>
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                {isPlaying ? (
                  <button
                    onClick={endGame}
                    className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    END TEST
                  </button>
                ) : (
                  <button
                    onClick={startGame}
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <FiRefreshCw className="w-4 h-4" />
                    {isFinished ? 'RESTART' : 'START'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS Animation for grid */}
      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
      `}</style>
    </motion.section>
  )
}

export default CyberTyper
