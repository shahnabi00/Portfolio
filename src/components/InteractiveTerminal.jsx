import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTerminal, FiX, FiMinus, FiMaximize2 } from 'react-icons/fi'

const InteractiveTerminal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isTyping, setIsTyping] = useState(false)
  const [matrixMode, setMatrixMode] = useState(false)
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  // Scroll to section helper
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  // Welcome message
  const welcomeMessage = [
    { type: 'system', content: '╔══════════════════════════════════════════════════════════╗' },
    { type: 'system', content: '║                                                          ║' },
    { type: 'system', content: '║   Welcome to Syed Shah Nabi\'s Interactive Terminal! 🚀   ║' },
    { type: 'system', content: '║                                                          ║' },
    { type: 'system', content: '╚══════════════════════════════════════════════════════════╝' },
    { type: 'info', content: '' },
    { type: 'info', content: '  Type "help" to see available commands' },
    { type: 'info', content: '  Press Ctrl + ` or click the terminal icon to toggle' },
    { type: 'info', content: '' },
  ]

  // Commands definition
  const commands = {
    help: () => [
      { type: 'title', content: '📋 Available Commands:' },
      { type: 'info', content: '' },
      { type: 'command', content: '  about        ', desc: '- Learn about me' },
      { type: 'command', content: '  skills       ', desc: '- View my technical skills' },
      { type: 'command', content: '  projects     ', desc: '- Browse my projects' },
      { type: 'command', content: '  experience   ', desc: '- My work experience' },
      { type: 'command', content: '  education    ', desc: '- My education background' },
      { type: 'command', content: '  contact      ', desc: '- Get my contact info' },
      { type: 'command', content: '  social       ', desc: '- My social media links' },
      { type: 'command', content: '  resume       ', desc: '- Download my resume' },
      { type: 'command', content: '  hire         ', desc: '- How to hire me' },
      { type: 'info', content: '' },
      { type: 'title', content: '🎮 Fun Commands:' },
      { type: 'command', content: '  secret       ', desc: '- Find easter eggs' },
      { type: 'command', content: '  matrix       ', desc: '- Enter the Matrix' },
      { type: 'command', content: '  joke         ', desc: '- Tell me a dev joke' },
      { type: 'command', content: '  quote        ', desc: '- Inspirational quote' },
      { type: 'command', content: '  whoami       ', desc: '- Who is visiting?' },
      { type: 'info', content: '' },
      { type: 'title', content: '🔧 Navigation:' },
      { type: 'command', content: '  goto [section]', desc: '- Scroll to (home/about/projects/services/contact)' },
      { type: 'command', content: '  clear        ', desc: '- Clear terminal' },
      { type: 'command', content: '  exit         ', desc: '- Close terminal' },
      { type: 'info', content: '' },
      { type: 'hint', content: '💡 Tip: Use ↑↓ arrows to navigate command history' },
    ],

    about: () => [
      { type: 'title', content: '👋 About Me' },
      { type: 'info', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'info', content: '' },
      { type: 'success', content: '  Name: Syed Shah Nabi' },
      { type: 'success', content: '  Role: Developer & UI/UX Designer' },
      { type: 'success', content: '  Location: 🌍 Pakistan (Remote Available)' },
      { type: 'info', content: '' },
      { type: 'info', content: '  I\'m a passionate developer who loves creating' },
      { type: 'info', content: '  beautiful, functional digital experiences.' },
      { type: 'info', content: '' },
      { type: 'info', content: '  With 1 year experience, I\'ve been focused on' },
      { type: 'info', content: '  learning and building real-world projects.' },
      { type: 'info', content: '' },
      { type: 'hint', content: '  Type "skills" to see what I can do!' },
    ],

    skills: () => [
      { type: 'title', content: '⚡ Technical Skills' },
      { type: 'info', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'info', content: '' },
      { type: 'category', content: '  💻 Programming Languages:' },
      { type: 'skill', content: '     HTML       ███████████████████░ 90%' },
      { type: 'skill', content: '     CSS        ██████████████████░░ 85%' },
      { type: 'skill', content: '     JavaScript ███████████████████░ 90%' },
      { type: 'skill', content: '     TypeScript ██████████████████░░ 85%' },
      { type: 'skill', content: '     Python     ████████████████░░░░ 80%' },
      { type: 'skill', content: '     Java       ████████████████░░░░ 78%' },
      { type: 'skill', content: '     C++        ███████████████░░░░░ 75%' },
      { type: 'info', content: '' },
      { type: 'category', content: '  🎨 Frameworks & Libraries:' },
      { type: 'skill', content: '     Tailwind   ███████████████████░ 90%' },
      { type: 'skill', content: '     Pandas     ████████████████░░░░ 80%' },
      { type: 'info', content: '' },
    ],

    projects: () => [
      { type: 'title', content: '🚀 Featured Projects' },
      { type: 'info', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'info', content: '' },
      { type: 'project', content: '  [1] 🛒 E-Commerce Platform' },
      { type: 'info', content: '      Tech: React, Node.js, MongoDB, Stripe' },
      { type: 'info', content: '      Full-featured online store with payments' },
      { type: 'info', content: '' },
      { type: 'project', content: '  [2] 💪 Fitness Tracking App' },
      { type: 'info', content: '      Tech: React Native, Firebase, Charts' },
      { type: 'info', content: '      Mobile app for workout tracking' },
      { type: 'info', content: '' },
      { type: 'project', content: '  [3] 📊 Analytics Dashboard' },
      { type: 'info', content: '      Tech: Next.js, D3.js, PostgreSQL' },
      { type: 'info', content: '      Real-time data visualization platform' },
      { type: 'info', content: '' },
      { type: 'project', content: '  [4] 🤖 AI Chat Application' },
      { type: 'info', content: '      Tech: Python, OpenAI, WebSockets' },
      { type: 'info', content: '      Real-time AI-powered chat interface' },
      { type: 'info', content: '' },
      { type: 'hint', content: '  Type "goto projects" to see all projects!' },
    ],

    experience: () => [
      { type: 'title', content: '💼 Experience & Journey' },
      { type: 'info', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'info', content: '' },
      { type: 'job', content: '  🎓 BS Computer Science (2024-2028)' },
      { type: 'info', content: '     FAST NU Islamabad - Currently Enrolled' },
      { type: 'info', content: '' },
      { type: 'job', content: '  📚 Intermediate (2021-2023)' },
      { type: 'info', content: '     APS Pasban Rawalpindi' },
      { type: 'info', content: '     • Started working with real estate agency' },
      { type: 'info', content: '' },
      { type: 'job', content: '  🏫 Matriculation (2019-2021)' },
      { type: 'info', content: '     APS Pasban' },
      { type: 'info', content: '     • Third position in school' },
      { type: 'info', content: '     • Starting of coding journey' },
      { type: 'info', content: '' },
      { type: 'job', content: '  💼 Freelance (2022)' },
      { type: 'info', content: '     Survived my first client!' },
      { type: 'info', content: '     • 37 revision requests later...' },
      { type: 'info', content: '' },
      { type: 'job', content: '  ☕ Coffee Addiction (2023)' },
      { type: 'info', content: '     Discovered debugging at 2 AM requires caffeine' },
      { type: 'info', content: '' },
    ],

    education: () => [
      { type: 'title', content: '🎓 Education' },
      { type: 'info', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'info', content: '' },
      { type: 'edu', content: '  📜 BS in Computer Science' },
      { type: 'info', content: '     FAST NU Islamabad' },
      { type: 'info', content: '     2024 - 2028 (Currently Enrolled)' },
      { type: 'info', content: '' },
      { type: 'edu', content: '  📜 Intermediate' },
      { type: 'info', content: '     APS Pasban Rawalpindi' },
      { type: 'info', content: '     2021 - 2023' },
      { type: 'info', content: '' },
      { type: 'edu', content: '  📜 Matriculation' },
      { type: 'info', content: '     APS Pasban' },
      { type: 'info', content: '     2019 - 2021' },
      { type: 'info', content: '' },
      { type: 'edu', content: '  📜 Certifications:' },
      { type: 'info', content: '     • Programming for AI' },
      { type: 'info', content: '     • Deep Learning' },
      { type: 'info', content: '     • Google Development' },
      { type: 'info', content: '' },
    ],

    contact: () => [
      { type: 'title', content: '📬 Contact Information' },
      { type: 'info', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'info', content: '' },
      { type: 'contact', content: '  📧 Email:    shahnabi292@gmail.com' },
      { type: 'contact', content: '  📱 Phone:    03495049514' },
      { type: 'contact', content: '  📍 Location: Pakistan (Remote Available)' },
      { type: 'info', content: '' },
      { type: 'success', content: '  🟢 Status: Available for opportunities!' },
      { type: 'info', content: '' },
      { type: 'hint', content: '  Type "goto contact" to send a message!' },
    ],

    social: () => {
      // Open social links
      const links = [
        { name: 'Instagram', url: 'https://www.instagram.com/shahnabi110/' },
        { name: 'GitHub', url: 'https://github.com/shahnabi110' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shah-nabi-598768311/' }
      ]
      
      return [
        { type: 'title', content: '🌐 Social Links' },
        { type: 'info', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
        { type: 'info', content: '' },
        { type: 'success', content: '  Opening social links in new tabs...' },
        { type: 'info', content: '' },
        { type: 'social', content: '  📸 Instagram: instagram.com/shahnabi110' },
        { type: 'social', content: '  🐙 GitHub:    github.com/shahnabi110' },
        { type: 'social', content: '  💼 LinkedIn:  linkedin.com/in/shah-nabi-598768311' },
        { type: 'info', content: '' },
        { type: 'hint', content: '  Links opened! Check your browser tabs 🚀' },
      ]
    },

    resume: () => [
      { type: 'title', content: '📄 Resume' },
      { type: 'info', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'info', content: '' },
      { type: 'success', content: '  ⬇️  Downloading resume...' },
      { type: 'info', content: '' },
      { type: 'info', content: '  (Resume download will start automatically)' },
      { type: 'info', content: '' },
      { type: 'hint', content: '  Or email me at: syedshahnabi@example.com' },
    ],

    hire: () => [
      { type: 'title', content: '🤝 Let\'s Work Together!' },
      { type: 'info', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'info', content: '' },
      { type: 'success', content: '  I\'m currently available for:' },
      { type: 'info', content: '' },
      { type: 'info', content: '  ✅ Freelance projects' },
      { type: 'info', content: '  ✅ Contract work' },
      { type: 'info', content: '  ✅ Small to medium projects' },
      { type: 'info', content: '  ✅ Learning opportunities' },
      { type: 'info', content: '' },
      { type: 'category', content: '  💰 Budget:' },
      { type: 'info', content: '     Project: $20 - $30' },
      { type: 'info', content: '' },
      { type: 'hint', content: '  Type "goto contact" to start a conversation!' },
    ],

    secret: () => [
      { type: 'title', content: '🥚 You found an Easter Egg!' },
      { type: 'info', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
      { type: 'info', content: '' },
      { type: 'rainbow', content: '  🎉 Congratulations, curious explorer!' },
      { type: 'info', content: '' },
      { type: 'info', content: '  Fun facts about me:' },
      { type: 'info', content: '  • I code best between 10 PM - 2 AM 🌙' },
      { type: 'info', content: '  • Coffee count today: ☕☕☕' },
      { type: 'info', content: '  • Favorite key: Ctrl+Z (undo saves lives)' },
      { type: 'info', content: '  • Debug mode: console.log("Why?!")' },
      { type: 'info', content: '' },
      { type: 'hint', content: '  Try: "matrix", "joke", or "quote"' },
    ],

    matrix: () => {
      setMatrixMode(true)
      setTimeout(() => setMatrixMode(false), 5000)
      return [
        { type: 'matrix', content: '  Wake up, Neo...' },
        { type: 'matrix', content: '  The Matrix has you...' },
        { type: 'matrix', content: '  Follow the white rabbit 🐰' },
        { type: 'info', content: '' },
        { type: 'hint', content: '  (Matrix effect active for 5 seconds)' },
      ]
    },

    joke: () => {
      const jokes = [
        'Why do programmers prefer dark mode? Because light attracts bugs! 🐛',
        'A SQL query walks into a bar, walks up to two tables and asks: "Can I join you?" 🍺',
        'Why do Java developers wear glasses? Because they can\'t C#! 👓',
        '!false - It\'s funny because it\'s true! 😄',
        'There are only 10 types of people: those who understand binary and those who don\'t.',
        'A programmer\'s wife tells him: "Go to the store and buy a loaf of bread. If they have eggs, buy a dozen." He returns with 12 loaves of bread. 🍞',
        'Why did the developer go broke? Because he used up all his cache! 💸',
        'Debugging: Being the detective in a crime movie where you\'re also the murderer. 🔍',
      ]
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
      return [
        { type: 'title', content: '😂 Dev Joke' },
        { type: 'info', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
        { type: 'info', content: '' },
        { type: 'joke', content: `  ${randomJoke}` },
        { type: 'info', content: '' },
        { type: 'hint', content: '  Type "joke" again for another!' },
      ]
    },

    quote: () => {
      const quotes = [
        { text: 'Code is like humor. When you have to explain it, it\'s bad.', author: 'Cory House' },
        { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson' },
        { text: 'Experience is the name everyone gives to their mistakes.', author: 'Oscar Wilde' },
        { text: 'The best error message is the one that never shows up.', author: 'Thomas Fuchs' },
        { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman' },
        { text: 'Make it work, make it right, make it fast.', author: 'Kent Beck' },
        { text: 'Programming isn\'t about what you know; it\'s about what you can figure out.', author: 'Chris Pine' },
      ]
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
      return [
        { type: 'title', content: '💭 Inspirational Quote' },
        { type: 'info', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
        { type: 'info', content: '' },
        { type: 'quote', content: `  "${randomQuote.text}"` },
        { type: 'info', content: `  — ${randomQuote.author}` },
        { type: 'info', content: '' },
      ]
    },

    whoami: () => {
      const hour = new Date().getHours()
      let greeting = 'Hello'
      if (hour < 12) greeting = 'Good morning'
      else if (hour < 18) greeting = 'Good afternoon'
      else greeting = 'Good evening'
      
      return [
        { type: 'title', content: '🔍 Visitor Info' },
        { type: 'info', content: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
        { type: 'info', content: '' },
        { type: 'success', content: `  ${greeting}, awesome visitor! 👋` },
        { type: 'info', content: '' },
        { type: 'info', content: `  🕐 Local time: ${new Date().toLocaleTimeString()}` },
        { type: 'info', content: `  📅 Date: ${new Date().toLocaleDateString()}` },
        { type: 'info', content: `  💻 Browser: ${navigator.userAgent.split(' ').slice(-1)[0].split('/')[0]}` },
        { type: 'info', content: '' },
        { type: 'hint', content: '  Thanks for visiting my portfolio!' },
      ]
    },

    goto: (args) => {
      const sections = ['home', 'about', 'projects', 'services', 'contact']
      const page = args[0]?.toLowerCase()
      
      if (!page) {
        return [
          { type: 'error', content: '  Usage: goto [section]' },
          { type: 'info', content: '  Available: home, about, projects, services, contact' },
        ]
      }
      
      if (sections.includes(page)) {
        setTimeout(() => {
          scrollToSection(page)
          setIsOpen(false)
        }, 500)
        return [
          { type: 'success', content: `  🚀 Scrolling to ${page}...` },
        ]
      }
      
      return [
        { type: 'error', content: `  Section "${page}" not found.` },
        { type: 'info', content: '  Available: home, about, projects, services, contact' },
      ]
    },

    clear: () => {
      setHistory([])
      return []
    },

    exit: () => {
      setTimeout(() => setIsOpen(false), 300)
      return [
        { type: 'info', content: '  👋 Goodbye! Press Ctrl + ` to reopen.' },
      ]
    },

    sudo: () => [
      { type: 'error', content: '  ⚠️ Nice try! But you don\'t have sudo access here 😄' },
      { type: 'info', content: '  This isn\'t a real Linux terminal... or is it? 🤔' },
    ],

    rm: () => [
      { type: 'error', content: '  🚫 PERMISSION DENIED' },
      { type: 'error', content: '  Nice try! My portfolio is protected 🛡️' },
    ],

    ls: () => [
      { type: 'info', content: '  📁 about/' },
      { type: 'info', content: '  📁 projects/' },
      { type: 'info', content: '  📁 skills/' },
      { type: 'info', content: '  📁 contact/' },
      { type: 'info', content: '  📄 resume.pdf' },
      { type: 'info', content: '  📄 README.md' },
      { type: 'hint', content: '' },
      { type: 'hint', content: '  Type "help" for available commands' },
    ],

    cd: () => [
      { type: 'info', content: '  Use "goto [section]" to scroll!' },
      { type: 'hint', content: '  Example: goto about' },
    ],

    cat: () => [
      { type: 'info', content: '  🐱 Meow!' },
      { type: 'info', content: '' },
      { type: 'info', content: '   /\\_/\\' },
      { type: 'info', content: '  ( o.o )' },
      { type: 'info', content: '   > ^ <' },
      { type: 'info', content: '' },
      { type: 'hint', content: '  (Did you expect something else?)' },
    ],

    hello: () => [
      { type: 'success', content: '  👋 Hello there!' },
      { type: 'info', content: '  Nice to meet you!' },
      { type: 'hint', content: '  Type "about" to learn more about me.' },
    ],

    hi: () => commands.hello(),

    hey: () => commands.hello(),

    coffee: () => [
      { type: 'info', content: '' },
      { type: 'info', content: '       ( (' },
      { type: 'info', content: '        ) )' },
      { type: 'info', content: '      ........' },
      { type: 'info', content: '      |      |]' },
      { type: 'info', content: '      \\      /' },
      { type: 'info', content: '       `----\'' },
      { type: 'info', content: '' },
      { type: 'success', content: '  ☕ Coffee is the fuel of developers!' },
    ],
  }

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && history.length === 0) {
      setHistory(welcomeMessage)
    }
  }, [isOpen])

  // Keyboard shortcut to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault()
        setIsOpen(prev => !prev)
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Handle command execution
  const executeCommand = useCallback((cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const parts = trimmedCmd.split(' ')
    const command = parts[0]
    const args = parts.slice(1)

    // Add command to history
    setCommandHistory(prev => [...prev, cmd])
    setHistoryIndex(-1)

    // Add user input to terminal history
    setHistory(prev => [...prev, { type: 'input', content: cmd }])

    // Special handling for social command - open links
    if (command === 'social') {
      const socialLinks = [
        'https://www.instagram.com/shahnabi110/',
        'https://github.com/shahnabi110',
        'https://www.linkedin.com/in/shah-nabi-598768311/'
      ]
      socialLinks.forEach(link => window.open(link, '_blank'))
    }

    // Execute command
    if (commands[command]) {
      const result = commands[command](args)
      if (result && result.length > 0) {
        // Simulate typing effect
        setIsTyping(true)
        setTimeout(() => {
          setHistory(prev => [...prev, ...result])
          setIsTyping(false)
        }, 100)
      }
    } else if (trimmedCmd === '') {
      // Empty command, do nothing
    } else {
      setHistory(prev => [...prev, 
        { type: 'error', content: `  Command not found: ${command}` },
        { type: 'hint', content: '  Type "help" for available commands' },
      ])
    }
  }, [])

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    executeCommand(input)
    setInput('')
  }

  // Handle arrow keys for command history
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '')
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Simple auto-complete
      const availableCommands = Object.keys(commands)
      const matches = availableCommands.filter(cmd => cmd.startsWith(input.toLowerCase()))
      if (matches.length === 1) {
        setInput(matches[0])
      }
    }
  }

  // Get line color based on type
  const getLineStyle = (type) => {
    const styles = {
      system: 'text-purple-400',
      info: 'text-gray-400',
      input: 'text-green-400',
      error: 'text-red-400',
      success: 'text-green-400',
      title: 'text-cyan-400 font-bold',
      command: 'text-yellow-400',
      hint: 'text-gray-500 italic',
      category: 'text-blue-400 font-semibold',
      skill: 'text-emerald-400',
      project: 'text-orange-400 font-semibold',
      job: 'text-violet-400 font-semibold',
      edu: 'text-pink-400 font-semibold',
      contact: 'text-cyan-400',
      social: 'text-blue-400',
      matrix: 'text-green-500 font-mono animate-pulse',
      rainbow: 'animate-rainbow bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent',
      joke: 'text-yellow-300',
      quote: 'text-cyan-300 italic',
    }
    return styles[type] || 'text-gray-400'
  }

  return (
    <>
      {/* Terminal Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[9999] p-4 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Open Terminal (Ctrl + `)"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <FiTerminal className="w-6 h-6 text-white" />
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-dark-lighter rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
          Open Terminal (Ctrl + `)
        </span>
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
      </motion.button>

      {/* Matrix Effect Overlay */}
      <AnimatePresence>
        {matrixMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, transparent, rgba(0, 255, 0, 0.1))',
            }}
          >
            <div className="matrix-rain" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[70]"
              onClick={() => setIsOpen(false)}
            />

            {/* Terminal Window - FULL SCREEN */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={`fixed z-[80] flex flex-col ${
                isMinimized 
                  ? 'bottom-4 right-4 w-80 h-12' 
                  : isMaximized 
                    ? 'inset-0' 
                    : 'inset-4 md:inset-8 lg:inset-12'
              }`}
            >
              {/* Terminal Header */}
              <div className={`flex items-center justify-between px-4 py-3 bg-[#1a1a2e] border-b border-white/10 ${isMinimized ? 'rounded-xl' : 'rounded-t-xl'}`}>
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                      title="Close"
                    />
                    <button 
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" 
                      title="Minimize"
                    />
                    <button 
                      onClick={() => {
                        setIsMinimized(false)
                        setIsMaximized(!isMaximized)
                      }}
                      className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" 
                      title="Maximize"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <FiTerminal className="w-4 h-4" />
                  <span>syed@portfolio:~</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    title="Minimize"
                  >
                    <FiMinus className="w-4 h-4 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => {
                      setIsMinimized(false)
                      setIsMaximized(!isMaximized)
                    }}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    title="Maximize"
                  >
                    <FiMaximize2 className="w-4 h-4 text-gray-400" />
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    title="Close"
                  >
                    <FiX className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Terminal Body - Hidden when minimized */}
              {!isMinimized && (
              <div
                ref={terminalRef}
                className={`flex-1 bg-[#0d0d1a] p-4 overflow-y-auto font-mono text-sm ${isMaximized ? '' : 'rounded-b-xl'}`}
                onClick={() => inputRef.current?.focus()}
              >
                {/* History */}
                {history.map((line, index) => (
                  <div key={index} className={`${getLineStyle(line.type)} leading-relaxed`}>
                    {line.type === 'input' ? (
                      <span>
                        <span className="text-green-500">➜</span>
                        <span className="text-cyan-400 ml-2">~</span>
                        <span className="text-gray-400 ml-2">{line.content}</span>
                      </span>
                    ) : line.type === 'command' ? (
                      <span>
                        <span className="text-yellow-400">{line.content}</span>
                        <span className="text-gray-500">{line.desc}</span>
                      </span>
                    ) : (
                      line.content
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="text-gray-500 animate-pulse">Processing...</div>
                )}

                {/* Input Line */}
                <form onSubmit={handleSubmit} className="flex items-center mt-2">
                  <span className="text-green-500">➜</span>
                  <span className="text-cyan-400 ml-2">~</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 ml-2 bg-transparent outline-none text-gray-100 caret-green-400"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <span className="w-2 h-5 bg-green-400 animate-pulse" />
                </form>
              </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Styles for matrix rain effect */}
      <style>{`
        .matrix-rain {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.03) 2px,
            rgba(0, 255, 0, 0.03) 4px
          );
          animation: matrix-scroll 0.5s linear infinite;
        }
        
        @keyframes matrix-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 20px; }
        }

        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-rainbow {
          background-size: 200% 200%;
          animation: rainbow 2s ease infinite;
        }
      `}</style>
    </>
  )
}

export default InteractiveTerminal
