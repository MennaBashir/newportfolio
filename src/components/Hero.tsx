import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const spring = { type: "spring" as const, stiffness: 60, damping: 18 };

function fromBelow(delay: number) {
  return {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { ...spring, delay },
  };
}

const SKILL_ICONS = [
  {
    label: "React",
    color: "#61DAFB",
    glow: "rgba(97,218,251,0.4)",
    orbitRx: 200,
    orbitRy: 70,
    duration: 14,
    startAngle: 0,
    size: 44,
    svg: (c: string) => (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
        <circle cx="12" cy="12" r="2.4" fill={c} />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke={c} strokeWidth="1.1" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke={c} strokeWidth="1.1" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke={c} strokeWidth="1.1" fill="none" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    label: "Next.js",
    color: "#ffffff",
    glow: "rgba(255,255,255,0.3)",
    orbitRx: 185,
    orbitRy: 60,
    duration: 18,
    startAngle: 72,
    size: 40,
    svg: (c: string) => (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
        <circle cx="12" cy="12" r="10" fill={c} fillOpacity="0.08" stroke={c} strokeWidth="1" />
        <path d="M8 8v8m0-8l8 8m0-8v3" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "TypeScript",
    color: "#3178C6",
    glow: "rgba(49,120,198,0.5)",
    orbitRx: 210,
    orbitRy: 75,
    duration: 20,
    startAngle: 144,
    size: 38,
    svg: (c: string) => (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
        <rect x="2" y="2" width="20" height="20" rx="3" fill={c} fillOpacity="0.18" stroke={c} strokeWidth="1" />
        <text x="12" y="16" textAnchor="middle" fill={c} fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">TS</text>
      </svg>
    ),
  },
  {
    label: "Redux",
    color: "#764ABC",
    glow: "rgba(118,74,188,0.45)",
    orbitRx: 195,
    orbitRy: 65,
    duration: 16,
    startAngle: 216,
    size: 40,
    svg: (c: string) => (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
        <circle cx="12" cy="12" r="10" fill={c} fillOpacity="0.1" stroke={c} strokeWidth="1" />
        <path d="M15 8.5c0-2-1.5-3.5-3.5-3.5S8 6.5 8 8.5c0 1.5 1 2.8 2.3 3.2" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M9 15.5c0 2 1.5 3.5 3.5 3.5s3.5-1.5 3.5-3.5c0-1.5-1-2.8-2.3-3.2" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
        <path d="M14.5 10c1.7 1 2.5 2.7 2 4.5-.4 1.4-1.6 2.3-3 2.5" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Docker",
    color: "#2496ED",
    glow: "rgba(36,150,237,0.45)",
    orbitRx: 205,
    orbitRy: 72,
    duration: 22,
    startAngle: 288,
    size: 42,
    svg: (c: string) => (
      <svg viewBox="0 0 24 24" fill="none" style={{ width: "100%", height: "100%" }}>
        <rect x="2" y="10" width="20" height="9" rx="2" fill={c} fillOpacity="0.12" stroke={c} strokeWidth="1" />
        <rect x="5" y="6" width="3" height="4" rx="0.5" fill={c} fillOpacity="0.35" stroke={c} strokeWidth="0.6" />
        <rect x="9" y="6" width="3" height="4" rx="0.5" fill={c} fillOpacity="0.35" stroke={c} strokeWidth="0.6" />
        <rect x="13" y="6" width="3" height="4" rx="0.5" fill={c} fillOpacity="0.35" stroke={c} strokeWidth="0.6" />
        <rect x="9" y="2" width="3" height="4" rx="0.5" fill={c} fillOpacity="0.35" stroke={c} strokeWidth="0.6" />
      </svg>
    ),
  },
];

function OrbitalIcon({
  icon,
  mouseX,
  mouseY,
}: {
  icon: typeof SKILL_ICONS[0];
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0, op: 0.65, sc: 0.88 });

  useEffect(() => {
    const startRad = (icon.startAngle * Math.PI) / 180;
    const msPerRad = (icon.duration * 1000) / (2 * Math.PI);
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const a = startRad + (now - start) / msPerRad;
      const mx = mouseX.get();
      const my = mouseY.get();
      const cx = Math.cos(a) * (icon.orbitRx + mx * 18) - icon.size / 2;
      const cy = Math.sin(a) * (icon.orbitRy + my * 10) - icon.size / 2;
      const z = Math.sin(a);
      setPos({
        x: cx,
        y: cy,
        op: 0.35 + ((z + 1) / 2) * 0.65,
        sc: 0.7 + ((z + 1) / 2) * 0.38,
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.sc})`,
        opacity: pos.op,
        width: icon.size,
        height: icon.size,
        transition: "opacity 0.1s, transform 0.1s",
        willChange: "transform, opacity",
      }}
    >
      <motion.div
        whileHover={{ scale: 1.3 }}
        className="relative flex items-center justify-center rounded-xl backdrop-blur-sm border border-white/10"
        style={{
          width: icon.size,
          height: icon.size,
          background: `rgba(9,9,11,0.7)`,
          boxShadow: `0 0 12px 3px ${icon.glow}, inset 0 0 8px rgba(255,255,255,0.03)`,
        }}
        title={icon.label}
      >
        {icon.svg(icon.color)}
      </motion.div>
    </div>
  );
}

function NeuralOrb() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 55, damping: 20 });
  const smoothY = useSpring(rawY, { stiffness: 55, damping: 20 });

  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (e) => {
      await loadSlim(e);
    }).then(() => setEngineReady(true));
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full select-none"
      style={{ aspectRatio: "1 / 1", maxWidth: 520 }}
    >
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.12) 0%, rgba(124,58,237,0.07) 50%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      <div className="absolute inset-0">
        {SKILL_ICONS.map((icon) => (
          <OrbitalIcon key={icon.label} icon={icon} mouseX={smoothX} mouseY={smoothY} />
        ))}
      </div>

      <div
        className="absolute inset-[28%] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 40% 35%, rgba(99,102,241,0.18) 0%, rgba(59,130,246,0.1) 45%, rgba(14,165,233,0.06) 70%, transparent 100%)",
          boxShadow:
            "0 0 50px 16px rgba(59,130,246,0.08), inset 0 0 30px rgba(99,102,241,0.1)",
          border: "1px solid rgba(99,102,241,0.12)",
        }}
      />
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 lg:py-0 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">

          <div className="flex flex-col">
            <motion.p
              {...fromBelow(0)}
              className="text-sm font-medium tracking-[0.2em] uppercase text-blue-400/80 mb-5"
            >
              Welcome to my technical playground :)
            </motion.p>

            <motion.h1
              {...fromBelow(0.1)}
              className="font-bold tracking-tight leading-[1.08] mb-6"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)" }}
            >
              <span className="text-white">Hi, I'm</span>
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #3b82f6 0%, #38bdf8 40%, #a78bfa 100%)",
                }}
              >
                Menna Bashir
              </span>
            </motion.h1>

            <motion.p
              {...fromBelow(0.2)}
              className="text-lg text-slate-400 leading-relaxed max-w-[520px] mb-3"
            >
              Frontend &amp; Mobile Engineer Specializing in crafting seamless web and mobile applications. Passionate about exploring the latest in AI technology and frontend libraries to create innovative solutions. 
            </motion.p>

            <motion.div {...fromBelow(0.32)} className="mt-10 cursor-pointer">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-white transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #7c3aed 100%)",
                    boxShadow:
                      "0 0 0 1px rgba(99,102,241,0.3), 0 0 30px 6px rgba(59,130,246,0.2), 0 8px 24px rgba(0,0,0,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 0 1px rgba(99,102,241,0.5), 0 0 50px 12px rgba(59,130,246,0.3), 0 8px 32px rgba(0,0,0,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 0 1px rgba(99,102,241,0.3), 0 0 30px 6px rgba(59,130,246,0.2), 0 8px 24px rgba(0,0,0,0.4)";
                  }}
                >
                  Explore My Work
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              {...fromBelow(0.45)}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-white/[0.05]"
            >
              {[
                { value: "2+", label: "Years Building" },
                { value: "17+", label: "Projects Shipped" },
                { value: "2", label: "OSS Orgs" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="text-2xl font-bold text-transparent bg-clip-text"
                    style={{ backgroundImage: "linear-gradient(135deg, #3b82f6, #38bdf8)" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 whitespace-nowrap">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <NeuralOrb />
          </div>
        </div>
      </div>
    </section>
  );
}
