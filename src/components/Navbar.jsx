import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      // Lenis smooth scroll will handle the scroll transition, or standard scroll if not active
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl rounded-full border border-white/5 transition-all duration-500 bg-brand-sec/30 backdrop-blur-xl ${
          isScrolled 
            ? 'py-3.5 px-6 shadow-[0_12px_40px_rgba(0,0,0,0.7)] border-white/10 bg-brand-bg/75' 
            : 'py-5 px-8'
        }`}
      >
        <div className="flex justify-between md:grid md:grid-cols-3 items-center w-full">
          {/* Left: Logo */}
          <div className="flex justify-start">
            <a href="#" className="flex items-center group">
              <img 
                src={logoImg} 
                alt="INSTINCT" 
                className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex justify-center items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right: CTA & Mobile toggle */}
          <div className="flex justify-end items-center gap-4">
            <a 
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="hidden md:inline-flex relative items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-brand-red rounded-full overflow-hidden group transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,32,32,0.4)]"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Let's Talk
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-brand-red transition-colors duration-300 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-brand-bg/95 backdrop-blur-2xl md:hidden flex flex-col justify-center items-center px-6"
          >
            <div className="flex flex-col items-center gap-8 text-center">
              {navLinks.map((link) => (
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-3xl font-semibold text-white/80 hover:text-white hover:text-brand-red transition-colors duration-300"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="mt-4 px-8 py-3 bg-brand-red text-white text-lg font-semibold rounded-full hover:shadow-[0_0_25px_rgba(255,32,32,0.5)] transition-all duration-300 flex items-center gap-2"
              >
                Let's Talk
                <ArrowUpRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
