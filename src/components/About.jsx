import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Globe, Cpu, Search, Sparkles } from 'lucide-react';

function AnimatedCounter({ value, duration = 1.5 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseInt(value, 10);
      if (start === end) {
        setCount(end);
        return;
      }

      const totalMiliseconds = duration * 1000;
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const capabilities = [
    {
      icon: <Globe className="w-6 h-6 text-brand-red" />,
      title: 'Website Development',
      desc: 'High-performance interactive interfaces, tailored for maximum user engagement.'
    },
    {
      icon: <Cpu className="w-6 h-6 text-brand-red" />,
      title: 'Backend Systems',
      desc: 'Robust architectures, database engineering, and secure API structures built to scale.'
    },
    {
      icon: <Search className="w-6 h-6 text-brand-red" />,
      title: 'SEO & GEO',
      desc: 'Modern search engine optimization and geographical localization strategies.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-brand-red" />,
      title: 'AI Integration',
      desc: 'Injecting intelligence into products using custom LLMs and advanced cognitive workflows.'
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-32 bg-brand-sec flex flex-col justify-center overflow-hidden border-b border-white/5"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-red/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-brand-red font-semibold mb-3 block">
              01 // WHO WE ARE
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase">
              ABOUT
            </h2>
            <p className="text-2xl md:text-4xl text-white/80 font-light leading-snug">
              We turn ideas into digital solutions.
            </p>
          </motion.div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Big Stat Column (4 Cols) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 bg-brand-bg/50 border border-white/5 rounded-3xl p-10 md:p-12 flex flex-col justify-between h-full min-h-[350px] group hover:border-brand-red/20 transition-colors duration-500"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center mb-8 border border-brand-red/20">
                <Users className="w-6 h-6 text-brand-red" />
              </div>
              <h3 className="text-lg font-medium text-white/60 tracking-wider uppercase mb-2">
                Collective Expertise
              </h3>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                A tight-knit force of designers, engineers, and product minds crafting industry-defining software.
              </p>
            </div>

            <div className="mt-12 flex items-baseline">
              <span className="text-7xl md:text-8xl font-bold tracking-tight text-white select-none">
                <AnimatedCounter value="8" />
              </span>
              <span className="text-5xl md:text-6xl font-bold text-brand-red select-none">+</span>
              <span className="ml-4 text-sm font-semibold tracking-widest text-white/50 uppercase">
                Team Members
              </span>
            </div>
          </motion.div>

          {/* Capabilities Grid (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-brand-bg/30 border border-white/5 rounded-2xl p-8 hover:bg-brand-bg/75 hover:border-brand-red/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-brand-red/10 group-hover:scale-105">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h4>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
