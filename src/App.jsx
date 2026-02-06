import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { FiArrowRight, FiGithub, FiLinkedin, FiTwitter, FiPlay, FiCode, FiAward, FiHeart, FiCoffee, FiLayout, FiSmartphone, FiDatabase, FiCloud, FiPenTool, FiExternalLink, FiMail, FiPhone, FiMapPin, FiSend, FiCheck, FiX, FiDownload } from 'react-icons/fi'

// Components
import Navbar from './components/Navbar'
import MorphingCursor from './components/MorphingCursor'
import PageLoader from './components/PageLoader'
import ScrollProgress from './components/ScrollProgress'
import Spotlight from './components/Spotlight'
import FloatingIcons from './components/FloatingIcons'
import MovingGrid from './components/MovingGrid'
import InteractiveTerminal from './components/InteractiveTerminal'
import { BackToTop } from './components/ScrollEffects'
import AnimatedText from './components/AnimatedText'
import Card3D from './components/Card3D'
import MagneticButton from './components/MagneticButton'
import TypewriterText from './components/TypewriterText'
import InfiniteMarquee from './components/InfiniteMarquee'
import AnimatedCounter from './components/AnimatedCounter'
import GlowingBorder from './components/GlowingBorder'
import TextScramble from './components/TextScramble'
import BentoGrid from './components/BentoGrid'
import AnimatedGradientText from './components/AnimatedGradientText'
import HoverCard from './components/HoverCard'
import { TiltCard, ShineCard } from './components/InteractiveElements'
import TestimonialsSlider from './components/TestimonialsSlider'
import Globe3D from './components/Globe3D'
import CyberTyper from './components/CyberTyper'
import ProjectMatcher from './components/ProjectMatcher'
import ChatAssistant from './components/ChatAssistant'
import profileImg from './assets/shahnabi.png'

// Scroll Reveal Section Wrapper
const ScrollRevealSection = ({ children, id, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.section>
  )
}

