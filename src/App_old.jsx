import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowRight, FiGithub, FiLinkedin, FiTwitter, FiDownload, FiPlay, FiCode, FiAward, FiHeart, FiCoffee, FiLayout, FiSmartphone, FiDatabase, FiCloud, FiPenTool, FiExternalLink, FiMail, FiPhone, FiMapPin, FiSend, FiCheck } from 'react-icons/fi'

// Components
import Navbar from './components/Navbar'
import MorphingCursor from './components/MorphingCursor'
import PageLoader from './components/PageLoader'
import ParticleBackground from './components/ParticleBackground'
import ScrollProgress from './components/ScrollProgress'
import Spotlight from './components/Spotlight'
import FloatingIcons from './components/FloatingIcons'
import AuroraBackground from './components/AuroraBackground'
import GradientOrbs from './components/GradientOrbs'
import InteractiveTerminal from './components/InteractiveTerminal'
import { BackToTop, SmoothScrollIndicator } from './components/ScrollEffects'
import AnimatedText from './components/AnimatedText'
import Card3D from './components/Card3D'
import HeroScene3D from './components/HeroScene3D'
import MagneticButton from './components/MagneticButton'
import TypewriterText from './components/TypewriterText'
import InfiniteMarquee from './components/InfiniteMarquee'
import AnimatedCounter from './components/AnimatedCounter'
import GlowingBorder from './components/GlowingBorder'
import TextScramble from './components/TextScramble'
import BentoGrid from './components/BentoGrid'
import AnimatedGradientText from './components/AnimatedGradientText'
import HoverCard from './components/HoverCard'
import { TiltCard, Magnetic, ShineCard, RippleButton } from './components/InteractiveElements'
import { BlurReveal, MaskReveal, StaggerText } from './components/RevealAnimations'
import TestimonialsSlider from './components/TestimonialsSlider'
import Avatar3D from './components/Avatar3D'
import SkillsSphere from './components/SkillsSphere'
import ContactScene3D from './components/ContactScene3D'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

function App() {
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  const heroRef = useRef(null)
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

  useEffect(() => {
    if (window.innerWidth > 768) {
      document.body.classList.add('custom-cursor-active')
    }
    return () => document.body.classList.remove('custom-cursor-active')
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  if (loading) {
    return <PageLoader />
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
    { number: 50, label: 'Projects Completed', suffix: '+' },
    { number: 30, label: 'Happy Clients', suffix: '+' },
    { number: 5, label: 'Years Experience', suffix: '+' },
    { number: 99, label: 'Success Rate', suffix: '%' },
  ]

  const technologies = [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL',
    'MongoDB', 'AWS', 'Docker', 'Figma', 'Tailwind CSS', 'GraphQL'
  ]

  const funFacts = [
    { icon: FiCode, value: '100K+', label: 'Lines of Code' },
    { icon: FiCoffee, value: '500+', label: 'Cups of Coffee' },
    { icon: FiAward, value: '15+', label: 'Certifications' },
    { icon: FiHeart, value: '∞', label: 'Passion' },
  ]

  const timeline = [
    { year: '2024', title: 'Senior Full Stack Developer', company: 'Tech Company', description: 'Leading development teams and architecting scalable solutions.' },
    { year: '2022', title: 'Full Stack Developer', company: 'Startup Inc', description: 'Built and deployed multiple successful web applications.' },
    { year: '2020', title: 'Frontend Developer', company: 'Digital Agency', description: 'Created responsive and interactive user interfaces.' },
    { year: '2019', title: 'Started Coding Journey', company: 'Self-taught', description: 'Began learning programming and web development.' },
  ]

  const services = [
    {
      icon: FiCode,
      title: 'Web Development',
      description: 'Building fast, scalable web applications using modern technologies like React, Next.js, and Node.js.',
      features: ['Custom Web Apps', 'E-commerce Solutions', 'API Development', 'Performance Optimization'],
      color: '#6366f1',
    },
    {
      icon: FiLayout,
      title: 'UI/UX Design',
      description: 'Creating beautiful, intuitive interfaces that provide exceptional user experiences.',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
      color: '#06b6d4',
    },
    {
      icon: FiSmartphone,
      title: 'Mobile Development',
      description: 'Developing cross-platform mobile applications using React Native.',
      features: ['iOS Apps', 'Android Apps', 'Cross-platform', 'App Maintenance'],
      color: '#8b5cf6',
    },
    {
      icon: FiDatabase,
      title: 'Backend Development',
      description: 'Building robust server-side applications and managing databases efficiently.',
      features: ['REST APIs', 'GraphQL', 'Database Design', 'Authentication'],
      color: '#10b981',
    },
    {
      icon: FiCloud,
      title: 'Cloud Solutions',
      description: 'Deploying and managing applications on cloud platforms like AWS and Vercel.',
      features: ['Cloud Migration', 'DevOps', 'CI/CD Pipelines', 'Monitoring'],
      color: '#f59e0b',
    },
    {
      icon: FiPenTool,
      title: 'Brand Identity',
      description: 'Creating memorable brand identities that resonate with your target audience.',
      features: ['Logo Design', 'Brand Guidelines', 'Marketing Materials', 'Social Media'],
      color: '#ec4899',
    },
  ]

  const categories = ['all', 'web', 'mobile', 'design', 'backend']

  const projects = [
    {
      id: 1, title: 'E-Commerce Platform', description: 'A full-featured e-commerce platform with real-time inventory management.',
      image: '🛒', category: 'web', technologies: ['React', 'Node.js', 'MongoDB'], color: '#6366f1',
    },
    {
      id: 2, title: 'Task Management App', description: 'A collaborative task management application with real-time updates.',
      image: '📋', category: 'web', technologies: ['Next.js', 'TypeScript', 'PostgreSQL'], color: '#06b6d4',
    },
    {
      id: 3, title: 'Fitness Tracking App', description: 'A mobile app for tracking workouts and nutrition.',
      image: '💪', category: 'mobile', technologies: ['React Native', 'Firebase'], color: '#10b981',
    },
    {
      id: 4, title: 'Financial Dashboard', description: 'An interactive dashboard for tracking investments.',
      image: '📊', category: 'web', technologies: ['React', 'D3.js', 'Python'], color: '#f59e0b',
    },
    {
      id: 5, title: 'Social Media App', description: 'A modern social media platform with stories and messaging.',
      image: '📱', category: 'mobile', technologies: ['React Native', 'Node.js', 'MongoDB'], color: '#ec4899',
    },
    {
      id: 6, title: 'Brand Identity', description: 'Complete brand identity design for a tech startup.',
      image: '🎨', category: 'design', technologies: ['Figma', 'Illustrator'], color: '#8b5cf6',
    },
  ]

  const filteredProjects = selectedCategory === 'all' ? projects : projects.filter(p => p.category === selectedCategory)

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: 'hello@syedshahnabi.com', href: 'mailto:hello@syedshahnabi.com' },
    { icon: FiPhone, label: 'Phone', value: '+92 300 1234567', href: 'tel:+923001234567' },
    { icon: FiMapPin, label: 'Location', value: 'Pakistan', href: '#' },
  ]

  const socialLinks = [
    { icon: FiGithub, href: '#', label: 'GitHub' },
    { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
  ]

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

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <AuroraBackground />
      <GradientOrbs />
      <ScrollProgress />
      <MorphingCursor />
      <Spotlight />
      <FloatingIcons />
      <ParticleBackground />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <InteractiveTerminal />
      
      <main className="relative z-10">
