import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { GLOBAL_PARTICLES_OPTIONS } from "../ParticlesConfig";

export default function GlobalBackground() {
  const [engineReady, setEngineReady] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 3000], [0, -80]);

  return (
    <div className="fixed inset-0 -z-10 bg-zinc-950 overflow-hidden">
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-sky-400/[0.025] rounded-full blur-3xl" />
        <div className="absolute top-2/3 left-1/2 w-[400px] h-[400px] bg-violet-600/[0.02] rounded-full blur-3xl" />
      </motion.div>

      {engineReady && (
        <Particles
          id="global-neural-network"
          options={GLOBAL_PARTICLES_OPTIONS}
          className="absolute inset-0"
          style={{ pointerEvents: "none" }}
        />
      )}
    </div>
  );
}
