import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Compass, Users, Calendar, Sparkles } from 'lucide-react';

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

// Interactive Mockups built in React + CSS
function FinanceDashboardMockup() {
  return (
    <div className="w-full h-[260px] md:h-[320px] bg-brand-sec border border-white/5 rounded-2xl p-5 md:p-6 overflow-hidden flex flex-col justify-between">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <div>
          <span className="text-[10px] text-white/40 uppercase tracking-widest block">Main Wallet</span>
          <span className="text-xl md:text-2xl font-bold text-white">$142,580.40</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-xs text-green-400">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+14.8%</span>
        </div>
      </div>
      
      {/* SVG Chart */}
      <div className="h-28 my-2 relative">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF2020" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FF2020" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M0,25 C10,20 15,28 25,18 C35,8 40,22 50,15 C60,8 70,12 80,5 C90,-2 95,8 100,2"
            fill="none"
            stroke="#FF2020"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M0,25 C10,20 15,28 25,18 C35,8 40,22 50,15 C60,8 70,12 80,5 C90,-2 95,8 100,2 L100,30 L0,30 Z"
            fill="url(#chartGlow)"
          />
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs bg-white/[0.02] border border-white/5 p-2 rounded-xl">
          <span className="text-white/60">Stripe Invoices</span>
          <span className="font-semibold text-white">+$4,290.00</span>
        </div>
        <div className="flex justify-between items-center text-xs bg-white/[0.02] border border-white/5 p-2 rounded-xl">
          <span className="text-white/60">AWS Cloud Bill</span>
          <span className="font-semibold text-white/50">-$1,105.80</span>
        </div>
      </div>
    </div>
  );
}

function CRMPipelineMockup() {
  return (
    <div className="w-full h-[260px] md:h-[320px] bg-brand-sec border border-white/5 rounded-2xl p-5 md:p-6 overflow-hidden flex flex-col justify-between">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white">Leads Pipeline</span>
        </div>
        <span className="text-[10px] text-white/30">Updated just now</span>
      </div>

      <div className="grid grid-cols-3 gap-3 my-4">
        {/* Deal Column 1 */}
        <div className="space-y-2">
          <div className="text-[9px] uppercase tracking-wider text-white/40 mb-1">Proposal (2)</div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 space-y-1">
            <span className="text-[10px] font-bold text-white block truncate">Vortex Corp</span>
            <span className="text-[9px] text-brand-red font-semibold">$18,500</span>
          </div>
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 space-y-1">
            <span className="text-[10px] font-bold text-white block truncate">Hyperion Inc</span>
            <span className="text-[9px] text-brand-red font-semibold">$24,000</span>
          </div>
        </div>

        {/* Deal Column 2 */}
        <div className="space-y-2">
          <div className="text-[9px] uppercase tracking-wider text-white/40 mb-1">Negotiating (1)</div>
          <div className="bg-white/[0.03] border border-brand-red/20 rounded-xl p-2.5 space-y-1 shadow-[0_0_15px_rgba(255,32,32,0.05)]">
            <span className="text-[10px] font-bold text-white block truncate">Aether Labs</span>
            <span className="text-[9px] text-brand-red font-semibold">$45,000</span>
          </div>
        </div>

        {/* Deal Column 3 */}
        <div className="space-y-2">
          <div className="text-[9px] uppercase tracking-wider text-white/40 mb-1">Won (3)</div>
          <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-2.5 space-y-1">
            <span className="text-[10px] font-bold text-white block truncate">Luminary Inc</span>
            <span className="text-[9px] text-green-400 font-semibold">$12,000</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] text-white/40 pt-2 border-t border-white/5">
        <span>Conversion Rate: 84%</span>
        <span className="text-white/80">Monthly Target: $150k</span>
      </div>
    </div>
  );
}

