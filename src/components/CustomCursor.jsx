import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor-interactive="true"]';

export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, {
    stiffness: 420,
    damping: 28,
    mass: 0.4,
  });
  const springY = useSpring(mouseY, {
    stiffness: 420,
    damping: 28,
    mass: 0.4,
  });

  useEffect(() => {
    if (shouldReduceMotion || typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updatePointerType = () => setEnabled(mediaQuery.matches);
    updatePointerType();

    mediaQuery.addEventListener("change", updatePointerType);
    return () => mediaQuery.removeEventListener("change", updatePointerType);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target;
      if (target instanceof Element) {
        setHovered(Boolean(target.closest(INTERACTIVE_SELECTOR)));
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [enabled, mouseX, mouseY, visible]);

  if (!enabled || shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: hovered ? 2 : 1,
        opacity: visible ? (hovered ? 0.45 : 0.85) : 0,
      }}
      transition={{
        scale: { type: "spring", stiffness: 360, damping: 24 },
        opacity: { duration: 0.18 },
      }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-5 w-5 rounded-full border border-cyan-300/80 bg-cyan-400/25 shadow-[0_0_20px_rgba(34,211,238,0.65)] backdrop-blur-[1px]"
    />
  );
}

