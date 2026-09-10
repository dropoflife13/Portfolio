import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
const SECONDARY_LINKS = [
  {
    label: "Phone",
    value: "0915 987 1692",
    href: "tel:+639159871692",
    icon: Phone,
  },
  {
    label: "GitHub",
    value: "github.com/Dropoflife13",
    href: "https://github.com/Dropoflife13",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/neil-mar-de-asis",
    href: "https://www.linkedin.com/in/neil-mar-de-asis-b97255337/",
    icon: FaLinkedin,
  },
];

// Splits a string into words, animating each one with a small delay
function AnimatedWords({ text, className = "", delay = 0 }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.06,
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

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-page">
        {/* Header row: label + live status pill */}
        <div className="flex flex-wrap items-center gap-3">
  <SectionLabel number={5} text="Contact" />
  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-3 py-1">
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_6px_rgba(45,212,191,0.6)]" />
    </span>
    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
      Online · Replies in a day
    </span>
  </span>
</div>

        {/* Two-column split */}
        <div className="mt-8 grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-16">
          {/* Left column */}
          <div className="md:col-span-7">
            <h2 className="section-heading max-w-2xl">
              <AnimatedWords text="Let's work" delay={0.1} />
              <br />
              <AnimatedWords
                text="together."
                delay={0.25}
                className="text-ink-muted"
              />
            </h2>

            <Reveal delay={0.35}>
              <p className="mt-6 max-w-prose text-base leading-relaxed text-ink-muted sm:text-lg">
                Open to frontend and frontend-leaning full-stack roles —
                remote or on-site. The fastest way to reach me is email.
              </p>
            </Reveal>

            {/* Primary email CTA with shimmer */}
            <Reveal delay={0.4}>
              <div className="relative mt-10">
                {/* Ambient glow behind the CTA */}
                <div className="pointer-events-none absolute -inset-8 -z-10 rounded-3xl bg-accent/5 blur-3xl" />

                <a
                  href="mailto:neilasis43@gmail.com"
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-lg border border-accent/30 bg-accent/10 px-6 py-4 text-base font-medium text-accent backdrop-blur-md transition-all duration-200 hover:border-accent/60 hover:bg-accent/20 sm:text-lg"
                >
                  {/* Shimmer sweep on hover */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

                  <Mail size={20} className="relative z-10" />
                  <span className="relative z-10">
                    neilasis43@gmail.com
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right column: secondary links */}
          <div className="md:col-span-5">
            <Reveal delay={0.15}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                Elsewhere
              </p>
            </Reveal>

            <div className="mt-6 space-y-3">
              {SECONDARY_LINKS.map(({ label, value, href, icon: Icon }, i) => (
                <Reveal key={label} delay={0.2 + i * 0.05}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group relative flex items-center gap-4 overflow-hidden rounded-lg border border-line bg-white/[0.02] px-5 py-4 transition-colors duration-200 hover:border-accent/40"
                  >
                    {/* Hover tint sweep */}
                    <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/5 text-ink-muted transition-all duration-200 group-hover:bg-accent/10 group-hover:text-accent">
                      <Icon size={18} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                        {label}
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-ink">
                        {value}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-ink-faint transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}