"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { experiences } from "@/data/portfolioData";
import SpotlightCard from "@/ui/SpotlightCard";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-primary mb-2"
          >
            Employment
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Work History
          </motion.h2>
          <div className="h-1 w-12 bg-primary rounded-full mt-4" />
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-border md:border-l-0 md:flex md:flex-col md:items-center max-w-4xl mx-auto">
          {/* Vertical Center Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-border -translate-x-1/2" />

          {experiences.map((exp, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={exp.company + exp.position}
                className={`relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-8 w-full mb-12`}
              >
                {/* Node icon dot */}
                <div className="absolute -left-[13px] md:left-1/2 top-1.5 md:-translate-x-1/2 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border border-primary/40 shadow shadow-primary/20">
                  <Briefcase className="w-3.5 h-3.5 text-primary" />
                </div>

                {/* Left block (Desktop) */}
                <div
                  className={`md:flex md:flex-col ${
                    isEven ? "md:items-end md:text-right" : "md:order-2 md:items-start md:text-left"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="w-full md:max-w-md"
                  >
                    <SpotlightCard className="p-6 text-left" tiltEffect={true}>
                      {/* Meta */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-border pb-3">
                        <div>
                          <h3 className="text-base font-bold text-foreground">{exp.position}</h3>
                          <span className="text-xs text-primary font-semibold">{exp.company}</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                          <Calendar className="w-3 h-3" />
                          {exp.duration}
                        </span>
                      </div>

                      {/* Description bullets */}
                      <div className="flex flex-col gap-2.5">
                        {exp.description.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2.5">
                            <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                            <p className="text-xs text-muted-foreground leading-relaxed font-light">
                              {bullet}
                            </p>
                          </div>
                        ))}
                      </div>
                    </SpotlightCard>
                  </motion.div>
                </div>

                {/* Empty block to preserve grid columns in desktop layout */}
                <div className="hidden md:block" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
