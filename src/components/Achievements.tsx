import { motion } from "framer-motion";
import { ExternalLink, GitMerge } from "lucide-react";
import SectionHeading from "./SectionHeading";

const NasaIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
    <circle
      cx="32"
      cy="32"
      r="28"
      stroke="#38bdf8"
      strokeWidth="1.5"
      fill="#38bdf820"
    />
    <ellipse
      cx="32"
      cy="32"
      rx="24"
      ry="8"
      stroke="#38bdf8"
      strokeWidth="0.8"
      fill="none"
      transform="rotate(-20 32 32)"
    />
    <circle
      cx="32"
      cy="20"
      r="6"
      fill="#38bdf830"
      stroke="#38bdf8"
      strokeWidth="1"
    />
    <circle cx="32" cy="20" r="2.5" fill="#38bdf8" />
    <path
      d="M26 38l6-12 6 12"
      stroke="#38bdf8"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#38bdf815"
    />
    <line x1="28" y1="35" x2="36" y2="35" stroke="#38bdf8" strokeWidth="0.8" />
    <path
      d="M32 44v-6"
      stroke="#38bdf8"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <circle cx="32" cy="46" r="2" fill="#38bdf860" />
  </svg>
);

const GitLabIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
    <path
      d="M32 52L18 36l4-14h20l4 14L32 52z"
      fill="#f9731620"
      stroke="#f97316"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path
      d="M22 22l-4 14L32 52l14-16-4-14"
      fill="none"
      stroke="#f97316"
      strokeWidth="1"
    />
    <path
      d="M18 36L14 22l8 0"
      stroke="#f97316"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M46 36L50 22l-8 0"
      stroke="#f97316"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M32 52L22 22" stroke="#f9731640" strokeWidth="0.6" />
    <path d="M32 52L42 22" stroke="#f9731640" strokeWidth="0.6" />
    <circle
      cx="32"
      cy="34"
      r="4"
      fill="#f9731630"
      stroke="#f97316"
      strokeWidth="0.8"
    />
    <circle cx="32" cy="34" r="1.5" fill="#f97316" />
  </svg>
);

const AboutCodeIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12">
    <path
      d="M32 8L12 20v24l20 12 20-12V20L32 8z"
      fill="#3b82f620"
      stroke="#3b82f6"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path
      d="M32 14L16 24v16l16 10 16-10V24L32 14z"
      fill="#3b82f610"
      stroke="#3b82f640"
      strokeWidth="0.8"
    />
    <path
      d="M26 30l-4 4 4 4"
      stroke="#3b82f6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M38 30l4 4-4 4"
      stroke="#3b82f6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line
      x1="34"
      y1="28"
      x2="30"
      y2="40"
      stroke="#3b82f6"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

interface StatusBadge {
  label: string;
  color: string;
}

interface Achievement {
  id: string;
  icon: React.ReactNode;
  title: string;
  titleHighlight?: string;
  tag: string;
  description: string;
  techTags: string[];
  accentColor: string;
  status?: StatusBadge;
  buttons: { label: string; href: string; icon?: "external" | "merge" }[];
}

