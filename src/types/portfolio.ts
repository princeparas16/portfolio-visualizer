export interface ContactInfo {
  name: string;
  title: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  github?: string;
  linkedin?: string;
  hashnode?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  level?: 'Expert' | 'Advanced' | 'Intermediate';
  summary: string;
  items: string[];
  glow?: 'cyan' | 'purple';
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  logoUrl?: string;
  highlights: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  description: string;
  logoUrl?: string;
  badge?: 'Verifiable' | 'Badge';
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  logoUrl?: string;
}

export interface PortfolioState {
  contact: ContactInfo;
  skills: SkillCategory[];
  experience: ExperienceEntry[];
  projects: Project[];
  certifications: Certification[];
  education: Education[];
}

export interface ParsedResumeData {
  contact: Partial<ContactInfo>;
  skills: Partial<SkillCategory>[];
  experience: Partial<ExperienceEntry>[];
  projects: Partial<Project>[];
}

export type ParsingStep =
  | 'extracting-text'
  | 'contact-info'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'complete';
