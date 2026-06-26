import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

export default function ProjectInquiryDrawer({ isOpen, onClose }) {
  const containerRef = useRef(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Status and Validation states
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Detect responsive screen width (initialize directly to prevent variant shifts)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Listen to Escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Disable background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('drawer-open-lock');
    } else {
      document.body.classList.remove('drawer-open-lock');
    }
    return () => {
      document.body.classList.remove('drawer-open-lock');
    };
  }, [isOpen]);

  // Textarea auto-resize
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = 'Name is required';

    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    // Validate phone number: accepts optional + country code, digits, spaces, dashes, parentheses
    const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
    if (!phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(phone.trim())) {
      tempErrors.phone = 'Please enter a valid phone number (e.g. +1 234 567 8900)';
    }

    if (!subject.trim()) tempErrors.subject = 'Subject is required';
    if (!message.trim()) tempErrors.message = 'Message is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate premium submit delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  // Motion variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Force inactive axis to 0 to prevent element getting stuck off-screen on axis change
  const panelVariants = {
    hidden: isMobile ? { y: '100%', x: 0 } : { x: '100%', y: 0 },
    visible: { x: 0, y: 0 },
    exit: isMobile ? { y: '100%', x: 0 } : { x: '100%', y: 0 },
  };

  const panelTransition = isMobile
    ? { type: 'spring', damping: 30, stiffness: 250 }
    : { ease: [0.16, 1, 0.3, 1], duration: 0.45 };

  return (
    <div className="fixed inset-0 z-[999999] flex justify-end items-end md:items-stretch overflow-hidden select-none pointer-events-auto">
      {/* Backdrop overlay */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10"
      />

      {/* Inquiry Panel */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={panelVariants}
        transition={panelTransition}
        drag={isMobile ? "y" : false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.05, bottom: 0.7 }}
        onDragEnd={(event, info) => {
          if (info.offset.y > 140) {
            onClose();
          }
        }}
        className="relative z-20 w-full h-[90dvh] md:h-full md:max-w-xl bg-brand-sec border-t md:border-t-0 md:border-l border-brand-border backdrop-blur-2xl flex flex-col md:rounded-l-[28px] rounded-t-[28px] shadow-[0_-15px_50px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Mobile Swipe Bar Indicator */}
        {isMobile && (
          <div className="flex justify-center py-3 w-full shrink-0">
            <div className="w-12 h-1 rounded-full bg-brand-text/10" />
          </div>
        )}

        {/* Drawer Header (Sticky) */}
        <div className="px-6 py-5 border-b border-brand-border flex items-center justify-between shrink-0 bg-brand-sec z-10">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-brand-text tracking-tight uppercase leading-none">
              Let's Build Something Amazing
            </h2>
            <p className="text-xs text-brand-text-muted mt-2 tracking-wide font-light">
              Tell me about your project and I'll get back to you within 24 hours.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full border border-brand-border bg-brand-bg/50 text-brand-text hover:text-brand-red hover:border-brand-red/30 transition-all duration-300 cursor-pointer flex items-center justify-center"
            aria-label="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin select-text">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="inquiry-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-brand-text/60 block">Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    className={`w-full min-h-[48px] bg-brand-bg/60 border ${errors.name ? 'border-brand-red' : 'border-brand-border'} rounded-xl px-4 py-2.5 text-sm text-brand-text focus:border-brand-red focus:outline-none transition-colors duration-300 shadow-inner`}
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="text-[10px] text-brand-red font-semibold block">{errors.name}</span>}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-brand-text/60 block">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                    }}
                    className={`w-full min-h-[48px] bg-brand-bg/60 border ${errors.email ? 'border-brand-red' : 'border-brand-border'} rounded-xl px-4 py-2.5 text-sm text-brand-text focus:border-brand-red focus:outline-none transition-colors duration-300 shadow-inner`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="text-[10px] text-brand-red font-semibold block">{errors.email}</span>}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-brand-text/60 block">Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    className={`w-full min-h-[48px] bg-brand-bg/60 border ${errors.phone ? 'border-brand-red' : 'border-brand-border'} rounded-xl px-4 py-2.5 text-sm text-brand-text focus:border-brand-red focus:outline-none transition-colors duration-300 shadow-inner`}
                    placeholder="+1 (234) 567-8900"
                  />
                  {errors.phone && <span className="text-[10px] text-brand-red font-semibold block">{errors.phone}</span>}
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-brand-text/60 block">Subject *</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (errors.subject) setErrors(prev => ({ ...prev, subject: '' }));
                    }}
                    className={`w-full min-h-[48px] bg-brand-bg/60 border ${errors.subject ? 'border-brand-red' : 'border-brand-border'} rounded-xl px-4 py-2.5 text-sm text-brand-text focus:border-brand-red focus:outline-none transition-colors duration-300 shadow-inner`}
                    placeholder="e.g. Redesign Project / Website Consulting"
                  />
                  {errors.subject && <span className="text-[10px] text-brand-red font-semibold block">{errors.subject}</span>}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-brand-text/60 block">Message *</label>
                  <textarea
                    value={message}
                    onChange={handleMessageChange}
                    rows={4}
                    className={`w-full min-h-[100px] bg-brand-bg/60 border ${errors.message ? 'border-brand-red' : 'border-brand-border'} rounded-xl px-4 py-3 text-sm text-brand-text focus:border-brand-red focus:outline-none transition-colors duration-300 shadow-inner resize-none overflow-hidden`}
                    placeholder="Tell me about your project context, timeline goals, and requirements..."
                  />
                  {errors.message && <span className="text-[10px] text-brand-red font-semibold block">{errors.message}</span>}
                </div>
              </motion.form>
            ) : (
              // Success Screen View
              <motion.div
                key="success-view"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex flex-col justify-center items-center text-center px-6 py-12 space-y-6 animate-fade-in"
              >
                {/* Glowing Success Ring */}
                <div className="relative w-20 h-20 rounded-full bg-brand-red/10 border border-brand-red/30 flex items-center justify-center shadow-[0_0_30px_rgba(255,32,32,0.25)]">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FF2020"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.polyline
                      points="20 6 9 17 4 12"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.2, duration: 0.5, ease: 'easeInOut' }}
                    />
                  </motion.svg>
                </div>

                <div className="space-y-3 max-w-sm">
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-brand-text">
                    Message Sent
                  </h3>
                  <p className="text-sm text-brand-text/60 leading-relaxed font-light">
                    Thank you! Your message has been sent successfully. I'll get back to you soon.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3.5 bg-brand-text text-brand-bg font-bold rounded-full text-sm hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg"
                >
                  Return to Portfolio
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sticky Footer (only show if not submitted) */}
        {!isSubmitted && (
          <div className="px-6 py-4 border-t border-brand-border bg-brand-sec flex items-center justify-between gap-4 shrink-0 z-10 sticky bottom-0">
            {/* Cancel Button */}
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-brand-border bg-transparent text-brand-text/60 hover:text-brand-text hover:border-brand-text/20 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300 cursor-pointer"
            >
              Cancel
            </button>

            {/* Send Message Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="px-8 py-3 bg-brand-red text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,32,32,0.3)] hover:shadow-[0_0_25px_rgba(255,32,32,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <span>Send Message</span>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
