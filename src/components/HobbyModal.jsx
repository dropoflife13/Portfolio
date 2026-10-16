import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HobbyModal({ hobby, onClose }) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [imageError, setImageError] = useState({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!hobby?.items?.length) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setActive((prev) => (prev + 1) % hobby.items.length);
      }
      if (e.key === "ArrowLeft") {
        setActive(
          (prev) => (prev - 1 + hobby.items.length) % hobby.items.length
        );
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, hobby]);

  useEffect(() => {
    if (!hobby?.items?.length || paused || hovered !== null) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % hobby.items.length);
    }, 4500 / speed);

    return () => clearInterval(timer);
  }, [paused, hovered, speed, hobby]);

  if (!hobby) return null;

  const { label, icon: Icon, items, bigWord, tagline } = hobby;
  const activeItem = items[active];

  const genreParts = activeItem?.genre
    ? activeItem.genre.split("·").map((g) => g.trim())
    : [];

  const next = () => setActive((prev) => (prev + 1) % items.length);
  const previous = () =>
    setActive((prev) => (prev - 1 + items.length) % items.length);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          onMouseLeave={() => setHovered(null)}
          className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#080e20] shadow-[0_25px_90px_rgba(0,0,0,0.7)]"
        >
          {/* Background Ambient Glows */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-accent/[0.05] blur-[120px]" />
            <div className="absolute -right-32 -bottom-32 h-[400px] w-[400px] rounded-full bg-purple-500/[0.04] blur-[120px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.03),transparent_65%)]" />
          </div>

          {/* Ghost Word */}
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-0 overflow-hidden">
            <p className="select-none text-center font-serif text-[17vw] font-black uppercase leading-[0.65] tracking-[-0.07em] whitespace-nowrap text-white/[0.02]">
              {bigWord}
            </p>
          </div>

          {/* Header */}
          <header className="relative z-30 flex shrink-0 items-center justify-between border-b border-white/[0.07] px-6 py-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-accent/25 blur-md" />
                <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/[0.1] text-accent">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-accent font-semibold">
                  {hobby.state || "Top 5 favorites"}
                </p>
                <p className="mt-0.5 font-serif text-2xl font-normal leading-none text-ink">
                  {label}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Play / Pause & Speed Controls */}
              <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1">
                <button
                  onClick={() => setPaused((prev) => !prev)}
                  className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-ink-muted transition-colors hover:text-accent"
                >
                  {paused ? <Play size={10} /> : <Pause size={10} />}
                  <span>{paused ? "Play" : "Pause"}</span>
                </button>
                <span className="text-white/20">|</span>
                <button
                  onClick={() =>
                    setSpeed((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))
                  }
                  className="font-mono text-[9px] font-semibold text-accent/90 transition-colors hover:text-accent"
                >
                  ×{speed}
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.02] text-ink-muted transition-all hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
              >
                <X
                  size={16}
                  className="transition-transform duration-200 group-hover:rotate-90"
                />
              </button>
            </div>
          </header>

          {/* ============================================ */}
          {/* 5 CARDS ROW — spacious poster cards */}
          {/* ============================================ */}
          <div
            className="relative z-20 shrink-0 px-4 sm:px-6 pt-5 pb-3 overflow-x-auto scrollbar-none"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              setPaused(false);
              setHovered(null);
            }}
          >
            <div className="mx-auto flex w-full max-w-4xl items-center justify-center gap-3 sm:gap-4 md:gap-5">
              {items.map((item, i) => {
                const isActive = active === i;
                const isHovered = hovered === i;
                const hasError = imageError[i];

                return (
                  <motion.button
                    key={item.title}
                    type="button"
                    onMouseEnter={() => setHovered(i)}
                    onClick={() => {
                      setActive(i);
                      setHovered(null);
                    }}
                    onFocus={() => setHovered(i)}
                    className="relative h-[165px] w-[115px] shrink-0 sm:h-[195px] sm:w-[138px] md:h-[225px] md:w-[158px] cursor-pointer focus:outline-none"
                    style={{
                      zIndex: isHovered ? 40 : isActive ? 20 : 1,
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.06 : isActive ? 1.02 : 1,
                        y: isHovered ? -6 : isActive ? -2 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 340,
                        damping: 22,
                        mass: 0.5,
                      }}
                      className={`group absolute inset-0 flex flex-col justify-between overflow-hidden rounded-xl border transition-all duration-200 ${
                        isActive
                          ? "border-accent ring-2 ring-accent/40 shadow-[0_12px_36px_rgba(45,212,191,0.25)] bg-[#0d162d]"
                          : isHovered
                          ? "border-accent/60 shadow-[0_10px_25px_rgba(0,0,0,0.5)] bg-[#0d162d]"
                          : "border-white/[0.08] bg-[#0c1426] hover:border-white/20"
                      }`}
                    >
                      {/* Top glowing bar if active */}
                      {isActive && (
                        <div className="absolute top-0 inset-x-0 h-1 z-30 bg-gradient-to-r from-accent/30 via-accent to-accent/30" />
                      )}

                      {item.thumb && !hasError ? (
                        <>
                          <img
                            src={item.thumb}
                            alt={item.title}
                            onError={() =>
                              setImageError((prev) => ({ ...prev, [i]: true }))
                            }
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          {/* Top rank badge */}
                          <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1 rounded-full border border-white/20 bg-black/65 px-2 py-0.5 backdrop-blur-md">
                            <span className="font-mono text-[10px] font-semibold text-accent">
                              #{String(i + 1).padStart(2, "0")}
                            </span>
                          </div>

                          {/* Bottom gradient & label */}
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080e20] via-black/35 to-transparent" />
                          <div className="absolute right-2.5 bottom-2.5 left-2.5 z-20 text-left">
                            <p className="font-serif text-xs sm:text-sm font-normal text-white line-clamp-1">
                              {item.title}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="relative flex h-full w-full flex-col justify-between bg-gradient-to-b from-[#131d36] via-[#0d162a] to-[#070c1b] p-3 text-left">
                          {/* Top rank badge */}
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-accent">
                              #{String(i + 1).padStart(2, "0")}
                            </span>
                            {isActive && (
                              <span className="font-mono text-[8px] uppercase tracking-wider text-accent font-semibold">
                                Active
                              </span>
                            )}
                          </div>

                          {/* Center icon graphic */}
                          <div className="flex items-center justify-center my-auto py-2">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-accent/35 transition-colors group-hover:text-accent group-hover:border-accent/30 group-hover:scale-110">
                              <Icon size={20} strokeWidth={1.7} />
                            </div>
                          </div>

                          {/* Bottom title & genre preview */}
                          <div>
                            <p className="font-serif text-xs sm:text-sm font-normal leading-snug text-ink line-clamp-2 transition-colors group-hover:text-white">
                              {item.title}
                            </p>
                            <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-accent/80 line-clamp-1">
                              {item.genre}
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* ============================================ */}
          {/* MAIN HERO DISPLAY FOR ACTIVE ITEM */}
          {/* ============================================ */}
          <section className="relative z-10 flex flex-col items-center px-6 pt-3 pb-6 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{
                  opacity: 0,
                  y: 12,
                  scale: 0.98,
                  filter: "blur(4px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.98,
                  filter: "blur(4px)",
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent font-semibold">
                  #{String(active + 1).padStart(2, "0")} of 05
                </span>

                <h2 className="mt-2 max-w-3xl font-serif text-[32px] sm:text-[42px] md:text-[50px] font-light leading-[1.05] tracking-[-0.035em] text-ink">
                  {activeItem.title}
                </h2>

                {genreParts.length > 0 && (
                  <div className="mt-3.5 flex flex-wrap justify-center gap-2">
                    {genreParts.map((part) => (
                      <Badge
                        key={part}
                        variant="outline"
                        className="rounded-full border-accent/30 bg-accent/[0.08] px-3 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-accent shadow-[0_0_12px_rgba(45,212,191,0.12)] font-medium"
                      >
                        {part}
                      </Badge>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation & Progress Bars */}
            <div className="mt-6 flex items-center justify-center gap-5">
              <button
                onClick={previous}
                aria-label="Previous item"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.02] text-ink-muted transition-all hover:border-accent/50 hover:bg-accent/10 hover:text-accent active:scale-95"
              >
                <ChevronLeft size={16} />
              </button>

              <div className="flex items-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to item ${i + 1}`}
                    className="flex h-4 items-center"
                  >
                    <motion.span
                      animate={{
                        width: active === i ? 28 : 6,
                        opacity: active === i ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.25 }}
                      className="block h-[4px] rounded-full bg-accent"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next item"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.02] text-ink-muted transition-all hover:border-accent/50 hover:bg-accent/10 hover:text-accent active:scale-95"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {tagline && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="mt-4 max-w-lg font-serif text-xs sm:text-sm italic leading-relaxed text-ink-faint/80"
              >
                "{tagline}"
              </motion.p>
            )}

            <div className="mt-3 font-mono text-[9px] uppercase tracking-widest text-ink-faint/40">
              ← → arrow keys to navigate · esc to close
            </div>
          </section>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}