function SEOAnalyticsMockup() {
  return (
    <div className="w-full h-[260px] md:h-[320px] bg-brand-sec border border-white/5 rounded-2xl p-5 md:p-6 overflow-hidden flex flex-col justify-between">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-white">Geographic Search Domination</span>
        <Compass className="w-4 h-4 text-brand-red" />
      </div>

      <div className="flex-1 flex items-center justify-center relative my-3">
        {/* Geographic Dotted Map Representation */}
        <div className="absolute inset-0 opacity-10 flex flex-wrap justify-between content-between gap-1 py-4">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
          ))}
        </div>
        
        {/* Glow Anchors */}
        <div className="absolute left-[30%] top-[40%] flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-brand-red animate-ping absolute" />
          <div className="w-3 h-3 rounded-full bg-brand-red border border-white relative z-10" />
          <span className="text-[8px] mt-1 text-white bg-brand-bg px-1 rounded border border-white/10">64%</span>
        </div>
        <div className="absolute right-[25%] top-[35%] flex flex-col items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-red/80 relative z-10" />
          <span className="text-[8px] mt-1 text-white bg-brand-bg px-1 rounded border border-white/10">28%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xl text-center">
          <span className="text-white/40 block text-[9px] uppercase">Search Visibility</span>
          <span className="font-semibold text-white">92.4% (+4.2%)</span>
        </div>
        <div className="bg-white/[0.02] border border-white/5 p-2 rounded-xl text-center">
          <span className="text-white/40 block text-[9px] uppercase">Index Rate</span>
          <span className="font-semibold text-brand-red">100% Fully Geo-optimized</span>
        </div>
      </div>
    </div>
  );
}

function DesignSystemMockup() {
  return (
    <div className="w-full h-[260px] md:h-[320px] bg-brand-sec border border-white/5 rounded-2xl p-5 md:p-6 overflow-hidden flex flex-col justify-between">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-white">Instinct Design Tokens</span>
        <Calendar className="w-4 h-4 text-brand-red" />
      </div>

      {/* Modern UI components mockup */}
      <div className="space-y-4 my-auto">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-xs font-bold text-white shadow-[0_0_15px_rgba(255,32,32,0.4)]">
            I
          </div>
          <div className="flex-1 space-y-1">
            <div className="h-2 w-24 bg-white/20 rounded" />
            <div className="h-1.5 w-40 bg-white/10 rounded" />
          </div>
        </div>

        {/* Buttons / Chips */}
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-white text-brand-bg font-semibold text-[10px] rounded-full">
            Active Button
          </span>
          <span className="px-3 py-1 border border-white/10 text-white font-medium text-[10px] rounded-full hover:border-brand-red transition-colors duration-300">
            Secondary Outline
          </span>
          <span className="px-2 py-1 bg-brand-red/10 border border-brand-red/30 text-brand-red text-[9px] rounded-md font-bold uppercase tracking-wider">
            Token: #FF2020
          </span>
        </div>

        {/* Calendar Picker Layout snippet */}
        <div className="grid grid-cols-7 gap-1 text-[8px] text-white/30 text-center">
          <span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span><span>Su</span>
          <span>1</span><span>2</span><span>3</span>
          <span className="bg-brand-red text-white rounded-full font-bold">4</span>
          <span>5</span><span>6</span><span>7</span>
        </div>
      </div>

      <span className="text-[9px] text-white/30 uppercase text-center block pt-2 border-t border-white/5">
        Scale: Responsive Mobile & Desktop Layout Systems
      </span>
    </div>
  );
}

