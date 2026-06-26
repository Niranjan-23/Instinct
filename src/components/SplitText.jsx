import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins (specifically @gsap/react hook)
gsap.registerPlugin(useGSAP);

export default function SplitText({
  text = "",
  className = "",
  delay = 50,
  duration = 0.5,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
  showCallback = false,
  introCompleted = true,
}) {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  // Split text by words
  const words = text.split(" ");
  
  // Intersection Observer to trigger when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // GSAP animation
  useGSAP(() => {
    if (!inView || !introCompleted) return;

    const targets = containerRef.current.querySelectorAll('.split-item');
    if (!targets.length) return;

    gsap.fromTo(
      targets,
      from,
      {
        ...to,
        duration,
        ease,
        stagger: delay / 1000, // delay is in ms, stagger in seconds
        onComplete: () => {
          if (showCallback) {
            console.log('SplitText: Animation completed!');
          }
          if (onLetterAnimationComplete) {
            onLetterAnimationComplete();
          }
        },
      }
    );
  }, { scope: containerRef, dependencies: [inView, introCompleted] });

  return (
    <span
      ref={containerRef}
      className={`inline-flex flex-wrap justify-center ${className}`}
      style={{ textAlign, display: "inline-flex" }}
    >
      {words.map((word, wordIdx) => {
        const isBrandName = word.toLowerCase().includes("instinct");
        return (
          <span
            key={wordIdx}
            className={`inline-block whitespace-nowrap mr-[0.25em] last:mr-0 ${
              isBrandName ? "text-brand-red" : ""
            }`}
          >
            {splitType === "chars" ? (
              word.split("").map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="split-item inline-block"
                  style={{ opacity: 0, willChange: "transform, opacity" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))
            ) : (
              <span
                className="split-item inline-block"
                style={{ opacity: 0, willChange: "transform, opacity" }}
              >
                {word}
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
