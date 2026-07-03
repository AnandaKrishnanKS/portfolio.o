"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import SpotlightCard from "@/ui/SpotlightCard";

export default function DinoGame() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Game variables
  const gameSpeed = useRef(6);
  const dinoY = useRef(0);
  const dinoVelocity = useRef(0);
  const isJumping = useRef(false);
  const obstacles = useRef<{ x: number; width: number; height: number }[]>([]);
  const frameCount = useRef(0);
  const internalScore = useRef(0);

  // Monitor network status to auto-start when offline
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHighScore(Number(localStorage.getItem("dino_highscore") || "0"));

      const handleOffline = () => {
        startGame();
      };

      window.addEventListener("offline", handleOffline);
      return () => {
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  // Handle keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        if (gameState === "idle") {
          startGame();
        } else if (gameState === "playing") {
          jump();
        } else if (gameState === "gameover") {
          startGame();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  const startGame = () => {
    setGameState("playing");
    gameSpeed.current = 6;
    dinoY.current = 0;
    dinoVelocity.current = 0;
    isJumping.current = true; // Start with a small velocity or landing check
    obstacles.current = [];
    frameCount.current = 0;
    internalScore.current = 0;
    setScore(0);
  };

  const jump = () => {
    if (!isJumping.current) {
      dinoVelocity.current = 10; // Upward velocity
      isJumping.current = true;
    }
  };

  // Game loop
  useEffect(() => {
    if (gameState !== "playing" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localFrameId: number;

    const updateGame = () => {
      frameCount.current++;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Colors based on theme (read from CSS variables)
      const isLightTheme = !document.documentElement.classList.contains("dark");
      const primaryColor = "#e11d48"; // Rose accent
      const textColor = isLightTheme ? "#09090b" : "#fafafa";
      const groundColor = isLightTheme ? "#e4e4e7" : "#27272a";

      // 1. Gravity and Dino Physics (Standard ground-relative physics)
      dinoVelocity.current -= 0.55; // Pull down
      dinoY.current += dinoVelocity.current;

      const groundY = canvas.height - 20;
      const dinoHeight = 30;
      const dinoWidth = 22;

      if (dinoY.current <= 0) {
        dinoY.current = 0;
        dinoVelocity.current = 0;
        isJumping.current = false;
      }

      // Height on screen (subtract y from ground level)
      const dinoCurrentY = groundY - dinoHeight - dinoY.current;

      // Draw Dino (Retro Block design)
      ctx.fillStyle = primaryColor;
      // Head
      ctx.fillRect(40 + 4, dinoCurrentY, 13, 10);
      // Eye
      ctx.fillStyle = isLightTheme ? "#ffffff" : "#000000";
      ctx.fillRect(40 + 11, dinoCurrentY + 2, 2, 2);
      // Body
      ctx.fillStyle = primaryColor;
      ctx.fillRect(40, dinoCurrentY + 10, 16, 12);
      // Tail
      ctx.fillRect(40 - 3, dinoCurrentY + 10, 3, 6);
      // Legs
      const legOffset = Math.floor(frameCount.current / 5) % 2 === 0 ? 0 : 3;
      ctx.fillRect(40 + 2, dinoCurrentY + 22, 3, dinoHeight - 22 - legOffset);
      ctx.fillRect(40 + 9, dinoCurrentY + 22, 3, dinoHeight - 22 - (3 - legOffset));

      // 2. Draw Ground
      ctx.strokeStyle = groundColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();

      // Dotted details on ground
      ctx.fillStyle = groundColor;
      for (let i = 0; i < canvas.width; i += 40) {
        const dotOffset = (i - frameCount.current * gameSpeed.current) % canvas.width;
        const x = dotOffset < 0 ? dotOffset + canvas.width : dotOffset;
        ctx.fillRect(x, groundY + 4, 3, 1.5);
      }

      // 3. Obstacles logic
      // Spawn obstacle
      if (frameCount.current % 100 === 0) {
        const minHeight = 18;
        const maxHeight = 35;
        const width = 10 + Math.random() * 10;
        const height = minHeight + Math.random() * (maxHeight - minHeight);
        obstacles.current.push({ x: canvas.width, width, height });
      }

      // Move & Draw Obstacles (Cacti)
      ctx.fillStyle = textColor;
      obstacles.current.forEach((obs) => {
        obs.x -= gameSpeed.current;

        // Draw Cactus shape
        const obsY = groundY - obs.height;
        ctx.fillRect(obs.x, obsY, obs.width, obs.height);

        // Collision Check
        const dinoX = 40;
        const dinoBox = { x: dinoX, y: dinoCurrentY, w: dinoWidth, h: dinoHeight };
        const obsBox = { x: obs.x, y: obsY, w: obs.width, h: obs.height };

        if (
          dinoBox.x < obsBox.x + obsBox.w &&
          dinoBox.x + dinoBox.w > obsBox.x &&
          dinoBox.y < obsBox.y + obsBox.h &&
          dinoBox.y + dinoBox.h > obsBox.y
        ) {
          // Collision!
          setGameState("gameover");
          
          // Save high score
          if (internalScore.current > highScore) {
            setHighScore(internalScore.current);
            localStorage.setItem("dino_highscore", internalScore.current.toString());
          }
        }
      });

      // Remove offscreen obstacles
      obstacles.current = obstacles.current.filter((obs) => obs.x + obs.width > 0);

      // 4. Update Score
      if (frameCount.current % 6 === 0) {
        internalScore.current++;
        setScore(internalScore.current);
        
        // Speed up gradually
        if (internalScore.current % 100 === 0) {
          gameSpeed.current += 0.4;
        }
      }

      if (gameState === "playing") {
        localFrameId = requestAnimationFrame(updateGame);
      }
    };

    localFrameId = requestAnimationFrame(updateGame);

    return () => {
      cancelAnimationFrame(localFrameId);
    };
  }, [gameState, highScore]);

  return (
    <section id="dino-playground" className="py-12 relative overflow-hidden bg-black/[2%] border-t border-border">
      <div className="max-w-xl mx-auto px-6 flex flex-col items-center">
        
        {/* Game Container */}
        <SpotlightCard className="w-full p-4 relative overflow-hidden flex flex-col items-center" tiltEffect={false}>
          
          {/* Scoreboard */}
          <div className="flex justify-between items-center w-full mb-3 text-[10px] font-mono text-muted-foreground select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>Dino Play</span>
            </div>
            <div className="flex gap-4">
              <span>HI {highScore.toString().padStart(5, "0")}</span>
              <span className="text-primary font-bold">{score.toString().padStart(5, "0")}</span>
            </div>
          </div>

          {/* Game Canvas */}
          <div 
            onClick={gameState === "playing" ? jump : undefined}
            className="relative w-full aspect-[4/1] bg-muted/20 border border-border rounded-lg overflow-hidden cursor-pointer select-none"
          >
            <canvas 
              ref={canvasRef} 
              width={600} 
              height={150} 
              className="w-full h-full block"
            />

            {/* Game overlays */}
            <AnimatePresence>
              {gameState === "idle" && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-background/80 backdrop-blur-[2px] flex flex-col items-center justify-center text-center px-4"
                >
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      startGame();
                    }}
                    className="p-2.5 rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform clickable focus:outline-none mb-1.5 shadow-md shadow-primary/20"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                  <span className="text-[10px] font-semibold text-foreground">Click or Spacebar to Play</span>
                </motion.div>
              )}

              {gameState === "gameover" && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-background/80 backdrop-blur-[2px] flex flex-col items-center justify-center text-center px-4"
                >
                  <span className="text-[10px] font-bold text-rose-500 font-mono tracking-wider mb-2">GAME OVER • {score} POINTS</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      startGame();
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold hover:scale-105 transition-transform clickable focus:outline-none shadow-md shadow-primary/20"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Restart</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
