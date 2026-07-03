"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Compass } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";
import AnimatedCounter from "@/ui/AnimatedCounter";

export default function About() {
  const education = personalInfo.education;

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-primary mb-2"
          >
            Biography
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            About Me
          </motion.h2>
          <div className="h-1 w-12 bg-primary rounded-full mt-4" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Profile Card & Counters */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Profile Image Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden p-1.5 glass-panel border-white/10 shadow-2xl"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.name}
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
              {/* Decorative Glow */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10" />
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 w-full mt-8">
              {personalInfo.stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-4 rounded-xl text-center flex flex-col justify-center items-center"
                >
                  <span className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center">
                    <AnimatedCounter value={stat.value} />
                    <span className="text-primary ml-0.5">{stat.suffix}</span>
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground mt-1 font-medium">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Bio, Education, Values */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left">
            {/* Biography text */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl border border-white/5"
            >
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Compass className="w-5 h-5 text-primary" />
                <span>My Journey</span>
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">
                Hello! I&apos;m Zoro, a passionate developer based in your local timezone. Over the past 5 years, I&apos;ve dedicated myself to designing and crafting digital solutions that reside at the intersection of aesthetic design and technical excellence.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed font-light mt-3">
                My approach is driven by user-first mechanics, writing clean TypeScript code, and building systems that load in milliseconds. I&apos;m constantly learning new AI technologies and SEO optimizations to deliver maximum visibility and conversion.
              </p>
            </motion.div>

            {/* Education History */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="glass-card p-6 rounded-2xl border border-white/5"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span>Education</span>
              </h3>
              <div className="flex flex-col gap-4">
                {education.map((edu, idx) => (
                  <div
                    key={edu.degree}
                    className={`flex flex-col pb-3 ${
                      idx !== education.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start flex-wrap gap-1">
                      <h4 className="text-sm font-medium text-foreground">{edu.degree}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono border border-border">
                        {edu.period}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 font-light">
                      {edu.institution}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
