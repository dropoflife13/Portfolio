import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STOPS = [
  {
    id: "elementary",
    title: "Elementary",
    year: "2005 — 2012",
    school: "Ateneo De Iloilo Sta. Maria",
    image: "/education/elementary.jpg",
    x: 100,
    y: 260,
    state: "past",
  },
  {
    id: "highschool",
    title: "High School",
    year: "2013 — 2016",
    school: "Colegio Del Sagrado Corazon",
    image: "/education/highschool.jpg",
    x: 260,
    y: 180,
    state: "past",
  },
  {
    id: "seniorhigh",
    title: "Senior High",
    year: "2022 — 2023",
    school: "PHINMA University of Iloilo",
    image: "/education/seniorhigh.jpg",
    x: 420,
    y: 80,
    state: "past",
  },
  {
    id: "bsit",
    title: "BS Information Technology",
    year: "2023 — 2027",
    school: "PHINMA University of Iloilo",
    image: "/education/bsit.jpg",
    x: 580,
    y: 140,
    state: "current",
  },
  {
    id: "future",
    title: "Software Engineer",
    year: "Next",
    school: "The destination",
    image: "/education/future.jpg",
    x: 720,
    y: 40,
    state: "future",
  },
];

const ROAD_PATH =
  "M 100 260 C 180 260, 200 180, 260 180 " +
  "C 340 180, 340 80, 420 80 " +
  "C 500 80, 500 140, 580 140 " +
  "C 660 140, 660 40, 720 40";

const HOLD_TIME = 5000;
const MOVE_TIME = 1.2;
const RESUME_DELAY = 8000; // ms to wait after manual interaction before resuming auto-advance
const VB_W = 820;
const VB_H = 320;

