"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { skills } from "@/data/portfolioData";
import SpotlightCard from "@/ui/SpotlightCard";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Frontend" | "Backend" | "AI" | "Other">("All");

  const categories: ("All" | "Frontend" | "Backend" | "AI" | "Other")[] = [
    "All",
    "Frontend",
    "Backend",
    "AI",
    "Other",
  ];

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-primary mb-2"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            My Tech Stack
          </motion.h2>
          <div className="h-1 w-12 bg-primary rounded-full mt-4" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium border transition-all duration-300 clickable focus:outline-none ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                  : "glass-card hover:bg-muted/30 text-muted-foreground hover:text-foreground border-white/5"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              // Dynamically map icon name
              const IconComponent = ((Icons as unknown) as Record<string, React.ComponentType<{ className?: string }>>)[skill.iconName] || Icons.Code;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={skill.name}
                  className="w-full"
                >
                  <SpotlightCard className="p-5 flex flex-col items-start text-left h-full group" tiltEffect={true}>
                    {/* Icon & Level Badge */}
                    <div className="flex justify-between items-center w-full mb-4">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                        {skill.level}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-light">
                      {skill.description}
                    </p>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
