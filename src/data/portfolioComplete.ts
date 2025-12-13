export type Experience = {
  title: string;
  company: string;
  period: string;
  tech: string[];
  achievements: string[];
  type: "work" | "education";
};

export type DetailedProject = {
  name: string;
  description: string;
  tech: string[];
  highlights?: string[];
  links?: {
    github?: string;
    live?: string;
  };
  stats?: string[];
};

export type MusicGenre = {
  name: string;
  description: string;
  albums: {
    title: string;
    artist: string;
    year?: string;
    description: string;
  }[];
};

export type Extracurricular = {
  title: string;
  role: string;
  organization: string;
  period?: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    title: "Master's",
    company: "San Jose State University",
    period: "Aug 2025 - May 2027",
    tech: ["Enterprise Distributed Systems", "Cloud Computing", "Machine Learning"],
    achievements: [
      "Coursework: Enterprise Distributed Systems, Cloud Computing, Machine Learning",
      "Focus on advanced software engineering and distributed systems"
    ],
    type: "education"
  },
  {
    title: "Software Engineer",
    company: "Accelya Solutions",
    period: "Oct 2023 - Jun 2025",
    tech: ["Spring Boot", "Microservices", "REST APIs", "SQL", "Redis", "Ehcache"],
    achievements: [
      "Migrated six legacy modules into Spring Boot microservices, reducing system latency by 29%",
      "Integrated over 12 REST and SOAP partner APIs, reducing reconciliation time by 25%",
      "Optimized 100+ SQL queries on 5M+ rows with indexing and batch processing",
      "Implemented asynchronous Java processing with CompletableFuture and caching"
    ],
    type: "work"
  },
  {
    title: "Big Data Analytics Intern",
    company: "Hitachi Vantara",
    period: "Feb 2023 - Aug 2023",
    tech: ["Python", "PySpark", "Pentaho", "Hive", "Snowflake", "Power BI"],
    achievements: [
      "Migrated 50K+ lines of SAS code to Python/PySpark, reducing licensing costs by 30%",
      "Designed and maintained ETL pipelines for 100M+ record datasets",
      "Developed 5+ Power BI dashboards, reducing reporting turnaround time by 25%",
      "Collaborated with Agile teams to analyze data migration workflows"
    ],
    type: "work"
  },
  {
    title: "Bachelor's",
    company: "Savitribai Phule Pune University",
    period: "Aug 2019 - Jun 2023",
    tech: ["Data Structures", "Algorithms", "Database Management", "Machine Learning"],
    achievements: [
      "GPA: 3.71/4.00",
      "Coursework: Data Structures, Algorithms, Database Management, Machine Learning",
      "Led ACM Student Chapter as Secretary",
      "Volunteered with Rotary International teaching coding to underprivileged students"
    ],
    type: "education"
  }
];

