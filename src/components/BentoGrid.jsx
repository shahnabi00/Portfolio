import { motion } from 'framer-motion'
import { FiCode, FiLayers, FiZap, FiTrendingUp, FiGlobe, FiCpu } from 'react-icons/fi'

const BentoGrid = () => {
  const items = [
    {
      title: 'Modern Tech Stack',
      description: 'Building with React, Next.js, and cutting-edge technologies',
      icon: FiCode,
      className: 'md:col-span-2 md:row-span-2',
      gradient: 'from-violet-500/20 to-purple-500/20',
      iconColor: 'text-violet-400',
    },
    {
      title: 'UI/UX Design',
      description: 'Creating beautiful, intuitive interfaces',
      icon: FiLayers,
      className: 'md:col-span-1',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      iconColor: 'text-cyan-400',
    },
    {
      title: 'Performance',
      description: 'Optimized for speed',
      icon: FiZap,
      className: 'md:col-span-1',
      gradient: 'from-amber-500/20 to-orange-500/20',
      iconColor: 'text-amber-400',
    },
    {
      title: 'Scalable Solutions',
      description: 'Built to grow with your business',
      icon: FiTrendingUp,
      className: 'md:col-span-1',
      gradient: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-400',
    },
    {
      title: 'Global Reach',
      description: 'Working with clients worldwide',
      icon: FiGlobe,
      className: 'md:col-span-1',
      gradient: 'from-pink-500/20 to-rose-500/20',
      iconColor: 'text-pink-400',
    },
    {
      title: 'AI Integration',
      description: 'Implementing smart solutions',
      icon: FiCpu,
      className: 'md:col-span-2',
      gradient: 'from-indigo-500/20 to-blue-500/20',
      iconColor: 'text-indigo-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`${item.className} group`}
        >
          <div className={`relative h-full p-6 rounded-3xl bg-gradient-to-br ${item.gradient} backdrop-blur-sm border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-primary/10`}>
            {/* Shine Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
            
            {/* Glow on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`inline-flex p-3 rounded-2xl bg-white/5 ${item.iconColor} mb-4`}
              >
                <item.icon className="w-6 h-6" />
              </motion.div>
              
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                {item.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Decorative Corner */}
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-3xl" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default BentoGrid