function App() {
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const heroRef = useRef(null)
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Data
  const skills = [
    { name: 'React', level: 95, color: '#61DAFB' },
    { name: 'JavaScript', level: 90, color: '#F7DF1E' },
    { name: 'TypeScript', level: 85, color: '#3178C6' },
    { name: 'Node.js', level: 88, color: '#339933' },
    { name: 'Python', level: 80, color: '#3776AB' },
    { name: 'UI/UX Design', level: 85, color: '#FF61F6' },
  ]

  const stats = [
    { number: 5, label: 'Projects Completed', suffix: '' },
    { number: 5, label: 'Clients', suffix: '+' },
    { number: 1.5, label: 'Years Experience', suffix: '' },
    { number: 99, label: 'Success Rate', suffix: '%' },
  ]

  const technologies = [
    'HTML', 'CSS', 'Java', 'Tailwind CSS', 'Python', 'C++',
    'TypeScript', 'Pandas'
  ]

  const timeline = [
    {
      year: '2024-2028',
      title: 'BS Computer Science',
      company: 'FAST NU Islamabad',
      description: 'Currently enrolled in BS Computer Science program.',
    },
    {
      year: '2021-2023',
      title: 'Intermediate',
      company: 'APS Pasban Rawalpindi',
      description: 'Started working with real estate agency.',
    },
    {
      year: '2019-2021',
      title: 'Matriculation',
      company: 'APS Pasban',
      description: 'Third position in school. Starting of coding journey.',
    },
    {
      year: '2022',
      title: 'Survived My First Client',
      company: 'Freelance',
      description: '37 revision requests later, learned that "make it pop" means different things to different people.',
    },
    {
      year: '2023',
      title: 'Coffee Addiction Started',
      company: 'Life Achievement',
      description: 'Discovered that debugging at 2 AM requires industrial amounts of caffeine.',
    },
  ]

  const funFacts = [
    { icon: FiCode, value: '100K+', label: 'Lines of Code' },
    { icon: FiCoffee, value: '500+', label: 'Cups of Coffee' },
    { icon: FiAward, value: '15+', label: 'Certifications' },
    { icon: FiHeart, value: '∞', label: 'Passion' },
  ]

  const services = [
    {
      icon: FiCode,
      title: 'Web Development',
      description: 'Building fast, scalable web applications using modern technologies like React, Next.js, and Node.js.',
      features: ['Custom Web Apps', 'E-commerce Solutions', 'API Development', 'Performance Optimization'],
      color: '#00F5FF',
    },
    {
      icon: FiLayout,
      title: 'UI/UX Design',
      description: 'Creating beautiful, intuitive interfaces that provide exceptional user experiences.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
      color: '#8A2BE2',
    },
    {
      icon: FiSmartphone,
      title: 'Mobile Development',
      description: 'Developing cross-platform mobile applications using React Native.',
      features: ['iOS Apps', 'Android Apps', 'Cross-platform', 'App Maintenance'],
      color: '#00F5FF',
    },
    {
      icon: FiDatabase,
      title: 'Backend Development',
      description: 'Building robust server-side applications and managing databases efficiently.',
      features: ['REST APIs', 'GraphQL', 'Database Design', 'Authentication'],
      color: '#8A2BE2',
    },
    {
      icon: FiCloud,
      title: 'Cloud Solutions',
      description: 'Deploying and managing applications on cloud platforms like AWS and Vercel.',
      features: ['Cloud Migration', 'DevOps', 'CI/CD Pipelines', 'Monitoring'],
      color: '#00F5FF',
    },
    {
      icon: FiPenTool,
      title: 'Brand Identity',
      description: 'Creating memorable brand identities that resonate with your target audience.',
      features: ['Logo Design', 'Brand Guidelines', 'Marketing Materials', 'Social Media'],
      color: '#8A2BE2',
    },
  ]

  const categories = ['all', 'web', 'mobile', 'design', 'backend']

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with real-time inventory management, payment processing, and analytics dashboard.',
      fullDescription: 'Built a comprehensive e-commerce solution featuring real-time inventory tracking, multiple payment gateway integrations (Stripe, PayPal), advanced search with filters, user authentication, order management, and an admin dashboard with analytics.',
      image: '🛒',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
      liveUrl: '#',
      githubUrl: '#',
      color: '#00F5FF',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates and team features.',
      fullDescription: 'Developed a project management tool with real-time collaboration features, drag-and-drop task boards, team chat, file sharing, time tracking, and automated notifications.',
      image: '📋',
      category: 'web',
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Socket.io'],
      liveUrl: '#',
      githubUrl: '#',
      color: '#8A2BE2',
    },
    {
      id: 3,
      title: 'Fitness Tracking App',
      description: 'A mobile app for tracking workouts, nutrition, and health metrics with AI recommendations.',
      fullDescription: 'Created a comprehensive fitness app with workout logging, custom exercise creation, nutrition tracking with barcode scanning, progress photos, AI-powered workout recommendations, and social features.',
      image: '💪',
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'TensorFlow', 'Node.js'],
      liveUrl: '#',
      githubUrl: '#',
      color: '#00F5FF',
    },
    {
      id: 4,
      title: 'Financial Dashboard',
      description: 'An interactive dashboard for tracking investments and financial analytics.',
      fullDescription: 'Built a real-time financial dashboard with portfolio tracking, stock market integration, expense categorization, budget planning, investment analysis, and predictive analytics.',
      image: '📊',
      category: 'web',
      technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      color: '#8A2BE2',
    },
    {
      id: 5,
      title: 'Social Media App',
      description: 'A modern social media platform with stories, reels, and messaging features.',
      fullDescription: 'Developed a full-featured social media application with infinite scroll feed, stories with AR filters, short video reels, real-time messaging, notifications, and content moderation.',
      image: '📱',
      category: 'mobile',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
      liveUrl: '#',
      githubUrl: '#',
      color: '#00F5FF',
    },
    {
      id: 6,
      title: 'Brand Identity - TechStart',
      description: 'Complete brand identity design for a tech startup including logo, guidelines, and marketing materials.',
      fullDescription: 'Created comprehensive brand identity including logo design, color palette, typography system, brand guidelines document, business cards, social media templates, and presentation deck.',
      image: '🎨',
      category: 'design',
      technologies: ['Figma', 'Illustrator', 'Photoshop'],
      liveUrl: '#',
      githubUrl: '#',
      color: '#8A2BE2',
    },
  ]

  const contactInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'shahnabi292@gmail.com',
      href: 'mailto:shahnabi292@gmail.com',
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '03495049514',
      href: 'tel:03495049514',
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Pakistan',
      href: '#',
    },
  ]

  const socialLinks = [
    { icon: FiGithub, href: '#', label: 'GitHub' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const scrollToSection = (e, href) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  if (loading) {
    return <PageLoader />
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} overflow-x-hidden bg-black transition-colors duration-500 noise-overlay`}>
      {/* Background Effects - True Black with Moving Grid (hidden in hero) */}
      <MovingGrid />
      
      {/* UI Layer */}
      <ScrollProgress />
      <MorphingCursor />
      <Spotlight />
      {/* FloatingIcons removed from hero - only show after hero section */}
      <div className="floating-icons-container">
        <FloatingIcons />
      </div>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <InteractiveTerminal />
      
      <main className="relative z-10">
        {/* ==================== HOME SECTION - NOIR STYLE ==================== */}
        <section ref={heroRef} id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black z-20">
          {/* Solid black overlay to hide any background elements */}
          <div className="absolute inset-0 bg-black z-0" />
          
          <motion.div 
            style={{ y, opacity, scale }} 
            className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto px-6"
          >
            {/* Large Portrait with B&W Filter and Gradient Fade */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="relative w-64 h-80 md:w-80 md:h-[400px] lg:w-96 lg:h-[480px] mb-0"
            >
              {/* Portrait Image Container */}
              <div className="relative w-full h-full overflow-hidden">
                <img 
                  src={profileImg} 
                  alt="Syed Shah Nabi" 
                  className="w-full h-full object-cover object-top noir-portrait"
                />
                {/* Gradient fade to black at bottom */}
                <div className="absolute inset-0 noir-gradient-mask" />
              </div>
            </motion.div>

            {/* Name in Elegant Script Font - Overlapping Portrait */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="font-script text-5xl md:text-7xl lg:text-8xl text-cream -mt-16 md:-mt-20 relative z-20"
            >
              Syed Shah Nabi
            </motion.h1>

            {/* Role in Clean Sans-Serif - Lowercase with Letter Spacing */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-sm md:text-base lg:text-lg text-gray-400 mt-4 mb-16 tracking-[0.3em] uppercase font-light"
            >
              Developer | AI ML
            </motion.p>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.a
            href="#about"
            onClick={(e) => scrollToSection(e, '#about')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group"
          >
            <span className="text-xs text-gray-500 uppercase tracking-[0.2em] group-hover:text-gray-300 transition-colors">
              Scroll Down
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"
            />
          </motion.a>
        </section>

        {/* Tech Stack Marquee */}
        <section className="py-8 border-y border-white/5">
          <InfiniteMarquee speed={30} />
        </section>

        {/* Stats Section */}
        <ScrollRevealSection id="stats" className="py-20 relative">
          <div className="container mx-auto px-6">
            <GlowingBorder className="rounded-3xl">
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                        <AnimatedCounter end={stat.number} suffix={stat.suffix} duration={2.5} />
                      </div>
                      <span className="text-gray-400 text-sm md:text-base">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlowingBorder>
          </div>
        </ScrollRevealSection>

        {/* ==================== ABOUT SECTION ==================== */}
        <ScrollRevealSection id="about" className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Image/Avatar */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-square max-w-md mx-auto">
                  <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-3xl blur-xl" />
                  <div className="absolute inset-0 glass rounded-3xl overflow-hidden flex items-center justify-center">
                    <span className="text-9xl">👨‍💻</span>
                  </div>
                  
                  {/* Floating Badge */}
                  <motion.div
                    className="absolute -bottom-6 -right-6 glass rounded-2xl p-4 z-10"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <p className="text-sm text-gray-400">Experience</p>
                    <p className="text-2xl font-bold gradient-text">1+ Year</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right - Content */}
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block px-4 py-2 glass rounded-full text-sm text-accent mb-6"
                >
                  About Me
                </motion.span>

                <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                  <AnimatedText text="Passionate Developer" className="text-white" />
                  <br />
                  <AnimatedText text="& Creative Designer" className="gradient-text" delay={0.3} />
                </h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4 text-gray-400 text-lg"
                >
                  <p>
                    Hello! I'm <span className="text-white font-semibold">Syed Shah Nabi</span>, a 
                    developer and UI/UX designer based in Pakistan. I specialize in 
                    building exceptional digital experiences that combine beautiful design with 
                    robust functionality.
                  </p>
                  <p>
                    With 1 year experience, I've been focused on learning and building 
                    real-world projects. I'm passionate about writing clean, efficient code and 
                    creating intuitive user interfaces that solve actual problems.
                  </p>
                </motion.div>

                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="mt-8"
                >
                  <p className="text-sm text-gray-500 mb-3">Technologies I work with:</p>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9 + index * 0.05 }}
                        className="px-3 py-1 text-sm glass rounded-full text-gray-300 hover:text-accent transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollRevealSection>

        {/* Fun Facts */}
        <ScrollRevealSection className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {funFacts.map((fact, index) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card3D className="glass rounded-2xl p-6 text-center">
                    <fact.icon className="w-8 h-8 text-accent mx-auto mb-3" />
                    <p className="text-3xl font-bold gradient-text mb-1">{fact.value}</p>
                    <p className="text-sm text-gray-400">{fact.label}</p>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        {/* Timeline */}
        <ScrollRevealSection className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
                <AnimatedText text="My Journey" className="gradient-text" />
              </h2>
              <p className="text-gray-400">A timeline of my professional experience</p>
            </motion.div>

            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-violet-500 to-transparent" />

              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <Card3D className="glass rounded-2xl p-6">
                      <span className="text-accent text-sm font-semibold">{item.year}</span>
                      <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
                      <p className="text-violet-400 text-sm mb-2">{item.company}</p>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </Card3D>
                  </div>

                  <motion.div
                    className="absolute left-8 md:left-1/2 w-4 h-4 bg-accent rounded-full border-4 border-black transform -translate-x-1/2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  />

                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        {/* ==================== SERVICES SECTION ==================== */}
        <ScrollRevealSection id="services" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 glass rounded-full text-sm text-accent mb-6"
              >
                What I Do
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
                <AnimatedText text="Services That Drive" className="text-white" />
                <br />
                <AnimatedText text="Results" className="gradient-text" delay={0.3} />
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                I offer a wide range of services to help you build your digital presence 
                and achieve your business goals.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card3D className="h-full">
                    <div className="glass rounded-3xl p-8 h-full flex flex-col group hover:bg-white/5 transition-colors">
                      <motion.div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                        style={{ backgroundColor: `${service.color}20` }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <service.icon 
                          className="w-8 h-8" 
                          style={{ color: service.color }}
                        />
                      </motion.div>

                      <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>

                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                            <span 
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: service.color }}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <motion.button
                        className="flex items-center gap-2 text-sm font-semibold group/btn"
                        style={{ color: service.color }}
                        whileHover={{ x: 5 }}
                      >
                        Learn More 
                        <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        {/* Skills Section */}
        <ScrollRevealSection className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
                <AnimatedGradientText text="What I Do" className="text-glow" />
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Technologies and expertise I bring to every project
              </p>
            </motion.div>

            <BentoGrid />
          </div>
        </ScrollRevealSection>

        {/* Skills Progress */}
        <ScrollRevealSection className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
                <AnimatedText text="My Skills" className="gradient-text" />
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Technologies and tools I use to bring ideas to life
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <HoverCard className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-white">{skill.name}</span>
                      <span className="text-sm text-accent font-medium">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full relative"
                        style={{ 
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        />
                      </motion.div>
                    </div>
                  </HoverCard>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        {/* ==================== PROJECTS SECTION ==================== */}
        <ScrollRevealSection id="projects" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 glass rounded-full text-sm text-accent mb-6"
              >
                Portfolio
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
                <AnimatedText text="Featured" className="text-white" />
                <br />
                <AnimatedText text="Projects" className="gradient-text" delay={0.3} />
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A collection of my recent work, showcasing my skills in development and design.
              </p>
            </motion.div>

            {/* Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                    selectedCategory === category
                      ? 'glow-button text-white'
                      : 'glass text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>

            {/* Projects Grid */}
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <TiltCard tiltAmount={10} glareEnabled={true}>
                      <ShineCard>
                        <motion.div
                          className="glass rounded-3xl overflow-hidden group cursor-pointer"
                          onClick={() => setSelectedProject(project)}
                          whileHover={{ y: -10 }}
                        >
                          <div 
                            className="h-48 flex items-center justify-center relative overflow-hidden"
                            style={{ backgroundColor: `${project.color}20` }}
                          >
                            <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                              {project.image}
                            </span>
                            
                            <motion.div
                              className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <span className="text-white font-semibold">View Details</span>
                            </motion.div>
                          </div>

                          <div className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <span 
                                className="px-2 py-1 rounded text-xs font-medium capitalize"
                                style={{ backgroundColor: `${project.color}30`, color: project.color }}
                              >
                                {project.category}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                            
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <span key={tech} className="text-xs text-gray-500">
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{project.technologies.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </ShineCard>
                    </TiltCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </ScrollRevealSection>

        {/* Testimonials */}
        <ScrollRevealSection className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 glass rounded-full text-sm text-accent mb-6"
              >
                Testimonials
              </motion.span>
              <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
                <AnimatedText text="What Clients Say" className="text-white" />
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Don't just take my word for it — hear from some of my amazing clients
              </p>
            </motion.div>
            
            <TestimonialsSlider />
          </div>
        </ScrollRevealSection>

        {/* ==================== GLOBE SECTION ==================== */}
        <Globe3D />

        {/* ==================== CYBER TYPER GAME SECTION ==================== */}
        <CyberTyper />

        {/* ==================== AI PROJECT MATCHER SECTION ==================== */}
        <ProjectMatcher />

        {/* ==================== CONTACT SECTION ==================== */}
        <ScrollRevealSection id="contact" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-2 glass rounded-full text-sm text-accent mb-6"
              >
                Get In Touch
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-bold font-display mb-6">
                <AnimatedText text="Let's Work" className="text-white" />
                <br />
                <AnimatedText text="Together" className="gradient-text" delay={0.3} />
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing together.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-8"
              >
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
                  <p className="text-gray-400">
                    Feel free to reach out through any of these channels. I typically respond within 24 hours.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Card3D className="glass rounded-2xl p-6 flex items-center gap-4 hover:bg-white/5 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center">
                          <info.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">{info.label}</p>
                          <p className="text-white font-medium">{info.value}</p>
                        </div>
                      </Card3D>
                    </motion.a>
                  ))}
                </div>

                <div>
                  <h3 className="text-sm text-gray-500 mb-4">Find me on</h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        className="p-3 glass rounded-full hover:bg-white/10 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -5 }}
                      >
                        <social.icon className="w-5 h-5 text-gray-400 hover:text-accent transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-3"
              >
                <Card3D>
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="glass rounded-3xl p-8 md:p-12 space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="Project Inquiry"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <MagneticButton
                      className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                        isSubmitted
                          ? 'bg-green-500 text-white'
                          : 'glow-button text-white'
                      }`}
                      type="submit"
                      disabled={isSubmitting || isSubmitted}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          Sending...
                        </>
                      ) : isSubmitted ? (
                        <>
                          <FiCheck className="w-5 h-5" />
                          Message Sent!
                        </>
                      ) : (
                        <>
                          <FiSend className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </MagneticButton>
                  </form>
                </Card3D>
              </motion.div>
            </div>
          </div>
        </ScrollRevealSection>

        {/* CTA Section */}
        <ScrollRevealSection className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center glass"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-cyan-500/10 animate-pulse" />
              
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>

              <motion.div
                className="absolute top-10 left-10 w-20 h-20 bg-cyan-500/30 rounded-full blur-xl"
                animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-10 right-10 w-32 h-32 bg-violet-500/30 rounded-full blur-xl"
                animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity }}
              />

              <div className="relative z-10">
                <span className="text-6xl mb-6 block">💬</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display text-glow">
                  Let's Create Something{' '}
                  <span className="animated-gradient-text">Amazing</span>{' '}
                  Together
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Have a project in mind? Let's discuss how we can work together to bring your vision to life.
                </p>
                <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>
                  <MagneticButton className="px-10 py-4 glow-button text-white font-bold rounded-full">
                    Get In Touch
                    <FiArrowRight className="inline ml-2" />
                  </MagneticButton>
                </a>
              </div>
            </motion.div>
          </div>
        </ScrollRevealSection>

        {/* Footer */}
        <footer className="py-8 border-t border-white/10">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-500">
              © {new Date().getFullYear()} Syed Shah Nabi. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
      
      <BackToTop />

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="relative glass rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full glass hover:bg-white/10 transition-colors z-10"
              >
                <FiX className="w-6 h-6" />
              </button>

              <div 
                className="h-64 flex items-center justify-center"
                style={{ backgroundColor: `${selectedProject.color}20` }}
              >
                <span className="text-9xl">{selectedProject.image}</span>
              </div>

              <div className="p-8">
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium capitalize inline-block mb-4"
                  style={{ backgroundColor: `${selectedProject.color}30`, color: selectedProject.color }}
                >
                  {selectedProject.category}
                </span>
                
                <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                <p className="text-gray-400 mb-6">{selectedProject.fullDescription}</p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 glass rounded-full text-sm text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 glow-button rounded-full text-white font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiExternalLink />
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 glass rounded-full text-white font-semibold hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiGithub />
                    Source Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* AI Chat Assistant */}
      <ChatAssistant />
    </div>
  )
}

export default App
