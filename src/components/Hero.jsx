import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Globe,
  Sparkles,
  Download,
  Cpu,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiThreedotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
  SiMongodb,
  SiFramer,
  SiShadcnui,
  SiVercel,
  SiGit,
  SiFigma,
} from "react-icons/si";
import { Marquee } from "@/components/ui/marquee";

const CREDENTIALS = [
  { label: "GitHub", href: "https://github.com/dropoflife13", icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/neil-mar-de-asis-b97255337/",
    icon: FaLinkedin,
  },
];

const CORE_STACK = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Three.js", icon: SiThreedotjs, color: "#22D3EE" },
];

const HERO_MARQUEE_SKILLS = [
  { name: "React 19", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Three.js / WebGL", icon: SiThreedotjs, color: "#22D3EE" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Framer Motion", icon: SiFramer, color: "#FFFFFF" },
  { name: "shadcn/ui", icon: SiShadcnui, color: "#FFFFFF" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4F8FC7" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

const BENTO_TILE_BASE =
  "group relative overflow-hidden rounded-2xl border border-white/10 bg-[#070d1f]/75 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400/50 hover:shadow-[0_0_32px_rgba(34,211,238,0.14)]";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const iframeRef = useRef(null);
  const [modelReady, setModelReady] = useState(false);
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Manila",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setLocalTime(formatted);
      } catch {
        setLocalTime("UTC+8");
      }
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  const downloadModel = () => {
    const btn = iframeRef.current?.contentDocument?.getElementById("dl");
    btn?.click();
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16"
    >
      <div className="mx-auto max-w-page">
        {/* Top status bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 flex flex-wrap items-center justify-between gap-3 px-1"
        >
          <div className="flex items-center gap-3">
            <img
              src="/profile.jpg"
              alt="Neil Mar De Asis"
              className="h-9 w-9 rounded-full border border-cyan-400/40 object-cover shadow-[0_0_12px_rgba(34,211,238,0.25)]"
            />
            <div>
              <p className="text-sm font-medium tracking-tight text-white">
                Neil Mar De Asis
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300/80">
                Full-Stack Developer &amp; Systems Architect
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/75">
              Neural Cortex v2.4 · Online
            </span>
          </div>
        </motion.div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Tile 1 (Large, spans 2 cols, 2 rows): The 3D Brain iframe */}
          <motion.div
            data-cursor-interactive="true"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className={`${BENTO_TILE_BASE} flex min-h-[420px] flex-col justify-between md:col-span-2 lg:col-span-2 lg:row-span-2 lg:min-h-[500px]`}
          >
            {/* Ambient radial glow behind the 3D Brain */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 m-auto h-72 w-72 rounded-full bg-cyan-500/15 blur-[90px] transition-opacity duration-300 group-hover:opacity-100"
            />

            {/* Top bar inside Tile 1 */}
            <div className="relative z-20 flex items-center justify-between border-b border-white/[0.07] bg-black/40 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-cyan-400" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-white/80">
                  synaptic-constellation.webgl
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={downloadModel}
                  disabled={!modelReady}
                  title="Download 3D Brain (.glb)"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-white/70 transition-colors hover:border-cyan-400/50 hover:text-cyan-300 disabled:opacity-40"
                >
                  <Download size={11} />
                  .GLB
                </button>
              </div>
            </div>

            {/* 3D Brain Iframe */}
            <div className="relative flex-1">
              <iframe
                ref={iframeRef}
                src="/synaptic-constellation-brain.html?embed"
                className="h-full min-h-[340px] w-full border-0 lg:min-h-[400px]"
                title="3D Neural Brain"
                loading="eager"
                onLoad={() => setModelReady(true)}
              />
            </div>

            {/* Required Caption Footer */}
            <div className="relative z-20 flex items-center justify-between gap-2 border-t border-white/[0.08] bg-black/60 px-4 py-3 backdrop-blur-md">
              <p className="font-mono text-xs text-cyan-200/90">
                ↳ The 3D Neural Cortex. Built from scratch to govern my
                architecture.
              </p>
              <span className="hidden shrink-0 rounded border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 font-mono text-[10px] text-cyan-300 sm:inline-block">
                Interactive 3D
              </span>
            </div>
          </motion.div>

          {/* Tile 2 (Large, spans 2 cols): The Intro Text */}
          <motion.div
            data-cursor-interactive="true"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`${BENTO_TILE_BASE} flex flex-col justify-between p-6 sm:p-8 md:col-span-2 lg:col-span-2`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
            />

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] px-3 py-1">
                <Sparkles size={12} className="text-cyan-300" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-200">
                  Architecture · Systems · Craft
                </span>
              </div>

              <h1 className="mt-5 text-[clamp(2rem,4vw,3.35rem)] font-light leading-[1.06] tracking-tight text-white">
                I engineer software that{" "}
                <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-sky-400 bg-clip-text font-normal italic text-transparent">
                  feels finished.
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted sm:text-base">
                I&apos;m Neil, a full-stack developer specializing in React,
                Next.js, and system architecture. I care deeply about clean code
                and human-centered design. To keep my workflow strict, I built a
                custom 3D Knowledge Engine.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="group/btn inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-semibold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-200 hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  Explore Selected Work
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                  />
                </a>

                <a
                  href="#factory"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 font-mono text-xs text-white/85 transition-colors hover:border-cyan-400/50 hover:bg-white/[0.07] hover:text-cyan-200"
                >
                  Inspect CLI Factory
                </a>
              </div>

              <div className="flex items-center gap-2">
                {CREDENTIALS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-ink-muted transition-colors duration-200 hover:border-cyan-400/50 hover:text-cyan-300"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tile 3 (Small): "Currently based in Iloilo, PH" with a globe icon */}
          <motion.div
            data-cursor-interactive="true"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={`${BENTO_TILE_BASE} flex flex-col justify-between p-6`}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                <motion.div
                  animate={shouldReduceMotion ? {} : { rotate: 360 }}
                  transition={{
                    duration: 24,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Globe size={20} />
                </motion.div>
              </div>

              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                Available
              </span>
            </div>

            <div className="mt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                Location · Base
              </p>
              <h2 className="mt-1.5 font-serif text-xl font-normal text-white">
                Currently based in Iloilo, PH
              </h2>
              <p className="mt-2 font-mono text-xs text-cyan-300/80">
                10.7202° N, 122.5621° E {localTime ? `· ${localTime}` : ""}
              </p>
            </div>
          </motion.div>

          {/* Tile 4 (Small): "Tech Stack" showing 4 mini icons (React, Next.js, TypeScript, Three.js) */}
          <motion.div
            data-cursor-interactive="true"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className={`${BENTO_TILE_BASE} flex flex-col justify-between p-6`}
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                Primary Engine
              </p>
              <span className="font-mono text-[10px] text-cyan-300/90">
                04 Core
              </span>
            </div>

            <div className="my-4">
              <h2 className="font-serif text-xl font-normal text-white">
                Tech Stack
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {CORE_STACK.map(({ name, icon: Icon, color }) => (
                  <div
                    key={name}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 transition-colors duration-200 group-hover:border-white/15 hover:!border-cyan-400/50 hover:bg-white/[0.07]"
                  >
                    <Icon size={16} style={{ color }} className="shrink-0" />
                    <span className="truncate font-mono text-xs text-white/85">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#skills"
              className="inline-flex items-center gap-1 font-mono text-[11px] text-cyan-300/80 transition-colors hover:text-cyan-200"
            >
              View full 37-tool matrix <ArrowUpRight size={12} />
            </a>
          </motion.div>

          {/* Tile 5 (Wide): Horizontal marquee of top skills scrolling infinitely */}
          <motion.div
            data-cursor-interactive="true"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`${BENTO_TILE_BASE} flex flex-col justify-center px-5 py-4 md:col-span-2 lg:col-span-4`}
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300/80">
                Production Capabilities · Continuous Stream
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                Full-Stack · 3D · Architecture
              </span>
            </div>

            <Marquee className="[--duration:34s] py-1" repeat={3}>
              {HERO_MARQUEE_SKILLS.map(({ name, icon: Icon, color }) => (
                <div
                  key={name}
                  className="flex shrink-0 items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 transition-colors duration-200 hover:border-cyan-400/40 hover:bg-white/[0.07]"
                >
                  <Icon size={16} style={{ color }} aria-hidden="true" />
                  <span className="whitespace-nowrap font-mono text-xs font-medium text-white/85">
                    {name}
                  </span>
                </div>
              ))}
            </Marquee>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
