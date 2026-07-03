"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, Hash, Download, Volume2, VolumeX, Mail } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

interface CommandPaletteProps {
  toggleMusic: () => void;
  isMusicPlaying: boolean;
}

export default function CommandPalette({ toggleMusic, isMusicPlaying }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const options = [
    { label: "Go to Hero", type: "navigation", target: "hero", icon: Hash },
    { label: "Go to About", type: "navigation", target: "about", icon: Hash },
    { label: "Go to Skills", type: "navigation", target: "skills", icon: Hash },
    { label: "Go to Projects", type: "navigation", target: "projects", icon: Hash },
    { label: "Go to Experience", type: "navigation", target: "experience", icon: Hash },
    { label: "Go to Achievements", type: "navigation", target: "achievements", icon: Hash },
    { label: "Go to Contact", type: "navigation", target: "contact", icon: Hash },
    { label: "Go to Dino Game", type: "navigation", target: "dino-playground", icon: Hash },
    { label: "Download Resume", type: "action", action: () => { const a = document.createElement("a"); a.href = personalInfo.resumeUrl; a.download = "AKKS_Resume.pdf"; a.click(); }, icon: Download },
    {
      label: isMusicPlaying ? "Mute Ambient Sound" : "Play Ambient Sound",
      type: "action",
      action: toggleMusic,
      icon: isMusicPlaying ? VolumeX : Volume2
    },
    { label: "Email Zoro", type: "action", action: () => { window.location.href = `mailto:${personalInfo.email}`; }, icon: Mail },
  ];

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Keep selected option in view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  const handleSelect = (option: typeof options[0]) => {
    if (option.type === "navigation" && option.target) {
      const element = document.getElementById(option.target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (option.type === "action" && option.action) {
      option.action();
    }
    setIsOpen(false);
    setSearch("");
  };

  useEffect(() => {
    const handleNavigationKeys = (e: KeyboardEvent) => {
      if (!isOpen || filteredOptions.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredOptions.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredOptions[selectedIndex]) {
          handleSelect(filteredOptions[selectedIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleNavigationKeys);
    return () => window.removeEventListener("keydown", handleNavigationKeys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedIndex, filteredOptions]);

  return (
    <>
      {/* Help prompt on desktop */}
      <div className="hidden md:flex fixed bottom-5 right-5 z-40 glass-panel px-3 py-1.5 rounded-full text-xs text-muted-foreground items-center gap-1.5 shadow-lg select-none">
        <span>Press</span>
        <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono border border-border">Ctrl</kbd>
        <span>+</span>
        <kbd className="px-1.5 py-0.5 rounded bg-muted text-[10px] font-mono border border-border">K</kbd>
        <span>to navigate</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg glass-panel rounded-xl shadow-2xl overflow-hidden flex flex-col border border-white/10"
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search commands, pages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent border-0 outline-none placeholder-muted-foreground text-sm py-1"
                  autoFocus
                />
                <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono border border-border">ESC</span>
              </div>

              {/* Suggestions */}
              <div ref={listRef} className="max-h-[300px] overflow-y-auto p-2 flex flex-col gap-0.5">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, idx) => {
                    const Icon = option.icon;
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={option.label}
                        onClick={() => handleSelect(option)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm transition-all ${
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "hover:bg-muted/50 text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`} />
                          <span>{option.label}</span>
                        </div>
                        {isSelected && (
                          <span className="text-[10px] opacity-80 font-mono">⏎ Enter</span>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    No results found for &quot;{search}&quot;
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
