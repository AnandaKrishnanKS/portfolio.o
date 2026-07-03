"use client";

import { motion } from "framer-motion";
import { Award, Trophy, ShieldCheck } from "lucide-react";
import { achievements } from "@/data/portfolioData";
import SpotlightCard from "@/ui/SpotlightCard";

export default function Achievements() {
  const getIcon = (category: string) => {
    switch (category) {
      case "Certifications":
        return <ShieldCheck className="w-5 h-5 text-indigo-400" />;
      case "Hackathons":
        return <Trophy className="w-5 h-5 text-purple-400" />;
      case "Awards":
        return <Award className="w-5 h-5 text-pink-400" />;
      default:
        return <Award className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <section id="achievements" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-primary mb-2"
          >
            Honors
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Achievements
          </motion.h2>
          <div className="h-1 w-12 bg-primary rounded-full mt-4" />
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="h-full flex"
            >
              <SpotlightCard className="p-5 flex flex-col items-start text-left h-full group" tiltEffect={true}>
                {/* Category badge & Icon */}
                <div className="flex justify-between items-center w-full mb-4">
                  <div className="p-2.5 rounded-xl bg-muted border border-border">
                    {getIcon(item.category)}
                  </div>
                  <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                    {item.year}
                  </span>
                </div>

                {/* Content */}
                <span className="text-[10px] text-primary font-medium tracking-wide uppercase mb-1 block">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light mt-auto">
                  {item.details}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
