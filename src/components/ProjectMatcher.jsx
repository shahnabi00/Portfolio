import { useState, useRef, useEffect, Suspense } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { Sparkles, Loader2, Zap, Code2, Palette, Server, Database, Globe, CheckCircle } from 'lucide-react'
import AssistantRobot from './AssistantRobot'

// Your projects data - customize this with your actual projects!
const MY_PROJECTS = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'Full-stack shopping platform with payment integration',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux', 'Tailwind CSS'],
    icon: Globe,
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'project-2',
    title: 'AI Dashboard',
    description: 'Real-time analytics dashboard with ML predictions',
    techStack: ['Python', 'TensorFlow', 'React', 'D3.js', 'FastAPI', 'PostgreSQL'],
    icon: Zap,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'project-3',
    title: 'Mobile Banking App',
    description: 'Secure fintech application with biometric auth',
    techStack: ['React Native', 'TypeScript', 'Node.js', 'Firebase', 'Plaid API'],
    icon: Server,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'project-4',
    title: 'Portfolio Website',
    description: 'Interactive 3D portfolio with animations',
    techStack: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Vite'],
    icon: Palette,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'project-5',
    title: 'Task Management System',
    description: 'Collaborative project management tool',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Socket.io'],
    icon: Database,
    gradient: 'from-indigo-500 to-violet-500',
  },
]

// Glitch text animation component
const GlitchText = ({ text }) => {
  const [displayText, setDisplayText] = useState(text)
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  useEffect(() => {
    let interval
    let iteration = 0
    
    interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) return text[index]
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          })
          .join('')
      )
      
      if (iteration >= text.length) {
        iteration = 0
      }
      iteration += 1/3
    }, 50)
    
    return () => clearInterval(interval)
  }, [text])
  
  return (
    <span className="font-mono text-cyan-400">
      {displayText}
    </span>
  )
}

// Sound effect hook
const useSound = () => {
  const audioContextRef = useRef(null)
  
  const playShuffleSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      
      const ctx = audioContextRef.current
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(800, ctx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1)
      oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.2)
      oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.3)
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
      
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.4)
    } catch (e) {
      console.log('Sound not supported')
    }
  }
  
  const playSuccessSound = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      
      const ctx = audioContextRef.current
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
      oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1) // E5
      oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2) // G5
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)
      
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.4)
    } catch (e) {
      console.log('Sound not supported')
    }
  }
  
  return { playShuffleSound, playSuccessSound }
}

