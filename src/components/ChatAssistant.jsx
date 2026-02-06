import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, Bot, Mail, Linkedin, Github, Download, Calendar, FileText, ExternalLink, Coffee, Sun, Moon, Sunrise, Sunset } from 'lucide-react'
import ContactForm from './ContactForm'

// ========== TIME-BASED GREETING HELPER ==========
const getTimeBasedGreeting = () => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) {
    return { text: "Good morning", icon: "sunrise", emoji: "🌅" }
  } else if (hour >= 12 && hour < 17) {
    return { text: "Good afternoon", icon: "sun", emoji: "☀️" }
  } else if (hour >= 17 && hour < 21) {
    return { text: "Good evening", icon: "sunset", emoji: "🌆" }
  } else {
    return { text: "Good night", icon: "moon", emoji: "🌙" }
  }
}

// ========== CUSTOMIZE YOUR INFO HERE ==========
const PORTFOLIO_INFO = {
  name: "Shah Nabi",
  age: 21,
  education: "FAST National University, Islamabad",
  year: "2nd Year",
  role: "Full Stack Developer",
  email: "shahnabi292@gmail.com",
  linkedin: "https://www.linkedin.com/in/shah-nabi-598768311/",
  github: "https://github.com/shahnabi110",
  resume: "/resume.pdf", // Add your resume file in public folder
  calendly: "https://calendly.com/yourlink", // For scheduling calls (optional)
  
  skills: {
    frontend: ["React", "Next.js", "Three.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    backend: ["Node.js", "Express", "Python", "FastAPI", "Django"],
    database: ["MongoDB", "PostgreSQL", "Firebase", "Redis"],
    tools: ["Git", "Docker", "AWS", "Vercel", "Figma"],
    mobile: ["React Native"]
  },
  
  projects: [
    { name: "E-Commerce Platform", tech: "React, Node.js, MongoDB, Stripe" },
    { name: "AI Dashboard", tech: "Python, TensorFlow, React, D3.js" },
    { name: "Mobile Banking App", tech: "React Native, Firebase, Node.js" },
    { name: "Portfolio Website", tech: "React, Three.js, Framer Motion" },
    { name: "Task Management System", tech: "Next.js, Prisma, PostgreSQL" }
  ],
  
  experience: "2+ years of development experience with 50+ projects completed",
  availability: "Open to freelance projects, internships, and collaborations",
  interests: ["Web Development", "AI/ML", "3D Graphics", "Open Source"],
  
  funFacts: [
    "I can type 80+ WPM! 🚀",
    "Coffee is my debugging partner ☕",
    "I love building interactive 3D experiences",
    "Always learning something new every day"
  ]
}

// ========== RESPONSE PATTERNS ==========
const getResponse = (input) => {
  const text = input.toLowerCase().trim()
  const greeting = getTimeBasedGreeting()
  
  // Greetings
  if (text.match(/^(hi|hello|hey|assalam|salam|aoa)/i)) {
    return {
      text: `${greeting.text}! ${greeting.emoji} I'm Shah Nabi's AI assistant. I can tell you about his skills, projects, education, and more. What would you like to know?`,
      suggestions: ["Skills", "Projects", "Education", "Contact"],
      showQuickActions: true
    }
  }
  
  // Resume/CV
  if (text.match(/resume|cv|download|pdf/i)) {
    return {
      text: `📄 Sure! You can download Shah Nabi's resume to learn more about his experience and qualifications.`,
      suggestions: ["Skills", "Projects", "Contact"],
      showResume: true
    }
  }
  
  // Schedule/Call/Meeting
  if (text.match(/schedule|call|meet|meeting|book|appointment|calendly/i)) {
    return {
      text: `📅 Want to schedule a call with Shah Nabi? Great! You can book a time that works for you.`,
      suggestions: ["Contact", "Projects", "Skills"],
      showSchedule: true,
      showContactForm: true
    }
  }
  
  // Name / Who is Shah Nabi
  if (text.match(/name|who are you|about you|yourself|introduce|shah\s*nabi|who is/i)) {
    return {
      text: `I'm ${PORTFOLIO_INFO.name}, a ${PORTFOLIO_INFO.age}-year-old ${PORTFOLIO_INFO.role} from Pakistan 🇵🇰\n\n📚 Currently studying at ${PORTFOLIO_INFO.education} in my ${PORTFOLIO_INFO.year}.\n\n💻 I'm passionate about building innovative web applications and love working with modern technologies!`,
      suggestions: ["Skills", "Projects", "Experience", "Contact"]
    }
  }
  
  // Age
  if (text.match(/how old|age|born/i)) {
    return {
      text: `I'm ${PORTFOLIO_INFO.age} years old! Young but passionate about technology. 😄`,
      suggestions: ["Education", "Skills", "Projects"]
    }
  }
  
  // Education
  if (text.match(/education|study|university|college|degree|fast|student/i)) {
    return {
      text: `📚 I'm currently a ${PORTFOLIO_INFO.year} student at ${PORTFOLIO_INFO.education}. Pursuing Computer Science with a focus on software development and emerging technologies.`,
      suggestions: ["Skills", "Projects", "Contact"]
    }
  }
  
  // Skills - General
  if (text.match(/skill|tech|know|stack|language|framework/i)) {
    const allSkills = [
      ...PORTFOLIO_INFO.skills.frontend,
      ...PORTFOLIO_INFO.skills.backend.slice(0, 3)
    ].join(", ")
    return {
      text: `💻 My tech stack includes:\n\n**Frontend:** ${PORTFOLIO_INFO.skills.frontend.join(", ")}\n\n**Backend:** ${PORTFOLIO_INFO.skills.backend.join(", ")}\n\n**Database:** ${PORTFOLIO_INFO.skills.database.join(", ")}\n\nWant details about a specific area?`,
      suggestions: ["Frontend", "Backend", "Projects"]
    }
  }
  
  // Frontend
  if (text.match(/frontend|front-end|react|ui|tailwind|css/i)) {
    return {
      text: `🎨 For frontend, I specialize in:\n\n${PORTFOLIO_INFO.skills.frontend.map(s => `• ${s}`).join("\n")}\n\nI love creating beautiful, interactive user interfaces with smooth animations!`,
      suggestions: ["Backend", "Projects", "Contact"]
    }
  }
  
  // Backend
  if (text.match(/backend|back-end|server|node|api|python/i)) {
    return {
      text: `⚙️ On the backend, I work with:\n\n${PORTFOLIO_INFO.skills.backend.map(s => `• ${s}`).join("\n")}\n\nI can build scalable APIs, handle authentication, and manage databases!`,
      suggestions: ["Database", "Projects", "Frontend"]
    }
  }
  
  // Database
  if (text.match(/database|db|sql|mongo|postgres|firebase/i)) {
    return {
      text: `🗄️ For databases, I have experience with:\n\n${PORTFOLIO_INFO.skills.database.map(s => `• ${s}`).join("\n")}\n\nI can design schemas, optimize queries, and handle data at scale!`,
      suggestions: ["Backend", "Projects", "Skills"]
    }
  }
  
  // Mobile
  if (text.match(/mobile|app|android|ios|react native/i)) {
    return {
      text: `📱 For mobile development, I use React Native to build cross-platform apps for both iOS and Android. Check out my Mobile Banking App project!`,
      suggestions: ["Projects", "Skills", "Contact"]
    }
  }
  
  // Projects
  if (text.match(/project|work|portfolio|built|made|create/i)) {
    const projectList = PORTFOLIO_INFO.projects
      .map((p, i) => `${i + 1}. **${p.name}** - ${p.tech}`)
      .join("\n")
    return {
      text: `🚀 Here are some of my featured projects:\n\n${projectList}\n\nWould you like details about any specific project?`,
      suggestions: ["E-Commerce", "AI Dashboard", "Contact"]
    }
  }
  
  // Specific project - E-commerce
  if (text.match(/ecommerce|e-commerce|shop|store/i)) {
    return {
      text: `🛒 **E-Commerce Platform**\n\nA full-stack shopping platform featuring:\n• React frontend with Redux state management\n• Node.js/Express backend\n• MongoDB database\n• Stripe payment integration\n• Admin dashboard for inventory`,
      suggestions: ["Other Projects", "Skills", "Contact"]
    }
  }
  
  // Specific project - AI
  if (text.match(/ai dashboard|analytics|ml|machine learning|tensorflow/i)) {
    return {
      text: `📊 **AI Dashboard**\n\nReal-time analytics platform featuring:\n• Python/TensorFlow for ML predictions\n• React frontend with D3.js visualizations\n• FastAPI backend\n• PostgreSQL for data storage\n• Live data streaming`,
      suggestions: ["Other Projects", "Skills", "Contact"]
    }
  }
  
  // Experience
  if (text.match(/experience|year|how long|worked/i)) {
    return {
      text: `💼 ${PORTFOLIO_INFO.experience}. I've worked on diverse projects ranging from e-commerce platforms to AI dashboards. Currently focused on building cutting-edge web experiences!`,
      suggestions: ["Projects", "Resume", "Contact"]
    }
  }
  
  // Availability / Hire
  if (text.match(/hire|available|freelance|job|work with|collaborate|internship/i)) {
    return {
      text: `✅ ${PORTFOLIO_INFO.availability}!\n\nI'd love to discuss how I can help with your project. Here are some quick ways to connect:`,
      suggestions: ["Schedule Call", "Resume", "Projects"],
      showQuickActions: true
    }
  }
  
  // Contact
  if (text.match(/contact|email|reach|connect|linkedin|github|social/i)) {
    return {
      text: `📬 Let's connect! Here are all the ways to reach Shah Nabi:`,
      suggestions: ["Resume", "Schedule Call", "Projects"],
      showContact: true,
      showQuickActions: true,
      showContactForm: true
    }
  }
  
  // Fun / Personal
  if (text.match(/fun|hobby|interest|free time|like/i)) {
    const randomFact = PORTFOLIO_INFO.funFacts[Math.floor(Math.random() * PORTFOLIO_INFO.funFacts.length)]
    return {
      text: `🎯 Fun fact: ${randomFact}\n\nMy interests include: ${PORTFOLIO_INFO.interests.join(", ")}. When not coding, I'm probably learning something new or exploring the latest tech trends!`,
      suggestions: ["Skills", "Projects", "Contact"]
    }
  }
  
  // Thanks
  if (text.match(/thank|thanks|thx|appreciate/i)) {
    return {
      text: `You're welcome! 😊 Feel free to ask anything else about Shah Nabi's work, or reach out directly to discuss opportunities!`,
      suggestions: ["Projects", "Contact", "Skills"]
    }
  }
  
  // Bye
  if (text.match(/bye|goodbye|see you|later/i)) {
    return {
      text: `Goodbye! 👋 Thanks for visiting. Feel free to come back anytime or reach out directly to Shah Nabi!`,
      suggestions: ["Contact"],
      showContact: true
    }
  }
  
  // Location
  if (text.match(/where|location|from|country|city|pakistan|islamabad/i)) {
    return {
      text: `📍 I'm based in Islamabad, Pakistan! Currently studying at FAST National University. Open to remote work and collaborations worldwide!`,
      suggestions: ["Education", "Contact", "Skills"]
    }
  }
  
  // Default - Unknown question
  return {
    text: `🤔 That's an interesting question! I might not have a pre-programmed answer for this specific topic.\n\nWould you like to ask Shah Nabi directly? He'd be happy to chat!`,
    suggestions: ["Contact", "Skills", "Projects"],
    showContact: true,
    isUnknown: true
  }
}

// ========== CHAT COMPONENT ==========
const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [contactFormOpen, setContactFormOpen] = useState(false)
  const [contactFormMeetingMode, setContactFormMeetingMode] = useState(false)
  
  // Generate initial greeting based on time
  const getInitialMessage = () => {
    const greeting = getTimeBasedGreeting()
    return {
      type: 'bot',
      text: `${greeting.text}! ${greeting.emoji} I'm Shah Nabi's AI assistant. Ask me about his skills, projects, education, or anything else!`,
      suggestions: ["Who is Shah Nabi?", "Skills", "Projects", "Contact"],
      showQuickActions: true
    }
  }
  
  const [messages, setMessages] = useState([getInitialMessage()])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  
  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])
  
  // Handle send message
  const handleSend = (text = inputValue) => {
    if (!text.trim()) return
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: text.trim() }])
    setInputValue('')
    setIsTyping(true)
    
    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(text)
      setMessages(prev => [...prev, { type: 'bot', ...response }])
      setIsTyping(false)
    }, 800 + Math.random() * 500)
  }
  
  // Handle suggestion click
  const handleSuggestion = (suggestion) => {
    handleSend(suggestion)
  }
  
  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  
  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-[0_0_30px_rgba(0,245,255,0.5)]'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
        
        {/* Pulse effect when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-30" />
        )}
      </motion.button>
      
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-150px)] rounded-2xl overflow-hidden shadow-2xl"
            style={{ boxShadow: '0 0 50px rgba(0, 245, 255, 0.2)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Shah Nabi's Assistant</h3>
                  <p className="text-white/70 text-sm flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Always online
                  </p>
                </div>
              </div>
            </div>
            
            {/* Messages Container */}
            <div className="flex flex-col h-[calc(100%-140px)] bg-[#0a0a15]">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] ${msg.type === 'user' ? 'order-1' : 'order-2'}`}>
                      {/* Message bubble */}
                      <div
                        className={`p-3 rounded-2xl ${
                          msg.type === 'user'
                            ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-br-md'
                            : 'bg-white/10 text-white rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{msg.text}</p>
                        
                        {/* Contact buttons */}
                        {msg.showContact && (
                          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/20">
                            <a
                              href={`mailto:${PORTFOLIO_INFO.email}`}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs transition-all"
                            >
                              <Mail className="w-3 h-3" /> Email
                            </a>
                            <a
                              href={PORTFOLIO_INFO.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#0077b5]/30 hover:bg-[#0077b5]/50 text-xs transition-all"
                            >
                              <Linkedin className="w-3 h-3" /> LinkedIn
                            </a>
                            <a
                              href={PORTFOLIO_INFO.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs transition-all"
                            >
                              <Github className="w-3 h-3" /> GitHub
                            </a>
                          </div>
                        )}
                        
                        {/* Quick Action Buttons */}
                        {msg.showQuickActions && (
                          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/20">
                            <a
                              href={PORTFOLIO_INFO.resume}
                              download
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/30 to-emerald-500/30 hover:from-green-500/50 hover:to-emerald-500/50 text-xs text-green-300 transition-all"
                            >
                              <Download className="w-3 h-3" /> Resume
                            </a>
                            <a
                              href={PORTFOLIO_INFO.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0077b5]/30 hover:bg-[#0077b5]/50 text-xs text-blue-300 transition-all"
                            >
                              <Linkedin className="w-3 h-3" /> Connect
                            </a>
                            <a
                              href={`mailto:${PORTFOLIO_INFO.email}`}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/30 hover:bg-purple-500/50 text-xs text-purple-300 transition-all"
                            >
                              <Mail className="w-3 h-3" /> Email
                            </a>
                          </div>
                        )}
                        
                        {/* Resume Download Button */}
                        {msg.showResume && (
                          <div className="mt-3 pt-3 border-t border-white/20">
                            <a
                              href={PORTFOLIO_INFO.resume}
                              download
                              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-sm font-medium text-white transition-all"
                            >
                              <Download className="w-4 h-4" /> Download Resume (PDF)
                            </a>
                          </div>
                        )}
                        
                        {/* Schedule Call Button */}
                        {msg.showSchedule && (
                          <div className="mt-3 pt-3 border-t border-white/20 space-y-2">
                            <button
                              onClick={() => {
                                setContactFormMeetingMode(true)
                                setContactFormOpen(true)
                              }}
                              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-sm font-medium text-white transition-all"
                            >
                              <Calendar className="w-4 h-4" /> Send Meeting Request
                            </button>
                            <a
                              href={`mailto:${PORTFOLIO_INFO.email}?subject=Meeting Request`}
                              className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white/70 transition-all"
                            >
                              <Mail className="w-3 h-3" /> Or email directly
                            </a>
                          </div>
                        )}
                        
                        {/* Contact Form Button */}
                        {msg.showContactForm && !msg.showSchedule && (
                          <div className="mt-3 pt-3 border-t border-white/20">
                            <button
                              onClick={() => {
                                setContactFormMeetingMode(false)
                                setContactFormOpen(true)
                              }}
                              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-sm font-medium text-white transition-all"
                            >
                              <Send className="w-4 h-4" /> Send Message
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {/* Suggestions */}
                      {msg.type === 'bot' && msg.suggestions && index === messages.length - 1 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {msg.suggestions.map((suggestion, i) => (
                            <button
                              key={i}
                              onClick={() => handleSuggestion(suggestion)}
                              className="px-3 py-1 text-xs rounded-full border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 transition-all"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#0d0d1a] border-t border-white/10">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
                <motion.button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    inputValue.trim()
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'bg-white/10 text-gray-500'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={contactFormOpen} 
        onClose={() => setContactFormOpen(false)}
        defaultMeetingType={contactFormMeetingMode}
      />
    </>
  )
}

export default ChatAssistant