export default function EducationRoadmap() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dotPosition, setDotPosition] = useState(0);
  const [imageError, setImageError] = useState({});
  const [paused, setPaused] = useState(false);
  const resumeTimerRef = useRef(null);

  // Auto-advance — but only when not paused
  useEffect(() => {
    if (paused) return;

    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % STOPS.length;
      setDotPosition(nextIndex);

      const arrivalTimer = setTimeout(() => {
        setCurrentIndex(nextIndex);
      }, MOVE_TIME * 1000);

      return () => clearTimeout(arrivalTimer);
    }, HOLD_TIME);

    return () => clearTimeout(timer);
  }, [currentIndex, paused]);

  // Cleanup resume timer on unmount
  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  // Jump to a specific stop manually
  const goTo = (index) => {
    if (index === currentIndex) return;

    // Pause auto-advance
    setPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);

    // Move the dot
    setDotPosition(index);

    // After travel time, update the active stop
    const arrivalTimer = setTimeout(() => {
      setCurrentIndex(index);
    }, MOVE_TIME * 1000);

    // Resume auto-advance after a delay
    resumeTimerRef.current = setTimeout(() => {
      setPaused(false);
    }, RESUME_DELAY);

    return () => clearTimeout(arrivalTimer);
  };

  const activeStop = STOPS[currentIndex];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
      {/* ─────────── LEFT: Image carousel ─────────── */}
      <div className="order-2 lg:order-1 lg:col-span-5">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-line bg-paperDeep">
          <div className="pointer-events-none absolute top-0 left-0 z-30 h-8 w-8 border-t border-l border-accent/40" />
          <div className="pointer-events-none absolute right-0 bottom-0 z-30 h-8 w-8 border-r border-b border-accent/40" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStop.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              {!imageError[activeStop.id] ? (
                <img
                  src={activeStop.image}
                  alt={activeStop.title}
                  onError={() =>
                    setImageError((prev) => ({
                      ...prev,
                      [activeStop.id]: true,
                    }))
                  }
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-paperDeep to-[#0a1128] p-8 text-center">
                  <div className="h-16 w-16 rounded-full border border-accent/30 bg-accent/5" />
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                    Add photo
                  </p>
                  <p className="mt-3 font-serif text-2xl text-ink-muted">
                    {activeStop.title}
                  </p>
                  <p className="mt-2 font-mono text-[10px] tracking-widest text-ink-faint/60">
                    public{activeStop.image}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Gradient scrim */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-paperDeep via-paperDeep/60 to-transparent" />

          {/* Info overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStop.id + "-info"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    {activeStop.state === "current" && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    )}
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    {activeStop.state === "future"
                      ? "Destination"
                      : activeStop.state === "current"
                      ? "Currently"
                      : "Past"}
                  </p>
                </div>

                <h3 className="mt-2 font-serif text-xl leading-tight text-ink">
                  {activeStop.title}
                </h3>

                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint">
                  {activeStop.year}
                </p>

                <p className="mt-1 text-xs leading-snug text-ink-muted">
                  {activeStop.school}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Clickable progress dots */}
          <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
            {STOPS.map((stop, i) => (
              <button
                key={stop.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={"Go to " + stop.title}
                className="group flex h-4 items-center px-0.5"
              >
                <span
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-6 bg-accent"
                      : "w-2 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Paused indicator */}
          <AnimatePresence>
            {paused && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="absolute top-4 left-4 z-30 flex items-center gap-1.5 rounded-full border border-accent/30 bg-paperDeep/90 px-2.5 py-1 backdrop-blur-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-accent">
                  Paused
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ─────────── RIGHT: Roadmap ─────────── */}
      <div className="order-1 lg:order-2 lg:col-span-7">
        <div className="relative w-full">
          <svg
            viewBox={"0 0 " + VB_W + " " + VB_H}
            className="w-full"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="roadFade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            <path
              d={ROAD_PATH}
              stroke="url(#roadFade)"
              strokeWidth="60"
              strokeLinecap="round"
              opacity="0.5"
            />

            <path
              d={ROAD_PATH}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="20"
              strokeLinecap="round"
            />

            <path
              d={ROAD_PATH}
              stroke="#0e183b"
              strokeWidth="16"
              strokeLinecap="round"
            />

            <motion.path
              d={ROAD_PATH}
              stroke="#2dd4bf"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="6 10"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              opacity="0.7"
            />

            {/* Clickable stops */}
            {STOPS.map((stop, index) => {
              const isFuture = stop.state === "future";
              const isCurrent = stop.state === "current";
              const isActive = index === currentIndex;

              return (
                <motion.g
                  key={stop.id}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    transformOrigin: stop.x + "px " + stop.y + "px",
                    cursor: "pointer",
                  }}
                  onClick={() => goTo(index)}
                  role="button"
                  aria-label={"Go to " + stop.title}
                >
                  {/* Large invisible hit area for easier clicking */}
                  <circle cx={stop.x} cy={stop.y} r="26" fill="transparent" />

                  {isFuture && (
                    <>
                      <circle cx={stop.x} cy={stop.y} r="10" fill="#2dd4bf" />
                      <circle
                        cx={stop.x}
                        cy={stop.y}
                        r={isActive ? 22 : 16}
                        fill="none"
                        stroke="#2dd4bf"
                        strokeWidth="1"
                        opacity={isActive ? 0.9 : 0.4}
                      />
                    </>
                  )}

                  {isCurrent && (
                    <>
                      <circle
                        cx={stop.x}
                        cy={stop.y}
                        r={isActive ? 15 : 10}
                        fill="rgba(45,212,191,0.2)"
                      />
                      <circle cx={stop.x} cy={stop.y} r="6" fill="#2dd4bf" />
                    </>
                  )}

                  {stop.state === "past" && (
                    <>
                      <circle
                        cx={stop.x}
                        cy={stop.y}
                        r={isActive ? 12 : 8}
                        fill="#0e183b"
                        stroke={
                          isActive ? "#2dd4bf" : "rgba(255,255,255,0.30)"
                        }
                        strokeWidth="2"
                      />
                      <circle
                        cx={stop.x}
                        cy={stop.y}
                        r="3"
                        fill={isActive ? "#2dd4bf" : "rgba(255,255,255,0.6)"}
                      />
                    </>
                  )}
                </motion.g>
              );
            })}

            {/* Traveling dot */}
            <motion.circle
              r="6"
              fill="#2dd4bf"
              initial={{ cx: STOPS[0].x, cy: STOPS[0].y }}
              animate={{
                cx: STOPS[dotPosition].x,
                cy: STOPS[dotPosition].y,
              }}
              transition={{ duration: MOVE_TIME, ease: "easeInOut" }}
            />

            <motion.circle
              r="18"
              fill="rgba(45,212,191,0.15)"
              initial={{ cx: STOPS[0].x, cy: STOPS[0].y }}
              animate={{
                cx: STOPS[dotPosition].x,
                cy: STOPS[dotPosition].y,
              }}
              transition={{ duration: MOVE_TIME, ease: "easeInOut" }}
            />
          </svg>

          {/* Tooltip */}
          <div className="pointer-events-none absolute inset-0">
            {STOPS.map((stop, index) => {
              const isActive = index === currentIndex;
              if (!isActive) return null;

              const leftPct = (stop.x / VB_W) * 100;
              const topPct = (stop.y / VB_H) * 100;

              const isLeftEdge = stop.x < 180;
              const isRightEdge = stop.x > 650;

              let horizontalTransform = "-50%";
              let pointerPosition = "50%";

              if (isLeftEdge) {
                horizontalTransform = "0%";
                pointerPosition = "15%";
              }

              if (isRightEdge) {
                horizontalTransform = "-100%";
                pointerPosition = "85%";
              }

              return (
                <div
                  key={stop.id}
                  className="absolute"
                  style={{
                    left: leftPct + "%",
                    top: topPct + "%",
                    transform:
                      "translate(" + horizontalTransform + ", -100%)",
                    paddingBottom: "18px",
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={stop.id}
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: MOVE_TIME, ease: "easeInOut" }}
                      className="relative w-max max-w-[220px] rounded-lg border border-accent/30 bg-paperDeep px-4 py-3 shadow-xl shadow-black/40"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                          {stop.state === "current" && (
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                          )}
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                        </span>
                        <p className="font-mono text-[9px] uppercase tracking-widest text-accent">
                          {stop.state === "future"
                            ? "Destination"
                            : stop.state === "current"
                            ? "Currently"
                            : "Past"}
                        </p>
                      </div>

                      <p className="mt-2 font-serif text-sm font-normal leading-tight text-ink">
                        {stop.title}
                      </p>

                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                        {stop.year}
                      </p>

                      <p className="mt-2 text-xs leading-snug text-ink-muted">
                        {stop.school}
                      </p>

                      <div
                        className="absolute -bottom-1.5 h-3 w-3 rotate-45 border-r border-b border-accent/30 bg-paperDeep"
                        style={{
                          left: pointerPosition,
                          transform: "translateX(-50%)",
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}