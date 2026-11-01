export const projects = [
  {
    id: 'deadline-guardian',
    title: 'Deadline Guardian AI',
    subtitle: '5-Agent Orchestrated Workflows',
    category: 'AI / Backend',
    summary:
      'Engineered 20 RESTful API endpoints orchestrating a 5-agent Google Gemini AI system for Priority, Risk, Recovery, Schedule, and Coaching workflows. Load-tested at 500+ requests/second (RPS) at p99 latency below 150 ms.',
    technologies: ['React.js', 'Vite', 'Node.js', 'Express.js', 'Firebase Firestore', 'JWT', 'Gemini API', 'Jest', 'Supertest', 'bcrypt'],
    github: 'https://github.com/akashchouhan335',
    liveDemo: 'https://deadlineguardian-ai.firebaseapp.com',
    image: '/deadline-guardian.png',
    featured: true,
    year: '2026',
  },
  {
    id: 'prepsyncai',
    title: 'PrepSync-AI',
    subtitle: 'AI-Powered Study Planning SaaS',
    category: 'AI / EdTech',
    summary:
      'Developed an AI-powered study and exam planning SaaS generating personalized study paths. Engineered serverless APIs using Vercel Functions to integrate Google Gemini API, Firebase Auth, and transaction alerts.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Firebase', 'Google OAuth', 'Gemini API', 'Nodemailer', 'Vercel Functions'],
    github: 'https://github.com/akashchouhan335',
    liveDemo: 'https://prepsyncai.vercel.app',
    image: '/prepsyncai.png',
    featured: true,
    year: '2026',
  },
  {
    id: 'soulhelp',
    title: 'SoulHelp-AI',
    subtitle: 'Empathetic AI Conversational Platform',
    category: 'AI / Full Stack',
    summary:
      'Developed an empathetic AI platform using Vanilla JavaScript, Gemini API, and Web Speech API. Implemented a resilient multi-model fallback chain with exponential backoff to handle API quota limits and improve availability.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'AI Integration', 'Node.js'],
    github: 'https://github.com/akashchouhan335/SoulHelp',
    liveDemo: null,
    image: '/soulhelp.png',
    featured: true,
    year: '2025',
  },
]
