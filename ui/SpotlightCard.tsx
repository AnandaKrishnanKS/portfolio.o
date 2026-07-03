"use client";

import { useRef, MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  tiltEffect?: boolean;
}

export default function SpotlightCard({ children, className = "", tiltEffect = true }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  // Spring setups for smooth responses
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 15 });
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 15 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Assign relative coordinates to CSS variables
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    if (tiltEffect) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate tilt angles (limits to max ~8 degrees)
      const tiltX = ((y - centerY) / centerY) * -6;
      const tiltY = ((x - centerX) / centerX) * 6;
      
      rotateX.set(tiltX);
      rotateY.set(tiltY);
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.setProperty("--mouse-x", `-999px`);
      card.style.setProperty("--mouse-y", `-999px`);
    }
    
    if (tiltEffect) {
      rotateX.set(0);
      rotateY.set(0);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`spotlight-card glass-card relative overflow-hidden transition-all duration-300 ${className}`}
    >
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
