import React from 'react';

export default function ShinyText({
  text = "",
  speed = 2,
  delay = 0,
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  direction = "left",
  yoyo = false,
  pauseOnHover = false,
  disabled = false,
  className = "",
}) {
  if (disabled) {
    return <span className={className} style={{ color }}>{text}</span>;
  }

  // Create a unique animation name to avoid collision
  const animationName = `shine-${Math.random().toString(36).substr(2, 9)}`;

  // CSS gradients and animation definitions
  const styleBlock = `
    @keyframes ${animationName} {
      0% {
        background-position: ${direction === "left" ? "200%" : "-200%"} 0;
      }
      100% {
        background-position: ${direction === "left" ? "-200%" : "200%"} 0;
      }
    }
    .shiny-text-component-${animationName} {
      color: ${color};
      background: linear-gradient(
        120deg,
        ${color} 35%,
        ${shineColor} 50%,
        ${color} 65%
      );
      background-size: ${spread}px 100%;
      background-repeat: repeat;
      background-clip: text;
      -webkit-background-clip: text;
      text-fill-color: transparent;
      -webkit-text-fill-color: transparent;
      animation: ${animationName} ${speed}s linear infinite;
      animation-delay: ${delay}s;
      animation-direction: ${yoyo ? "alternate" : "normal"};
    }
    .shiny-text-component-${animationName}:hover {
      animation-play-state: ${pauseOnHover ? "paused" : "running"};
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styleBlock }} />
      <span className={`shiny-text-component-${animationName} ${className}`}>
        {text}
      </span>
    </>
  );
}
