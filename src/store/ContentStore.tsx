import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { PortfolioContent } from "../assets/contentTypes";
import {
  TYPING_WORDS,
  HERO_BADGES,
  TECH_GROUPS,
  PROJECTS,
  EXPERIENCES,
  SOCIAL_LINKS,
} from "../assets/data";

const STORAGE_KEY = "portfolio-content-v1";

export function getDefaultContent(): PortfolioContent {
  return structuredClone({
    typingWords: TYPING_WORDS as unknown as string[],
    heroBadges: HERO_BADGES,
    techGroups: TECH_GROUPS,
    projects: PROJECTS,
    experiences: EXPERIENCES,
    socialLinks: SOCIAL_LINKS,
  });
}

function loadContent(): PortfolioContent {
  const defaults = getDefaultContent();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<PortfolioContent>;
    return { ...defaults, ...parsed };
  } catch {
    return defaults;
  }
}

interface ContentContextValue {
  content: PortfolioContent;
  updateContent: (patch: Partial<PortfolioContent>) => void;
  resetContent: () => void;
  hasOverrides: boolean;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>(loadContent);
  const [hasOverrides, setHasOverrides] = useState(
    () => localStorage.getItem(STORAGE_KEY) !== null
  );

  const updateContent = useCallback((patch: Partial<PortfolioContent>) => {
    setContent((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage full or unavailable */
      }
      return next;
    });
    setHasOverrides(true);
  }, []);

  const resetContent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setContent(getDefaultContent());
    setHasOverrides(false);
  }, []);

  const value = useMemo(
    () => ({ content, updateContent, resetContent, hasOverrides }),
    [content, updateContent, resetContent, hasOverrides]
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
