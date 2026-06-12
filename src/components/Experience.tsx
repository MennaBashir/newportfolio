import { motion } from "framer-motion";
import { Briefcase, Calendar, Clock, Building2 } from "lucide-react";
import { computeDuration } from "../assets/data";
import { useContent } from "../store/ContentStore";
import SectionHeading from "./SectionHeading";

const colorMap: Record<string, { border: string; bg: string; text: string; dot: string; leftBorder: string }> = {
  sky: {
    border: "border-sky-500/25",
    bg: "bg-sky-500/5",
    text: "text-sky-400",
    dot: "bg-sky-400",
    leftBorder: "border-l-sky-500",
  },
  violet: {
    border: "border-violet-500/25",
    bg: "bg-violet-500/5",
    text: "text-violet-400",
    dot: "bg-violet-400",
    leftBorder: "border-l-violet-500",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
    leftBorder: "border-l-emerald-500",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    text: "text-amber-400",
    dot: "bg-amber-400",
    leftBorder: "border-l-amber-500",
  },
};

export default function Experience() {
  const { content } = useContent();
  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading
          label="Work History"
          title="Experience"
          description="My journey through the tech world, one role at a time."
        />

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500/30 via-slate-700/50 to-transparent" />

          <div className="space-y-8">
            {content.experiences.map((exp, i) => {
              const colors = colorMap[exp.color] || colorMap.sky;
              return (
                <motion.div
                  key={exp.company + exp.role}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-16"
                >
                  <div
                    className={`absolute left-4 top-6 w-5 h-5 rounded-full border-2 ${colors.border} ${colors.bg} flex items-center justify-center`}
                  >
                    <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                  </div>

                  <div
                    className={`p-6 rounded-2xl border ${colors.border} ${colors.bg} border-l-4 ${colors.leftBorder} hover:bg-slate-900/60 transition-all duration-300`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-200">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 className={`w-4 h-4 ${colors.text}`} />
                          <span className={`text-sm font-medium ${colors.text}`}>
                            {exp.company}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1">
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Clock className="w-3.5 h-3.5" />
                          {exp.duration === "auto"
                            ? computeDuration(exp.period)
                            : exp.duration}
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${colors.bg} border ${colors.border} text-xs ${colors.text}`}>
                          <Briefcase className="w-3 h-3" />
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {exp.description.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-2 text-sm text-slate-400"
                        >
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colors.dot} shrink-0`} />
                          {d}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/50 text-xs text-slate-400 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
