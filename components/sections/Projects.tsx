"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, ExternalLink, X, ChevronRight, CheckCircle2 } from "lucide-react";
import { projects, Project } from "@/data/portfolioData";
import SpotlightCard from "@/ui/SpotlightCard";
import { GitHubIcon } from "@/components/BrandIcons";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "Web Apps", "AI", "Ecommerce", "CRM", "SEO"];

  // Handle body scroll locking when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-primary mb-2"
          >
            Creative Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Featured Projects
          </motion.h2>
          <div className="h-1 w-12 bg-primary rounded-full mt-4" />
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 clickable focus:outline-none ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                    : "glass-card hover:bg-muted/30 text-muted-foreground hover:text-foreground border-white/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72 flex items-center glass-panel px-3 py-1.5 rounded-full border border-white/10">
            <Search className="w-4 h-4 text-muted-foreground mr-2.5" />
            <input
              type="text"
              placeholder="Search by name or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 outline-none text-xs text-foreground placeholder-muted-foreground py-0.5"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="h-full flex"
              >
                <SpotlightCard
                  className="flex flex-col h-full w-full group cursor-pointer"
                  tiltEffect={true}
                >
                  <div onClick={() => setSelectedProject(project)} className="flex flex-col h-full">
                    {/* Project Image */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      <span className="absolute top-3 left-3 text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-foreground border border-white/10">
                        {project.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between text-left">
                      <div>
                        <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors flex items-center justify-between">
                          <span>{project.title}</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed font-light mb-4 line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl glass-panel rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col max-h-[85vh]"
              data-lenis-prevent
            >
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 z-10 bg-card/80 backdrop-blur">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-lg font-bold text-foreground mt-0.5">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all clickable"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable details content */}
              <div className="overflow-y-auto p-6 flex flex-col gap-6 text-left">
                {/* Showcase Image */}
                <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden border border-white/5">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Left Column: Descriptions & Challenges */}
                  <div className="md:col-span-8 flex flex-col gap-6">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                        Project Overview
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed font-light">
                        {selectedProject.detailedDescription}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                        Key Features
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {selectedProject.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <span className="text-xs text-muted-foreground font-light">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                        Technical Challenges & Solutions
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed font-light italic bg-muted/30 p-4 rounded-xl border border-white/5">
                        {selectedProject.challenges}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Details & Tech & Actions */}
                  <div className="md:col-span-4 flex flex-col gap-6">
                    {/* Tech Stack List */}
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
                        Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono px-2 py-1 rounded bg-muted text-muted-foreground border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-col gap-2 mt-auto">
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-semibold text-center flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20 clickable"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 rounded-xl glass-card hover:bg-muted/50 text-foreground text-xs font-semibold text-center flex items-center justify-center gap-2 transition-all clickable"
                      >
                        <GitHubIcon className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Gallery screenshots */}
                {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
                      Gallery
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProject.gallery.map((img, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-white/5"
                        >
                          <Image
                            src={img}
                            alt={`${selectedProject.title} Screenshot ${idx + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
