import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

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
    }, 4000 / speed);

    return () => clearInterval(timer);
  }, [paused, hovered, speed, hobby]);

  if (!hobby) return null;

  const { label, icon: Icon, items, bigWord, tagline } = hobby;
  const activeItem = items[active];

  const genreParts = activeItem.genre
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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 backdrop-blur-lg sm:p-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          onMouseLeave={() => setHovered(null)}
          className="relative flex w-full max-w-[92rem] flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#080e20] shadow-[0_25px_80px_rgba(0,0,0,0.55)]"
        >
          {/* Background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -left-32 h-[350px] w-[350px] rounded-full bg-accent/[0.035] blur-[100px]" />
            <div className="absolute -right-32 -bottom-32 h-[350px] w-[350px] rounded-full bg-blue-500/[0.025] blur-[100px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.025),transparent_55%)]" />
          </div>

          {/* Ghost word */}
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-0 overflow-hidden">
            <p className="select-none text-center font-serif text-[19vw] font-black uppercase leading-[0.65] tracking-[-0.07em] whitespace-nowrap text-white/[0.025]">
              {bigWord}
            </p>
          </div>

          {/* Header */}
          <header className="relative z-30 flex shrink-0 items-center justify-between border-b border-white/[0.07] px-5 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-md bg-accent/20 blur-md" />
                <div className="relative flex h-9 w-9 items-center justify-center rounded-md border border-accent/25 bg-accent/[0.08] text-accent">
                  <Icon size={16} strokeWidth={1.6} />
                </div>
              </div>
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-accent">
                  {hobby.state || "My list"}
                </p>
                <p className="mt-0.5 font-serif text-[22px] font-light leading-none text-ink">
                  {label}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] text-ink-muted transition-all hover:border-accent/40 hover:bg-accent/[0.06] hover:text-accent"
            >
              <X
                size={15}
                className="transition-transform duration-200 group-hover:rotate-90"
              />
            </button>
          </header>

          {/* Controls */}
          <div className="relative z-30 flex h-7 shrink-0 items-center justify-end gap-1.5 px-6 pt-1">
            <button
              onClick={() => setPaused((prev) => !prev)}
              className="flex h-6 items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.02] px-2 font-mono text-[7px] uppercase tracking-[0.15em] text-ink-muted transition-all hover:border-accent/30 hover:text-accent"
            >
              {paused ? <Play size={8} /> : <Pause size={8} />}
              {paused ? "Play" : "Pause"}
            </button>
            <button
              onClick={() =>
                setSpeed((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))
              }
              className="flex h-6 min-w-[32px] items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.02] font-mono text-[7px] tracking-widest text-accent/80 transition-all hover:border-accent/40"
            >
              ×{speed}
            </button>
          </div>

          {/* ============================================ */}
          {/* THUMBNAIL ROW — single row, spreads full width */}
          {/* ============================================ */}
          <div
            className="relative z-20 shrink-0 px-6 pt-2 pb-3"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
              setPaused(false);
              setHovered(null);
            }}
          >
            <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-2">
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
                    className="relative h-[64px] w-[64px] shrink-0 sm:h-[72px] sm:w-[72px] md:h-[80px] md:w-[80px]"
                    style={{
                      zIndex: isHovered ? 50 : isActive ? 20 : 1,
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: isHovered ? 1.22 : isActive ? 1.06 : 1,
                        y: isHovered ? -4 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 22,
                        mass: 0.5,
                      }}
                      className={`absolute inset-0 overflow-hidden rounded-lg border bg-[#10182d] ${
                        isHovered
                          ? "border-accent/80 shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
                          : isActive
                          ? "border-accent/60 shadow-md shadow-accent/10"
                          : "border-white/[0.08]"
                      }`}
                    >
                      {item.thumb && !hasError ? (
                        <img
                          src={item.thumb}
                          alt={item.title}
                          onError={() =>
                            setImageError((prev) => ({ ...prev, [i]: true }))
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#14203b] to-[#080e20] p-1 text-center">
                          <span className="font-mono text-[9px] text-accent/70">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="mt-1 line-clamp-2 text-[8px] leading-tight text-ink-muted">
                            {item.title}
                          </span>
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

                      {isActive && !isHovered && (
                        <motion.div
                          layoutId="activeThumb"
                          className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-accent/30 ring-inset"
                        />
                      )}

                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="pointer-events-none absolute inset-0 rounded-lg bg-accent/10 ring-1 ring-accent/50 ring-inset"
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Main content */}
          <section className="relative z-10 flex flex-col items-center px-5 pt-2 pb-5 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{
                  opacity: 0,
                  y: 15,
                  scale: 0.97,
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
                  y: -12,
                  scale: 0.98,
                  filter: "blur(4px)",
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center"
              >
                <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-accent">
                  #{String(active + 1).padStart(2, "0")}
                </span>

                <h2 className="mt-2 max-w-4xl font-serif text-[36px] font-light leading-[0.95] tracking-[-0.035em] text-ink sm:text-[46px] md:text-[54px]">
                  {activeItem.title}
                </h2>

                {genreParts.length > 0 && (
                  <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                    {genreParts.map((part) => (
                      <span
                        key={part}
                        className="rounded-full border border-accent/20 bg-accent/[0.04] px-2.5 py-0.5 font-mono text-[7px] uppercase tracking-[0.18em] text-accent/90"
                      >
                        {part}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                onClick={previous}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] text-ink-muted transition-all hover:border-accent/40 hover:text-accent"
              >
                <ChevronLeft size={13} />
              </button>

              <div className="flex items-center gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Go to item ${i + 1}`}
                    className="flex h-3 items-center"
                  >
                    <motion.span
                      animate={{
                        width: active === i ? 18 : 4,
                        opacity: active === i ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.25 }}
                      className="block h-[3px] rounded-full bg-accent"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={next}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] text-ink-muted transition-all hover:border-accent/40 hover:text-accent"
              >
                <ChevronRight size={13} />
              </button>
            </div>

            {tagline && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="mt-3 max-w-md font-serif text-[11px] italic leading-relaxed text-ink-faint/70"
              >
                {tagline}
              </motion.p>
            )}
          </section>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}