export const detailedProjects: DetailedProject[] = [
  {
    name: "ThinkFlow",
    description: "An advanced deep learning system that decodes raw EEG (electroencephalography) signals into coherent natural language text. The project implements and compares two state-of-the-art neural architectures for brain-computer interface applications.",
    tech: ["PyTorch", "VQ-VAE", "BART", "LSTM", "Transformer", "Flask", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Hugging Face"],
    highlights: [
      "Transformer-Based Model (VQ-VAE + BART): Custom CNN encoder with 6 stacked Conv1D layers processing 105-channel EEG signals (5,500 timesteps), 8-head self-attention for long-range dependencies, Vector Quantization with 2,048-embedding codebook creating a 'brain vocabulary' of 57 discrete tokens",
      "LSTM Sequence-to-Sequence Model: Bidirectional 2-layer LSTM encoder with optional channel reduction (105→32), Bahdanau attention mechanism, 2-layer unidirectional LSTM decoder with attention-augmented inputs, ~15M trainable parameters",
      "Dual Model Comparison: Side-by-side interface allowing users to compare Transformer vs LSTM performance on identical EEG inputs",
      "Interactive Visualization: Animated waveform displays, raw tensor data viewer with modal interface, color-coded output comparisons",
      "Advanced Features: Custom straight-through estimator for gradient flow through discrete codebook, configurable teacher forcing (0.5 ratio), Word Error Rate (WER) and word accuracy metrics",
      "Modern UI/UX: Glassmorphism design with neural grid background effects, Framer Motion animations, responsive layout"
    ],
    links: {
      github: "https://github.com/YashKhairnar/ThinkFlow"
    },
    stats: [
      "Type: Deep Learning + Brain-Computer Interface",
      "Architecture: VQ-VAE + BART & LSTM Seq2Seq"
    ]
  },
  {
    name: "Sentinel",
    description: "A production-ready, cloud-native email marketing platform built to solve scalability and reliability challenges. Fully serverless architecture processes high-volume campaigns with real-time analytics and robust failure handling.",
    tech: ["AWS Lambda", "DynamoDB", "SQS", "SES", "API Gateway", "Terraform", "Python 3.12", "Next.js 16", "TypeScript", "React 19", "Tailwind CSS", "Google Gemini"],
    highlights: [
      "Event-driven pipelines with SQS + Lambda for reliable processing and retries",
      "Multi-region DynamoDB Global Tables for low-latency global reads/writes",
      "Throughput optimized to 12.5k emails/min with concurrency tuning and backoff",
      "Security: HTML sanitization, URL validation, API key auth, least-privilege IAM",
      "Observability: structured logging, metrics, and alerting for delivery health",
      "Analytics: device/browser/geo insights, link performance tracking",
      "Architecture: Event-driven with SQS decoupling, DynamoDB with GSIs, Lambda concurrency control (maximum_concurrency = 2 for ~14 emails/sec), Multi-region deployment",
      "Performance Optimizations: Exponential backoff with jitter for SES rate limits, Batch processing for DynamoDB writes (25 items per batch), CloudFront caching for static dashboard assets, Connection pooling for database operations",
      "Infrastructure as Code: Terraform modules for reproducible deployments, CI/CD pipeline with GitHub Actions, Blue-green deployment strategy, Automated rollback on CloudWatch alarms",
      "Monitoring & Observability: CloudWatch metrics for Lambda invocations/errors/duration, X-Ray tracing for distributed request tracking, Custom metrics for email delivery rates, SNS alerts for critical failures"
    ],
    links: {
      github: "https://github.com/Kushagrabainsla/sentinel",
      live: "https://dashboard.thesentinel.site/"
    },
    stats: [
      "Performance: 12,500 emails/min • 99.9% uptime • <200ms API",
      "Architecture: Serverless, event-driven, multi-region"
    ]
  },
  {
    name: "CodeMedic",
    description: "An AI-powered automated bug fixing agent that analyzes Sentry errors, identifies problematic code, proposes fixes, tests them in a sandbox environment, and creates draft pull requests.",
    tech: ["Python", "LangGraph", "Google Gemini", "Streamlit", "Sentry API", "GitHub API", "Daytona", "browser_use"],
    highlights: [
      "Smart Error Analysis: Automatically analyzes Sentry error data including stack traces, error messages, and metadata",
      "AI-Powered File Discovery: Uses browser_use to intelligently navigate GitHub repositories and identify problematic files",
      "Intelligent Fix Generation: Leverages Google Gemini 2.5 Flash to propose comprehensive fixes with explanations",
      "Sandbox Testing: Tests fixes in isolated Daytona sandboxes before deployment",
      "Automated PR Creation: Creates draft pull requests with detailed descriptions",
      "Streamlit UI: User-friendly web interface for monitoring and controlling the bug fixing process"
    ],
    links: {
      github: "https://github.com/Tejas-Chakkarwar/CodeMedic"
    },
    stats: [
      "Type: AI Agent + Automation",
      "Hackathon: Daytona HackSprint"
    ]
  },
  {
    name: "LiveAgent",
    description: "A powerful multi-agent AI system that transforms your ideas into fully functional applications in minutes. LiveAgent uses CrewAI to orchestrate multiple specialized AI agents that collaboratively generate, test, and validate code for both frontend and backend components.",
    tech: ["CrewAI", "Python", "React", "TypeScript", "Flask", "Automerge", "WebSocket"],
    highlights: [
      "Multi-Agent Code Generation: AI agents collaborate to generate production-ready code",
      "Integrated IDE: Built-in code editor with file management and terminal support",
      "Real-time Collaboration: Automerge-powered sync for collaborative editing",
      "Full-Stack Support: Generates both frontend (React/TypeScript) and backend code",
      "Progress Tracking: Real-time monitoring of code generation progress",
      "Specialized Agents: Orchestrator, Frontend, Backend, and QA agents work together"
    ],
    links: {
      github: "https://github.com/Tejas-Chakkarwar/LiveAgent"
    },
    stats: [
      "Type: Multi-Agent AI System",
      "Architecture: Frontend + Agent Backend + IDE Backend"
    ]
  },
  {
    name: "Stock Market Indices Tracker",
    description: "A full-stack web application for tracking real-time stock market indices with historical data visualization. Built with Spring Boot backend and Next.js frontend, this application efficiently manages API rate limits through intelligent caching strategies.",
    tech: ["Spring Boot", "Java 21", "Next.js", "TypeScript", "Redis", "Recharts", "Tailwind CSS"],
    highlights: [
      "Real-time Index Tracking: Monitor live prices for SPY (S&P 500), DIA (Dow Jones), QQQ (NASDAQ-100), and IWM (Russell 2000)",
      "30-Day Price History: Interactive charts showing historical price trends using Recharts",
      "Auto-refresh: Index prices update automatically every 90 seconds",
      "Rate Limit Management: Visual display of API usage with monthly and per-minute tracking",
      "Intelligent Caching: Redis caching with custom TTL strategies reduces API calls while maintaining data freshness",
      "Rate Limiting: Enforces 20 requests/minute and 500 requests/month limits"
    ],
    links: {
      github: "https://github.com/Tejas-Chakkarwar/Stock-Market-Tracker",
      live: "https://stock-market-tracker-eosin.vercel.app"
    },
    stats: [
      "Stack: Spring Boot + Next.js + Redis"
    ]
  },
  {
    name: "CuriosityAI",
    description: "AI-powered agentic system that democratizes invention and R&D by identifying research gaps, analyzing feasibility, and generating research proposals with automated code pushing to GitHub.",
    tech: ["Python", "FetchAI", "LangChain", "Hugging Face", "ChromaDB", "Next.js", "Three.js"],
    highlights: [
      "Identifies unexplored innovations using GMM/KDE density estimation on embeddings from ArXiv/PubChem APIs",
      "Autonomous agents evaluate novelty, technical viability, and ethical considerations using LLMs",
      "Generates structured research proposals with abstracts, methods, and impact assessments via RAG",
      "Auto-commits prototype code to GitHub repositories via GitHub API integration"
    ],
    links: {
      github: "https://github.com/Tejas-Chakkarwar/CuriosityAI"
    },
    stats: [
      "Hackathon: CalHacks 12.0",
      "Type: AI Agents + RAG"
    ]
  },
  {
    name: "ResuMatch",
    description: "AI resume optimization platform with agentic workflows.",
    tech: ["Next.js", "TypeScript", "Python", "Flask", "LangGraph", "LangChain"],
    highlights: [
      "Iterative resume rewriting with agent loop",
      "RAG-like in-memory knowledge"
    ],
    links: {
      github: "https://github.com/7shantanu7/Weave-Hackathon"
    }
  },
  {
    name: "RouteGuard",
    description: "Transport order management with role-based interfaces.",
    tech: ["Java", "Spring Boot", "React", "Hibernate", "JWT", "AWS"],
    highlights: [
      "JWT auth with Spring Security",
      "Automated invoice generation"
    ]
  },
  {
    name: "SaaS Subscription Backend",
    description: "Subscription billing and user management backend.",
    tech: ["Spring Boot", "MySQL", "Redis", "RabbitMQ", "Stripe", "AWS S3", "JWT"],
    highlights: [
      "Role-based auth, rate limiting",
      "Automated invoices with S3 storage"
    ],
    links: {
      github: "https://github.com/Tejas-Chakkarwar/My-SAAS-Subscription"
    }
  },
  {
    name: "Hotel Management System",
    description: "Desktop app for guest records, bookings, and billing.",
    tech: ["Python", "Tkinter", "MySQL"]
  }
];

export const skills = {
  expert: ["Java", "Spring Boot", "Microservices", "MySQL", "AWS (EC2, S3, Lambda)", "Redis", "Git"],
  advanced: ["Python", "React", "PostgreSQL", "Docker", "Terraform", "LangChain", "REST APIs"],
  intermediate: ["Go", "Kubernetes", "Next.js", "TypeScript", "MongoDB"],
  exploring: ["Advanced Kubernetes patterns", "React Server Components", "Real-time collaborative systems"],
  all: [
    "Go", "Python", "Java", "JavaScript", "C++", "HTML/CSS",
    "Spring Boot", "Spring Data JPA", "Hibernate", "Spring JDBC", "Flask", "React", "Tkinter", "Django", "LangChain", "LangGraph",
    "MySQL", "PostgreSQL", "MongoDB", "Elasticsearch", "Redis", "Oracle",
    "AWS EC2", "AWS S3", "AWS Lambda", "Elastic Beanstalk", "AWS Cognito", "AWS SES", "AWS VPC", "Amazon ELB", "Docker", "Kubernetes",
    "Git", "JIRA", "Postman", "IntelliJ", "VSCode", "Unix/Linux"
  ]
};

export const musicGenres: MusicGenre[] = [
  {
    name: "Lo-Fi Hip-Hop",
    description: "Chill, ambient beats perfect for focus and relaxation",
    albums: [
      {
        title: "Hiraeth",
        artist: "Idealism",
        year: "2016",
        description: "Smooth, dreamy instrumentals that embody nostalgic calm."
      },
      {
        title: "Life",
        artist: "Jinsang",
        year: "2016",
        description: "A classic lo-fi hip-hop album with warm, jazzy undertones."
      },
      {
        title: "Modal Soul",
        artist: "Nujabes",
        year: "2005",
        description: "Lo-fi's spiritual father; blends hip-hop with Japanese jazz (Luv(sic) series)."
      },
      {
        title: "Beat Tapes, Vol. 1–3",
        artist: "eevee",
        year: "2015–2017",
        description: "Gentle, minimal beats for focus and comfort."
      }
    ]
  }
];

export const extracurriculars: Extracurricular[] = [
  {
    title: "ACM Student Chapter",
    role: "Secretary",
    organization: "Savitribai Phule Pune University",
    highlights: [
      "Led ACM Student Chapter as Secretary",
      "Organized coding competitions and technical workshops"
    ]
  },
  {
    title: "Rotary International",
    role: "Volunteer",
    organization: "Rotary International",
    highlights: [
      "Volunteered with Rotary International teaching coding to underprivileged students",
      "Promoted computer science education in underserved communities"
    ]
  }
];

export const contact = {
  email: "tejaschakkarwar@gmail.com",
  phone: "+1 (408) 207-2348",
  linkedin: "https://linkedin.com/in/tejaschakkarwar",
  github: "https://github.com/tejas-chakkarwar",
  leetcode: "https://leetcode.com/u/tejaschakkarwar/"
};

export const profile = {
  name: "Tejas Chakkarwar",
  role: "Software Engineer",
  education: "Master's Student @ San Jose State University",
  summary: "Dynamic and results-driven Software Engineer with 2+ years in full-stack development across high-impact, large-scale applications. Expertise in Java, Spring Boot, React, AWS, and microservices architecture.",
  resume: "https://drive.google.com/file/d/1jWksrlAyTxYiz-_XS9tGmnFPoy7IsO7j/view?usp=sharing"
};

