import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const PROJECTS = [
  {
    title: "Hawak Kamay Scholarship Portal",
    description:
      "A drag-and-drop task manager with boards, due dates, and local persistence.",
    tech: ["PHP", "Tailwind", "MySQL"],
    image: "/public/HKS.jpg",
    live: "https://example.com",
    repo: "https://github.com/dropoflife13/HKSPS",
  },
  {
    title: "FlexSpace",
    description:
      "A specialized workspace discovery platform for Iloilo City, enabling students and professionals to find co-working hubs.",
    tech: ["React", "Tailwind", "Node.js", "MongoDB"],
    image: "/public/FlexSpace.jpg",
    live: "https://flexspace-iloilo.vercel.app/",
    repo: "https://github.com/dropoflife13/flexspace",
  },

];

export default function Projects() {
  return (
    <section id="projects" className="bg-transparent px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-sm font-medium text-fuchsia-400">Projects</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            Things I've built
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            A few projects I've worked on recently. Each one taught me
            something different about building for real users.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
              className="group overflow-hidden rounded-xl border border-white/10 bg-white/8 backdrop-blur-md shadow-lg shadow-black/30 transition-colors duration-200 hover:border-white/20"
            >
              <div className="aspect-video overflow-hidden bg-white/5">
                <img
                  src={project.image}
                  alt={`Screenshot of ${project.title}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-medium text-white">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-white/10 px-2 py-1 text-xs text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-4">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-fuchsia-400 hover:text-fuchsia-300"
                  >
                    <ExternalLink size={15} />
                    Live demo
                  </a>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-slate-200"
                  >
                    <FaGithub size={15} />
                    Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}