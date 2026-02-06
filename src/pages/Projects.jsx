import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi'
import PageTransition from '../components/PageTransition'
import AnimatedText from '../components/AnimatedText'
import Card3D from '../components/Card3D'
import { TiltCard, ShineCard, Magnetic } from '../components/InteractiveElements'
import { BlurReveal, MaskReveal } from '../components/RevealAnimations'

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

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
      color: '#6366f1',
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
      color: '#06b6d4',
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
      color: '#10b981',
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
      color: '#f59e0b',
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
      color: '#ec4899',
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
      color: '#8b5cf6',
    },
    {
      id: 7,
      title: 'API Gateway',
      description: 'A scalable API gateway with rate limiting, caching, and authentication.',
      fullDescription: 'Built a high-performance API gateway handling millions of requests with JWT authentication, rate limiting, request caching, load balancing, and comprehensive logging and monitoring.',
      image: '⚡',
      category: 'backend',
      technologies: ['Node.js', 'Redis', 'Docker', 'Kubernetes', 'Nginx'],
      liveUrl: '#',
      githubUrl: '#',
      color: '#ef4444',
    },
    {
      id: 8,
      title: 'Learning Platform',
      description: 'An online learning platform with video courses, quizzes, and certifications.',
      fullDescription: 'Developed an educational platform with video streaming, interactive quizzes, progress tracking, certificate generation, instructor dashboard, and payment integration.',
      image: '📚',
      category: 'web',
      technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'AWS S3', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      color: '#14b8a6',
    },
  ]

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 glass rounded-full text-sm text-accent mb-6"
          >
            Portfolio
          </motion.span>

          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            <AnimatedText text="Featured" className="text-white" />
            <br />
            <AnimatedText text="Projects" className="gradient-text" delay={0.3} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            A collection of my recent work, showcasing my skills in development and design.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary to-accent text-white'
                    : 'glass text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
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
                        data-cursor="project"
                        data-cursor-text="View"
                      >
                        {/* Image */}
                        <div 
                          className="h-48 flex items-center justify-center relative overflow-hidden"
                        style={{ backgroundColor: `${project.color}20` }}
                      >
                        <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                          {project.image}
                        </span>
                        
                        {/* Overlay on Hover */}
                        <motion.div
                          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="text-white font-semibold">View Details</span>
                        </motion.div>
                      </div>

                      {/* Content */}
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
                        
                        {/* Tech Stack */}
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
      </section>

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
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="relative glass rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full glass hover:bg-white/10 transition-colors z-10"
              >
                <FiX className="w-6 h-6" />
              </button>

              {/* Image */}
              <div 
                className="h-64 flex items-center justify-center"
                style={{ backgroundColor: `${selectedProject.color}20` }}
              >
                <span className="text-9xl">{selectedProject.image}</span>
              </div>

              {/* Content */}
              <div className="p-8">
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium capitalize inline-block mb-4"
                  style={{ backgroundColor: `${selectedProject.color}30`, color: selectedProject.color }}
                >
                  {selectedProject.category}
                </span>
                
                <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                <p className="text-gray-400 mb-6">{selectedProject.fullDescription}</p>

                {/* Technologies */}
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

                {/* Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-full text-white font-semibold"
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
    </PageTransition>
  )
}

export default Projects
