export const PROFILE = {
  name: "Harsh Rajesh Singh",
  title: "Full Stack Developer",
  summary: "Motivated and project-driven Full Stack Developer and IT student with hands-on experience building 8+ production-grade SaaS and AI-powered web applications. Proficient in Python, Java, JavaScript, REST APIs, and cloud deployment (Vercel, Render, Supabase, Firebase). Passionate about system design, backend engineering, and leveraging AI to build scalable, real-world solutions. Seeking a software engineering role to contribute to high-impact engineering teams.",
  location: "Nallasopara, Mumbai, Maharashtra",
  phone: "+91-9967254145",
  email: "harshs288375@gmail.com",
  github: "github.com/harsh2055",
  linkedin: "linkedin.com/in/harsh-singh-b5836b350",
  availability: "Available for full-time / internship opportunities"
};

export const PROJECTS = [
  {
    id: "drivex",
    name: "DriveX",
    description: "Built a peer-to-peer car rental SaaS platform (Airbnb for cars) enabling vehicle owners to list and rent cars to verified users.",
    techStack: ["React", "Node.js", "Supabase", "REST APIs"],
    githubUrl: "https://github.com/ks1133109-eng/car_rental_website",
    liveUrl: "https://drivex.qzz.io",
    highlights: [
      "Built a peer-to-peer car rental SaaS platform (Airbnb for cars) enabling vehicle owners to list and rent cars to verified users.",
      "Implemented end-to-end booking flow, user authentication, real-time availability, and payment-ready infrastructure.",
      "Deployed on production with custom domain; designed for scalability using Supabase as the backend database layer."
    ],
    status: "completed",
    challenges: ["JWT expiration issues in cross-origin domains", "Complex availability state management"],
    solutions: ["Implemented refresh token strategy with Supabase Auth", "Optimized state using custom hooks and robust database triggers"],
    learnings: "Mastered multi-tenant architecture and secure payment flows.",
    progress: 100,
    order: 1
  },
  {
    id: "hercare",
    name: "HerCare",
    description: "Engineered a comprehensive women's health companion app with features including menstrual cycle tracking, pregnancy monitoring, and symptom logging.",
    techStack: ["React", "Flask/Node.js", "Firebase"],
    githubUrl: "https://github.com/harsh2055/Hercare",
    liveUrl: "https://hercare-tau.vercel.app",
    highlights: [
      "Engineered a comprehensive women's health companion app with features including menstrual cycle tracking, pregnancy monitoring, and symptom logging.",
      "Designed personalized diet and exercise plan modules with smart reminders driven by user health data."
    ],
    status: "completed",
    challenges: ["HIPAA-compliant data structure", "Personalized health insight generation"],
    solutions: ["Implemented field-level encryption for PII", "Developed basic diagnostic logic based on medical data patterns"],
    learnings: "Understanding of healthcare data privacy and complex tracking logic.",
    progress: 100,
    order: 2
  },
  {
    id: "weathervue",
    name: "WeatherVue",
    description: "Built a production-ready full-stack weather app with an integrated AI chatbot and Progressive Web App (PWA) support.",
    techStack: ["React", "Node.js", "Supabase", "OpenWeatherMap API"],
    githubUrl: "https://github.com/harsh2055/WeatherVue",
    liveUrl: "https://weather-vue-ruddy.vercel.app",
    highlights: [
      "Built a production-ready full-stack weather app with an integrated AI chatbot and Progressive Web App (PWA) support.",
      "Implemented real-time weather data visualization and conversational AI assistance for weather queries."
    ],
    status: "completed",
    challenges: ["Real-time data visualization constraints", "AI chatbot latency"],
    solutions: ["Used high-performance charting libraries", "Optimized AI inference with streaming responses"],
    learnings: "Improved UX design skills for data-heavy applications.",
    progress: 100,
    order: 3
  },
  {
    id: "stackbase",
    name: "Stackbase",
    description: "High-performance developer platform for managing full-stack infrastructure and deployments.",
    techStack: ["React", "Node.js", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/harsh2055/Stackbase",
    liveUrl: "https://stackbase.qzz.io",
    highlights: [
      "Architected a centralized dashboard for managing cloud resources and deployment pipelines.",
      "Integrated secure authentication and role-based access control for development teams."
    ],
    status: "ongoing",
    challenges: ["Resource isolation in shared environments", "Real-time state synchronization"],
    solutions: ["Implemented containerized workflows", "Used WebSocket protocols for live updates"],
    learnings: "Deep dive into DevOps automation and scalable infrastructure design.",
    progress: 85,
    order: 4
  },
  {
    id: "studyai",
    name: "StudyAI",
    description: "Personalized AI study assistant that converts complex documents into interactive learning modules.",
    techStack: ["React", "Python", "OpenAI API", "Supabase"],
    githubUrl: "https://github.com/harsh2055/StudyAI",
    liveUrl: "https://study-ai-theta.vercel.app",
    highlights: [
      "Developed a RAG-based engine for high-accuracy document summarization and Q&A.",
      "Built an intuitive interface for students to track progress and generate automated quizzes."
    ],
    status: "completed",
    challenges: ["Processing large PDF datasets", "Minimizing AI hallucination in factual summaries"],
    solutions: ["Optimized vector embeddings for fast retrieval", "Implemented multi-stage verification logic"],
    learnings: "Mastered LLM orchestration and vector database management.",
    progress: 100,
    order: 5
  },
  {
    id: "proposalai",
    name: "ProposalAI",
    description: "AI-driven professional proposal generator designed to streamline client intake and contract creation.",
    techStack: ["React", "Node.js", "Gemini API", "PostgreSQL"],
    githubUrl: "https://github.com/harsh2055/ProposalAI",
    liveUrl: "https://proposal-ai.qzz.io",
    highlights: [
      "Implemented an automated draft generation system based on client requirement prompts.",
      "Designed a secure signature workflow with PDF export capabilities."
    ],
    status: "completed",
    challenges: ["Template dynamic rendering", "Complex logic for variable pricing structures"],
    solutions: ["Used high-level templating engines with React", "Developed a robust pricing calculation engine"],
    learnings: "Expertise in automating business workflows and generating production-ready documents.",
    progress: 100,
    order: 6
  }
];

export const SKILLS = [
  { group: "Languages", items: "Python, Java, JavaScript (ES6+), SQL" },
  { group: "Frontend", items: "HTML5, CSS3, React.js" },
  { group: "Backend & Frameworks", items: "Node.js, Flask, Spring Boot (Basic), REST APIs" },
  { group: "Databases", items: "MySQL, PostgreSQL, MongoDB, Supabase" },
  { group: "Cloud & DevOps", items: "Git, GitHub, Vercel, Render, Firebase, Cloudinary (Imagecloud), Resend" },
  { group: "AI & Emerging", items: "AI Prompt Engineering, LLM Integration, Vibe Coding, Generative AI APIs" },
  { group: "Languages (Human)", items: "English, Hindi, Marathi" }
];

export const EDUCATION = [
  { school: "Reena Mehta College, Mumbai University", degree: "B.Sc. Information Technology (BSc.IT)", period: "2023 – 2026", location: "Mumbai, India" },
  { school: "Thakur College of Science and Commerce", degree: "Higher Secondary Certificate (HSC) – 12th Grade", period: "2022 – 2023", location: "Mumbai, India" },
  { school: "Chandresh Lodha Memorial School", degree: "Secondary School Certificate (SSC) – 10th Grade", period: "2020 – 2021", location: "Mumbai, India" }
];

export const EXPERIENCE = [
  {
    title: "Full Stack Developer",
    company: "Independent / Self-Directed Projects",
    period: "2023 – Present",
    location: "Mumbai, India",
    highlights: [
      "Independently designed, developed, and deployed 8+ full-stack applications spanning SaaS, AI, health tech, and developer tooling domains.",
      "Applied modern engineering practices including REST API design, cloud deployment (Vercel, Render), database design (PostgreSQL, MongoDB, Supabase), and LLM integration.",
      "Demonstrated ability to take projects from concept to production with real domain hosting and live user-facing deployments."
    ]
  }
];
