import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { FiArrowRight, FiGithub, FiLinkedin, FiTwitter, FiDownload, FiPlay } from 'react-icons/fi'
import PageTransition from '../components/PageTransition'
import AnimatedText from '../components/AnimatedText'
import Card3D from '../components/Card3D'
import HeroScene3D from '../components/HeroScene3D'
import MagneticButton from '../components/MagneticButton'
import TypewriterText from '../components/TypewriterText'
import profileImg from '../assets/shahnabi.png'
import InfiniteMarquee from '../components/InfiniteMarquee'
import AnimatedCounter from '../components/AnimatedCounter'
import GlowingBorder from '../components/GlowingBorder'
import TextScramble from '../components/TextScramble'
import BentoGrid from '../components/BentoGrid'
import AnimatedGradientText from '../components/AnimatedGradientText'
import HoverCard from '../components/HoverCard'
import { TiltCard, Magnetic } from '../components/InteractiveElements'
import { BlurReveal, MaskReveal, StaggerText } from '../components/RevealAnimations'
import TestimonialsSlider from '../components/TestimonialsSlider'

const Home = () => {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

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

  const featuredProjects = [
    { title: 'E-Commerce Platform', category: 'Web Development', image: '🛒', color: '#6366f1' },
    { title: 'Fitness App', category: 'Mobile App', image: '💪', color: '#10b981' },
    { title: 'Dashboard UI', category: 'UI/UX Design', image: '📊', color: '#f59e0b' },
  ]

  return (
    <PageTransition>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* 3D Background Scene */}
        <HeroScene3D />
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-transparent to-dark/80 pointer-events-none" />

        <motion.div style={{ y, opacity, scale }} className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
              >
                <motion.span 
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="text-sm text-gray-300">Available for work</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-4 leading-tight">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                  className="text-white block"
                >
                  Hi, I'm
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                  className="gradient-text block"
                >
                  <TextScramble text="Syed Shah Nabi" delay={0.8} />
                </motion.span>
              </h1>

              {/* Typewriter Effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-xl md:text-2xl text-gray-400 mb-8 h-10"
              >
                A <TypewriterText className="text-accent font-semibold" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Crafting beautiful, functional digital experiences that users love.
                Turning ideas into pixel-perfect reality.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <Link to="/projects">
                  <MagneticButton className="group px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-full text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-shadow">
                    View My Work
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </MagneticButton>
                </Link>
                <MagneticButton className="group px-8 py-4 glass rounded-full text-white font-semibold flex items-center gap-2 hover:bg-white/10 transition-colors border border-white/10">
                  <FiPlay className="w-4 h-4" />
                  Watch Intro
                </MagneticButton>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex gap-4 mt-8 justify-center lg:justify-start"
              >
                {[
                  { icon: FiGithub, href: '#', label: 'GitHub' },
                  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
                  { icon: FiTwitter, href: '#', label: 'Twitter' },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="p-3 glass rounded-full hover:bg-white/10 transition-colors group"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-accent transition-colors" />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Right - Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex justify-center lg:justify-end"
            >
              <Card3D className="relative">
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(45deg, #6366f1, #06b6d4, #818cf8, #22d3ee)',
                      backgroundSize: '400% 400%',
                      padding: '4px',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="w-full h-full rounded-full bg-dark" />
                  </motion.div>
                  
                  {/* Profile Image */}
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center overflow-hidden">
                    <img 
                      src={profileImg} 
                      alt="Shah Nabi" 
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 p-4 glass rounded-xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-2xl">⚛️</span>
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-4 -left-4 p-4 glass rounded-xl"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <span className="text-2xl">🎨</span>
                  </motion.div>
                  <motion.div
                    className="absolute top-1/2 -right-8 p-4 glass rounded-xl"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  >
                    <span className="text-2xl">💻</span>
                  </motion.div>
                </div>
              </Card3D>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-accent rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-8 border-y border-white/5">
        <InfiniteMarquee speed={30} />
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
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

          {/* Bento Grid */}
          <BentoGrid />
        </div>
      </section>

      {/* Skills Progress Section */}
      <section className="py-20">
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
                      {/* Shine effect */}
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
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
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
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-12 md:p-20 text-center glass-premium"
          >
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 animate-pulse" />
            
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-3xl animated-border" />
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Floating Orbs */}
            <motion.div
              className="absolute top-10 left-10 w-20 h-20 bg-primary/30 rounded-full blur-xl"
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-32 h-32 bg-accent/30 rounded-full blur-xl"
              animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
            />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="inline-flex mb-6"
              >
                <span className="px-4 py-2 glass rounded-full text-sm text-accent border border-accent/30">
                  ✨ Let's Collaborate
                </span>
              </motion.div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display text-glow">
                Let's Create Something{' '}
                <span className="animated-gradient-text">Amazing</span>{' '}
                Together
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Have a project in mind? Let's discuss how we can work together to bring your vision to life.
              </p>
              <Link to="/contact">
                <MagneticButton className="btn-shine px-10 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full hover:shadow-xl hover:shadow-primary/50 transition-all duration-300 glow-pulse">
                  Get In Touch
                  <FiArrowRight className="inline ml-2" />
                </MagneticButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}

export default Home
