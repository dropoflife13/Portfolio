import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import Reveal from "./Reveal";
import flexSpaceImage from "../assets/FlexSpace.jpg";
import dugtongImage from "../assets/dugtong.png";
import citemasImage from "../assets/citemas.png";
import agrivetImage from "../assets/agrivet.png";
import SectionLabel from "./SectionLabel";
import { Badge } from "@/components/ui/badge";

const PROJECTS = [
  {
    id: "01",
    title: "Dugtong OJT",
    tagline: "Track OJT hours without the paperwork",
    description:
      "A digital internship and OJT management platform built for Philippine schools and partner companies. Replaces paper logs with real-time hour tracking, coordinator dashboards, supervisor approval workflows, and automated report and certificate generation.",
    tech: ["React", "Next.js", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    image: dugtongImage,
    live: "https://dugtong-ojt.vercel.app/",
    repo: "https://github.com/dropoflife13",
  },
  {
    id: "02",
    title: "CITEMAS Portal",
    tagline: "Creative hub for CITE & Multimedia Arts",
    description:
      "A central digital collaborative platform for CITE & Multimedia Arts Studio to shape the future of digital creation. Powers student project collaboration, event registrations, talent directories, and dynamic digital portfolio showcases.",
    tech: ["React", "Tailwind CSS", "Node.js", "Firebase", "Cloud Firestore"],
    image: citemasImage,
    live: "https://citemas.vercel.app/",
    repo: "https://github.com/dropoflife13",
  },
  {
    id: "03",
    title: "Agrivet",
    tagline: "Stock & inventory management for agri-vet shops",
    description:
      "A practical inventory and sales platform designed for agricultural and veterinary shops. Keeps products, sales, suppliers, and expiry lots in clear view — engineered for reliability even when network connectivity drops.",
    tech: ["React", "Tailwind CSS", "Node.js", "MongoDB", "Offline-First"],
    image: agrivetImage,
    live: "https://agrivete.vercel.app/",
    repo: "https://github.com/dropoflife13",
  },
  {
    id: "04",
    title: "FlexSpace",
    tagline: "Workspace discovery for Iloilo City",
    description:
      "A specialized workspace discovery platform for Iloilo City, enabling students and professionals to find co-working hubs. Built with React and MongoDB — handles listings, filters, and location-based discovery.",
    tech: ["React", "Tailwind CSS", "Node.js", "MongoDB", "REST API"],
    image: flexSpaceImage,
    live: "https://flexspace-iloilo.vercel.app/",
    repo: "https://github.com/dropoflife13/flexspace",
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // --- 3D tilt towards the mouse ---
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [-8, 8]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [8, -8]), {
    stiffness: 180,
    damping: 20,
  });

  // --- Cursor-follow radial spotlight ---
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(520px circle at ${x}% ${y}%, rgba(34,211,238,0.16), transparent 65%)`
  );

  const handleMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    mx.set(px - 0.5);
    my.set(py - 0.5);
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
      <div style={{ perspective: 1200 }}>
        <motion.article
          ref={cardRef}
          data-cursor-interactive="true"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={
            shouldReduceMotion
              ? {}
              : {
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }
          }
          className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#070d1f]/80 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]"
        >
          {/* Cursor-follow glow overlay */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glowBg }}
          />

          {/* Top Media Container with Sleek Dark Gradient Hover Overlay */}
          <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-black/50">
            <img
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Index badge */}
            <div className="absolute left-4 top-4 z-10 rounded-lg border border-white/15 bg-black/70 px-2.5 py-1 font-mono text-[11px] font-semibold text-cyan-300 backdrop-blur-md">
              {project.id}
            </div>

            {/* Sleek Hover Overlay: Dark Gradient + Two Action Buttons */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-black/95 via-black/75 to-black/30 p-6 opacity-0 backdrop-blur-[3px] transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100 sm:flex-row">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/60 bg-cyan-400 px-4 py-2.5 font-mono text-xs font-semibold text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.45)] transition-transform duration-200 hover:scale-105 hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                [ Live Site ↗ ]
              </a>

              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-black/80 px-4 py-2.5 font-mono text-xs font-medium text-white transition-all duration-200 hover:scale-105 hover:border-cyan-400/50 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                [ Source Code &lt;/&gt; ]
              </a>
            </div>
          </div>

          {/* Info & Tech Tags Panel */}
          <div className="relative z-10 flex flex-1 flex-col justify-between p-6 sm:p-7">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-white transition-colors group-hover:text-cyan-200 sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-cyan-300/80">
                    {project.tagline}
                  </p>
                </div>

                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live site`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-ink-muted transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
                {project.description}
              </p>
            </div>

            {/* Always-Visible Tech Stack Tags + Mobile Quick Actions */}
            <div className="mt-6 border-t border-white/[0.08] pt-5">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="rounded-lg border-cyan-400/25 bg-cyan-400/[0.07] px-3 py-1 font-mono text-[11px] font-medium text-cyan-200 transition-colors duration-200 group-hover:border-cyan-400/50 group-hover:bg-cyan-400/[0.12]"
                  >
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-4 border-t border-white/[0.06] pt-3 lg:hidden">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-cyan-300"
                >
                  [ Live Site ↗ ]
                </a>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-white/75"
                >
                  <Code2 size={13} /> [ Source Code &lt;/&gt; ]
                </a>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-page">
        <SectionLabel number={4} text="Selected Work · 3D Tilt" />

        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal delay={0.05}>
            <h2 className="section-heading">Selected projects</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
              Production web systems engineered for real institutional and
              commercial workflows. Hover any card to inspect or launch.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
