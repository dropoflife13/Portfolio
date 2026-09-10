import Reveal from "./Reveal";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import {
  Video,
  Clapperboard,
  Sparkles,
  Bot,
  Terminal,
  MessageCircle,
} from "lucide-react";
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiGit,
  SiNodedotjs,
  SiFigma,
  SiVite,
  SiFirebase,
  SiPhp,
  SiPython,
  SiMysql,
  SiMongodb,
  SiVercel,
} from "react-icons/si";

const GROUPS = [
  {
    number: "01",
    title: "Frontend",
    blurb: "Where I'm strongest — the layer I ship most often.",
    items: [
      { name: "React", icon: SiReact },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
      { name: "Vite", icon: SiVite },
    ],
  },
  {
    number: "02",
    title: "Backend & Data",
    blurb: "Where I'm leveling up — currently building real projects.",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "MongoDB", icon: SiMongodb },
      { name: "MySQL", icon: SiMysql },
      { name: "PHP", icon: SiPhp },
      { name: "Python", icon: SiPython },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    number: "03",
    title: "Tools & Craft",
    blurb: "How I move from an idea to something shipped.",
    items: [
      { name: "Git", icon: SiGit },
      { name: "Figma", icon: SiFigma },
      { name: "Vercel", icon: SiVercel },
      { name: "Premiere", icon: Clapperboard },
      { name: "CapCut", icon: Video },
    ],
  },
  {
    number: "04",
    title: "AI in Practice",
    blurb:
      "Not a shortcut — a second opinion. I use AI for code review, unfamiliar APIs, and catching my own assumptions before I ship.",
    items: [
      { name: "Claude Code", icon: Sparkles },
      { name: "Claude", icon: Bot },
      { name: "ChatGPT", icon: MessageCircle },
      { name: "Cursor", icon: Terminal },
    ],
  },
];

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
    {"· 4 groups · 21 tools"}
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
                      {group.items.map(({ name, icon: Icon }, j) => (
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
                            className="text-ink-muted transition-colors duration-200 group-hover/pill:text-accent"
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