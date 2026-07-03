"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageSquare, Download, Code2, Sparkles } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export default function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fading loop for titles
  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIdx((prev) => (prev + 1) % personalInfo.titles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // 3D Orbital Particle Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: {
      x: number;
      y: number;
      z: number;
      px: number;
      py: number;
      color: string;
    }[] = [];
    const particleCount = 280;
    const sphereRadius = Math.min(width, height) * 0.35;

    // Initialize particles on a 3D sphere surface
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.acos(Math.random() * 2 - 1);
      const phi = Math.random() * Math.PI * 2;

      particles.push({
        x: sphereRadius * Math.sin(theta) * Math.cos(phi),
        y: sphereRadius * Math.sin(theta) * Math.sin(phi),
        z: sphereRadius * Math.cos(theta),
        px: 0,
        py: 0,
        color: i % 2 === 0 ? "rgb(99, 102, 241)" : "rgb(168, 85, 247)", // Indigo/Purple
      });
    }

    const angleX = 0.002;
    const angleY = 0.003;

    // Mouse interaction parameters
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left - width / 2;
      mouse.targetY = e.clientY - rect.top - height / 2;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampen mouse movements
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Adjust rotation angles based on mouse drag/hover
      const currentAngleX = angleX + (mouse.isHovering ? mouse.y * 0.00002 : 0);
      const currentAngleY = angleY + (mouse.isHovering ? mouse.x * 0.00002 : 0);

      // Compute trig values
      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);
      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);

      // Draw background glow subtly
      const glowGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        sphereRadius * 1.5
      );
      glowGrad.addColorStop(0, "rgba(99, 102, 241, 0.02)");
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Project and draw particles
      particles.forEach((p) => {
        // Rotate Y
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // Store back rotated coordinates
        p.x = x1;
        p.y = y1;
        p.z = z2;

        // Perspective Projection
        const fov = 400;
        const scale = fov / (fov + z2);
        const projX = x1 * scale + width / 2;
        const projY = y1 * scale + height / 2;

        // Size based on depth
        const radius = Math.max(0.5, (scale * 2.2));

        // Fade out particles towards the back
        const alpha = Math.max(0.05, Math.min(0.9, (z2 + sphereRadius) / (2 * sphereRadius)));

        ctx.beginPath();
        ctx.arc(projX, projY, radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("rgb", "rgba").replace(")", `, ${alpha})`);
        ctx.fill();

        p.px = projX;
        p.py = projY;
      });

      // Draw lines between near particles to build wireframe sphere feeling
      ctx.lineWidth = 0.45;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          // Compute distance on screen
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // If close and at the front, connect them
          if (dist < 40 && p1.z < 30 && p2.z < 30) {
            const alpha = (1 - dist / 40) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center pt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left text column */}
        <div className="md:col-span-7 flex flex-col justify-center text-left">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold w-max mb-6"
          >
            <Code2 className="w-3.5 h-3.5 animate-pulse" />
            <span>Open to opportunities</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]"
          >
            Hi, I&apos;m{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent1 via-accent2 to-accent3">
              {personalInfo.name}
            </span>
          </motion.h1>

          {/* Subheading Loops */}
          <div className="h-12 sm:h-16 flex items-center mt-3 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h2
                key={titleIdx}
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -25, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-2xl sm:text-4xl font-semibold text-muted-foreground flex items-center gap-2"
              >
                <span>A</span>
                <span className="text-foreground border-b border-primary/30 pb-0.5">
                  {personalInfo.titles[titleIdx]}
                </span>
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-sm sm:text-base max-w-lg mt-4 leading-relaxed font-light"
          >
            {personalInfo.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            {/* View Projects */}
            <button
              onClick={() => scrollTo("projects")}
              className="px-6 py-3 text-xs font-semibold rounded-full bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 flex items-center gap-2 transition-all group clickable"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Contact Me */}
            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-3 text-xs font-semibold rounded-full glass-card hover:bg-muted/30 text-foreground flex items-center gap-2 transition-all clickable"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Me</span>
            </button>

            {/* Download Resume */}
            <a
              href={personalInfo.resumeUrl}
              download
              className="px-6 py-3 text-xs font-semibold rounded-full glass-card hover:bg-muted/30 text-foreground flex items-center gap-2 transition-all clickable"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </motion.div>
        </div>

        {/* Right canvas column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-5 h-[350px] md:h-[450px] w-full relative flex items-center justify-center"
        >
          {/* Floating tech icons */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 p-2.5 rounded-xl glass-card text-primary/80 border border-primary/20 shadow-xl"
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>

          <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
        </motion.div>
      </div>
    </section>
  );
}
