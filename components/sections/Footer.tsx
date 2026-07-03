"use client";

import { useEffect, useState } from "react";
import { Sparkles, Clock } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: personalInfo.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(formatter.format(new Date()));
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-card/25 backdrop-blur-sm py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Left Side: Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-1.5 font-bold tracking-tight text-sm text-foreground focus:outline-none"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Anandakrishnan</span>
          </button>
          <span className="text-[10px] text-muted-foreground font-light">
            © {new Date().getFullYear()} Anandakrishnan K S. All rights reserved. Designed with precision.
          </span>
        </div>

        {/* Center: Live Clock */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border text-[10px] text-muted-foreground font-mono select-none">
          <Clock className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span>Local Time:</span>
          <span className="text-foreground font-semibold">{time || "12:00:00 AM"}</span>
          <span className="opacity-60">(GMT+5:30)</span>
        </div>

        {/* Right Side: Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          <button onClick={() => scrollTo("about")} className="hover:text-foreground transition-colors">
            About
          </button>
          <button onClick={() => scrollTo("skills")} className="hover:text-foreground transition-colors">
            Skills
          </button>
          <button onClick={() => scrollTo("projects")} className="hover:text-foreground transition-colors">
            Projects
          </button>
          <button onClick={() => scrollTo("experience")} className="hover:text-foreground transition-colors">
            Experience
          </button>
          <button onClick={() => scrollTo("contact")} className="hover:text-foreground transition-colors">
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
}
