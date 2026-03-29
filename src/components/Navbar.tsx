import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { NAV_ITEMS } from "../assets/data";
import { ASSETS } from "../assets/assets";

function MBMonogram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="mb-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="40%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <filter id="mb-outer-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
        </filter>
        <filter id="mb-soft-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" />
        </filter>
      </defs>
      <g filter="url(#mb-outer-glow)" opacity="0.35">
        <path d="M10 50V14L22 36L34 14V50" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 50V14H40C45 14 48 18 48 22C48 25.5 46 27.5 43 28.5C46.5 29.5 50 32 50 37C50 42 46 46 41 46H28" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g filter="url(#mb-soft-glow)" opacity="0.5">
        <path d="M10 50V14L22 36L34 14V50" stroke="url(#mb-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 50V14H40C45 14 48 18 48 22C48 25.5 46 27.5 43 28.5C46.5 29.5 50 32 50 37C50 42 46 46 41 46H28" stroke="url(#mb-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path d="M10 50V14L22 36L34 14V50" stroke="url(#mb-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 50V14H40C45 14 48 18 48 22C48 25.5 46 27.5 43 28.5C46.5 29.5 50 32 50 37C50 42 46 46 41 46H28" stroke="url(#mb-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="10" y1="20" x2="34" y2="32" stroke="#38bdf8" strokeWidth="0.6" opacity="0.25" />
      <line x1="34" y1="20" x2="10" y2="32" stroke="#38bdf8" strokeWidth="0.6" opacity="0.25" />
      <line x1="16" y1="14" x2="16" y2="50" stroke="#38bdf8" strokeWidth="0.4" opacity="0.15" />
      <line x1="28" y1="28" x2="46" y2="28" stroke="#38bdf8" strokeWidth="0.6" opacity="0.2" />
      <line x1="28" y1="22" x2="44" y2="38" stroke="#38bdf8" strokeWidth="0.4" opacity="0.12" />
      <line x1="28" y1="38" x2="44" y2="22" stroke="#38bdf8" strokeWidth="0.4" opacity="0.12" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-[1280px]">
      <div
        className="relative rounded-2xl border border-white/[0.07] bg-zinc-950/50 backdrop-blur-3xl"
        style={{
          boxShadow:
            "0 8px_40px rgba(0,0,0,0.5), 0 0 80px -20px rgba(56,189,248,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div className="px-7 py-3.5 flex items-center">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-xl bg-sky-400/[0.08] group-hover:bg-sky-400/[0.15] transition-all duration-500"
                style={{
                  boxShadow: "0 0 16px 4px rgba(56,189,248,0.08)",
                }}
              />
              <MBMonogram className="w-8 h-8 relative z-10" />
            </div>
            <span className="text-sm font-semibold tracking-[0.14em] text-white/90 group-hover:text-white transition-colors duration-300 select-none">
              MENNA BASHIR
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5 ml-auto mr-8">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              const isHovered = hovered === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onMouseEnter={() => setHovered(item.path)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative px-4 py-2 text-[13px] font-medium tracking-wide"
                >
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      isActive
                        ? "text-sky-400"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>

                  <AnimatePresence>
                    {isHovered && !isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background:
                            "radial-gradient(ellipse at 50% 100%, rgba(56,189,248,0.06) 0%, transparent 70%)",
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {(isActive || isHovered) && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, #38bdf8, transparent)",
                        boxShadow:
                          "0 0 8px 1px rgba(56,189,248,0.4), 0 0 20px 2px rgba(56,189,248,0.15)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 28,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center ml-auto lg:ml-0 shrink-0">
            <a
              href={ASSETS.resume}
              download
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2 text-[13px] font-medium tracking-wide text-sky-300 rounded-xl border border-sky-400/20 hover:border-sky-400/40 hover:text-white transition-all duration-400"
              style={{
                background:
                  "linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(14,165,233,0.05) 100%)",
                boxShadow:
                  "0 0 16px 2px rgba(56,189,248,0.08), 0 0 40px 4px rgba(56,189,248,0.04), inset 0 1px 0 rgba(56,189,248,0.08)",
              }}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors duration-200"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/[0.06] overflow-hidden"
            >
              <div className="px-6 py-4 space-y-1">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                      pathname === item.path
                        ? "bg-sky-500/10 text-sky-400"
                        : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={ASSETS.resume}
                  download
                  className="flex items-center gap-2 px-4 py-2.5 mt-2 text-sky-300 text-sm font-medium rounded-xl border border-sky-400/20"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(14,165,233,0.05) 100%)",
                  }}
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
