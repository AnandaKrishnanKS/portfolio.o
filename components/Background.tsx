"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        const { clientX, clientY } = e;
        spotlightRef.current.style.background = `radial-gradient(800px circle at ${clientX}px ${clientY}px, rgba(124, 58, 237, 0.04), transparent 80%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden pointer-events-none">
      {/* Base Grid */}
      <div className="absolute inset-0 grid-bg" />
      
      {/* Noise Texture */}
      <div className="noise-overlay" />

      {/* Mouse spotlight glow */}
      <div ref={spotlightRef} className="absolute inset-0" />

      {/* Floating Gradient Blobs */}
      <div className="absolute top-[15%] left-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-tr from-accent1/10 to-accent2/10 blur-[100px] animate-blob" />
      <div className="absolute top-[50%] right-[5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-accent2/10 to-accent3/10 blur-[120px] animate-blob animation-delay-2000" />
      <div className="absolute bottom-[5%] left-[25%] w-[35vw] h-[35vw] max-w-[450px] max-h-[450px] rounded-full bg-gradient-to-tr from-accent3/10 to-accent1/10 blur-[90px] animate-blob animation-delay-4000" />
    </div>
  );
}
