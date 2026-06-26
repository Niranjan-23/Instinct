import React, { useRef, useState, useEffect } from 'react';
import introVideo from '../assets/logointro.mp4';

export default function IntroLoader({ onEnded }) {
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Once the fade-out completes, notify parent to clean up and initialize website
  useEffect(() => {
    if (isFadingOut) {
      const transitionTimer = setTimeout(() => {
        onEnded();
      }, 800); // 800ms fade-out duration
      return () => clearTimeout(transitionTimer);
    }
  }, [isFadingOut, onEnded]);

  // Attempt programmatic autoplay once the video is ready (as fallback support)
  useEffect(() => {
    if (isVideoReady && videoRef.current && !isFadingOut) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Autoplay programmatic play was prevented, waiting for interaction:", error);
          // Do not skip the intro if autoplay is blocked.
        });
      }
    }
  }, [isVideoReady, isFadingOut]);

  const handleUserInteraction = () => {
    if (videoRef.current && videoRef.current.paused && !isFadingOut) {
      videoRef.current.play().catch((error) => {
        console.warn("User interaction play attempt failed:", error);
      });
    }
  };

  const handleVideoError = (error) => {
    console.error("Video element error encountered:", error);
    // On actual file/codec failure, fade out to prevent permanent locking
    setIsFadingOut(true);
  };

  return (
    <div
      className="intro-loader-container"
      onClick={handleUserInteraction}
      onTouchStart={handleUserInteraction}
      style={{
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 800ms cubic-bezier(0.25, 1, 0.3, 1)',
      }}
    >
      <video
        ref={videoRef}
        src={introVideo}
        muted
        playsInline
        autoPlay
        preload="auto"
        className="intro-loader-video"
        onCanPlay={() => setIsVideoReady(true)}
        onEnded={() => setIsFadingOut(true)}
        onError={handleVideoError}
        style={{
          opacity: isVideoReady ? 1 : 0,
          transition: 'opacity 500ms ease-in-out',
        }}
      />
    </div>
  );
}

