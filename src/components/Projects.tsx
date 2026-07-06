import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Code2,
  Star,
  Sparkles,
  Briefcase,
  Loader2,
} from "lucide-react";
import { resolveImage } from "../assets/data";
import { useContent } from "../store/ContentStore";
import SectionHeading from "./SectionHeading";

const FILTERS = ["All", "React/Next.js", "React Native"] as const;

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
    icon: typeof Star;
    pulse?: boolean;
  }
> = {
  featured: {
    label: "Featured",
    color: "#fbbf24",
    bgColor: "rgba(251,191,36,0.08)",
    borderColor: "rgba(251,191,36,0.2)",
    icon: Star,
  },
  new: {
    label: "New",
    color: "#4ade80",
    bgColor: "rgba(74,222,128,0.08)",
    borderColor: "rgba(74,222,128,0.2)",
    icon: Sparkles,
  },
  freelance: {
    label: "Freelance",
    color: "#3b82f6",
    bgColor: "rgba(59,130,246,0.08)",
    borderColor: "rgba(59,130,246,0.2)",
    icon: Briefcase,
  },
  "in-progress": {
    label: "In Progress",
    color: "#f87171",
    bgColor: "rgba(248,113,113,0.08)",
    borderColor: "rgba(248,113,113,0.2)",
    icon: Loader2,
    pulse: true,
  },
  "graduation-Project": {
    label: "Graduation Project",
    color: "#8b5cf6",
    bgColor: "rgba(139,92,246,0.08)",
    borderColor: "rgba(139,92,246,0.2)",
    icon: Sparkles,
  }
};

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const { content } = useContent();
  const projects = content.projects;

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Portfolio"
          title="Projects"
          description="A selection of my recent work, showcasing a range of projects."
        />
        <div className="flex items-center justify-center gap-2 mb-10 -mt-6 border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl rounded-3xl px-6 max-sm:px-3 py-2 w-fit mx-auto ">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative px-6 max-sm:px-4 py-2 cursor-pointer rounded-3xl text-sm font-medium transition-all duration-300 ${
                filter === f
                  ? "text-sky-400"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {filter === f && (
                <motion.div
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-3xl border border-sky-500/30 bg-sky-500/[0.08]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => {
              const status = STATUS_CONFIG[project.status];
              const StatusIcon = status?.icon;

              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.08,
                    layout: { type: "spring", stiffness: 300, damping: 30 },
                  }}
                  whileHover={{ y: -8 }}
                  data-cursor-hover
                  className="group relative flex flex-col rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-shadow duration-500"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 40px rgba(59,130,246,0.08), 0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(59,130,246,0.15)";
                    e.currentTarget.style.borderColor = "rgba(59,130,246,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.borderColor = "";
                  }}
                >
                  <div className="relative aspect-video overflow-hidden bg-zinc-900/60">
                    <img
                      src={resolveImage(project.image)}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                  </div>

                  <div className="flex-1 p-5 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[15px] font-semibold text-slate-200 mb-1.5 group-hover:text-white transition-colors leading-snug">
                        {project.title}
                      </h3>
                      {status && (
                        <p
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border backdrop-blur-sm ${
                            status.pulse ? "animate-pulse-slow" : ""
                          }`}
                          style={{
                            color: status.color,
                            backgroundColor: status.bgColor,
                            borderColor: status.borderColor,
                          }}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] text-slate-400 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center gap-2 pt-4 border-t border-white/[0.04]">
                      {project.github !== "not available" && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 bg-white/[0.03] border border-white/[0.06] hover:text-white hover:border-blue-500/25 hover:bg-blue-500/[0.06] transition-all duration-300"
                          style={{
                            boxShadow: "0 0 0 0 rgba(59,130,246,0)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow =
                              "0 0 12px 2px rgba(59,130,246,0.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <Code2 className="w-3.5 h-3.5" />
                          Code
                        </a>
                      )}

                      {project.demo !== "not available" && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-400 bg-blue-500/[0.06] border border-blue-500/15 hover:bg-blue-500/[0.12] hover:border-blue-500/30 transition-all duration-300"
                          style={{
                            boxShadow: "0 0 0 0 rgba(59,130,246,0)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow =
                              "0 0 12px 2px rgba(59,130,246,0.15)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
