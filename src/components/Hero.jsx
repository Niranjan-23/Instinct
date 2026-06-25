import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroBg from '../assets/hero.avif';
import SplitText from './SplitText';

export default function Hero() {
  const containerRef = useRef(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  const { scrollY } = useScroll();
  const bgScale = useTransform(scrollY, [0, 1000], [1, 1.15]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isLight = document.documentElement.classList.contains('light-theme');
      setTheme(isLight ? 'light' : 'dark');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const isLight = document.documentElement.classList.contains('light-theme');
    setTheme(isLight ? 'light' : 'dark');

    return () => observer.disconnect();
  }, []);

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  // Motion Sequence Variants
  const bgVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.6, ease: 'easeOut' }
    }
  };

  const supportingVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const primaryBtnVariants = {
    hidden: { opacity: 0, x: -80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const secondaryBtnVariants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1.3, duration: 0.8, ease: 'easeOut' }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-brand-bg select-none"
    >
      {/* Background Image with Scroll Zoom Parallax */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={bgVariants}
        className="absolute inset-0 w-full h-full origin-center"
      >
        <motion.img
          src={heroBg}
          alt="Instinct Background"
          style={{ scale: bgScale, filter: 'var(--brand-hero-brightness)' }}
          className="w-full h-full object-cover origin-center transition-all duration-500"
        />
        {/* Vignette Layer */}
        <div
          className="absolute inset-0 vignette-overlay transition-all duration-500"
          style={{ mixBlendMode: theme === 'light' ? 'normal' : 'multiply' }}
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500"
          style={{ background: 'var(--brand-hero-overlay)' }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto w-full">
        

        {/* Main Headline with SplitText */}
        <div className="mb-6 max-w-4xl">
          <SplitText
            text="The Right Move Feels Like Instinct."
            className="font-display text-[40px] sm:text-[52px] md:text-[72px] lg:text-[92px] font-extrabold tracking-normal leading-[1.05] text-center uppercase"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
            showCallback
          />
        </div>

        {/* Supporting Text */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={supportingVariants}
          className="text-xs sm:text-sm md:text-base font-medium text-brand-text-muted mb-12 tracking-[0.2em] uppercase"
        >
          Digital Solutions For Modern Businesses.
        </motion.p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full">
          {/* Primary CTA */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={primaryBtnVariants}
            className="w-full sm:w-auto"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-[0.15em] uppercase text-brand-bg bg-brand-text rounded-full transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-[0_10px_25px_var(--brand-btn-shadow)] active:translate-y-0 cursor-pointer"
            >
              Contact Us
            </a>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={secondaryBtnVariants}
            className="w-full sm:w-auto"
          >
            <a
              href="#services"
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-bold tracking-[0.15em] uppercase text-brand-text bg-transparent border border-brand-text/20 rounded-full transition-all duration-300 backdrop-blur-sm hover:border-brand-text hover:bg-brand-text/5 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Our Services
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#about"
        initial="hidden"
        animate="visible"
        variants={scrollIndicatorVariants}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-brand-text-muted group-hover:text-brand-text transition-colors duration-300">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-brand-text-muted group-hover:text-brand-red transition-colors duration-300 text-base font-bold"
        >
          ↓
        </motion.div>
      </motion.a>
    </section>
  );
}


