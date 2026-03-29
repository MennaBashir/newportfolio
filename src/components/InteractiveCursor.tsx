import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SPRING_CONFIG = { damping: 25, stiffness: 200, mass: 0.5 };
const DEFAULT_SIZE = 32;
const HOVER_SIZE = 56;

const HOVER_SELECTORS = "button, a, [role='button'], [data-cursor-hover]";

function isTouchDevice() {
  return (
    typeof window !== "undefined" &&
    (window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0)
  );
}

export default function InteractiveCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, SPRING_CONFIG);
  const springY = useSpring(cursorY, SPRING_CONFIG);

  useEffect(() => {
    if (isTouchDevice()) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(HOVER_SELECTORS)) {
        setHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.(HOVER_SELECTORS)) {
        setHovering(false);
      }
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const onMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [cursorX, cursorY, visible]);

  if (isTouch) return null;

  const size = hovering ? HOVER_SIZE : DEFAULT_SIZE;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        backgroundColor: hovering
          ? "rgba(56, 189, 248, 0.15)"
          : "rgba(56, 189, 248, 0)",
        border: hovering
          ? "2px solid rgba(56, 189, 248, 0.4)"
          : "2px solid rgba(56, 189, 248, 0.6)",
        boxShadow: hovering
          ? "0 0 20px 6px rgba(56, 189, 248, 0.2), inset 0 0 12px rgba(56, 189, 248, 0.1)"
          : "none",
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    />
  );
}
