import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16 -mt-12 "
    >
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/25 bg-sky-500/5 text-sky-400 text-xs font-medium tracking-wide uppercase mb-4">
        {label}
      </span>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-200 mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
