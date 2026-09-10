import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Reveal from "./Reveal";
import hksImage from "../assets/HKS.jpg";
import flexSpaceImage from "../assets/FlexSpace.jpg";
import SectionLabel from "./SectionLabel";
const PROJECTS = [
  {
    title: "FlexSpace",
    tagline: "Workspace discovery for Iloilo City",
    description:
      "A specialized workspace discovery platform for Iloilo City, enabling students and professionals to find co-working hubs. Built with React and MongoDB — handles listings, filters, and location-based discovery.",
    tech: ["React", "Tailwind", "Node.js", "MongoDB"],
    image: flexSpaceImage,
    live: "https://flexspace-iloilo.vercel.app/",
    repo: "https://github.com/dropoflife13/flexspace",
  },
  {
    title: "Hawak Kamay Scholarship Portal",
    tagline: "Scholarship matching for students",
    description:
      "A portal for students to find a scholarship program that fits their needs, with a user-friendly interface and a comprehensive database of available scholarships.",
    tech: ["PHP", "Tailwind", "MySQL"],
    image: hksImage,
    live: "https://example.com",
    repo: "https://github.com/dropoflife13/HKSPS",
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  // --- 3D tilt on hover ---
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), {
    stiffness: 120,
    damping: 18,
  });

  // --- Cursor-follow glow ---
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(400px circle at ${x}% ${y}%, rgba(45,212,191,0.12), transparent 60%)`
  );

  // --- Image parallax on scroll ---
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    // Tilt
    mx.set(px - 0.5);
    my.set(py - 0.5);

    // Glow follows cursor
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <Reveal delay={0.1 + index * 0.08}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="group relative grid grid-cols-1 overflow-hidden rounded-lg border border-line bg-white/[0.02] transition-colors duration-300 hover:border-accent/40 md:grid-cols-2"
      >
        {/* Cursor-follow glow overlay */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glowBg }}
        />

        {/* Left — image with parallax */}
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 block aspect-video overflow-hidden md:aspect-auto md:h-full"
        >
          <motion.img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            style={{ y: imageY, scale: 1.15 }}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.18]"
          />
        </a>

        {/* Right — info panel */}
        <div className="relative z-10 flex flex-col justify-center p-6 sm:p-10">
          <h3 className="font-serif text-2xl font-normal text-ink sm:text-3xl">
            {project.title}
          </h3>

          <p className="mt-2 text-sm text-ink-faint">{project.tagline}</p>

          <p className="mt-5 text-base leading-relaxed text-ink-muted">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted transition-colors duration-200 group-hover:border-accent/30"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-soft"
            >
              View live
              <ArrowUpRight
                size={15}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              <FaGithub size={15} />
              Code
            </a>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function Projects() {
  return (
      <section id="projects" className="relative px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-page">
      <SectionLabel number={3} text="Work" />

      <Reveal delay={0.05}>
        <h2 className="section-heading mt-6">Selected projects</h2>
      </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-ink-muted">
            A few projects I've worked on recently. Each one taught me
            something different about building for real users.
          </p>
        </Reveal>

        <div className="mt-12 space-y-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}