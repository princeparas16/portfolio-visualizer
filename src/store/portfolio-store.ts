import { create } from 'zustand';
import type { PortfolioState, ParsedResumeData } from '@/types/portfolio';

const defaultState: PortfolioState = {
  contact: {
    name: 'Prince Varti',
    title: 'Senior Software Engineer | AI/UI Engineer',
    summary:
      'Senior Software Engineer with 7.5 years of experience delivering scalable, enterprise-grade retail applications and modern frontend architectures using React, Node.js, AWS, and Micro-Frontends. Expanded into AI Engineering skills—designing and implementing LLM-powered operational intelligence features, Agentic AI workflows, and RAG architectures for 7-Eleven using Python, FastAPI, LangChain/LangGraph, Vector DB and frontier models. Proven track record of leading end-to-end feature ownership, driving front-end architectural decisions across multi-region environments, reducing production defects by 20%, and accelerating software delivery across the SDLC.',
    email: 'princevarti@gmail.com',
    phone: '+91-7974789232',
    location: 'Bengaluru',
    github: 'https://github.com/princeparas16',
    linkedin: 'https://linkedin.com/in/princevarti',
    hashnode: 'https://hashnode.com/@princevarti',
  },
  skills: [
    {
      id: 'ai-agentic',
      title: 'AI & AGENTIC ENGINEERING',
      summary: 'Agentic AI, LLM Integration, RAG, MCP, LangChain, LangGraph, Vector DBs, Multi-Agent Systems',
      items: [
        'Agentic AI',
        'LLM Integration & RAG',
        'Model Context Protocol (MCP)',
        'LangChain & LangGraph',
        'Vector DBs (FAISS, Pinecone)',
        'Prompt Engineering & Guardrails',
        'WebSockets / WebRTC',
        'LLM Evaluation & Observability',
      ],
      glow: 'purple',
    },
    {
      id: 'frontend',
      title: 'FRONTEND ENGINEERING',
      level: 'Expert',
      summary: 'React.js, Next.js, Redux Toolkit, Micro-Frontend Architecture, Webpack, WCAG 2.1 AAA',
      items: [
        'React.js (16 → 19 Upgrade)',
        'Next.js',
        'Redux / Redux Toolkit',
        'Micro-Frontend Architecture',
        'Webpack',
        'Responsive Design',
        'Accessibility (WCAG 2.1 AAA)',
        'TypeScript / SCSS',
      ],
      glow: 'cyan',
    },
    {
      id: 'backend',
      title: 'BACKEND & API ARCHITECTURE',
      summary: 'FastAPI, Node.js, Express, RESTful APIs, Microservices, GraphQL, OAuth2/JWT',
      items: [
        'Python',
        'FastAPI',
        'Node.js & Express',
        'RESTful APIs',
        'Microservices Architecture',
        'GraphQL',
        'Authentication (OAuth2 / JWT)',
      ],
    },
    {
      id: 'cloud',
      title: 'CLOUD & INFRASTRUCTURE',
      summary: 'AWS (EC2, Lambda, ECS, ECR, S3, CloudFront), Docker, Jenkins, SonarQube, CI/CD',
      items: [
        'AWS (EC2, Lambda, ECS, S3)',
        'CloudFront & CloudWatch',
        'Docker',
        'Jenkins & GitLab Pipelines',
        'SonarQube & ORCA',
        'CI/CD Automation',
      ],
    },
    {
      id: 'data',
      title: 'DATA & OBSERVABILITY',
      summary: 'New Relic, Datadog, MongoDB (Aggregations), Redis (Caching & Pub/Sub), MySQL',
      items: [
        'New Relic (Logs, Metrics, Traces)',
        'Datadog',
        'MongoDB (Aggregations)',
        'Redis (Caching & Pub/Sub)',
        'Mongoose & MySQL',
      ],
    },
    {
      id: 'tools',
      title: 'PROGRAMMING & CORE TOOLING',
      summary: 'Python, JavaScript (ES6+), TypeScript, HTML5, SCSS, Windsurf, Claude Code, Copilot, Antigravity',
      items: [
        'Python',
        'JavaScript (ES6+) & TypeScript',
        'HTML5 & CSS3/SCSS',
        'Windsurf & Claude Code',
        'GitHub Copilot & Antigravity',
        'PIP & UV Package Managers',
      ],
    },
  ],
  experience: [
    {
      id: 'seven-eleven',
      company: '7-Eleven',
      role: 'Senior Software Engineer',
      startDate: 'Jun 2022',
      endDate: 'Present',
      logoUrl: '/logos/7eleven.svg',
      highlights: [
        'AI Retail Chatbot & Intelligence Engine: Architected and deployed a pilot of an enterprise-grade AI-powered Retail Chatbot and Operational Intelligence platform using Python, React, FastAPI, LangGraph, and RAG with FAISS Vector DB and MongoDB aggregations for real-time semantic retrieval, boosting user engagement by 7%.',
        'Modernization: Modernized live production systems by upgrading React 16 → 19, React Router, Redux, Webpack optimizations, Node.js upgrades, and technical debt reduction.',
        'Internationalization: Built an application supporting multiple international languages, currencies, time zones, and formats using i18next, locale, and currency/date formatting.',
        'System Performance: Improved performance via render optimizations, API handling, and Redis + memoization caching (~15% faster load times, faster data loads via DB indexing).',
        'Monitoring & Reliability: Owned production incident resolution using New Relic (logs, metrics, traces), diagnosing root causes and shipping long-term fixes.',
        'Design Decisions & Docs: Improved frontend architecture via reusable patterns and micro-frontend alignment; documented API contracts, PRDs, Tech Specs, and Confluence architecture pages.',
      ],
    },
    {
      id: 'publicis-sapient',
      company: 'Publicis Sapient',
      role: 'Software Engineer',
      startDate: 'Feb 2021',
      endDate: 'Jun 2022',
      logoUrl: '/logos/publicis.svg',
      highlights: [
        'Scalable UI Systems: Built scalable UI systems using JavaScript, Handlebars, SCSS.',
        'Testing Strategies: Built testing strategies for multi-brand enterprise apps while maintaining 80%+ test coverage using Jest, React Testing Library (RTL), mocking, snapshots, and CI pipelines.',
        'Accessibility (WCAG): Implemented accessibility using Semantic HTML, ARIA, keyboard navigation, focus management, and screen reader support.',
      ],
    },
    {
      id: 'infosys',
      company: 'Infosys',
      role: 'Associate Software Engineer',
      startDate: 'Nov 2018',
      endDate: 'Feb 2021',
      highlights: [
        'Legacy Modernization: Modernized legacy enterprise desktop applications for desktop, iPad, and mobile by implementing responsive layouts with CSS Grid, Flexbox, and media queries, ensuring feature parity while preserving existing business workflows and minimizing regression risk.',
        'CI/CD & Release Automation: Contributed via Jenkins, GitLab Pipelines, Docker, SonarQube, and ORCA to automate build, test, deployment, and quality assurance processes, delivering reliable production releases with rollback support.',
      ],
    },
  ],
  projects: [
    {
      id: 'retail-intelligence',
      title: 'AI Powered Retail Intelligence',
      description:
        'Architected and deployed an enterprise-grade AI-powered Retail Chatbot and Operational Intelligence platform using Python, React, FastAPI, LangGraph, RAG, FAISS Vector DB, and MongoDB aggregations.',
      imageUrl: '/projects/retail-ai.png',
      tags: ['Python', 'FastAPI', 'LangGraph', 'RAG', 'FAISS', 'MongoDB', 'React'],
    },
    {
      id: 'resume-designer',
      title: 'Resume Designer AI Powered',
      description:
        'Intelligent, ATS-friendly resume generation platform featuring automated job-description matching, real-time feedback, and dual-mode document export (PDF/DOCX).',
      imageUrl: '/projects/resume-ai.png',
      tags: ['Next.js', 'Python', 'FastAPI', 'GraphQL', 'Gemini', 'Mistral', 'Vector Embeddings'],
    },
  ],
  certifications: [
    {
      id: 'anthropic',
      name: 'Claude Code 101: Certificate',
      issuer: 'Anthropic',
      description:
        'Certified in Claude Code 101 by Anthropic. Proficient in agentic AI workflows, prompt engineering, and integrating AI into development environments.',
      logoUrl: '/logos/anthropic.svg',
      badge: 'Verifiable',
    },
  ],
  education: [
    {
      id: 'lnct',
      institution: 'LNCT Bhopal',
      degree: 'B-Tech',
      field: 'Computer Science and Engineering',
      startYear: '2014',
      endYear: '2018',
      logoUrl: '/logos/lnct.svg',
    },
  ],
};

