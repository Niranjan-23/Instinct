import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import websiteDevelopmentImg from '../assets/service/website development.png';
import webApplicationImg from '../assets/service/web application.webp';
import seoGeoImg from '../assets/service/seo&geo.webp';
import uiUxVideo from '../assets/service/ui-ux.mp4';
import aiIntegrationImg from '../assets/service/ai-integration.webp';

// Reusable Tilt Container component for premium cursor response
function TiltWrapper({ children, className }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 25 });

  const handleMouseMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    // Normalize coordinates to range [-0.5, 0.5]
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '1000px' }}
      className={className}
    >
      <div style={{ transform: 'translateZ(30px)' }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const servicesData = [
    {
      num: '01',
      title: 'Website Development',
      desc: 'We engineer premium digital touchpoints that capture attention instantly. High-performance index rates, ultra-low loading speeds, and state-of-the-art interactive micro-animations combine to deliver an unforgettable user experience.',
      tech: ['React + Vite', 'Framer Motion', 'Tailwind CSS', 'Lenis Smooth Scroll'],
      mockup: (
        <img
          src={websiteDevelopmentImg}
          alt="Website Development"
          className="w-full h-[260px] md:h-[320px] object-cover rounded-2xl border border-brand-border"
        />
      )
    },
    {
      num: '02',
      title: 'Web Applications',
      desc: 'Transforming complex administrative, sales, or operation challenges into beautiful web architectures. We build workflows, automated dashboards, custom CRM tools, and scalable structures optimized for commercial operations.',
      tech: ['Database Design', 'Node.js Engine', 'Custom APIs', 'Dynamic Pipelines'],
      mockup: (
        <img
          src={webApplicationImg}
          alt="Web Applications"
          className="w-full h-[260px] md:h-[320px] object-cover rounded-2xl border border-brand-border"
        />
      )
    },
    {
      num: '03',
      title: 'SEO & GEO',
      desc: 'Our modern approach to optimization ensures your product is visible exactly where it matters. We implement technical SEO foundations, automated schema markup, and advanced geographical search targets to ensure organic growth.',
      tech: ['Organic Visibility', 'GEO targeting', 'Schema Markup', 'Performance Indexing'],
      mockup: (
        <img
          src={seoGeoImg}
          alt="SEO & GEO"
          className="w-full h-[260px] md:h-[320px] object-cover rounded-2xl border border-brand-border"
        />
      )
    },
    {
      num: '04',
      title: 'UI/UX Design',
      desc: 'Design is not just what it looks like, but how it works. We construct premium interfaces following modern spatial psychology, harmonized dark layouts, clean component spacing, and intuitive customer paths that convert.',
      tech: ['Figma Prototyping', 'Spatial Psychology', 'Design Token System', 'Component Architectures'],
      mockup: (
        <video
          src={uiUxVideo}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          className="w-full h-[260px] md:h-[320px] object-cover rounded-2xl border border-brand-border"
        />
      )
    },
    {
      num: '05',
      title: 'AI Integration',
      desc: 'Accelerate productivity and embed cognitive intelligence directly into your workflow. We specialize in fine-tuning Large Language Models, cognitive search indexation, multi-agent frameworks, and tailored automated pipelines.',
      tech: ['LLM Fine-tuning', 'Vector Databases', 'Autonomous Agents', 'Semantic Querying'],
      mockup: (
        <img
          src={aiIntegrationImg}
          alt="AI Integration"
          className="w-full h-[260px] md:h-[320px] object-cover rounded-2xl border border-brand-border"
        />
      )
    }
  ];

  return (
    <section
      id="services"
      className="relative w-full py-24 md:py-32 bg-brand-bg text-brand-text overflow-hidden border-b border-brand-border transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">

        {/* Section Header */}
        <div className="max-w-3xl mb-24 md:mb-32">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-red font-semibold mb-3 block">
            WHAT WE DELIVER
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-brand-text mb-6 uppercase">
            SERVICES
          </h2>
          <p className="text-lg md:text-xl text-brand-text/50 leading-relaxed font-light">
            We do not build templates. We craft custom premium solutions designed to convey authority, demonstrate design excellence, and drive operations.
          </p>
        </div>

        {/* Services Showcase - Alternate Layout Rows */}
        <div className="flex flex-col gap-28 md:gap-40">
          {servicesData.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={service.num}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
              >
                {/* Text Block */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center ${isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl md:text-3xl font-bold font-mono text-brand-red">
                      {service.num}
                    </span>
                    <div className="h-[1px] w-8 bg-brand-red/30" />
                    <span className="text-xs uppercase tracking-widest text-brand-text/40">
                      Capability
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-text mb-6 leading-tight hover:text-brand-red transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-brand-text/60 text-base leading-relaxed mb-8 font-light">
                    {service.desc}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.tech.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 bg-brand-sec border border-brand-border rounded-full text-xs text-brand-text/70 font-medium transition-colors duration-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Direct Link */}
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-text/80 hover:text-brand-red transition-colors duration-300 group self-start"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

                {/* Mockup Showcase Block with Tilt Response */}
                <div
                  className={`lg:col-span-6 flex justify-center w-full ${isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                >
                  <TiltWrapper className="w-full max-w-lg md:max-w-xl transition-all duration-300">
                    <div className="relative group cursor-pointer">
                      {/* Ambient light glow behind mockup */}
                      <div className="absolute inset-0 bg-brand-red/5 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                      {/* Mockup Frame Container */}
                      <div className="relative z-10 bg-brand-sec/40 border border-brand-border rounded-3xl p-3 md:p-4 shadow-xl dark:shadow-[0_30px_100px_rgba(0,0,0,0.8)] group-hover:border-brand-red/25 transition-all duration-500">
                        {/* Title Bar Details */}
                        <div className="flex items-center gap-1.5 px-3 pb-3 border-b border-brand-border mb-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-text/10" />
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-text/10" />
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-text/10" />
                        </div>
                        {service.mockup}
                      </div>
                    </div>
                  </TiltWrapper>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
