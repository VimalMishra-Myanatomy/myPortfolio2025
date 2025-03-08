"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, Linkedin, Code2, Trophy, Send, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ContactProps {
  sectionRef: React.RefObject<HTMLElement>
}

export default function Contact({ sectionRef }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [easterEggCount, setEasterEggCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  useEffect(() => {
    if (easterEggCount >= 5) {
      setShowEasterEgg(true)
      setTimeout(() => setShowEasterEgg(false), 3000)
      setEasterEggCount(0)
    }
  }, [easterEggCount])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending for a moment
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background gradient and blur effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-violet-50/50 dark:from-blue-950/50 dark:to-violet-950/50 backdrop-blur-3xl" />
      
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-12"
        >
          <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
            Contact
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                Get in Touch
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-4">
              <motion.a
                href="mailto:mishravimal000@gmail.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors p-3 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 backdrop-blur-sm"
              >
                <Mail className="w-5 h-5" />
                <span>mishravimal000@gmail.com</span>
              </motion.a>
              <motion.div 
                className="flex items-center gap-3 text-slate-600 dark:text-slate-300 p-3 rounded-lg cursor-pointer hover:bg-white/50 dark:hover:bg-slate-800/50 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setEasterEggCount(prev => prev + 1)}
              >
                <Phone className="w-5 h-5" />
                <span>+91 •••• •••• ••</span>
              </motion.div>
            </div>

            <div className="flex gap-4">
              {[
                { href: "https://www.linkedin.com/in/mishravimal786/", icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
                { href: "https://leetcode.com/mishravimal99/", icon: <Code2 className="w-5 h-5" />, label: "LeetCode" },
                { href: "https://www.hackerrank.com/profile/mishravimal99", icon: <Trophy className="w-5 h-5" />, label: "HackerRank" }
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors backdrop-blur-sm shadow-lg hover:shadow-xl"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 dark:bg-slate-800/80 rounded-xl shadow-lg p-6 backdrop-blur-sm border border-white/20 dark:border-slate-700/20"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-300/50 dark:border-slate-600/50 bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-300/50 dark:border-slate-600/50 bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300/50 dark:border-slate-600/50 bg-white/50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-500 dark:to-violet-500 text-white hover:from-blue-700 hover:to-violet-700 dark:hover:from-blue-600 dark:hover:to-violet-600 transition-all duration-300 shadow-lg hover:shadow-xl ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </span>
              </motion.button>
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/50 dark:to-violet-900/50 p-4 rounded-lg mt-4 border border-blue-100 dark:border-blue-800"
                  >
                    <p className="text-slate-800 dark:text-slate-200 text-sm text-center flex flex-col items-center gap-3">
                      <span className="text-lg font-semibold flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-500" />
                        Plot Twist! 🎭
                      </span>
                      <span>
                        This form doesn't actually work... <i>yet</i>! But here's the deal:
                      </span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        If you hire me, I'll not only fix this form but also build you something 10x more awesome! 
                      </span>
                      <span className="text-xs opacity-80">
                        (In the meantime, feel free to reach out via email or LinkedIn 😉)
                      </span>
                      <motion.div 
                        className="flex gap-2 mt-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.a
                          href="mailto:mishravimal000@gmail.com"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                          Email Me
                        </motion.a>
                        <motion.a
                          href="https://www.linkedin.com/in/mishravimal786/"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        >
                          LinkedIn
                        </motion.a>
                      </motion.div>
                    </p>
                  </motion.div>
                )}
                {submitStatus === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-600 dark:text-red-400 text-sm text-center"
                  >
                    Oops! Something went wrong. Please try again or email directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Easter Egg */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 p-6 rounded-xl shadow-2xl backdrop-blur-sm border border-white/20 dark:border-slate-700/20"
          >
            <p className="text-lg font-semibold text-center text-slate-900 dark:text-white">
              🎉 You found the easter egg! 🎉
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              My actual number is hidden somewhere in the code... or is it? 😉
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
} 