export interface PersonalInfo {
  name: string;
  titles: string[];
  bio: string;
  resumeUrl: string;
  email: string;
  avatarUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  whatsappUrl: string;
  phone: string;
  location: string;
  timezone: string;
  education: {
    degree: string;
    institution: string;
    period: string;
  }[];
  stats: {
    label: string;
    value: number;
    suffix: string;
  }[];
}

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "AI" | "Other";
  iconName: string; // Resolves to a Lucide icon
  level: string; // e.g. "Expert", "Proficient"
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "Web Apps" | "AI" | "Ecommerce" | "CRM" | "SEO";
  image: string;
  techStack: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  detailedDescription: string;
  challenges: string;
  gallery: string[];
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  rating: number;
  feedback: string;
  avatar: string;
}

export interface Achievement {
  title: string;
  details: string;
  year: string;
  category: "Certifications" | "Hackathons" | "Awards";
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  date: string;
  summary: string;
  image: string;
  featured?: boolean;
}

export const personalInfo: PersonalInfo = {
  name: "Anandakrishnan K S",
  titles: ["Project Coordinator", "React Developer", "IT Professional"],
  bio: "Adaptable IT professional with a strong foundation in the Software Development Life Cycle (SDLC) and proven experience in end-to-end project coordination. Adept at bridging the gap between technical teams and stakeholders.",
  resumeUrl: "/resume/AKKS_Resume.pdf",
  email: "anandakrishnan1000@gmail.com",
  avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400", // High-quality Unsplash portrait
  githubUrl: "https://github.com/AnandaKrishnanKS",
  linkedinUrl: "https://linkedin.com", // Link to LinkedIn profile
  twitterUrl: "#",
  instagramUrl: "#",
  whatsappUrl: "https://wa.me/917025915922",
  phone: "+91 7025915922",
  location: "Kochi, Kerala, India",
  timezone: "Asia/Kolkata",
  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "The Cochin College, MG University",
      period: "2020 - 2023",
    }
  ],
  stats: [
    { label: "Projects Completed", value: 12, suffix: "+" },
    { label: "Years Experience", value: 3, suffix: "+" },
    { label: "Happy Stakeholders", value: 18, suffix: "" },
    { label: "GitHub Contributions", value: 650, suffix: "+" }
  ]
};

export const skills: Skill[] = [
  // Frontend
  { name: "React.js", category: "Frontend", iconName: "Atom", level: "Expert", description: "UI Component Architecture, Hooks, Context, State Management" },
  { name: "Next.js", category: "Frontend", iconName: "Layers", level: "Expert", description: "App Router, SSR, Server Components, Route Optimizations" },
  { name: "Tailwind CSS", category: "Frontend", iconName: "Palette", level: "Expert", description: "Responsive layouts, utility-first design systems" },
  { name: "JavaScript", category: "Frontend", iconName: "FileJson", level: "Expert", description: "ES6+, Async programming, DOM APIs" },
  { name: "HTML & CSS", category: "Frontend", iconName: "Terminal", level: "Expert", description: "Semantic markup, Flexbox, CSS Grid, media queries" },
  { name: "Bootstrap", category: "Frontend", iconName: "Grid", level: "Proficient", description: "Grid system, theme configurations, quick UI prototypes" },

  // Backend
  { name: "Node.js", category: "Backend", iconName: "Cpu", level: "Proficient", description: "JavaScript runtime, REST API creation, package integrations" },
  { name: "PostgreSQL", category: "Backend", iconName: "Database", level: "Proficient", description: "Relational database modeling, complex indexing, SQL queries" },
  { name: "REST API", category: "Backend", iconName: "Workflow", level: "Expert", description: "End-to-end interface specifications, route structure, status codes" },

  // Project Management & Process
  { name: "Project Coordination", category: "Other", iconName: "Clock", level: "Expert", description: "Planning assistance, timeline management, progress audits" },
  { name: "Agile & Scrum", category: "Other", iconName: "Compass", level: "Expert", description: "Daily stand-ups, sprint planning, sprint retrospectives" },
  { name: "Documentation", category: "Other", iconName: "BookOpen", level: "Expert", description: "Requirement summaries, system briefs, scope sheets" },
  { name: "Git & GitHub", category: "Other", iconName: "GitBranch", level: "Expert", description: "Branching controls, code reviews, PR approvals" }
];

