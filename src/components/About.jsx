import { useState } from "react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import EducationRoadmap from "./EducationRoadmap";
import HobbyModal from "./HobbyModal";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Gamepad2,
  Tv,
  BookOpen,
  Palette,
  Video,
  Coffee,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// ─────────────────────────────────────────────────────────
// Hobby data (Top 5 curated items per category)
// ─────────────────────────────────────────────────────────
const HOBBIES = [
  {
    id: "gaming",
    label: "Gaming",
    icon: Gamepad2,
    bigWord: "PLAY",
    state: "Top 5 games",
    tagline: "Competitive arenas, survival worlds, and epic hunts that demand mechanical skill and strategy.",
    preview: "Deadlock · LoL · Valorant · Ark · MHW",
    items: [
      { title: "Deadlock", genre: "Hero Shooter · MOBA", thumb: "/hobbies/deadlock.jpg" },
      { title: "League of Legends", genre: "MOBA · Strategy", thumb: "/hobbies/league-of-legends.jpg" },
      { title: "Valorant", genre: "Tactical FPS · Hero Shooter", thumb: "/hobbies/valorant.jpg" },
      { title: "ARK: Survival Evolved", genre: "Survival · Open World", thumb: "/hobbies/ark.jpg" },
      { title: "Monster Hunter: World", genre: "Action RPG · Hunting", thumb: "/hobbies/monster-hunter-world.jpg" },
    ],
  },
  {
    id: "anime",
    label: "Anime",
    icon: Tv,
    bigWord: "WATCH",
    state: "Top 5 anime",
    tagline: "Shows that stuck with me long after the credits.",
    preview: "One Piece · Attack on Titan · FMAB",
    items: [
      { title: "One Piece", genre: "Adventure · Shonen", thumb: "/hobbies/one-piece.jpg" },
      { title: "Attack on Titan", genre: "Action · Dark fantasy", thumb: "/hobbies/aot.jpg" },
      { title: "Fullmetal Alchemist: Brotherhood", genre: "Adventure · Shonen", thumb: "/hobbies/fmab.jpg" },
      { title: "Hunter x Hunter", genre: "Adventure · Shonen", thumb: "/hobbies/hxh.jpg" },
      { title: "Steins;Gate", genre: "Sci-fi · Thriller", thumb: "/hobbies/steins-gate.jpg" },
    ],
  },
  {
    id: "manga",
    label: "Manga",
    icon: BookOpen,
    bigWord: "READ",
    state: "Top 5 manga",
    tagline: "Panels that taught me pacing, framing, and silence.",
    preview: "One Piece · Berserk · Vagabond",
    items: [
      { title: "One Piece", genre: "Adventure · Shonen", thumb: "/hobbies/manga-one-piece.jpg" },
      { title: "Berserk", genre: "Dark fantasy · Seinen", thumb: "/hobbies/berserk.jpg" },
      { title: "Vagabond", genre: "Historical · Seinen", thumb: "/hobbies/vagabond.jpg" },
      { title: "Monster", genre: "Psychological · Thriller", thumb: "/hobbies/monster.jpg" },
      { title: "20th Century Boys", genre: "Mystery · Sci-fi", thumb: "/hobbies/20th-century-boys.jpg" },
    ],
  },
  {
    id: "drawing",
    label: "Drawing",
    icon: Palette,
    bigWord: "DRAW",
    state: "Top 5 pieces",
    tagline: "Work I'm proud of — sketchbooks and finished pieces.",
    preview: "Digital art · Ink · Concept sketches",
    items: [
      { title: "Piece 01 — Character Study", genre: "Character · Digital", thumb: "/hobbies/drawing-01.jpg" },
      { title: "Piece 02 — Landscape & Mood", genre: "Landscape · Ink", thumb: "/hobbies/drawing-02.jpg" },
      { title: "Piece 03 — Portrait Work", genre: "Portrait · Pencil", thumb: "/hobbies/drawing-03.jpg" },
      { title: "Piece 04 — Concept Exploration", genre: "Concept · Digital", thumb: "/hobbies/drawing-04.jpg" },
      { title: "Piece 05 — Anatomy Study", genre: "Study · Pencil", thumb: "/hobbies/drawing-05.jpg" },
    ],
  },
  {
    id: "editing",
    label: "Video Editing",
    icon: Video,
    bigWord: "CUT",
    state: "Top 5 edits",
    tagline: "Cuts that taught me timing, rhythm, and pacing.",
    preview: "Montages · Cinematic trailers · Recaps",
    items: [
      { title: "Edit 01 — Rhythm & Pace", genre: "Montage · Music video", thumb: "/hobbies/edit-01.jpg" },
      { title: "Edit 02 — Cinematic Trailer", genre: "Trailer · Cinematic", thumb: "/hobbies/edit-02.jpg" },
      { title: "Edit 03 — Narrative Vlog", genre: "Vlog · Documentary", thumb: "/hobbies/edit-03.jpg" },
      { title: "Edit 04 — Highlight Reel", genre: "Highlight reel · Gaming", thumb: "/hobbies/edit-04.jpg" },
      { title: "Edit 05 — Short Film Cut", genre: "Short film · Narrative", thumb: "/hobbies/edit-05.jpg" },
    ],
  },
];

