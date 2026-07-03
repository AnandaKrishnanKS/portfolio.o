import { NextResponse } from "next/server";

export async function GET() {
  const username = "AnandaKrishnanKS"; // Default placeholder username, can be configured

  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=3`,
      {
        next: { revalidate: 7200 }, // Cache for 2 hours
        headers: {
          "User-Agent": "Portfolio-App",
        },
      }
    );

    let repos = [];
    if (reposRes.ok) {
      const data = await reposRes.json();
      repos = data.map((repo: { name: string; description: string | null; html_url: string; stargazers_count: number; forks_count: number; language: string | null }) => ({
        name: repo.name,
        description: repo.description || "Modern web development application built using optimized principles.",
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || "TypeScript",
      }));
    } else {
      // Fallback repositories if API rate limited or offline
      repos = [
        {
          name: "next-saas-template",
          description: "A production-ready SaaS template built with Next.js 15, Prisma, and Tailwind CSS.",
          url: "https://github.com",
          stars: 142,
          forks: 28,
          language: "TypeScript",
        },
        {
          name: "ai-orchestration-agent",
          description: "Generative AI agent platform utilizing LangChain, RAG embeddings, and vector systems.",
          url: "https://github.com",
          stars: 96,
          forks: 14,
          language: "Python",
        },
        {
          name: "fast-seo-compiler",
          description: "Lightweight HTML scanner compiling site directories into optimized sitemaps.",
          url: "https://github.com",
          stars: 64,
          forks: 8,
          language: "JavaScript",
        },
      ];
    }

    // Mock contribution data (52 weeks x 7 days)
    const contributionWeeks = [];
    for (let w = 0; w < 53; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const rand = Math.random();
        let level = 0;
        if (rand > 0.88) level = 4;
        else if (rand > 0.72) level = 3;
        else if (rand > 0.52) level = 2;
        else if (rand > 0.28) level = 1;

        days.push({
          level,
          count: level * 2 + Math.floor(Math.random() * 3),
        });
      }
      contributionWeeks.push({ days });
    }

    // Languages distribution
    const languages = [
      { name: "TypeScript", percent: 48, color: "bg-[#3178c6]" },
      { name: "JavaScript", percent: 28, color: "bg-[#f1e05a]" },
      { name: "Python", percent: 14, color: "bg-[#3572A5]" },
      { name: "HTML/CSS", percent: 10, color: "bg-[#e34c26]" },
    ];

    return NextResponse.json({
      username,
      repositories: repos,
      contributionWeeks,
      languages,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to gather GitHub statistics: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}
