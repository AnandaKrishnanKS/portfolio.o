"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, Calendar, Clock, ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/portfolioData";
import SpotlightCard from "@/ui/SpotlightCard";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured || !featuredPost);

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-black/10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
              Insights
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Latest Articles
            </h2>
            <div className="h-1 w-12 bg-primary rounded-full mt-4" />
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 flex items-center glass-panel px-3 py-1.5 rounded-full border border-white/10">
            <Search className="w-4 h-4 text-muted-foreground mr-2.5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 outline-none text-xs text-foreground placeholder-muted-foreground py-0.5"
            />
          </div>
        </div>

        {/* Featured Post Card (If matches filter) */}
        {featuredPost && searchQuery === "" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 w-full"
          >
            <SpotlightCard className="p-6 md:p-8 flex flex-col md:grid md:grid-cols-12 gap-8 items-center text-left" tiltEffect={false}>
              {/* Image Frame (5 cols) */}
              <div className="relative aspect-[16/10] w-full md:col-span-5 rounded-xl overflow-hidden border border-white/5">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Info Details (7 cols) */}
              <div className="md:col-span-7 flex flex-col h-full justify-between items-start">
                <div>
                  {/* Meta Indicators */}
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono mb-4">
                    <span className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readingTime}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 hover:text-primary transition-colors cursor-pointer flex items-start gap-1">
                    <span>{featuredPost.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground inline shrink-0 mt-1" />
                  </h3>

                  <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6">
                    {featuredPost.summary}
                  </p>
                </div>

                <button className="text-xs font-semibold text-primary hover:text-foreground transition-colors flex items-center gap-1">
                  Read Featured Article
                </button>
              </div>
            </SpotlightCard>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {regularPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="h-full flex"
              >
                <SpotlightCard className="p-5 flex flex-col justify-between h-full group text-left cursor-pointer" tiltEffect={true}>
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-white/5 mb-4">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Meta Indicators */}
                    <div className="flex items-center gap-2.5 text-[9px] text-muted-foreground font-mono mb-3">
                      <span className="text-[8px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-muted border border-border text-foreground">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-3 h-3" />
                        {post.readingTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm font-bold text-foreground leading-snug group-hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-muted-foreground font-light leading-normal line-clamp-2 mb-4">
                      {post.summary}
                    </p>
                  </div>

                  <span className="text-[10px] font-mono text-primary font-semibold mt-auto block pt-2.5 border-t border-border group-hover:translate-x-1 transition-transform">
                    {post.date}
                  </span>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
