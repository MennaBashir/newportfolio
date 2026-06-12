export interface ProjectItem {
  title: string;
  description: string;
  category: string;
  tech: string[];
  featured: boolean;
  status: string;
  image: string;
  github: string;
  demo: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  duration: string;
  type: string;
  description: string[];
  tech: string[];
  color: string;
}

export interface TechItem {
  name: string;
  color: string;
}

export interface TechGroup {
  id: string;
  label: string;
  badge: string;
  accentColor: string;
  gridArea: string;
  techs: TechItem[];
}

export interface SocialLink {
  platform: string;
  handle: string;
  url: string;
}

export interface PortfolioContent {
  typingWords: string[];
  heroBadges: string[];
  techGroups: TechGroup[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  socialLinks: SocialLink[];
}