function AIWorkspaceMockup() {
  return (
    <div className="w-full h-[260px] md:h-[320px] bg-brand-sec border border-white/5 rounded-2xl p-5 md:p-6 overflow-hidden flex flex-col justify-between">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-red" />
          <span className="text-xs font-semibold uppercase tracking-wider text-white">Cognitive Core Engine</span>
        </div>
        <span className="text-[9px] text-green-400 border border-green-500/20 bg-green-500/5 px-2 py-0.5 rounded-full font-medium">
          Idle
        </span>
      </div>

      <div className="my-4 space-y-2.5">
        {/* Chat Prompt Mock */}
        <div className="space-y-1 flex flex-col items-end">
          <span className="text-[8px] text-white/30 mr-1">User Query</span>
          <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-2xl rounded-tr-sm text-[10px] text-white/80 max-w-[85%]">
            Optimize database queries and orchestrate multi-agent workflow.
          </div>
        </div>
        
        {/* Chat Response Mock */}
        <div className="space-y-1 flex flex-col items-start">
          <span className="text-[8px] text-brand-red ml-1">Instinct AI</span>
          <div className="bg-brand-red/10 border border-brand-red/20 px-3 py-2 rounded-2xl rounded-tl-sm text-[10px] text-white/90 max-w-[85%] flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1 animate-pulse" />
            <span>Structured queries parsed. Routing payload to Agent #04.</span>
          </div>
        </div>
      </div>

      {/* Prompt Bar */}
      <div className="flex items-center border border-white/10 bg-white/[0.02] p-1.5 rounded-xl">
        <span className="text-[9px] text-white/30 px-2 flex-1">Ask AI Agent...</span>
        <button className="px-3 py-1 bg-brand-red text-white text-[9px] font-bold rounded-lg shadow-[0_0_10px_rgba(255,32,32,0.3)]">
          Run
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const servicesData = [
    {
      num: '01',
      title: 'Website Development',
      desc: 'We engineer premium digital touchpoints that capture attention instantly. High-performance index rates, ultra-low loading speeds, and state-of-the-art interactive micro-animations combine to deliver an unforgettable user experience.',
      tech: ['React + Vite', 'Framer Motion', 'Tailwind CSS', 'Lenis Smooth Scroll'],
      mockup: <FinanceDashboardMockup />
    },
    {
      num: '02',
      title: 'Web Applications',
      desc: 'Transforming complex administrative, sales, or operation challenges into beautiful web architectures. We build workflows, automated dashboards, custom CRM tools, and scalable structures optimized for commercial operations.',
      tech: ['Database Design', 'Node.js Engine', 'Custom APIs', 'Dynamic Pipelines'],
      mockup: <CRMPipelineMockup />
    },
    {
      num: '03',
      title: 'SEO & GEO',
      desc: 'Our modern approach to optimization ensures your product is visible exactly where it matters. We implement technical SEO foundations, automated schema markup, and advanced geographical search targets to ensure organic growth.',
      tech: ['Organic Visibility', 'GEO targeting', 'Schema Markup', 'Performance Indexing'],
      mockup: <SEOAnalyticsMockup />
    },
    {
      num: '04',
      title: 'UI/UX Design',
      desc: 'Design is not just what it looks like, but how it works. We construct premium interfaces following modern spatial psychology, harmonized dark layouts, clean component spacing, and intuitive customer paths that convert.',
      tech: ['Figma Prototyping', 'Spatial Psychology', 'Design Token System', 'Component Architectures'],
      mockup: <DesignSystemMockup />
    },
    {
      num: '05',
      title: 'AI Integration',
      desc: 'Accelerate productivity and embed cognitive intelligence directly into your workflow. We specialize in fine-tuning Large Language Models, cognitive search indexation, multi-agent frameworks, and tailored automated pipelines.',
      tech: ['LLM Fine-tuning', 'Vector Databases', 'Autonomous Agents', 'Semantic Querying'],
      mockup: <AIWorkspaceMockup />
    }
  ];

  return (
    <section
      id="services"
      className="relative w-full py-24 md:py-32 bg-brand-bg text-white overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-24 md:mb-32">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-red font-semibold mb-3 block">
            02 // WHAT WE DELIVER
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 uppercase">
            SERVICES
          </h2>
          <p className="text-lg md:text-xl text-white/50 leading-relaxed font-light">
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
                  className={`lg:col-span-6 flex flex-col justify-center ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl md:text-3xl font-bold font-mono text-brand-red">
                      {service.num}
                    </span>
                    <div className="h-[1px] w-8 bg-brand-red/30" />
                    <span className="text-xs uppercase tracking-widest text-white/40">
                      Capability
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-6 leading-tight hover:text-brand-red transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-white/60 text-base leading-relaxed mb-8 font-light">
                    {service.desc}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.tech.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3.5 py-1.5 bg-brand-sec border border-white/5 rounded-full text-xs text-white/70 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Direct Link */}
                  <a 
                    href="#contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-brand-red transition-colors duration-300 group self-start"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

                {/* Mockup Showcase Block with Tilt Response */}
                <div 
                  className={`lg:col-span-6 flex justify-center w-full ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <TiltWrapper className="w-full max-w-lg md:max-w-xl transition-all duration-300">
                    <div className="relative group cursor-pointer">
                      {/* Ambient light glow behind mockup */}
                      <div className="absolute inset-0 bg-brand-red/5 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      
                      {/* Mockup Frame Container */}
                      <div className="relative z-10 bg-brand-sec/40 border border-white/5 rounded-3xl p-3 md:p-4 shadow-[0_30px_100px_rgba(0,0,0,0.8)] group-hover:border-brand-red/25 transition-colors duration-500">
                        {/* Title Bar Details */}
                        <div className="flex items-center gap-1.5 px-3 pb-3 border-b border-white/5 mb-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
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
