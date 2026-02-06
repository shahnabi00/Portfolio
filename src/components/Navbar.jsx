import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'services', 'projects', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.43, 0.13, 0.23, 0.96],
          delay: 0.2 
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled 
            ? 'py-3 shadow-lg shadow-cyan-500/5' 
            : 'py-5 bg-transparent'
        }`}
        style={{ 
          willChange: 'transform, padding, background',
          background: isScrolled ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="relative group">
            <motion.span 
              className="text-2xl font-bold font-display"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white">Syed</span>
              <span className="gradient-text ml-1">ShahNabi</span>
            </motion.span>
            <motion.div 
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="relative group"
              >
                <motion.span
                  className={`text-sm font-medium transition-colors ${
                    activeSection === link.href.replace('#', '') 
                      ? 'text-cyan-400' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.label}
                </motion.span>
                {activeSection === link.href.replace('#', '') && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full glass hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {darkMode ? (
                <FiSun className="w-5 h-5 text-yellow-400" />
              ) : (
                <FiMoon className="w-5 h-5 text-violet-400" />
              )}
            </motion.button>

            {/* CTA Button */}
            <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>
              <motion.button
                className="hidden md:block px-6 py-2 glow-button rounded-full text-white text-sm font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                Let's Talk
              </motion.button>
            </a>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full glass transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div 
              className="absolute right-0 top-0 h-full w-72 p-8 pt-24"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                stiffness: 300, 
                damping: 30,
                mass: 0.8
              }}
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => scrollToSection(e, link.href)}
                      className={`text-lg font-medium transition-colors ${
                        activeSection === link.href.replace('#', '') 
                          ? 'text-cyan-400' 
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>
                    <button className="w-full mt-4 px-6 py-3 glow-button rounded-full text-white font-semibold">
                      Let's Talk
                    </button>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
