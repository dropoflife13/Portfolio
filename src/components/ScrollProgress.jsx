import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none"
      aria-hidden="true"
    >
      {/* Ambient Glow Beam */}
      <motion.div
        style={{ scaleX }}
        className="absolute inset-0 origin-left bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 blur-[3px] opacity-75"
      />
      {/* Core Crisp Beam */}
      <motion.div
        style={{ scaleX }}
        className="relative h-full origin-left bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-300 shadow-[0_0_14px_rgba(34,211,238,0.9)]"
      />
    </div>
  );
}