interface PortfolioStore extends PortfolioState {
  updateFromParsedPdf: (data: ParsedResumeData) => void;
  resetToDefaults: () => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  ...defaultState,
  updateFromParsedPdf: (data) =>
    set((state) => {
      const newState = { ...state };

      // Update contact info if present
      if (data.contact) {
        newState.contact = {
          ...state.contact,
          ...Object.fromEntries(
            Object.entries(data.contact).filter(([_, v]) => v !== undefined && v !== '')
          ),
        };
      }

      // Update experience
      if (data.experience && data.experience.length > 0) {
        const merged = [...state.experience];
        data.experience.forEach((parsedExp) => {
          const existingIndex = merged.findIndex(
            (e) =>
              e.id === parsedExp.id ||
              (parsedExp.company &&
                e.company.toLowerCase().includes(parsedExp.company.toLowerCase()))
          );
          if (existingIndex >= 0) {
            merged[existingIndex] = { ...merged[existingIndex], ...parsedExp } as typeof merged[0];
          } else if (parsedExp.company && parsedExp.role) {
            merged.push({
              id: parsedExp.id || parsedExp.company.toLowerCase().replace(/\s+/g, '-'),
              company: parsedExp.company,
              role: parsedExp.role,
              startDate: parsedExp.startDate || '',
              endDate: parsedExp.endDate || '',
              highlights: parsedExp.highlights || [],
            });
          }
        });
        newState.experience = merged;
      }

      // Update projects
      if (data.projects && data.projects.length > 0) {
        const merged = [...state.projects];
        data.projects.forEach((parsedProj) => {
          const existingIndex = merged.findIndex(
            (p) =>
              p.id === parsedProj.id ||
              (parsedProj.title &&
                p.title.toLowerCase().includes(parsedProj.title.toLowerCase()))
          );
          if (existingIndex >= 0) {
            merged[existingIndex] = { ...merged[existingIndex], ...parsedProj } as typeof merged[0];
          } else if (parsedProj.title) {
            merged.push({
              id: parsedProj.id || parsedProj.title.toLowerCase().replace(/\s+/g, '-'),
              title: parsedProj.title,
              description: parsedProj.description || '',
              tags: parsedProj.tags || [],
            });
          }
        });
        newState.projects = merged;
      }

      return newState;
    }),
  resetToDefaults: () => set(defaultState),
}));
