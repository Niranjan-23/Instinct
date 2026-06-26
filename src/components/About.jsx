import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function About({ introCompleted }) {
  const wrapperRef = useRef(null);
  const pinRef = useRef(null);
  const slideRefs = useRef([]);

  useGSAP(() => {
    if (!introCompleted) return;

    const slides = slideRefs.current;
    if (!slides.length) return;

    // Create a scroll-pinned timeline for the storytelling sequence
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: pinRef.current,
        anticipatePin: 1,
      },
    });

    // Pause briefly at the start of the first screen (Intro)
    tl.to({}, { duration: 1.5 });

    // Slide 0 (Intro) -> Slide 1 (Learn)
    tl.to(slides[0], {
      x: '-35%',
      opacity: 0,
      scale: 0.96,
      duration: 2.0,
      ease: 'power2.inOut',
    });
    tl.fromTo(
      slides[1],
      { x: '100%', opacity: 0, scale: 0.98 },
      { x: '0%', opacity: 1, scale: 1, duration: 2.0, ease: 'power2.inOut' },
      '<'
    );
    // Pause on Slide 1
    tl.to({}, { duration: 1.5 });

    // Slide 1 (Learn) -> Slide 2 (Build)
    tl.to(slides[1], {
      x: '-35%',
      opacity: 0,
      scale: 0.96,
      duration: 2.0,
      ease: 'power2.inOut',
    });
    tl.fromTo(
      slides[2],
      { x: '100%', opacity: 0, scale: 0.98 },
      { x: '0%', opacity: 1, scale: 1, duration: 2.0, ease: 'power2.inOut' },
      '<'
    );
    // Pause on Slide 2
    tl.to({}, { duration: 1.5 });

    // Slide 2 (Build) -> Slide 3 (Improve)
    tl.to(slides[2], {
      x: '-35%',
      opacity: 0,
      scale: 0.96,
      duration: 2.0,
      ease: 'power2.inOut',
    });
    tl.fromTo(
      slides[3],
      { x: '100%', opacity: 0, scale: 0.98 },
      { x: '0%', opacity: 1, scale: 1, duration: 2.0, ease: 'power2.inOut' },
      '<'
    );
    // Pause on Slide 3
    tl.to({}, { duration: 1.5 });

    // Slide 3 (Improve) -> Slide 4 (Deliver)
    tl.to(slides[3], {
      x: '-35%',
      opacity: 0,
      scale: 0.96,
      duration: 2.0,
      ease: 'power2.inOut',
    });
    tl.fromTo(
      slides[4],
      { x: '100%', opacity: 0, scale: 0.98 },
      { x: '0%', opacity: 1, scale: 1, duration: 2.0, ease: 'power2.inOut' },
      '<'
    );
    // Pause on Slide 4
    tl.to({}, { duration: 1.5 });

    // Slide 4 (Deliver) -> Slide 5 (Grow)
    tl.to(slides[4], {
      x: '-35%',
      opacity: 0,
      scale: 0.96,
      duration: 2.0,
      ease: 'power2.inOut',
    });
    tl.fromTo(
      slides[5],
      { x: '100%', opacity: 0, scale: 0.98 },
      { x: '0%', opacity: 1, scale: 1, duration: 2.0, ease: 'power2.inOut' },
      '<'
    );

    // Pause briefly after the final statement has appeared before releasing pin
    tl.to({}, { duration: 2.5 });
  }, { scope: wrapperRef, dependencies: [introCompleted] });

  return (
    <div
      ref={wrapperRef}
      id="about"
      className="relative w-full h-[700vh] bg-brand-bg transition-colors duration-500 z-30"
    >
      <div
        ref={pinRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-brand-bg transition-colors duration-500 flex items-center justify-center"
      >
        {/* Subtle high-contrast radial overlay for premium feel */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,32,32,0.02)_0%,transparent_75%)]" />

        {/* Slide 0: Intro */}
        <div
          ref={(el) => (slideRefs.current[0] = el)}
          className="absolute inset-0 w-full h-full flex flex-col justify-center items-center px-6 md:px-12 text-center"
        >
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <span className="text-brand-red text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase mb-6 select-none">
              INSTINCT PHILOSOPHY
            </span>
            <h2 className="font-display text-6xl sm:text-8xl md:text-[6.5rem] lg:text-[8rem] xl:text-[9.5rem] font-black tracking-tight text-brand-text mb-8 leading-none select-none uppercase transition-colors duration-500">
              OUR INSTINCT
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-lg sm:text-xl md:text-2xl tracking-[0.2em] uppercase font-light">
              <span className="text-brand-red font-medium">Built by curiosity.</span>
              <span className="hidden sm:inline text-brand-text/30 select-none transition-colors duration-500">•</span>
              <span className="text-brand-text/60 transition-colors duration-500">Driven by creation.</span>
            </div>
          </div>
        </div>

        {/* Slide 1: Learn */}
        <div
          ref={(el) => (slideRefs.current[1] = el)}
          className="absolute inset-0 w-full h-full flex flex-col justify-center px-6 md:px-24 lg:px-32 bg-brand-bg transition-colors duration-500 opacity-0"
          style={{ transform: 'translateX(100%) scale(0.98)' }}
        >
          <div className="max-w-5xl mx-auto w-full">
            <span className="text-brand-red text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase mb-6 block select-none">
              01 VISION
            </span>
            <h3 className="font-display text-7xl sm:text-[6rem] md:text-[8.5rem] lg:text-[10rem] font-black mb-8 text-brand-text tracking-tight uppercase leading-none select-none transition-colors duration-500">
              Learn.
            </h3>
            <div className="h-[2px] w-24 bg-brand-red mb-10" />
            <p className="text-3xl sm:text-5xl md:text-6xl text-brand-text/90 font-light leading-snug tracking-tight max-w-4xl transition-colors duration-500">
              Technology never stands still.
              <span className="block mt-4 text-brand-text/40 font-normal transition-colors duration-500">Neither do we.</span>
            </p>
          </div>
        </div>

        {/* Slide 2: Build */}
        <div
          ref={(el) => (slideRefs.current[2] = el)}
          className="absolute inset-0 w-full h-full flex flex-col justify-center px-6 md:px-24 lg:px-32 bg-brand-bg transition-colors duration-500 opacity-0"
          style={{ transform: 'translateX(100%) scale(0.98)' }}
        >
          <div className="max-w-5xl mx-auto w-full">
            <span className="text-brand-red text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase mb-6 block select-none">
              02 ACTION
            </span>
            <h3 className="font-display text-7xl sm:text-[6rem] md:text-[8.5rem] lg:text-[10rem] font-black mb-8 text-brand-text tracking-tight uppercase leading-none select-none transition-colors duration-500">
              Build.
            </h3>
            <div className="h-[2px] w-24 bg-brand-red mb-10" />
            <p className="text-3xl sm:text-5xl md:text-6xl text-brand-text/90 font-light leading-snug tracking-tight max-w-4xl transition-colors duration-500">
              Ideas deserve <span className="text-brand-red font-medium">execution.</span>
            </p>
          </div>
        </div>

        {/* Slide 3: Improve */}
        <div
          ref={(el) => (slideRefs.current[3] = el)}
          className="absolute inset-0 w-full h-full flex flex-col justify-center px-6 md:px-24 lg:px-32 bg-brand-bg transition-colors duration-500 opacity-0"
          style={{ transform: 'translateX(100%) scale(0.98)' }}
        >
          <div className="max-w-5xl mx-auto w-full">
            <span className="text-brand-red text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase mb-6 block select-none">
              03 EVOLUTION
            </span>
            <h3 className="font-display text-7xl sm:text-[6rem] md:text-[8.5rem] lg:text-[10rem] font-black mb-8 text-brand-text tracking-tight uppercase leading-none select-none transition-colors duration-500">
              Improve.
            </h3>
            <div className="h-[2px] w-24 bg-brand-red mb-10" />
            <p className="text-3xl sm:text-5xl md:text-6xl text-brand-text/90 font-light leading-snug tracking-tight max-w-4xl transition-colors duration-500">
              Every project is an <span className="text-brand-text font-normal underline decoration-brand-red decoration-2 underline-offset-[12px] transition-colors duration-500">opportunity</span> to do better.
            </p>
          </div>
        </div>

        {/* Slide 4: Deliver */}
        <div
          ref={(el) => (slideRefs.current[4] = el)}
          className="absolute inset-0 w-full h-full flex flex-col justify-center px-6 md:px-24 lg:px-32 bg-brand-bg transition-colors duration-500 opacity-0"
          style={{ transform: 'translateX(100%) scale(0.98)' }}
        >
          <div className="max-w-5xl mx-auto w-full">
            <span className="text-brand-red text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase mb-6 block select-none">
              04 REALIZE
            </span>
            <h3 className="font-display text-7xl sm:text-[6rem] md:text-[8.5rem] lg:text-[10rem] font-black mb-8 text-brand-text tracking-tight uppercase leading-none select-none transition-colors duration-500">
              Deliver.
            </h3>
            <div className="h-[2px] w-24 bg-brand-red mb-10" />
            <p className="text-3xl sm:text-5xl md:text-6xl text-brand-text/90 font-light leading-snug tracking-tight max-w-4xl transition-colors duration-500">
              Solutions built with <span className="text-brand-red font-medium">purpose.</span>
            </p>
          </div>
        </div>

        {/* Slide 5: Grow */}
        <div
          ref={(el) => (slideRefs.current[5] = el)}
          className="absolute inset-0 w-full h-full flex flex-col justify-center px-6 md:px-24 lg:px-32 bg-brand-bg transition-colors duration-500 opacity-0"
          style={{ transform: 'translateX(100%) scale(0.98)' }}
        >
          <div className="max-w-5xl mx-auto w-full">
            <span className="text-brand-red text-xs sm:text-sm font-semibold tracking-[0.4em] uppercase mb-6 block select-none">
              05 PARTNERSHIP
            </span>
            <h3 className="font-display text-7xl sm:text-[6rem] md:text-[8.5rem] lg:text-[10rem] font-black mb-8 text-brand-text tracking-tight uppercase leading-none select-none transition-colors duration-500">
              Grow.
            </h3>
            <div className="h-[2px] w-24 bg-brand-red mb-10" />
            <p className="text-3xl sm:text-5xl md:text-6xl text-brand-text/90 font-light leading-snug tracking-tight max-w-4xl transition-colors duration-500">
              Success is built <span className="text-brand-text font-medium italic transition-colors duration-500">together.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
