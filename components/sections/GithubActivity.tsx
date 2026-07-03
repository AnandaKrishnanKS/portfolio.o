"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Star, Activity, Sparkles, FolderGit2 } from "lucide-react";
import SpotlightCard from "@/ui/SpotlightCard";

interface Repo {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
}

interface Language {
  name: string;
  percent: number;
  color: string;
}

interface Day {
  level: number;
  count: number;
}

interface Week {
  days: Day[];
}

interface GitHubData {
  username: string;
  repositories: Repo[];
  contributionWeeks: Week[];
  languages: Language[];
}

export default function GithubActivity() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/github");
        if (res.ok) {
          const stats = await res.json();
          setData(stats);
        }
      } catch (err) {
        console.error("Failed to load github metrics", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-zinc-800/40 border-zinc-900/10";
      case 1:
        return "bg-primary/20 border-primary/10";
      case 2:
        return "bg-primary/45 border-primary/20";
      case 3:
        return "bg-primary/70 border-primary/45";
      case 4:
        return "bg-primary border-primary/70";
      default:
        return "bg-zinc-800/40 border-zinc-900/10";
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground animate-pulse">
        Fetching GitHub metrics...
      </div>
    );
  }

  return (
    <section id="github" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-primary mb-2"
          >
            Development
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-foreground"
          >
            GitHub Activity
          </motion.h2>
          <div className="h-1 w-12 bg-primary rounded-full mt-4" />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contribution Grid (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6 text-left">
            <SpotlightCard className="p-6" tiltEffect={false}>
              <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
                <Activity className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Contribution Matrix</h3>
              </div>

              {/* Matrix Layout */}
              <div className="overflow-x-auto w-full pb-2">
                <div className="flex gap-[3.5px] min-w-[640px]">
                  {data?.contributionWeeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3.5px]">
                      {week.days.map((day, dIdx) => (
                        <div
                          key={dIdx}
                          title={`${day.count} commits`}
                          className={`w-[9px] h-[9px] rounded-sm border ${getLevelColor(
                            day.level
                          )} transition-all duration-300 hover:scale-125`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid Legend */}
              <div className="flex items-center justify-end gap-1.5 mt-4 text-[10px] text-muted-foreground select-none">
                <span>Less</span>
                <div className="w-2.5 h-2.5 rounded-sm bg-zinc-800/40 border border-zinc-900/10" />
                <div className="w-2.5 h-2.5 rounded-sm bg-primary/20 border border-primary/10" />
                <div className="w-2.5 h-2.5 rounded-sm bg-primary/45 border border-primary/20" />
                <div className="w-2.5 h-2.5 rounded-sm bg-primary/70 border border-primary/45" />
                <div className="w-2.5 h-2.5 rounded-sm bg-primary border border-primary/70" />
                <span>More</span>
              </div>
            </SpotlightCard>

            {/* Repositories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data?.repositories.map((repo, idx) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="h-full flex"
                >
                  <SpotlightCard className="p-5 flex flex-col justify-between h-full group" tiltEffect={true}>
                    <div>
                      <div className="flex items-center gap-1.5 mb-2.5 text-primary">
                        <FolderGit2 className="w-4 h-4" />
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-foreground hover:text-primary transition-colors truncate"
                        >
                          {repo.name}
                        </a>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-normal font-light line-clamp-3 mb-4">
                        {repo.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto border-t border-border pt-2.5 text-[10px] text-muted-foreground font-mono">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        {repo.language}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-current text-amber-400" />
                          {repo.stars}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <GitBranch className="w-3 h-3" />
                          {repo.forks}
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Language distribution (4 cols) */}
          <div className="lg:col-span-4 text-left h-full">
            <SpotlightCard className="p-6 h-full flex flex-col justify-between" tiltEffect={false}>
              <div>
                <div className="flex items-center gap-2 mb-6 border-b border-border pb-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-bold text-foreground">Language Distribution</h3>
                </div>

                {/* Progress bars */}
                <div className="flex flex-col gap-4">
                  {data?.languages.map((lang) => (
                    <div key={lang.name} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-foreground">{lang.name}</span>
                        <span className="text-muted-foreground font-mono">{lang.percent}%</span>
                      </div>
                      {/* Bar wrapper */}
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden border border-border">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${lang.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border text-[10px] text-muted-foreground font-light leading-relaxed">
                Stats compiled dynamically from GitHub API repositories, commits index, and activity metrics.
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
