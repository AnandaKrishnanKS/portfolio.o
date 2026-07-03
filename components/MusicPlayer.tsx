"use client";

import { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface MusicPlayerProps {
  isPlaying: boolean;
  togglePlay: () => void;
}

export default function MusicPlayer({ isPlaying, togglePlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Ambient lofi track URL
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.15; // Set low volume for ambient vibe

    const startOnInteraction = () => {
      if (isPlaying && audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
        document.removeEventListener("click", startOnInteraction);
        document.removeEventListener("touchstart", startOnInteraction);
      }
    };

    if (isPlaying) {
      document.addEventListener("click", startOnInteraction);
      document.addEventListener("touchstart", startOnInteraction);
    }

    return () => {
      document.removeEventListener("click", startOnInteraction);
      document.removeEventListener("touchstart", startOnInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay block or audio load issue:", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <button
      onClick={togglePlay}
      title={isPlaying ? "Mute Background Music" : "Play Ambient Music"}
      className="fixed bottom-5 left-5 z-40 glass-panel p-2.5 rounded-full text-muted-foreground hover:text-foreground shadow-lg flex items-center gap-2 group transition-all"
    >
      {isPlaying ? <Volume2 className="w-4 h-4 text-primary animate-pulse" /> : <VolumeX className="w-4 h-4" />}
      
      {/* Small soundwave visualizer */}
      <div className="flex gap-0.5 items-end h-3 w-5">
        {[1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="w-[2.5px] bg-primary rounded-full"
            animate={{
              height: isPlaying ? ["20%", "100%", "20%"] : "20%"
            }}
            transition={{
              duration: 0.6 + i * 0.12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </button>
  );
}
