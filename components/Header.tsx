"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Sparkles } from "lucide-react";

const navItems = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure portal target is available
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set theme on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  // Track scroll position to shrink header and update active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const sections = ["hero", ...navItems.map((item) => item.id)];

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Mobile nav pill rendered via portal so it escapes all stacking contexts / transforms
  const mobileNav = mounted && createPortal(
    <AnimatePresence>
      {isScrolled && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          style={{
            position: "fixed",
            bottom: "1.5rem",
            left: "50%",
            zIndex: 9999,
            width: "90%",
            maxWidth: "28rem",
          }}
          className="md:hidden glass-panel rounded-full shadow-2xl p-1.5 flex items-center justify-between border-white/10"
        >
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex-1 text-[10px] font-semibold py-2 rounded-full transition-colors focus:outline-none ${
                activeSection === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-4 left-0 right-0 z-40 transition-all duration-300 px-4`}
      >
        <div
          className={`max-w-4xl mx-auto flex items-center justify-between px-4 py-2.5 rounded-full transition-all duration-300 ${
            isScrolled
              ? "glass-panel shadow-lg py-2 border-white/10"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-1.5 font-bold tracking-tight text-sm text-foreground clickable focus:outline-none"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Anandakrishnan</span>
          </button>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors clickable focus:outline-none ${
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-primary rounded-full -z-10 shadow-md"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Theme switcher */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all clickable focus:outline-none flex items-center justify-center"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile nav rendered into body via portal — escapes all transform/stacking contexts */}
      {mobileNav}
    </>
  );
}
