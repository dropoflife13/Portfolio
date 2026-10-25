import Reveal from "./Reveal";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { Marquee } from "@/components/ui/marquee";
import { Clapperboard, Video } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiShadcnui,
  SiFramer,
  SiRadixui,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiSupabase,
  SiMongodb,
  SiMysql,
  SiPhp,
  SiPython,
  SiFirebase,
  SiGit,
  SiGithub,
  SiVercel,
  SiFigma,
  SiPostman,
  SiNpm,
  SiClaude,
  SiCursor,
  SiGooglegemini,
} from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";

// `color` is the brand colour — used for the icon in the marquee and on hover.
// Dark brand colours (Next.js, Vercel, GitHub, Express, Radix, Cursor) are
// lightened so they stay readable on the navy background.
const GROUPS = [
  {
    number: "01",
    title: "Frontend",
    blurb: "Where I'm strongest — the layer I ship most often.",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#38BDF8" },
      { name: "shadcn/ui", icon: SiShadcnui, color: "#FFFFFF" },
      { name: "Framer Motion", icon: SiFramer, color: "#FFFFFF" },
      { name: "Radix UI", icon: SiRadixui, color: "#E5E7EB" },
      { name: "HTML", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS", icon: SiCss, color: "#1572B6" },
      { name: "Vite", icon: SiVite, color: "#A78BFA" },
    ],
  },
  {
    number: "02",
    title: "Backend & Data",
    blurb: "Where I'm leveling up — currently building real projects.",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express", icon: SiExpress, color: "#E5E7EB" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4F8FC7" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "PHP", icon: SiPhp, color: "#8892BF" },
      { name: "Python", icon: SiPython, color: "#FFD43B" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    ],
  },
  {
    number: "03",
    title: "Tools & Craft",
    blurb: "How I move from an idea to something shipped.",
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "npm", icon: SiNpm, color: "#CB3837" },
      { name: "Premiere", icon: Clapperboard, color: "#9999FF" },
      { name: "CapCut", icon: Video, color: "#FFFFFF" },
    ],
  },
  {
    number: "04",
    title: "AI in Practice",
    blurb:
      "Not a shortcut — a second opinion. I use AI for code review, unfamiliar APIs, and catching my own assumptions before I ship.",
    items: [
      { name: "Claude Code", icon: SiClaude, color: "#D97757" },
      { name: "Claude", icon: SiClaude, color: "#D97757" },
      { name: "ChatGPT", icon: RiOpenaiFill, color: "#74AA9C" },
      { name: "Gemini", icon: SiGooglegemini, color: "#8AB4F8" },
      { name: "Cursor", icon: SiCursor, color: "#E5E7EB" },
    ],
  },
];

const TOTAL_TOOLS = GROUPS.reduce((n, g) => n + g.items.length, 0);

// Two marquee rows, split so each row mixes groups and the rows move in
// opposite directions.
const ALL_ITEMS = GROUPS.flatMap((g) => g.items);
const ROW_ONE = ALL_ITEMS.filter((_, i) => i % 2 === 0);
const ROW_TWO = ALL_ITEMS.filter((_, i) => i % 2 === 1);

function MarqueeChip({ name, icon: Icon, color }) {
  return (
    <div className="group/chip flex shrink-0 items-center gap-3 rounded-xl border border-line bg-white/[0.03] px-5 py-3 backdrop-blur-sm transition-all duration-200 hover:border-accent/40 hover:bg-white/[0.06]">
      <Icon size={22} style={{ color }} aria-hidden="true" />
      <span className="whitespace-nowrap text-sm font-medium text-ink-muted transition-colors duration-200 group-hover/chip:text-ink">
        {name}
      </span>
    </div>
  );
}

// Word-by-word fade for the headline
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

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-page">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3">
          <SectionLabel number={4} text="Stack" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            {`· ${GROUPS.length} groups · ${TOTAL_TOOLS} tools`}
          </span>
        </div>

        <h2 className="mt-6 max-w-2xl text-4xl font-light leading-[1.05] text-ink sm:text-5xl">
          <AnimatedWords text="What I work with," delay={0.1} />
          <br />
          <AnimatedWords
            text="and where I'm headed."
            delay={0.35}
            className="text-ink-muted"
          />
        </h2>
      </div>

      {/* Marquee — full-bleed, two rows moving in opposite directions */}
      <Reveal delay={0.2}>
        <div className="mt-14 space-y-4" aria-hidden="true">
          <Marquee className="[--duration:45s]" repeat={3}>
            {ROW_ONE.map((item) => (
              <MarqueeChip key={item.name} {...item} />
            ))}
          </Marquee>
          <Marquee reverse className="[--duration:50s]" repeat={3}>
            {ROW_TWO.map((item) => (
              <MarqueeChip key={item.name} {...item} />
            ))}
          </Marquee>
        </div>
      </Reveal>

      <div className="mx-auto max-w-page">
        {/* Groups */}
        <div className="mt-20 space-y-16">
          {GROUPS.map((group, i) => (
            <Reveal key={group.title} delay={0.1 + i * 0.05}>
              <div className="relative">
                {/* Thin teal divider — full width, above each group */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mb-8 h-px w-full origin-left bg-gradient-to-r from-accent/40 via-accent/10 to-transparent"
                />

                <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-12">
                  {/* Left: number + title + blurb */}
                  <div className="group/row md:col-span-5">
                    <div className="flex items-start gap-6">
                      <span className="font-serif text-4xl font-light leading-none text-white/15 transition-colors duration-500 group-hover/row:text-accent/60 sm:text-5xl">
                        {group.number}
                      </span>
                      <div className="pt-1">
                        <h3 className="font-serif text-2xl font-normal text-ink sm:text-3xl">
                          {group.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                          {group.blurb}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: pills, staggered */}
                  <div className="md:col-span-7">
                    <div className="flex flex-wrap gap-2.5">
                      {group.items.map(({ name, icon: Icon, color }, j) => (
                        <motion.div
                          key={name}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{
                            duration: 0.35,
                            delay: 0.15 + i * 0.04 + j * 0.04,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="group/pill flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-4 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white/[0.04]"
                        >
                          <Icon
                            size={16}
                            style={{ color }}
                            className="opacity-70 transition-opacity duration-200 group-hover/pill:opacity-100"
                            aria-hidden="true"
                          />
                          <span className="text-sm text-ink-muted transition-colors duration-200 group-hover/pill:text-ink">
                            {name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
