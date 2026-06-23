import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import heroBg from '../assets/hero.avif';
import logoImg from '../assets/logo.png';

export default function Hero() {
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Spring animations for cursor tracking (feels much smoother than raw mouse positions)
  const mouseX = useSpring(0, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 20 });

  // Transform coordinates for the eye movement (limit to 5-8px)
  const eyeX = useTransform(mouseX, [-400, 400], [-7, 7]);
  const eyeY = useTransform(mouseY, [-400, 400], [-7, 7]);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    // Calculate coordinate offset relative to the center of the screen
    const centerX = windowSize.width / 2;
    const centerY = windowSize.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    mouseX.set(deltaX);
    mouseY.set(deltaY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  // Page Load Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const bgVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.8, ease: 'easeOut' }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: 'easeOut' }
    }
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.5,
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-brand-bg select-none"
    >
      {/* Background Image with Dark Vignette */}
      <motion.div
        variants={bgVariants}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={heroBg}
          alt="Instinct Background"
          className="w-full h-full object-cover filter brightness-[0.25] saturate-[0.8]"
        />
        {/* Dark Vignette Layer */}
        <div className="absolute inset-0 vignette-overlay mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-brand-bg/40" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
        {/* Animated Logo Container */}
        <motion.div
          variants={logoVariants}
          onMouseEnter={() => setHovered(true)}
          className="relative w-48 h-48 md:w-100 md:h-39 mb- 8 md:mb-08 cursor-pointer group"
        >
          {/* Logo Frame Glow */}
          <div className="absolute inset-0 rounded-full bg-brand-red/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Main Logo Image */}
          <img
            src={logoImg}
            alt="INSTINCT Logo"
            className="w-full h-full object-contain relative z-10 filter contrast-150"
          />


        </motion.div>

        {/* Tagline */}
        <motion.h1
          variants={textVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-3xl leading-none text-glow"
        >
          Building <br className="md:hidden" /> Digital <br className="md:hidden" /> Solutions.
        </motion.h1>
      </div>

      {/* Scroll Down Indicator */}
      <motion.a
        href="#about"
        variants={scrollIndicatorVariants}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-white/40 group-hover:text-white/80 transition-colors duration-300">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-brand-sec/50 backdrop-blur-sm group-hover:border-brand-red/50 transition-colors duration-300"
        >
          <ArrowDown className="w-4 h-4 text-white/50 group-hover:text-brand-red transition-colors duration-300" />
        </motion.div>
      </motion.a>
    </motion.section>
  );
}
