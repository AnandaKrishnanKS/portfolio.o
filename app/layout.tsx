import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Anandakrishnan K S | Portfolio",
  description: "Explore the digital portfolio of Anandakrishnan K S, Project Coordinator, React Developer, and IT Professional.",
  keywords: ["Project Coordinator", "React Developer", "Next.js", "TypeScript", "IT Professional", "Portfolio", "Kochi"],
  authors: [{ name: "Anandakrishnan K S" }],
  openGraph: {
    title: "Anandakrishnan K S | Portfolio",
    description: "Explore the digital portfolio of Anandakrishnan K S, Project Coordinator, React Developer, and IT Professional.",
    url: "https://github.com/AnandaKrishnanKS",
    siteName: "Anandakrishnan Portfolio",
    images: [
      {
        url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Zoro Portfolio Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoro | Premium Full Stack Developer & AI Engineer Portfolio",
    description: "Explore the digital hub of Zoro, building high-performance web applications, generative AI systems, and search-optimized architectures.",
    images: ["https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&q=80&w=1200&h=630"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured JSON-LD schema search indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Anandakrishnan K S",
    url: "https://github.com/AnandaKrishnanKS",
    jobTitle: "Project Coordinator & React Developer",
    knowsAbout: ["Next.js", "TypeScript", "Tailwind CSS", "React.js", "Node.js", "PostgreSQL", "Project Coordination"],
    sameAs: [
      "https://github.com/AnandaKrishnanKS",
      "https://linkedin.com",
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
