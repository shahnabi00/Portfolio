import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, User, Mail, Phone, MessageSquare, Calendar, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

// ========== GOOGLE SHEETS CONFIG ==========
// After setup, paste your Google Apps Script URL here:
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzjW4IqgnEiOKTp6M4kN-1xiTdB-M1frSRyy_noCybT5Ka4XdZBRYoaDQqBxKFiFTvf/exec"

const ContactForm = ({ isOpen, onClose, defaultMeetingType = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    meetingType: defaultMeetingType ? 'meeting' : 'general'
  })
  
  const [status, setStatus] = useState('idle') // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('')
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'Portfolio Website'
        })
      })
      
      // With no-cors, we can't read response, so assume success
      setStatus('success')
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          meetingType: 'general'
        })
        setTimeout(() => {
          onClose()
          setStatus('idle')
        }, 1000)
      }, 2000)
      
    } catch (error) {
      console.error('Form submission error:', error)
      setStatus('error')
      setErrorMessage('Failed to submit. Please try emailing directly.')
    }
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Form Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="bg-[#0a0a15] rounded-2xl shadow-2xl border border-cyan-500/20 w-[500px] max-w-full my-auto" style={{ boxShadow: '0 0 50px rgba(0, 245, 255, 0.2)' }}>
              {/* Header */}
              <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-6 rounded-t-2xl relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    {defaultMeetingType ? (
                      <Calendar className="w-6 h-6 text-white" />
                    ) : (
                      <MessageSquare className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {defaultMeetingType ? 'Schedule a Meeting' : 'Get in Touch'}
                    </h2>
                    <p className="text-white/70 text-sm">I'll get back to you within 24 hours</p>
                  </div>
                </div>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                </div>
                
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                </div>
                
                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone <span className="text-gray-500">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 300 1234567"
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                  </div>
                </div>
                
                {/* Meeting Type */}
                <div>
                  <label htmlFor="meetingType" className="block text-sm font-medium text-gray-300 mb-2">
                    Inquiry Type *
                  </label>
                  <select
                    id="meetingType"
                    name="meetingType"
                    value={formData.meetingType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                  >
                    <option value="general" className="bg-[#0a0a15]">General Inquiry</option>
                    <option value="meeting" className="bg-[#0a0a15]">Schedule a Meeting</option>
                    <option value="freelance" className="bg-[#0a0a15]">Freelance Project</option>
                    <option value="job" className="bg-[#0a0a15]">Job Opportunity</option>
                    <option value="collaboration" className="bg-[#0a0a15]">Collaboration</option>
                    <option value="other" className="bg-[#0a0a15]">Other</option>
                  </select>
                </div>
                
                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell me about your project or inquiry..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                  />
                </div>
                
                {/* Status Messages */}
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm font-medium">Message sent successfully! 🎉</span>
                    </motion.div>
                  )}
                  
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm">{errorMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                  whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                  className={`w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                    status === 'loading' || status === 'success'
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:shadow-[0_0_30px_rgba(0,245,255,0.3)]'
                  }`}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
                
                {/* Privacy Note */}
                <p className="text-xs text-gray-500 text-center">
                  Your information is securely stored and will never be shared with third parties.
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ContactForm
