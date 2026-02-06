import { motion } from 'framer-motion'
import { FiCode, FiLayout, FiSmartphone, FiDatabase, FiCloud, FiPenTool, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import AnimatedText from '../components/AnimatedText'
import Card3D from '../components/Card3D'
import MagneticButton from '../components/MagneticButton'

const Services = () => {
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

  const process = [
    { step: '01', title: 'Discovery', description: 'Understanding your goals and requirements' },
    { step: '02', title: 'Planning', description: 'Creating a roadmap and technical architecture' },
    { step: '03', title: 'Design', description: 'Crafting beautiful and functional designs' },
    { step: '04', title: 'Development', description: 'Building your solution with clean code' },
    { step: '05', title: 'Testing', description: 'Ensuring quality and performance' },
    { step: '06', title: 'Launch', description: 'Deploying and ongoing support' },
  ]

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
            What I Do
          </motion.span>

          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            <AnimatedText text="Services That Drive" className="text-white" />
            <br />
            <AnimatedText text="Results" className="gradient-text" delay={0.3} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            I offer a wide range of services to help you build your digital presence 
            and achieve your business goals.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
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
                    {/* Icon */}
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

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>

                    {/* Features */}
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

                    {/* Link */}
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
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
              <AnimatedText text="My Process" className="gradient-text" />
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A streamlined approach to deliver exceptional results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-8 relative overflow-hidden group"
              >
                {/* Background Number */}
                <span className="absolute -right-4 -top-4 text-9xl font-bold text-white/5 group-hover:text-primary/10 transition-colors">
                  {item.step}
                </span>
                
                <span className="text-accent text-sm font-bold mb-2 block">Step {item.step}</span>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 relative z-10">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
          >
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display">
                Ready to Start Your Project?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Let's discuss your ideas and bring them to life together.
              </p>
              <Link to="/contact">
                <MagneticButton className="px-10 py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-full">
                  Get Started
                </MagneticButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}

export default Services
