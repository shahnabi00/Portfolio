import { motion } from 'framer-motion'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { FiCode, FiAward, FiHeart, FiCoffee } from 'react-icons/fi'
import PageTransition from '../components/PageTransition'
import AnimatedText from '../components/AnimatedText'
import Card3D from '../components/Card3D'
import Avatar3D from '../components/Avatar3D'
import SkillsSphere from '../components/SkillsSphere'

const About = () => {
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

  const technologies = [
    'HTML', 'CSS', 'Java', 'Tailwind CSS', 'Python', 'C++',
    'TypeScript', 'Pandas'
  ]

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* 3D Avatar */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-3xl opacity-20 blur-xl" />
                <div className="absolute inset-0 glass rounded-3xl overflow-hidden">
                  {/* 3D Avatar */}
                  <Avatar3D className="w-full h-full" />
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

            {/* Content */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-2 glass rounded-full text-sm text-accent mb-6"
              >
                About Me
              </motion.span>

              <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
                <AnimatedText text="Passionate Developer" className="text-white" />
                <br />
                <AnimatedText text="& Creative Designer" className="gradient-text" delay={0.3} />
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing 
                  to open-source projects, or sharing knowledge with the developer community.
                </p>
              </motion.div>

              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
                <p className="text-sm text-gray-500 mb-3">Technologies I work with:</p>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
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
      </section>

      {/* 3D Skills Visualization */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
              <AnimatedText text="My Skills" className="gradient-text" />
            </h2>
            <p className="text-gray-400">Hover over the orbs to see skill levels</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[500px] w-full glass rounded-3xl overflow-hidden relative"
          >
            <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
              <Suspense fallback={null}>
                <SkillsSphere />
              </Suspense>
            </Canvas>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-dark/50 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="py-20">
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
      </section>

      {/* Timeline */}
      <section className="py-20">
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
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

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
                {/* Content */}
                <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <Card3D className="glass rounded-2xl p-6">
                    <span className="text-accent text-sm font-semibold">{item.year}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
                    <p className="text-primary-light text-sm mb-2">{item.company}</p>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </Card3D>
                </div>

                {/* Dot */}
                <motion.div
                  className="absolute left-8 md:left-1/2 w-4 h-4 bg-accent rounded-full border-4 border-dark transform -translate-x-1/2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                />

                {/* Hidden spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default About
