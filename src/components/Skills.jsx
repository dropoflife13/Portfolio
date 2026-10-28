import Reveal from "./Reveal";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import { Marquee } from "@/components/ui/marquee";
import { Clapperboard, Video, Cpu, Layers, Server, Wrench } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiThreedotjs,
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

const GROUPS = [
  {
    number: "01",
    title: "Frontend & 3D Interfaces",
    span: "lg:col-span-7",
    icon: Layers,
    blurb:
      "Architecting tactile, 60fps web applications, interactive 3D canvases, and accessible design systems.",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Three.js", icon: SiThreedotjs, color: "#22D3EE" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { name: "shadcn/ui", icon: SiShadcnui, color: "#FFFFFF" },
      { name: "Framer Motion", icon: SiFramer, color: "#FFFFFF" },
      { name: "Radix UI", icon: SiRadixui, color: "#E5E7EB" },
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#1572B6" },
      { name: "Vite", icon: SiVite, color: "#A78BFA" },
    ],
  },
  {
    number: "02",
    title: "Backend & Data Systems",
    span: "lg:col-span-5",
    icon: Server,
    blurb:
      "Designing resilient APIs, append-only data schemas, and real-time persistence layers.",
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
    title: "Tooling & Production Craft",
    span: "lg:col-span-6",
    icon: Wrench,
    blurb:
      "Version control, CI/CD deployment pipelines, interface prototyping, and motion editing.",
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
    title: "Agentic Systems & Governance",
    span: "lg:col-span-6",
    icon: Cpu,
    blurb:
      "Models and runtimes I orchestrate inside my custom 3D Knowledge Engine to enforce strict specification, database, and STRIDE security gates.",
    items: [
      { name: "Claude Code", icon: SiClaude, color: "#D97757" },
      { name: "Anthropic Claude", icon: SiClaude, color: "#D97757" },
      { name: "Google Gemini", icon: SiGooglegemini, color: "#8AB4F8" },
      { name: "OpenAI API", icon: RiOpenaiFill, color: "#74AA9C" },
      { name: "Cursor IDE", icon: SiCursor, color: "#E5E7EB" },
    ],
  },
];

const TOTAL_TOOLS = GROUPS.reduce((n, g) => n + g.items.length, 0);

const ALL_ITEMS = GROUPS.flatMap((g) => g.items);
const ROW_ONE = ALL_ITEMS.filter((_, i) => i % 2 === 0);
const ROW_TWO = ALL_ITEMS.filter((_, i) => i % 2 === 1);

function MarqueeChip({ name, icon: Icon, color }) {
  return (
    <div className="group/chip flex shrink-0 items-center gap-3 rounded-xl border border-white/10 bg-[#070d1f]/80 px-5 py-3 backdrop-blur-md transition-all duration-200 hover:border-cyan-400/50 hover:bg-white/[0.06]">
      <Icon size={20} style={{ color }} aria-hidden="true" />
      <span className="whitespace-nowrap font-mono text-xs font-medium text-ink-muted transition-colors duration-200 group-hover/chip:text-white">
        {name}
      </span>
    </div>
  );
}

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
          <SectionLabel number={5} text="Stack · Bento Matrix" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300/80">
            {`· ${GROUPS.length} domains · ${TOTAL_TOOLS} tools`}
          </span>
        </div>

        <h2 className="mt-6 max-w-2xl text-4xl font-light leading-[1.05] text-ink sm:text-5xl">
          <AnimatedWords text="The stack I engineer with," delay={0.1} />
          <br />
          <AnimatedWords
            text="and the systems I govern."
            delay={0.35}
            className="text-ink-muted"
          />
        </h2>

        {/* Bento Box Grid for the 4 Stack Domains */}
        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {GROUPS.map((group, i) => {
            const GroupIcon = group.icon;
            return (
              <Reveal
                key={group.title}
                delay={0.1 + i * 0.06}
                className={group.span}
              >
                <div
                  data-cursor-interactive="true"
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#070d1f]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/50 hover:shadow-[0_0_32px_rgba(34,211,238,0.14)] sm:p-8"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                          <GroupIcon size={18} />
                        </div>
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/80">
                            Domain {group.number}
                          </span>
                          <h3 className="font-serif text-2xl font-normal text-white">
                            {group.title}
                          </h3>
                        </div>
                      </div>

                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-white/50">
                        {group.items.length} tools
                      </span>
                    </div>

                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
                      {group.blurb}
                    </p>
                  </div>

                  {/* Tool Pills */}
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.07] pt-5">
                    {group.items.map(({ name, icon: Icon, color }) => (
                      <div
                        key={name}
                        className="group/pill flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-white/[0.07]"
                      >
                        <Icon
                          size={15}
                          style={{ color }}
                          className="opacity-85 transition-opacity duration-200 group-hover/pill:opacity-100"
                          aria-hidden="true"
                        />
                        <span className="font-mono text-xs text-white/80 transition-colors duration-200 group-hover/pill:text-white">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Full-bleed dual-row infinite marquee below the Bento Grid */}
      <Reveal delay={0.25}>
        <div className="mt-12 space-y-3" aria-hidden="true">
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
    </section>
  );
}
