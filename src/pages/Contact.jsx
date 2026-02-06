import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheck, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import PageTransition from '../components/PageTransition'
import AnimatedText from '../components/AnimatedText'
import Card3D from '../components/Card3D'
import MagneticButton from '../components/MagneticButton'
import ContactScene3D from '../components/ContactScene3D'
import { TiltCard, RippleButton } from '../components/InteractiveElements'

const Contact = () => {
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

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
            Get In Touch
          </motion.span>

          <h1 className="text-4xl md:text-6xl font-bold font-display mb-6">
            <AnimatedText text="Let's Work" className="text-white" />
            <br />
            <AnimatedText text="Together" className="gradient-text" delay={0.3} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing together.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                <p className="text-gray-400">
                  Feel free to reach out through any of these channels. I typically respond within 24 hours.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Card3D className="glass rounded-2xl p-6 flex items-center gap-4 hover:bg-white/5 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
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

              {/* Social Links */}
              <div>
                <h3 className="text-sm text-gray-500 mb-4">Find me on</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="p-3 glass rounded-full hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <social.icon className="w-5 h-5 text-gray-400 hover:text-accent transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* 3D Contact Scene */}
              <motion.div
                className="hidden lg:block relative h-64"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
                <div className="absolute inset-0 glass rounded-3xl overflow-hidden">
                  <ContactScene3D />
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-3"
            >
              <Card3D>
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="glass rounded-3xl p-8 md:p-12 space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
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
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
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
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
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
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  {/* Message */}
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
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <MagneticButton
                    className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                      isSubmitted
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/50'
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
      </section>

      {/* Map or Additional CTA */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 text-center relative overflow-hidden"
          >
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
            
            <div className="relative z-10">
              <span className="text-6xl mb-6 block">💬</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-display">
                Prefer a Quick Chat?
              </h2>
              <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                Schedule a free 30-minute consultation call to discuss your project requirements.
              </p>
              <MagneticButton className="px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-full text-white font-semibold">
                Schedule a Call
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Syed Shah Nabi. All rights reserved.
          </p>
        </div>
      </footer>
    </PageTransition>
  )
}

export default Contact
