"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/portfolioData";
import SpotlightCard from "@/ui/SpotlightCard";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [index]);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const activeTestimonial = testimonials[index];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-black/10">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-primary mb-2"
          >
            Endorsements
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            Client Reviews
          </motion.h2>
          <div className="h-1 w-12 bg-primary rounded-full mt-4" />
        </div>

        {/* Carousel Frame */}
        <div className="relative min-h-[320px] flex items-center justify-center">
          {/* Controls - Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:-left-12 z-15 p-2 rounded-full glass-card hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all clickable focus:outline-none"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Slider Container */}
          <div className="w-full max-w-2xl overflow-hidden relative py-4">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                <SpotlightCard className="p-6 sm:p-8 flex flex-col items-center text-center relative" tiltEffect={false}>
                  {/* Quote Icon */}
                  <Quote className="w-10 h-10 text-primary/10 absolute top-6 left-6" />

                  {/* Client Image */}
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4 border border-primary/20 shadow-md">
                    <Image
                      src={activeTestimonial.avatar}
                      alt={activeTestimonial.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-0.5 mb-4 text-amber-400">
                    {Array.from({ length: activeTestimonial.rating }).map((_, starIdx) => (
                      <Star key={starIdx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  {/* Feedback */}
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed italic font-light mb-6">
                    &quot;{activeTestimonial.feedback}&quot;
                  </p>

                  {/* Client Info */}
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{activeTestimonial.name}</h4>
                    <span className="text-[10px] text-primary font-medium tracking-wide uppercase mt-0.5 block">
                      {activeTestimonial.role}
                    </span>
                  </div>
                </SpotlightCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls - Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:-right-12 z-15 p-2 rounded-full glass-card hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all clickable focus:outline-none"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Paginate Dots */}
        <div className="flex justify-center gap-1.5 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > index ? 1 : -1);
                setIndex(idx);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 clickable focus:outline-none ${
                idx === index ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