const ProjectMatcher = () => {
  const [jobDescription, setJobDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [projects, setProjects] = useState(MY_PROJECTS)
  const [matchReasons, setMatchReasons] = useState({})
  const [matchScores, setMatchScores] = useState({})
  const [hasMatched, setHasMatched] = useState(false)
  const [error, setError] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [robotCelebrating, setRobotCelebrating] = useState(false)
  const textareaRef = useRef(null)
  const typingTimeoutRef = useRef(null)
  const { playShuffleSound, playSuccessSound } = useSound()

  // Handle typing state for robot
  const handleTextChange = (e) => {
    setJobDescription(e.target.value)
    setIsTyping(true)
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    // Stop typing state after 1 second of no input
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
    }, 1000)
  }

  // Smart local matching function
  const localMatchProjects = (description) => {
    const descLower = description.toLowerCase()
    
    // Calculate match scores based on keyword matching
    const scores = MY_PROJECTS.map(project => {
      let score = 0 // Start from 0 instead of 50
      let techMatches = 0
      
      // Check tech stack matches (most important)
      project.techStack.forEach(tech => {
        if (descLower.includes(tech.toLowerCase())) {
          score += 15
          techMatches++
        }
      })
      
      // Check title/description keywords
      const keywords = project.title.toLowerCase().split(' ')
      keywords.forEach(keyword => {
        if (descLower.includes(keyword) && keyword.length > 3) {
          score += 3
        }
      })
      
      // Common job requirement keywords with tech relevance
      const techKeywords = {
        'react': ['react', 'frontend', 'front-end', 'ui', 'component', 'jsx'],
        'node': ['node', 'backend', 'back-end', 'server', 'api', 'express'],
        'python': ['python', 'ml', 'machine learning', 'data', 'ai', 'tensorflow'],
        'mobile': ['mobile', 'app', 'ios', 'android', 'react native', 'native'],
        'database': ['database', 'sql', 'mongodb', 'postgresql', 'data storage', 'nosql'],
        'cloud': ['cloud', 'aws', 'azure', 'firebase', 'deploy', 'vercel', 'hosting'],
        'ecommerce': ['ecommerce', 'e-commerce', 'shop', 'payment', 'stripe', 'cart', 'checkout'],
        'fullstack': ['fullstack', 'full-stack', 'full stack'],
        'web': ['web', 'website', 'webapp', 'web application', 'browser'],
        'javascript': ['javascript', 'js', 'typescript', 'ts', 'ecmascript'],
        'css': ['css', 'styling', 'tailwind', 'sass', 'scss', 'design system'],
        'rest': ['rest', 'restful', 'graphql', 'api endpoint'],
        'auth': ['authentication', 'authorization', 'oauth', 'jwt', 'login', 'security']
      }
      
      Object.entries(techKeywords).forEach(([key, words]) => {
        const hasKeyword = words.some(w => descLower.includes(w))
        const projectHasTech = project.techStack.some(t => t.toLowerCase().includes(key)) ||
                              project.title.toLowerCase().includes(key) ||
                              project.description.toLowerCase().includes(key)
        if (hasKeyword && projectHasTech) {
          score += 10
          techMatches++
        }
      })
      
      // If no tech matches at all, give minimal score
      if (techMatches === 0) {
        score = Math.max(score, 15) // Minimum 15% for completely irrelevant
      } else {
        score = Math.max(score, 35) // At least 35% if some tech matches
      }
      
      return {
        ...project,
        score: Math.min(score, 98), // Cap at 98
        techMatches
      }
    })
    
    // Sort by score
    scores.sort((a, b) => b.score - a.score)
    
    // Generate reasons
    const reasons = {}
    const matchScoresObj = {}
    
    scores.forEach((project, index) => {
      const matchedTech = project.techStack.filter(t => 
        descLower.includes(t.toLowerCase())
      )
      
      if (matchedTech.length >= 3) {
        reasons[project.id] = `Strong match: ${matchedTech.slice(0, 3).join(', ')}`
      } else if (matchedTech.length > 0) {
        reasons[project.id] = `Matches required skills: ${matchedTech.join(', ')}`
      } else if (project.techMatches > 0) {
        reasons[project.id] = `Some relevant technical overlap with job requirements`
      } else if (index === 0) {
        reasons[project.id] = `Most relevant project, though limited direct tech overlap`
      } else {
        reasons[project.id] = `Limited relevance to this specific role`
      }
      
      matchScoresObj[project.id] = project.score
    })
    
    return {
      rankedIds: scores.map(p => p.id),
      matchReasons: reasons,
      matchScores: matchScoresObj
    }
  }

  // Matching function
  const matchProjects = async () => {
    if (!jobDescription.trim()) {
      setError('Please paste a job description first!')
      return
    }
    
    setIsLoading(true)
    setError(null)
    setHasMatched(false)
    
    try {
      // Small delay for dramatic effect
      await new Promise(resolve => setTimeout(resolve, 800))
      
      const result = localMatchProjects(jobDescription)
      
      // Play shuffle sound
      playShuffleSound()
      
      // Reorder projects based on ranking
      const reorderedProjects = result.rankedIds
        .map(id => MY_PROJECTS.find(p => p.id === id))
        .filter(Boolean)
      
      // Small delay for animation
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setProjects(reorderedProjects)
      setMatchReasons(result.matchReasons || {})
      setMatchScores(result.matchScores || {})
      setHasMatched(true)
      
      // Trigger robot celebration
      setRobotCelebrating(true)
      setTimeout(() => setRobotCelebrating(false), 2000)
      
      // Play success sound after reordering
      setTimeout(() => {
        playSuccessSound()
      }, 400)
      
    } catch (err) {
      console.error('Matching error:', err)
      setError('Failed to analyze. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Reset function
  const resetMatcher = () => {
    setProjects(MY_PROJECTS)
    setMatchReasons({})
    setMatchScores({})
    setHasMatched(false)
    setJobDescription('')
    setError(null)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20"
      id="project-matcher"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-6"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-mono text-cyan-400">Smart Matching</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">Project </span>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Matcher
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Paste any job description and watch it instantly rank my projects by relevance to your needs.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Main Layout with Robot */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Side: 3D Robot */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block w-full lg:w-1/3 h-[400px] relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/5 rounded-2xl" />
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                </div>
              }>
                <AssistantRobot isTyping={isTyping || isLoading} hasMatched={robotCelebrating} />
              </Suspense>
              
              {/* Robot status indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xs font-mono text-cyan-400/70"
                >
                  {isLoading ? '🔍 Analyzing...' : isTyping ? '👀 Listening...' : robotCelebrating ? '🎉 Match Found!' : '🤖 Ready'}
                </motion.p>
              </div>
            </motion.div>
            
            {/* Right Side: Input Area */}
            <div className="w-full lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                {/* Glassmorphism textarea container */}
                <div className="relative rounded-2xl overflow-hidden">
                  {/* Animated border gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-50 blur-sm animate-pulse" />
                  
                  <div className="relative m-[2px] rounded-2xl bg-black/80 backdrop-blur-xl p-1">
                    <textarea
                      ref={textareaRef}
                      value={jobDescription}
                      onChange={handleTextChange}
                      onFocus={() => setIsTyping(true)}
                      onBlur={() => setTimeout(() => setIsTyping(false), 500)}
                      placeholder="Paste a job description here... (e.g., 'Looking for a Full Stack Developer with React, Node.js, and cloud experience...')"
                      className="w-full h-40 bg-white/5 backdrop-blur-md border border-zinc-800 rounded-xl p-4 text-white placeholder-gray-500 resize-none focus:outline-none focus:border-cyan-500/50 transition-all font-mono text-sm"
                      disabled={isLoading}
                    />
                    
                    {/* Character count */}
                    <div className="absolute bottom-4 right-4 text-xs text-gray-500 font-mono">
                      {jobDescription.length} chars
                    </div>
                  </div>
                </div>
                
                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-3 font-mono"
                    >
                      ⚠️ {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-4 mt-6 justify-center">
                  <motion.button
                    onClick={matchProjects}
                    disabled={isLoading || !jobDescription.trim()}
                    whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative px-8 py-4 rounded-full font-bold text-lg font-mono overflow-hidden
                  transition-all duration-300 flex items-center gap-3
                  ${isLoading || !jobDescription.trim() 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-black hover:shadow-[0_0_30px_rgba(0,245,255,0.5)]'
                  }
                `}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <GlitchText text="Analyzing Skills..." />
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Match My Skills
                  </>
                )}
              </motion.button>

              {hasMatched && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={resetMatcher}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-4 rounded-full font-mono border border-zinc-700 text-gray-400 hover:text-white hover:border-zinc-500 transition-all"
                >
                  Reset
                </motion.button>
              )}
            </div>
          </motion.div>
            </div>
          </div>

          {/* Projects Grid with Reorder */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Reorder.Group
              axis="y"
              values={projects}
              onReorder={setProjects}
              className="space-y-4"
            >
              {projects.map((project, index) => {
                const isTopMatch = hasMatched && index === 0
                const matchScore = matchScores[project.id]
                const matchReason = matchReasons[project.id]
                const IconComponent = project.icon
                
                return (
                  <Reorder.Item
                    key={project.id}
                    value={project}
                    dragListener={false}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      layout: { type: 'spring', stiffness: 350, damping: 25 }
                    }}
                    layout
                  >
                    <motion.div
                      className={`
                        relative rounded-2xl overflow-hidden transition-all duration-500
                        ${isTopMatch 
                          ? 'ring-2 ring-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]' 
                          : 'ring-1 ring-white/10'
                        }
                      `}
                      whileHover={{ scale: 1.02 }}
                      layout
                    >
                      {/* Glowing background for top match */}
                      {isTopMatch && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                      
                      {/* Card content */}
                      <div className="relative bg-black/60 backdrop-blur-xl p-6">
                        <div className="flex items-start gap-4">
                          {/* Project icon */}
                          <div className={`
                            p-3 rounded-xl bg-gradient-to-br ${project.gradient} 
                            flex items-center justify-center shrink-0
                          `}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          
                          {/* Project info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-white">
                                {project.title}
                              </h3>
                              
                              {/* Top match badge */}
                              {isTopMatch && (
                                <motion.span
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-mono"
                                >
                                  <CheckCircle className="w-3 h-3" />
                                  Best Match
                                </motion.span>
                              )}
                            </div>
                            
                            <p className="text-gray-400 text-sm mb-3">
                              {project.description}
                            </p>
                            
                            {/* Tech stack */}
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.techStack.map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 rounded-md bg-white/5 text-gray-300 text-xs font-mono"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            
                            {/* Match reason */}
                            <AnimatePresence>
                              {matchReason && (
                                <motion.p
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="text-cyan-400 text-sm font-mono mt-2 border-t border-white/10 pt-3"
                                >
                                  💡 {matchReason}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                          
                          {/* Match score */}
                          {matchScore && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: 'spring', delay: 0.3 }}
                              className={`
                                shrink-0 w-16 h-16 rounded-full flex items-center justify-center
                                font-bold font-mono text-lg
                                ${matchScore >= 80 
                                  ? 'bg-green-500/20 text-green-400 ring-2 ring-green-500/50' 
                                  : matchScore >= 60 
                                    ? 'bg-yellow-500/20 text-yellow-400 ring-2 ring-yellow-500/50'
                                    : 'bg-gray-500/20 text-gray-400 ring-2 ring-gray-500/50'
                                }
                              `}
                            >
                              {matchScore}%
                            </motion.div>
                          )}
                          
                          {/* Rank number */}
                          {hasMatched && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 font-mono text-sm"
                            >
                              #{index + 1}
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </Reorder.Item>
                )
              })}
            </Reorder.Group>
          </motion.div>

          {/* Loading overlay */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  className="bg-black/80 border border-cyan-500/30 rounded-2xl p-8 flex flex-col items-center gap-4"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
                    <Sparkles className="w-6 h-6 text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <GlitchText text="Analyzing Skills..." />
                  <p className="text-gray-500 text-sm font-mono">AI is matching your projects</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}

export default ProjectMatcher