function AnimatedWords({ text, delay = 0, className = "" }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </span>
  );
}

function HobbyCard({ hobby, onSelect, index, isLast }) {
  const { label, icon: Icon, preview } = hobby;

  return (
    <Reveal
      delay={0.35 + index * 0.05}
      className={isLast ? "sm:col-span-2" : ""}
    >
      <motion.button
        type="button"
        onClick={() => onSelect(hobby)}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.5,
          delay: 0.35 + index * 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          y: -4,
          transition: { type: "spring", stiffness: 400, damping: 20 },
        }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex w-full flex-col justify-between overflow-hidden rounded-xl border border-line bg-white/[0.02] p-5 text-left transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.04] hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
      >
        <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-accent/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="flex w-full items-center justify-between">
          <motion.div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-ink-muted transition-colors duration-200 group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:text-accent"
            whileHover={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Icon size={18} />
          </motion.div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="border-line font-mono text-[9px] uppercase tracking-wider text-accent/90 group-hover:border-accent/40"
            >
              Top 5
            </Badge>
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] text-ink-faint transition-all duration-200 group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent">
              <ArrowUpRight
                size={13}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-serif text-lg font-normal text-ink transition-colors group-hover:text-white sm:text-xl">
            {label}
          </h4>
          <p className="mt-1 line-clamp-1 font-mono text-xs text-ink-faint transition-colors duration-200 group-hover:text-ink-muted">
            {preview}
          </p>
        </div>
      </motion.button>
    </Reveal>
  );
}

export default function About() {
  const [selectedHobby, setSelectedHobby] = useState(null);

  return (
    <>
      <section id="about" className="relative px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-page">
          <SectionLabel number={1} text="About" />

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left — bio */}
            <div className="lg:col-span-5">
              <h2 className="section-heading max-w-xl">
                <AnimatedWords text="A bit about me." delay={0.05} />
              </h2>

              <Reveal delay={0.25}>
                <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-3 py-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_6px_rgba(45,212,191,0.6)]" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                    Currently · 4th year BSIT
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-muted sm:text-lg">
                  I'm a frontend developer who enjoys turning ideas into
                  interfaces people actually want to use. I care about the
                  small details — spacing, motion, load time — because that's
                  what separates a functional page from a good one.
                </p>
              </Reveal>

              <Reveal delay={0.35}>
                <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-muted sm:text-lg">
                  Outside of code, I'm usually reading about design systems or
                  tinkering with side projects.
                </p>
              </Reveal>
            </div>

            {/* Right — hobbies */}
            <div className="lg:col-span-7">
              <Reveal delay={0.3}>
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut",
                    }}
                    className="inline-flex"
                  >
                    <Coffee size={16} className="text-accent" />
                  </motion.span>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                    Outside of code · Favorites
                  </p>
                </div>
              </Reveal>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {HOBBIES.map((hobby, i) => (
                  <HobbyCard
                    key={hobby.id}
                    hobby={hobby}
                    index={i}
                    isLast={i === HOBBIES.length - 1}
                    onSelect={setSelectedHobby}
                  />
                ))}
              </div>

              <Reveal delay={0.7}>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-ink-faint/60">
                  ↑ Click a hobby to explore my curated Top 5
                </p>
              </Reveal>
            </div>
          </div>

          {/* Education roadmap */}
          <div className="mt-20">
            <Reveal delay={0.15}>
              <div className="flex items-center gap-2">
                <GraduationCap size={18} className="text-accent" />
                <h3 className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                  Education
                </h3>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8">
                <EducationRoadmap />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {selectedHobby && (
        <HobbyModal
          hobby={selectedHobby}
          onClose={() => setSelectedHobby(null)}
        />
      )}
    </>
  );
}