const achievements: Achievement[] = [
  {
    id: "nasa",
    icon: <NasaIcon />,
    title: "NASA Space Apps Challenge",
    titleHighlight: "(2025)",
    tag: "Activity Assistant & AI",
    description:
      "Developed an intelligent, weather-aware activity assistant that helps users plan outdoor activities safely using real-time API evaluation and AI suggestions.",
    techTags: ["React", "AI", "Weather APIs", "UX"],
    accentColor: "#38bdf8",
    buttons: [
      {
        label: "View Project",
        href: "https://skyra-iota.vercel.app/",
        icon: "external",
      },
      {
        label: "View Certificate",
        href: "https://drive.google.com/file/d/1Vheos8Gt3Rh5R10ACwxIf9JNFsAD-EBk/view?usp=sharing",
        icon: "external",
      },
    ],
  },
  {
    id: "gitlab",
    icon: <GitLabIcon />,
    title: "GitLab",
    tag: "Open Source Contributor",
    description:
      "Sticky Edit button for wiki pages: Implemented a feature that keeps the 'Edit' button visible on GitLab wiki pages, improving accessibility and user experience.",
    techTags: ["Vue.js", "Accessibility", "UI/UX"],
    accentColor: "#f97316",
    status: { label: "Progress", color: "#f97316" },
    buttons: [
      {
        label: "View Merge Request",
        href: "https://gitlab.com/gitlab-org/gitlab/-/merge_requests/224262",
        icon: "merge",
      },
    ],
  },
  {
    id: "aboutcode",
    icon: <AboutCodeIcon />,
    title: "AboutCode",
    tag: "Open Source Contributor",
    description:
      "Implemented Dark Mode for AboutCode website, enhancing user experience . The feature was merged in another PR and is now live, receiving positive feedback from the community.",
    techTags: ["React",  "Dark Mode", "UI/UX"],
    accentColor: "#3b82f6",
    status: { label: "Merged", color: "#a855f7" },
    buttons: [
      {
        label: "View Pull Request",
        href: "https://github.com/aboutcode-org/www.aboutcode.org/pull/74",
        icon: "merge",
      },
      {
        label: "Live Site",
        href: "https://aboutcode-org.github.io/www.aboutcode.org/",
        icon: "external",
      },
    ],
  },
];

export default function Achievements() {
  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          label="Awards & Contributions"
          title="Key Achievements"
          description="Awards and open-source contributions that shaped my journey."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-8 flex flex-col overflow-hidden transition-shadow duration-500"
              style={{
                boxShadow: `0 0 0 1px ${item.accentColor}30`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 40px ${item.accentColor}18, 0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px ${item.accentColor}35`;
                e.currentTarget.style.borderColor = `${item.accentColor}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 1px ${item.accentColor}30`;
                e.currentTarget.style.borderColor = "";
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${item.accentColor}08 0%, transparent 70%)`,
                }}
              />

              <div className="relative flex flex-col flex-1">
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center border"
                    style={{
                      backgroundColor: `${item.accentColor}08`,
                      borderColor: `${item.accentColor}20`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-medium border"
                      style={{
                        backgroundColor: `${item.accentColor}10`,
                        borderColor: `${item.accentColor}25`,
                        color: item.accentColor,
                      }}
                    >
                      {item.tag}
                    </span>
                    {item.status && (
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border animate-pulse-slow"
                        style={{
                          backgroundColor: `${item.status.color}12`,
                          borderColor: `${item.status.color}30`,
                          color: item.status.color,
                        }}
                      >
                        <GitMerge className="w-3 h-3" />
                        {item.status.label}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-1">
                  {item.title}
                  {item.titleHighlight && (
                    <span
                      className="ml-1.5 text-base font-semibold"
                      style={{ color: item.accentColor }}
                    >
                      {item.titleHighlight}
                    </span>
                  )}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed mt-3 mb-6 flex-1">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.techTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-slate-400 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {item.buttons.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 mt-auto">
                    {item.buttons.map((btn, idx) => (
                      <a
                        key={btn.label}
                        href={btn.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                          idx === 0
                            ? "border text-white/80 hover:text-white"
                            : "bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]"
                        }`}
                        style={
                          idx === 0
                            ? {
                                backgroundColor: `${item.accentColor}12`,
                                borderColor: `${item.accentColor}30`,
                              }
                            : undefined
                        }
                        onMouseEnter={(e) => {
                          if (idx === 0) {
                            e.currentTarget.style.backgroundColor = `${item.accentColor}22`;
                            e.currentTarget.style.borderColor = `${item.accentColor}50`;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (idx === 0) {
                            e.currentTarget.style.backgroundColor = `${item.accentColor}12`;
                            e.currentTarget.style.borderColor = `${item.accentColor}30`;
                          }
                        }}
                      >
                        {btn.icon === "merge" ? (
                          <GitMerge className="w-3 h-3" />
                        ) : (
                          <ExternalLink className="w-3 h-3" />
                        )}
                        {btn.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
