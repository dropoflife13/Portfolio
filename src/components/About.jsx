import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import EducationRoadmap from "./EducationRoadmap";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

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

export default function About() {
  return (
    <section id="about" className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-page">
        <SectionLabel number={1} text="About" />

        {/* Top: bio + status */}
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
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

          {/* Right column on desktop — kept empty, the roadmap below is full width */}
          <div className="hidden md:col-span-5 md:block" />
        </div>

        {/* Education roadmap — full width below */}
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
  );
}