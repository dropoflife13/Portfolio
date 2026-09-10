import { motion, useScroll, useTransform } from "framer-motion";
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

export default function Hero() {
  const sectionRef = useRef(null);

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
      className="relative overflow-hidden px-6 pt-28 pb-8 sm:pt-32 sm:pb-12"
    >
      {/* Giant background wordmark */}
      <motion.div
        aria-hidden="true"
        style={{ y: wordmarkY }}
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 select-none text-center"
      >
        <span className="font-serif text-[22vw] font-light leading-none tracking-tightest text-white/[0.025] sm:text-[20vw]">
          NEIL
        </span>
      </motion.div>

      <div className="mx-auto grid max-w-page grid-cols-1 items-center gap-14 md:grid-cols-12 md:gap-12">
        {/* Left column */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-7 md:pr-12"
        >
          <p className="label">Frontend developer · Iloilo, PH</p>

          <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.02] text-ink">
            I build interfaces
            <br />
            that feel{" "}
            <em className="italic font-normal text-accent">finished</em>.
          </h1>

          <p className="mt-8 max-w-prose text-lg leading-relaxed text-ink-muted">
            I'm Neil — a frontend developer working mostly in React and
            Tailwind. Currently leveling up into full-stack with Next.js and
            MongoDB, and building things that hold up under real use, not
            just in a demo.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 text-sm font-medium text-paper transition-colors duration-200 hover:bg-accent-soft"
            >
              See selected work
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <a
              href="mailto:neilasis43@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
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
                className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right column — avatar + status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6 md:col-span-5 md:items-end"
        >
          <div className="relative h-[220px] w-[220px] sm:h-[260px] sm:w-[260px] md:h-[280px] md:w-[280px]">
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent/20 blur-3xl" />
            <img
              src="/profile.jpg"
              alt="Neil Mar De Asis"
              className="block h-full w-full max-w-full rounded-full border border-line object-cover"
            />
          </div>

          {/* Currently status */}
          <div className="w-full max-w-[280px] rounded-lg border border-line bg-white/[0.02] p-4 text-left md:w-[280px]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                Now
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Building with React &amp; Tailwind. Learning Next.js and MongoDB.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mx-auto mt-16 flex max-w-page items-center justify-center gap-3 text-ink-faint"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex"
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.div>
    </section>
  );
}