export const projects: Project[] = [
  {
    id: "tottoys-ecommerce",
    title: "ToTToys – E-Commerce Web Application",
    description: "A full-stack e-commerce web platform featuring user authorization, persistent shopping cart sessions, and Razorpay payment gateway integration.",
    category: "Ecommerce",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200&h=675",
    techStack: ["Next.js", "PostgreSQL", "Tailwind CSS", "Razorpay API"],
    features: [
      "Secure user authentication and profile storage",
      "Dynamic shopping cart with local persistence",
      "Razorpay checkout gateway integration",
      "Robust relational database schema",
      "Server-side route caching validation"
    ],
    githubUrl: "https://github.com/AnandaKrishnanKS",
    liveUrl: "https://ToTstore.online",
    detailedDescription: "ToTToys is a comprehensive, production-grade e-commerce application designed to support high volume sales. It uses Next.js server components to optimize page loading speeds and SEO indexability, combined with a PostgreSQL backend for reliable order ledger tracking.",
    challenges: "Handling Razorpay webhook callbacks securely to validate payment credentials on serverless routers was a challenge. Resolved by creating cryptographic signature validators running inside Next.js edge functions.",
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800&h=450"
    ]
  },
  {
    id: "admin-dashboard-inventory",
    title: "Admin Dashboard for Inventory & Order Management",
    description: "An ongoing development project building a visual management portal for sales analytics, stock levels, and order tracking details.",
    category: "CRM",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=675",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    features: [
      "Analytics dashboards tracking monthly stock velocity",
      "Order status updates and sales trajectory visualizers",
      "Role-based access permissions and dashboard sections",
      "Lightweight database models",
      "Excel/PDF reporting generators"
    ],
    githubUrl: "https://github.com/AnandaKrishnanKS",
    liveUrl: "https://adminpannel.onrender.com",
    detailedDescription: "A administrative dashboard enabling businesses to control their stock levels, check sales metrics, and manage customer shipments. Features clean modular structures built in React and Express middleware handling authorization constraints.",
    challenges: "Developing real-time graph rendering components without causing memory leaks or lag. Solved by debouncing state hooks and optimizing data payloads returned from backend MongoDB queries.",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=450"
    ]
  }
];

export const experiences: Experience[] = [
  {
    company: "Oxium Tech Consultancy",
    position: "Project Coordinator",
    duration: "Nov 2024 – Jan 2026",
    description: [
      "Directed end-to-end project coordination, providing comprehensive planning assistance and progress tracking across multiple tech initiatives.",
      "Managed stakeholder communication and maintained detailed documentation to ensure project transparency and alignment.",
      "Collaborated directly with cross-functional development teams to align project objectives, ensure timely execution of deliverables, and resolve operational challenges.",
      "Fostered team collaboration and maintained high standards of execution through strong organizational skills and proactive problem-solving."
    ]
  },
  {
    company: "K4RM4 Social Feedback Systems Pvt Ltd",
    position: "React.js Intern (R&D)",
    duration: "Apr 2024 – Aug 2024",
    description: [
      "Contributed to the development of web applications and supported project objectives within the R&D division.",
      "Gained practical experience in front-end component development and the implementation of user interfaces.",
      "Collaborated with senior engineers to troubleshoot issues and optimize application performance."
    ]
  },
  {
    company: "Keyshell IT Solutions",
    position: "Junior Frontend Developer",
    duration: "Jul 2023 – Oct 2023",
    description: [
      "Assisted in the development and maintenance of responsive websites using HTML, CSS, and JavaScript.",
      "Participated in daily stand-ups and contributed to code reviews and technical planning.",
      "Collaborated with senior engineers to troubleshoot issues and optimize application performance."
    ]
  },
  {
    company: "Luminar Technolab",
    position: "MERN Stack Intern (7-Month Intensive)",
    duration: "2023",
    description: [
      "Completed a comprehensive 7-month internship program focused on modern full stack web development.",
      "Gained hands-on experience building, testing, and deploying applications using MongoDB, Express.js, React.js, and Node.js."
    ]
  }
];

export const testimonials: Testimonial[] = []; // Removed

export const achievements: Achievement[] = [
  {
    title: "Bachelor of Computer Applications (BCA)",
    details: "The Cochin College, Mahatma Gandhi University",
    year: "2023",
    category: "Certifications"
  },
  {
    title: "MERN Full Stack Developer Certification",
    details: "7-Month intensive development credential from Luminar Technolab",
    year: "2023",
    category: "Certifications"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "sdlc-coordination-best-practices",
    title: "SDLC Coordination: Bridging the Gap Between Technical Teams & Stakeholders",
    category: "Project Management",
    readingTime: "6 min read",
    date: "June 12, 2026",
    summary: "Managing product deliverables requires transparency, robust progress tracking, and structured documentation. Explore the coordination tactics that keep teams aligned.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600&h=400",
    featured: true
  },
  {
    id: "headless-ecommerce-nextjs-postgresql",
    title: "Building Headless E-Commerce: Next.js + PostgreSQL Architecture",
    category: "Web Development",
    readingTime: "8 min read",
    date: "May 20, 2026",
    summary: "A deep dive into serverless payment integrations, secure cart state lifecycles, and database row locking techniques inside modern Next.js configurations.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=400"
  }
];
