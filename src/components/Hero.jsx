import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const CREDENTIALS = [
  { label: "GitHub", href: "https://github.com/dropoflife13", icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/neil-mar-de-asis-b97255337/",
    icon: FaLinkedin,
  },
];

const AGENT_TAGS = [
  {
    code: "SEC",
    role: "Security Agent",
    pos: "top-4 left-4 sm:top-6 sm:left-8",
    delay: 0,
  },
  {
    code: "PM",
    role: "Product Manager",
    pos: "top-2 right-6 sm:top-4 sm:right-10",
    delay: 0.35,
  },
  {
    code: "SD",
    role: "System Design",
    pos: "top-[28%] -left-1 sm:left-2",
    delay: 0.7,
  },
  {
    code: "UX",
    role: "UI/UX Architecture",
    pos: "top-[32%] -right-1 sm:right-2",
    delay: 1.05,
  },
  {
    code: "DB",
    role: "Database Architect",
    pos: "bottom-[26%] left-2 sm:left-6",
    delay: 1.4,
  },
  {
    code: "IR",
    role: "Implementation & Review",
    pos: "bottom-[22%] right-3 sm:right-6",
    delay: 1.75,
  },
  {
    code: "GR",
    role: "Growth & Pitch",
    pos: "bottom-3 left-1/2 -translate-x-1/2",
    delay: 2.1,
  },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Parallax for the wordmark — moves slower than page scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const wordmarkY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pt-28 pb-10 sm:pt-32 sm:pb-12"
    >
      {/* Giant background wordmark */}
      <motion.div
        aria-hidden="true"
        style={{ y: shouldReduceMotion ? 0 : wordmarkY }}
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 select-none text-center"
      >
        <span className="font-serif text-[22vw] font-light leading-none tracking-tightest text-white/[0.025] sm:text-[20vw]">
          NEIL
        </span>
      </motion.div>

      <div className="mx-auto grid w-full max-w-page flex-1 grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left column — The Profile */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:pr-6"
        >
          {/* Compact Avatar + Identity Header */}
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1 rounded-full bg-accent/25 blur-md"
              />
              <img
                src="/profile.jpg"
                alt="Neil Mar De Asis"
                className="relative h-16 w-16 rounded-full border border-white/15 object-cover shadow-lg"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-[#0a1128] bg-cyan-400"
              />
            </div>

            <div>
              <p className="text-base font-medium tracking-tight text-ink">
                Neil Mar De Asis
              </p>
              <p className="label mt-0.5">
                AI Systems &amp; Frontend Developer · Iloilo, PH
              </p>
            </div>
          </div>

          <h1 className="mt-8 text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.03] tracking-tight text-ink">
            Architecting{" "}
            <em className="italic font-normal text-accent">AI-governed</em>{" "}
            software systems.
          </h1>

          <p className="mt-7 max-w-prose text-lg leading-relaxed text-ink-muted">
            I&apos;m Neil. I build 3D knowledge engines and multi-agent
            workflows using Next.js, React, and Gemini.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-medium text-paper transition-colors duration-200 hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
            >
              See selected work
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <a
              href="mailto:neilasis43@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
            >
              neilasis43@gmail.com
            </a>
          </div>

          {/* Credentials */}
          <div className="mt-8 flex items-center gap-3">
            {CREDENTIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right column — The 3D Brain + 7 Floating Agent Tags */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          {/* Ambient radial glow so the 3D brain pops against the deep purple/blue grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 m-auto h-[360px] w-[360px] rounded-full bg-cyan-500/15 blur-[95px] sm:h-[420px] sm:w-[420px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 m-auto h-[260px] w-[260px] rounded-full bg-accent/20 blur-[80px]"
          />

          <div className="relative w-full max-w-[560px]">
            {/* Subtle orbital frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-6 rounded-full border border-white/[0.06] sm:inset-10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-14 rounded-full border border-dashed border-cyan-400/15 sm:inset-20"
            />

            {/* 3D Neural Brain Iframe */}
            <iframe
              src="/synaptic-constellation-brain.html?embed"
              className="relative z-10 h-[500px] w-full border-0"
              title="3D Neural Brain"
              loading="eager"
            />

            {/* 7 Floating Agent Glass Tags */}
            {AGENT_TAGS.map((agent) => (
              <motion.div
                key={agent.code}
                title={agent.role}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  shouldReduceMotion
                    ? { opacity: 1, scale: 1 }
                    : {
                        opacity: 1,
                        scale: 1,
                        y: [0, -6, 0],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0.3 }
                    : {
                        opacity: { duration: 0.4, delay: 0.25 + agent.delay * 0.15 },
                        scale: { duration: 0.4, delay: 0.25 + agent.delay * 0.15 },
                        y: {
                          duration: 3.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: agent.delay,
                        },
                      }
                }
                className={`group absolute z-20 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 backdrop-blur-md transition-all duration-200 hover:border-cyan-400/60 hover:bg-black/80 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] ${agent.pos}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                <span className="font-mono text-xs font-semibold tracking-wider text-white">
                  {agent.code}
                </span>
                <span className="hidden text-[10px] text-white/60 sm:inline">
                  · {agent.role}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="mx-auto mt-8 flex max-w-page items-center justify-center gap-3 text-ink-faint"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.span
          animate={shouldReduceMotion ? { y: 0 } : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex"
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.div>
    </section>
  );
}