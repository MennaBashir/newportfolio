import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { TECH_GROUPS } from "../assets/data";
import SectionHeading from "./SectionHeading";
import TechIcon from "./TechIcon";

function DomainCard({
  group,
  index,
}: {
  group: (typeof TECH_GROUPS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-[box-shadow,border-color] duration-500 p-5 flex flex-col gap-4"
      style={
        hovered
          ? {
              boxShadow: `0 0 60px ${group.accentColor}18, 0 8px 40px rgba(0,0,0,0.3), 0 0 0 1px ${group.accentColor}30`,
              borderColor: `${group.accentColor}30`,
            }
          : {
              boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
              borderColor: `${group.accentColor}20`,
            }
      }
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(ellipse at 50% 0%, ${group.accentColor}0b 0%, transparent 65%)`,
        }}
      />

      <div className="relative flex items-center justify-between">
        <span
          className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-[0.14em] border"
          style={{
            color: group.accentColor,
            borderColor: `${group.accentColor}35`,
            background: `${group.accentColor}12`,
          }}
        >
          {group.badge}
        </span>
        <span
          className="text-[11px] font-medium tabular-nums"
          style={{ color: `${group.accentColor}80` }}
        >
          {group.techs.length} tech{group.techs.length > 1 ? "s" : ""}
        </span>
      </div>

      <div className="relative">
        <h3
          className="text-base font-semibold leading-snug"
          style={{ color: group.accentColor }}
        >
          {group.label}
        </h3>
      </div>

      <div className="relative flex flex-wrap gap-3 pt-1">
        {group.techs.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.06, ease: "backOut" }}
            whileHover={{ y: -4, scale: 1.1 }}
            className="flex flex-col items-center gap-1.5 cursor-default"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center border border-[#33415566] bg-[#0f172acc] transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 4px 20px ${tech.color}30, 0 0 0 1px ${tech.color}35`;
                e.currentTarget.style.borderColor = `${tech.color}35`;
                e.currentTarget.style.background = `${tech.color}0d`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.background = "";
              }}
            >
              <TechIcon name={tech.name=== "React Native" ? "React" : tech.name} color={tech.color} />
            </div>
            <span className="text-[10px] text-slate-300 text-center leading-tight max-w-[52px]">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function TechStack() {

  return (
    <section className="pt-24 relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionHeading
          label="</> Skills & Technologies"
          title="Tech Stack"
          description="A showcase of the technologies and tools I have experience with."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-20">
          {TECH_GROUPS.map((group, i) => (
            <DomainCard key={group.id} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
