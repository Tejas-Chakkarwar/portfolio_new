export type Project = {
  name: string;
  summary: string;
  tech: string[];
  highlights?: string[];
  link?: string;
};

export type Book = {
  title: string;
  author: string;
  note?: string;
};

export const projects: Project[] = [
  {
    name: "CuriosityAI",
    summary: "AI-powered agentic system to identify research gaps and generate proposals.",
    tech: ["Python", "FetchAI", "LangChain", "Hugging Face", "ChromaDB", "Next.js", "Three.js"],
    highlights: [
      "Gap identification with embedding density estimation",
      "Autonomous feasibility analysis",
      "Auto-commit prototype code via GitHub API",
    ],
    link: "https://github.com/Tejas-Chakkarwar/CuriosityAI",
  },
  {
    name: "ResuMatch",
    summary: "AI resume optimization platform with agentic workflows.",
    tech: ["Next.js", "TypeScript", "Python", "Flask", "LangGraph", "LangChain"],
    highlights: [
      "Iterative resume rewriting with agent loop",
      "RAG-like in-memory knowledge",
    ],
    link: "https://github.com/7shantanu7/Weave-Hackathon",
  },
  {
    name: "RouteGuard",
    summary: "Transport order management with role-based interfaces.",
    tech: ["Java", "Spring Boot", "React", "Hibernate", "JWT", "AWS"],
    highlights: [
      "JWT auth with Spring Security",
      "Automated invoice generation",
    ],
  },
  {
    name: "SaaS Subscription Backend",
    summary: "Subscription billing and user management backend.",
    tech: ["Spring Boot", "MySQL", "Redis", "RabbitMQ", "Stripe", "AWS S3", "JWT"],
    highlights: [
      "Role-based auth, rate limiting",
      "Automated invoices with S3 storage",
    ],
    link: "https://github.com/Tejas-Chakkarwar/My-SAAS-Subscription",
  },
  {
    name: "Hotel Management System",
    summary: "Desktop app for guest records, bookings, and billing.",
    tech: ["Python", "Tkinter", "MySQL"],
  },
];

export const books: Book[] = [
  { title: "Atomic Habits", author: "James Clear" },
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" },
  { title: "The Alchemist", author: "Paulo Coelho" },
  { title: "Eat That Frog", author: "Brian Tracy" },
  { title: "Deep Work", author: "Cal Newport" },
  { title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas" },
  { title: "Clean Code", author: "Robert C. Martin" },
  { title: "Verity", author: "Colleen Hoover" },
];

export const profile: string = `Tejas Chakkarwar – Software Engineer, MS CS @ SJSU. Skills: Java, Spring Boot, Microservices, React, AWS, SQL, Redis, RabbitMQ.`;
