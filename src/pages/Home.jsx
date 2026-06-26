import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';
import IntroLoader from '../components/IntroLoader';
import ProjectInquiryDrawer from '../components/ProjectInquiryDrawer';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [introCompleted, setIntroCompleted] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  // Manage body scroll locking during the intro video playback
  useEffect(() => {
    if (!introCompleted) {
      document.documentElement.classList.add('no-scroll');
      document.body.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    };
  }, [introCompleted]);

  // Initialize scroll systems (Lenis & ScrollTrigger) only after intro ends
  useEffect(() => {
    if (!introCompleted) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Update ScrollTrigger on scroll
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Refresh scroll triggers after unmounting loader and fading in content
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    // Anchor links smooth navigation integration with Lenis
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        const href = target.getAttribute('href');
        if (href && href !== '#') {
          const element = document.querySelector(href);
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element, { offset: 0, duration: 1.2 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
      clearTimeout(refreshTimer);
    };
  }, [introCompleted]);

  return (
    <>
      {!introCompleted && (
        <IntroLoader onEnded={() => setIntroCompleted(true)} />
      )}

      {introCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative min-h-screen bg-brand-bg text-brand-text antialiased transition-colors duration-500"
        >
          <Navbar introCompleted={introCompleted} />
          <Hero introCompleted={introCompleted} />
          <About introCompleted={introCompleted} />
          <Services introCompleted={introCompleted} />
          <Contact introCompleted={introCompleted} onOpenInquiry={() => setIsInquiryOpen(true)} />
        </motion.div>
      )}

      <AnimatePresence>
        {isInquiryOpen && (
          <ProjectInquiryDrawer 
            isOpen={isInquiryOpen} 
            onClose={() => setIsInquiryOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
