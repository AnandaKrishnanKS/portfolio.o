"use client";

import { useState } from "react";
import Header from "./Header";
import CustomCursor from "./CustomCursor";
import Background from "./Background";
import CommandPalette from "./CommandPalette";
import MusicPlayer from "./MusicPlayer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Achievements from "./sections/Achievements";
import GithubActivity from "./sections/GithubActivity";
import Contact from "./sections/Contact";
import DinoGame from "./sections/DinoGame";
import Footer from "./sections/Footer";

export default function PortfolioContainer() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  const toggleMusic = () => {
    setIsMusicPlaying((prev) => !prev);
  };

  return (
    <>
      {/* Visual & Audio Layout Elements */}
      <CustomCursor />
      <Background />
      <Header />
      
      {/* Global Utilities */}
      <CommandPalette toggleMusic={toggleMusic} isMusicPlaying={isMusicPlaying} />
      <MusicPlayer isPlaying={isMusicPlaying} togglePlay={toggleMusic} />
      
      {/* Content Sections */}
      <main className="relative z-10 flex flex-col w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <GithubActivity />
        <Contact />
        <DinoGame />
      </main>
      
      {/* Footer Branding */}
      <Footer />
    </>
  );
}
