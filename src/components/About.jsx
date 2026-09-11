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

// ─────────────────────────────────────────────────────────
// Hobby data
//
// For each item:
//   - title: name (shown in the big center text)
//   - genre: format "Tag1 · Tag2" — splits into pills automatically
//   - thumb: optional path to an image in /public/hobbies/
//             e.g. "/hobbies/elden-ring.jpg"
//             If missing, a numbered placeholder shows instead.
// ─────────────────────────────────────────────────────────
const HOBBIES = [
  {
    id: "gaming",
    label: "Gaming",
    icon: Gamepad2,
    bigWord: "PLAY",
    state: "Top 10 games",
    tagline: "Games that shaped how I think about systems, difficulty, and reward.",
    items: [
      { title: "Elden Ring", genre: "Action RPG · Soulslike", thumb: "/hobbies/elden-ring.jpg" },
      { title: "The Witcher 3", genre: "Action RPG · Open world", thumb: "/hobbies/witcher-3.jpg" },
      { title: "Hollow Knight", genre: "Metroidvania · Indie", thumb: "/hobbies/hollow-knight.jpg" },
      { title: "Red Dead Redemption 2", genre: "Action Adventure · Open world", thumb: "/hobbies/rdr2.jpg" },
      { title: "God of War: Ragnarök", genre: "Action · Narrative", thumb: "/hobbies/god-of-war.jpg" },
      { title: "Hades", genre: "Roguelike · Action", thumb: "/hobbies/hades.jpg" },
      { title: "Cyberpunk 2077", genre: "Action RPG · Sci-fi", thumb: "/hobbies/cyberpunk.jpg" },
      { title: "Ghost of Tsushima", genre: "Action Adventure · Samurai", thumb: "/hobbies/ghost-of-tsushima.jpg" },
      { title: "Persona 5 Royal", genre: "JRPG · Turn-based", thumb: "/hobbies/persona-5.jpg" },
      { title: "The Last of Us", genre: "Action Adventure · Narrative", thumb: "/hobbies/last-of-us.jpg" },
    ],
  },
  {
    id: "anime",
    label: "Anime",
    icon: Tv,
    bigWord: "WATCH",
    state: "Top 10 anime",
    tagline: "Shows that stuck with me long after the credits.",
    items: [
      { title: "One Piece", genre: "Adventure · Shonen", thumb: "/hobbies/one-piece.jpg" },
      { title: "Gurren Lagann", genre: "Mecha · Action", thumb: "/hobbies/gurren-lagann.jpg" },
      { title: "Attack on Titan", genre: "Action · Dark fantasy", thumb: "/hobbies/aot.jpg" },
      { title: "Fullmetal Alchemist: Brotherhood", genre: "Adventure · Shonen", thumb: "/hobbies/fmab.jpg" },
      { title: "Hunter x Hunter", genre: "Adventure · Shonen", thumb: "/hobbies/hxh.jpg" },
      { title: "Steins;Gate", genre: "Sci-fi · Thriller", thumb: "/hobbies/steins-gate.jpg" },
      { title: "Vinland Saga", genre: "Historical · Drama", thumb: "/hobbies/vinland-saga.jpg" },
      { title: "Mob Psycho 100", genre: "Supernatural · Comedy", thumb: "/hobbies/mob-psycho.jpg" },
      { title: "Jujutsu Kaisen", genre: "Supernatural · Action", thumb: "/hobbies/jjk.jpg" },
      { title: "Cowboy Bebop", genre: "Space Western · Classic", thumb: "/hobbies/cowboy-bebop.jpg" },
    ],
  },
  {
    id: "manga",
    label: "Manga",
    icon: BookOpen,
    bigWord: "READ",
    state: "Top 10 manga",
    tagline: "Panels that taught me pacing, framing, and silence.",
    items: [
      { title: "One Piece", genre: "Adventure · Shonen", thumb: "/hobbies/manga-one-piece.jpg" },
      { title: "Berserk", genre: "Dark fantasy · Seinen", thumb: "/hobbies/berserk.jpg" },
      { title: "Vagabond", genre: "Historical · Seinen", thumb: "/hobbies/vagabond.jpg" },
      { title: "Monster", genre: "Psychological · Thriller", thumb: "/hobbies/monster.jpg" },
      { title: "Vinland Saga", genre: "Historical · Drama", thumb: "/hobbies/manga-vinland-saga.jpg" },
      { title: "Chainsaw Man", genre: "Supernatural · Action", thumb: "/hobbies/chainsaw-man.jpg" },
      { title: "Blame!", genre: "Cyberpunk · Sci-fi", thumb: "/hobbies/blame.jpg" },
      { title: "20th Century Boys", genre: "Mystery · Sci-fi", thumb: "/hobbies/20th-century-boys.jpg" },
      { title: "Oyasumi Punpun", genre: "Slice of life · Psychological", thumb: "/hobbies/punpun.jpg" },
      { title: "Slam Dunk", genre: "Sports · Classic", thumb: "/hobbies/slam-dunk.jpg" },
    ],
  },
  {
    id: "drawing",
    label: "Drawing",
    icon: Palette,
    bigWord: "DRAW",
    state: "Top 10 pieces",
    tagline: "Work I'm proud of — sketchbooks and finished pieces.",
    items: [
      { title: "Piece 01 — placeholder", genre: "Character · Digital", thumb: "/hobbies/drawing-01.jpg" },
      { title: "Piece 02 — placeholder", genre: "Landscape · Ink", thumb: "/hobbies/drawing-02.jpg" },
      { title: "Piece 03 — placeholder", genre: "Portrait · Pencil", thumb: "/hobbies/drawing-03.jpg" },
      { title: "Piece 04 — placeholder", genre: "Concept · Digital", thumb: "/hobbies/drawing-04.jpg" },
      { title: "Piece 05 — placeholder", genre: "Study · Pencil", thumb: "/hobbies/drawing-05.jpg" },
      { title: "Piece 06 — placeholder", genre: "Character · Digital", thumb: "/hobbies/drawing-06.jpg" },
      { title: "Piece 07 — placeholder", genre: "Environment · Digital", thumb: "/hobbies/drawing-07.jpg" },
      { title: "Piece 08 — placeholder", genre: "Sketch · Ink", thumb: "/hobbies/drawing-08.jpg" },
      { title: "Piece 09 — placeholder", genre: "Portrait · Digital", thumb: "/hobbies/drawing-09.jpg" },
      { title: "Piece 10 — placeholder", genre: "Fanart · Digital", thumb: "/hobbies/drawing-10.jpg" },
    ],
  },
  {
    id: "editing",
    label: "Video Editing",
    icon: Video,
    bigWord: "CUT",
    state: "Top 10 edits",
    tagline: "Cuts that taught me timing, rhythm, and pacing.",
    items: [
      { title: "Edit 01 — placeholder", genre: "Montage · Music video", thumb: "/hobbies/edit-01.jpg" },
      { title: "Edit 02 — placeholder", genre: "Trailer · Cinematic", thumb: "/hobbies/edit-02.jpg" },
      { title: "Edit 03 — placeholder", genre: "Vlog · Documentary", thumb: "/hobbies/edit-03.jpg" },
      { title: "Edit 04 — placeholder", genre: "Highlight reel · Gaming", thumb: "/hobbies/edit-04.jpg" },
      { title: "Edit 05 — placeholder", genre: "Tutorial · Screen recording", thumb: "/hobbies/edit-05.jpg" },
      { title: "Edit 06 — placeholder", genre: "Short film · Narrative", thumb: "/hobbies/edit-06.jpg" },
      { title: "Edit 07 — placeholder", genre: "Promo · Commercial", thumb: "/hobbies/edit-07.jpg" },
      { title: "Edit 08 — placeholder", genre: "Montage · Music video", thumb: "/hobbies/edit-08.jpg" },
      { title: "Edit 09 — placeholder", genre: "Recap · Story", thumb: "/hobbies/edit-09.jpg" },
      { title: "Edit 10 — placeholder", genre: "Reel · Social", thumb: "/hobbies/edit-10.jpg" },
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

function HobbyCard({ hobby, onSelect, index }) {
  const { label, icon: Icon } = hobby;

  return (
    <Reveal delay={0.4 + index * 0.06}>
      <motion.button
        type="button"
        onClick={() => onSelect(hobby)}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.5,
          delay: 0.4 + index * 0.06,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          y: -4,
          transition: { type: "spring", stiffness: 400, damping: 20 },
        }}
        className="group relative flex w-full items-center gap-3 overflow-hidden rounded-lg border border-line bg-white/[0.02] px-4 py-3 text-left transition-colors duration-200 hover:border-accent/40 hover:bg-white/[0.04]"
      >
        <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-accent/0 via-accent/[0.06] to-accent/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <motion.span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/[0.04] text-ink-muted transition-colors duration-200 group-hover:bg-accent/10 group-hover:text-accent"
          whileHover={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.4 }}
        >
          <Icon size={15} />
        </motion.span>

        <span className="flex-1 text-sm text-ink-muted transition-colors duration-200 group-hover:text-ink">
          {label}
        </span>

        <ArrowUpRight
          size={14}
          className="text-ink-faint opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100"
        />
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

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            {/* Left — bio */}
            <div className="md:col-span-7">
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
            <div className="md:col-span-5">
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
                    Outside of code
                  </p>
                </div>
              </Reveal>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {HOBBIES.map((hobby, i) => (
                  <HobbyCard
                    key={hobby.id}
                    hobby={hobby}
                    index={i}
                    onSelect={setSelectedHobby}
                  />
                ))}
              </div>

              <Reveal delay={0.9}>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-ink-faint/60">
                  ↑ Click a hobby to see my list
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