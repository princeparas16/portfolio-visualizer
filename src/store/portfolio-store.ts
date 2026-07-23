import { create } from 'zustand';
import type { PortfolioState, ParsedResumeData } from '@/types/portfolio';

const defaultState: PortfolioState = {
  contact: {
    name: 'Prince Varti',
    title: 'Senior Frontend Engineer',
    summary:
      'Expertise in modern React (Next.js), Node.js, and leading full-stack architecture. Delivering scalable, high-performance retail products and integrating LLM-powered intelligence capabilities.',
    email: 'princevarti@gmail.com',
    phone: '+91-7974789232',
    location: 'Bengaluru',
    github: 'https://github.com/princevarti',
    linkedin: 'https://linkedin.com/in/princevarti',
    hashnode: 'https://hashnode.com/@princevarti',
  },
  skills: [
    {
      id: 'frontend',
      title: 'CORE FRONTEND EXPERTISE',
      level: 'Expert',
      summary: 'React 19, Next.js, Redux, TypeScript, Webpack, Micro-Frontends, Accessibility (WCAG), SCSS',
      items: [
        'React 19 (+8.1)',
        'Next.js 14',
        'TypeScript 5 (+3.6)',
        'TypeScript 5 (+3.9)',
        'Webpack',
        'Micro-Frontends',
        'WCAG, SCSS',
      ],
      glow: 'cyan',
    },
    {
      id: 'ai',
      title: 'AI & INTELLIGENCE INTEGRATION',
      summary: 'LLM Integration, RAG, VectorDB, Similarity Search, Gemini/Mistral Models',
      items: [
        'LLM Integrations',
        'Similarity Search, VectorDB',
        'Similarity Search/Mistral Models',
        'Accessibility Search',
        'Testing Strategies',
        'GeminDB',
        'Mistral Models',
      ],
      glow: 'purple',
    },
    {
      id: 'backend',
      title: 'Backend',
      summary: 'Python, FastAPI, Node.js, Express, REST APIs',
      items: ['Python', 'FastAPI', 'Node.js', 'Express', 'REST APIs', 'GraphQL', 'PostgreSQL'],
    },
    {
      id: 'cloud',
      title: 'Cloud & Infra',
      summary: 'AWS, ECS, S3, Docker',
      items: ['AWS ECS', 'S3', 'Docker', 'CI/CD Pipelines', 'Terraform'],
    },
    {
      id: 'data',
      title: 'Data/Observability',
      summary: 'New Relic, Datadog, Mixpanel',
      items: ['New Relic', 'Datadog', 'Mixpanel', 'Sentry', 'Performance Monitoring'],
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
        'Modernization (React 16->19 Upgrade)',
        'System Performance (~15% Faster Load)',
        'Monitoring & Reliability (New Relic)',
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
        'Testing Strategies (80%+ Test Coverage)',
        'Accessibility (WCAG Implementation)',
        'Component Library Development',
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
        'LLM-powered operational intelligence POC, improving user engagement by 20%.',
      imageUrl: '/projects/retail-ai.png',
      tags: ['FastAPI', 'LLM', 'VectorDB', 'Observability', '7-Eleven'],
    },
    {
      id: 'resume-designer',
      title: 'Resume Designer AI Powered',
      description:
        'ATS-compatible Resume Builder powered with AI APIs (Next.js, Gemini) + JD matching.',
      imageUrl: '/projects/resume-ai.png',
      tags: ['Next.js', 'AI', 'Mistral'],
    },
  ],
  certifications: [
    {
      id: 'anthropic',
      name: 'Anthropic Claude Code 101',
      issuer: 'Anthropic',
      description:
        'Certified in Claude Code 101 by Anthropic. Proficient in agentic AI workflows, prompt engineering, and integrating AI into development environments.',
      logoUrl: '/logos/anthropic.svg',
      badge: 'Verifiable',
    },
    {
      id: 'aws',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'AWS',
      description:
        'Certified AWS Cloud Practitioner with expertise in cloud infrastructure, services, and best practices.',
      logoUrl: '/logos/aws.svg',
      badge: 'Badge',
    },
  ],
  education: [
    {
      id: 'lnct',
      institution: 'LNCT Bhopal',
      degree: 'B-Tech',
      field: 'Computer Science and Engineering',
      startYear: '2017',
      endYear: '2021',
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
  updateFromParsedPdf: (data: ParsedResumeData) =>
    set((state) => {
      const newState: Partial<PortfolioState> = {};

      // Update contact info
      if (data.contact && Object.keys(data.contact).length > 0) {
        newState.contact = { ...state.contact, ...data.contact };
      }

      // Update skills — merge by matching id or title
      if (data.skills && data.skills.length > 0) {
        const merged = [...state.skills];
        data.skills.forEach((parsedSkill) => {
          const existingIndex = merged.findIndex(
            (s) =>
              s.id === parsedSkill.id ||
              (parsedSkill.title &&
                s.title.toLowerCase().includes(parsedSkill.title.toLowerCase()))
          );
          if (existingIndex >= 0) {
            merged[existingIndex] = { ...merged[existingIndex], ...parsedSkill } as typeof merged[0];
          }
        });
        newState.skills = merged;
      }

      // Update experience
      if (data.experience && data.experience.length > 0) {
        const merged = [...state.experience];
        data.experience.forEach((parsedExp) => {
          const existingIndex = merged.findIndex(
            (e) =>
              e.id === parsedExp.id ||
              (parsedExp.company &&
                e.company.toLowerCase() === parsedExp.company.toLowerCase())
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
