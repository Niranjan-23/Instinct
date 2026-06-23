import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';

export default function Contact() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      name: 'Twitter', 
      href: 'https://twitter.com', 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ) 
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com', 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ) 
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com', 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ) 
    },
    { 
      name: 'Dribbble', 
      href: 'https://dribbble.com', 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.37c-.382-.095-2.662-.62-5.267-.29.835 2.295 1.18 4.256 1.255 4.717 2.493-1.077 4.148-3.51 4.012-4.427zm-2.023 5.922c-.105-.595-.49-2.73-1.39-5.115-3.03.95-4.103 2.91-4.225 3.14-.01.02-.02.035-.03.05a9.387 9.387 0 0 0 5.645 1.925 9.492 9.492 0 0 0 1.002-.125zM9.957 21.69c.813.2 1.677.31 2.573.31a9.39 9.39 0 0 0 4.61-1.21c-.08-.535-.45-2.63-1.35-4.995-2.585.205-5.345-.105-8.085-.85-.18.525-.36 1.045-.53 1.545-.9 2.65-.63 4.675-.53 5.115.42.06.86.085 1.312.085zm-4.7-2.315c.105-.41.48-2.185 1.48-5.13-2.32-.67-3.95-.56-4.665-.51A9.362 9.362 0 0 0 4.5 18.25c.23.4.485.78.757 1.125zM1.743 12.33c.69-.04 2.875-.125 5.565.625.26-.64.515-1.305.755-1.975-2.915-.995-5.24-2.885-5.46-3.07a9.383 9.383 0 0 0-.86 4.42zm.892-5.71c.195.16 2.22 1.83 5.095 2.76.655-1.365 1.235-2.775 1.705-4.195-2.175-1.01-4.08-1.03-4.305-1.03a9.344 9.344 0 0 0-2.495 2.465zm7.395-2.565c.245-.035.495-.055.75-.055 2.125 0 4.07.72 5.63 1.925-.38.865-1.015 2.2-1.925 3.91-2.94-.965-5.01-1.025-5.24-1.03.655-1.895 1.255-3.69 1.785-4.75z" />
        </svg>
      ) 
    }
  ];

  return (
    <footer 
      id="contact" 
      className="relative w-full py-24 md:py-32 bg-brand-sec overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-red/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 w-full text-center flex flex-col items-center">
        
        {/* Section Header */}
        <span className="text-xs uppercase tracking-[0.3em] text-brand-red font-semibold mb-4 block">
          03 // REWORK THE FUTURE
        </span>

        {/* Large Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-10 max-w-3xl leading-tight text-glow"
        >
          Let's Build Something Remarkable.
        </motion.h2>

        {/* Start a Project Button */}
        <motion.a
          href="mailto:hello@instinct.com"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-flex items-center gap-3 px-8 py-4 bg-brand-red text-white text-base font-bold rounded-full overflow-hidden group shadow-[0_0_20px_rgba(255,32,32,0.3)] hover:shadow-[0_0_30px_rgba(255,32,32,0.6)] hover:scale-105 transition-all duration-300"
        >
          <span>Start a Project</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.a>

        {/* Email Address */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex items-center gap-2 group cursor-pointer hover:opacity-100 transition-opacity duration-300"
        >
          <Mail className="w-4 h-4 text-brand-red" />
          <a 
            href="mailto:hello@instinct.com"
            className="text-sm font-semibold tracking-wider text-white border-b border-transparent group-hover:border-brand-red transition-all duration-300"
          >
            hello@instinct.com
          </a>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/5 my-16" />

        {/* Footer Bottom Block */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-widest text-white/50">
              INSTINCT
            </span>
            <span className="text-white/20">|</span>
            <span className="text-xs text-white/40">
              © {currentYear} Instinct. All rights reserved.
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-white/40 hover:text-brand-red hover:border-brand-red/30 bg-brand-bg/50 transition-all duration-300"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
