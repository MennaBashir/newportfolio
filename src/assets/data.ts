import { ASSETS } from "./assets";
import CONTENT from "./content.json";
import type {
  ExperienceItem,
  ProjectItem,
  SocialLink,
  TechGroup,
} from "./contentTypes";

export const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Tech Stack", path: "/tech-stack" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Achievements", path: "/achievements" },
  { label: "Contact", path: "/contact" },
] as const;

export function resolveImage(image: string): string {
  return (ASSETS as Record<string, string>)[image] ?? image;
}

export function computeDuration(period: string): string {
  const match = period.match(/^([A-Za-z]+)\s+(\d{4})/);
  if (!match) return "";
  const start = new Date(`${match[1]} 1, ${match[2]}`);
  if (isNaN(start.getTime())) return "";
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  return `${yrs > 0 ? `${yrs} yr ` : ""}${mos} mo`;
}

export const TYPING_WORDS: string[] = CONTENT.typingWords;

export const HERO_BADGES: string[] = CONTENT.heroBadges;

export const TECH_GROUPS: TechGroup[] = CONTENT.techGroups;

export const PROJECTS: ProjectItem[] = CONTENT.projects;

export const EXPERIENCES: ExperienceItem[] = CONTENT.experiences;

export const SOCIAL_LINKS: SocialLink[] = CONTENT.socialLinks;
