import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

const SECTIONS = [
  { id: "home", label: "Overview", code: "01" },
  { id: "architecture", label: "Architecture", code: "02" },
  { id: "data", label: "Telemetry", code: "03" },
  { id: "router", label: "PEP/PDP", code: "04" },
  { id: "factory", label: "Pipeline", code: "05" },
  { id: "projects", label: "Systems", code: "06" },
  { id: "skills", label: "Stack", code: "07" },
  { id: "about", label: "Architect", code: "08" },
  { id: "contact", label: "Transmit", code: "09" },
];

export default function ScrollTelemetryRail() {
  const shouldReduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState("home");
  const [hoveredId, setHoveredId] = useState(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  // Track live percentage
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0,
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <aside
      aria-label="Scroll Telemetry Rail"
      className="fixed right-3.5 xl:right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end pointer-events-none select-none"
    >
      <div className="pointer-events-auto flex flex-col items-end gap-3 group/rail p-2">
        {/* Top telemetry percentage HUD */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-slate-400/80 transition-colors duration-200 group-hover/rail:text-cyan-300">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <span>{String(scrollPercent).padStart(2, "0")}%</span>
        </div>

        {/* Rail track & waypoints */}
        <div className="relative flex flex-col items-center py-2 px-1">
          {/* Vertical Track Baseline */}
          <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/5 via-white/15 to-white/5" />

          {/* Smooth Scroll Progress Thumb */}
          <motion.div
            style={{
              top: 0,
              height: "100%",
              scaleY: smoothProgress,
              originY: 0,
            }}
            className="absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-cyan-400 via-teal-300 to-sky-400 shadow-[0_0_10px_rgba(34,211,238,0.7)] pointer-events-none"
          />

          {/* Section Waypoints */}
          <div className="relative flex flex-col gap-4 py-1">
            {SECTIONS.map((sec) => {
              const isActive = activeId === sec.id;
              const isHovered = hoveredId === sec.id;

              return (
                <div
                  key={sec.id}
                  className="relative flex items-center justify-end"
                  onMouseEnter={() => setHoveredId(sec.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Floating HUD Pill on Hover or Focus */}
                  {(isHovered || (isActive && hoveredId === null)) && (
                    <motion.div
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-7 flex items-center gap-2 whitespace-nowrap rounded border border-white/10 bg-[#070d1f]/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] pointer-events-none"
                    >
                      <span className="text-cyan-400 font-semibold">{sec.code}</span>
                      <span className="text-slate-200">{sec.label}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                      )}
                    </motion.div>
                  )}

                  {/* Waypoint Clickable Notch */}
                  <button
                    onClick={() => handleScrollTo(sec.id)}
                    aria-label={`Jump to ${sec.label}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`group/notch relative flex h-4 w-4 items-center justify-center rounded-full transition-transform duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 ${
                      isActive ? "scale-125" : "hover:scale-110"
                    }`}
                  >
                    {/* Ring highlight on active */}
                    {isActive && (
                      <span className="absolute inset-0 rounded-full border border-cyan-400/60 animate-ping opacity-60" />
                    )}

                    {/* Dot / Indicator */}
                    <span
                      className={`rounded-full transition-all duration-200 ${
                        isActive
                          ? "h-2 w-2 bg-cyan-300 shadow-[0_0_10px_#22d3ee]"
                          : isHovered
                          ? "h-1.5 w-1.5 bg-white shadow-[0_0_6px_#ffffff]"
                          : "h-1 w-1 bg-white/30 group-hover/notch:bg-white/70"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Rail Legend */}
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 transition-colors duration-200 group-hover/rail:text-slate-400">
          NAV
        </div>
      </div>
    </aside>
  );
}

