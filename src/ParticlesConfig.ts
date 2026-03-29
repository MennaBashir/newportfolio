import type { ISourceOptions } from "@tsparticles/engine";

export const GLOBAL_PARTICLES_OPTIONS: ISourceOptions = {
  fullScreen: { enable: true, zIndex: -1 },
  background: {
    color: { value: "#09090b" },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: { enable: true, mode: "push" },
      onHover: {
        enable: true,
        mode: "grab", 
        parallax: { enable: true, force: 60, smooth: 10 },
      },
    },
    modes: {
      grab: {
        distance: 200,
        links: { opacity: 0.5, color: "#0ea5e9" },
      },
      push: { quantity: 3 },
    },
  },
  particles: { 
    color: { value: "#0ea5e9" }, 
    links: {
      color: "#0ea5e9",
      distance: 150,
      enable: true,
      opacity: 0.2,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: { default: "out" },
      random: false,
      speed: 1.2, 
      straight: false,
    },
    number: {
      density: { enable: true },
      value: 80,
    },
    opacity: {
      value: { min: 0.1, max: 0.5 },
    },
    shape: { type: "circle" },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
};
