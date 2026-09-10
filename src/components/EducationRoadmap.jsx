import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STOPS = [
  {
    id: "elementary",
    title: "Elementary",
    year: "2005 — 2012",
    school: "Ateneo De Iloilo Sta. Maria",
    x: 100,
    y: 260,
    state: "past",
  },
  {
    id: "highschool",
    title: "High School",
    year: "2013 — 2016",
    school: "Colegio Del Sagrado Corazon",
    x: 260,
    y: 180,
    state: "past",
  },
  {
    id: "seniorhigh",
    title: "Senior High",
    year: "2022 — 2023",
    school: "PHINMA University of Iloilo",
    x: 420,
    y: 80,
    state: "past",
  },
  {
    id: "bsit",
    title: "BS Information Technology",
    year: "2023 — 2027",
    school: "PHINMA University of Iloilo",
    x: 580,
    y: 140,
    state: "current",
  },
  {
    id: "future",
    title: "Software Engineer",
    year: "Next",
    school: "The destination",
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

const VB_W = 820;
const VB_H = 320;

function EducationRoadmap() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dotPosition, setDotPosition] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % STOPS.length;

      setDotPosition(nextIndex);

      const arrivalTimer = setTimeout(() => {
        setCurrentIndex(nextIndex);
      }, MOVE_TIME * 1000);

      return () => clearTimeout(arrivalTimer);
    }, HOLD_TIME);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full">
      {/* ROADMAP */}
      <svg
        viewBox={"0 0 " + VB_W + " " + VB_H}
        className="w-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="roadFade"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop
              offset="0%"
              stopColor="#2dd4bf"
              stopOpacity="0.05"
            />

            <stop
              offset="50%"
              stopColor="#2dd4bf"
              stopOpacity="0.15"
            />

            <stop
              offset="100%"
              stopColor="#2dd4bf"
              stopOpacity="0.05"
            />
          </linearGradient>
        </defs>

        {/* Road glow */}
        <path
          d={ROAD_PATH}
          stroke="url(#roadFade)"
          strokeWidth="60"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Outer road */}
        <path
          d={ROAD_PATH}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="20"
          strokeLinecap="round"
        />

        {/* Main road */}
        <path
          d={ROAD_PATH}
          stroke="#0e183b"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Animated center line */}
        <motion.path
          d={ROAD_PATH}
          stroke="#2dd4bf"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="6 10"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{
            once: true,
            margin: "-100px",
          }}
          transition={{
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
          }}
          opacity="0.7"
        />

        {/* ROAD STOPS */}
        {STOPS.map((stop, index) => {
          const isFuture = stop.state === "future";
          const isCurrent = stop.state === "current";
          const isActive = index === currentIndex;

          return (
            <motion.g
              key={stop.id}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
                margin: "-80px",
              }}
              transition={{
                duration: 0.5,
                delay: 0.4 + index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformOrigin:
                  stop.x + "px " + stop.y + "px",
              }}
            >
              {/* FUTURE STOP */}
              {isFuture && (
                <>
                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r="10"
                    fill="#2dd4bf"
                  />

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

              {/* CURRENT STOP */}
              {isCurrent && (
                <>
                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r={isActive ? 15 : 10}
                    fill="rgba(45,212,191,0.2)"
                  />

                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r="6"
                    fill="#2dd4bf"
                  />
                </>
              )}

              {/* PAST STOP */}
              {stop.state === "past" && (
                <>
                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r={isActive ? 12 : 8}
                    fill="#0e183b"
                    stroke={
                      isActive
                        ? "#2dd4bf"
                        : "rgba(255,255,255,0.30)"
                    }
                    strokeWidth="2"
                  />

                  <circle
                    cx={stop.x}
                    cy={stop.y}
                    r="3"
                    fill={
                      isActive
                        ? "#2dd4bf"
                        : "rgba(255,255,255,0.6)"
                    }
                  />
                </>
              )}
            </motion.g>
          );
        })}

        {/* TRAVELING DOT */}
        <motion.circle
          r="6"
          fill="#2dd4bf"
          initial={{
            cx: STOPS[0].x,
            cy: STOPS[0].y,
          }}
          animate={{
            cx: STOPS[dotPosition].x,
            cy: STOPS[dotPosition].y,
          }}
          transition={{
            duration: MOVE_TIME,
            ease: "easeInOut",
          }}
        />

        {/* DOT GLOW */}
        <motion.circle
          r="18"
          fill="rgba(45,212,191,0.15)"
          initial={{
            cx: STOPS[0].x,
            cy: STOPS[0].y,
          }}
          animate={{
            cx: STOPS[dotPosition].x,
            cy: STOPS[dotPosition].y,
          }}
          transition={{
            duration: MOVE_TIME,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* ROAD TOOLTIP */}
      <div className="pointer-events-none absolute inset-0">
        {STOPS.map((stop, index) => {
          const isActive = index === currentIndex;

          if (!isActive) {
            return null;
          }

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
                  "translate(" +
                  horizontalTransform +
                  ", -100%)",
                paddingBottom: "18px",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={stop.id}
                  initial={{
                    opacity: 0,
                    y: 8,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: MOVE_TIME,
                    ease: "easeInOut",
                  }}
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

                  {/* Tooltip pointer */}
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

      {/* CURRENTLY CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.6,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute bottom-8 right-8 w-[280px] rounded-xl border border-accent/20 bg-paperDeep/90 px-5 py-5 shadow-2xl shadow-black/30 backdrop-blur-sm"
      >
        {/* Top-left corner */}
        <span className="absolute left-0 top-0 h-6 w-px bg-accent/60" />

        <span className="absolute left-0 top-0 h-px w-6 bg-accent/60" />

        {/* Bottom-right corner */}
        <span className="absolute bottom-0 right-0 h-6 w-px bg-accent/60" />

        <span className="absolute bottom-0 right-0 h-px w-6 bg-accent/60" />

        {/* Label */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>

          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent">
            Currently
          </p>
        </div>

        {/* Degree */}
        <h3 className="mt-3 font-serif text-xl leading-tight text-ink">
          BS Information Technology
        </h3>

        {/* Year */}
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint">
          2023 — 2027
        </p>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-white/10" />

        {/* School */}
        <p className="text-xs leading-relaxed text-ink-muted">
          PHINMA University of Iloilo
        </p>

        {/* Progress */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-px w-10 bg-accent" />

          <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-ink-faint">
            In progress
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default EducationRoadmap;