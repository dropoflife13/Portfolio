import { motion } from "framer-motion";
import { Video, Clapperboard } from "lucide-react";
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

const SKILL_GROUPS = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "PHP", icon: SiPhp },
      { name: "Python", icon: SiPython },
      { name: "HTML", icon: SiHtml5 },
      { name: "CSS", icon: SiCss },
    ],
  },
  {
    category: "Frameworks & Libraries",
    items: [
      { name: "React", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Vite", icon: SiVite },
    ],
  },
  {
    category: "Databases & Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    category: "Tools & Platforms",
    items: [
      { name: "Git", icon: SiGit },
      { name: "Figma", icon: SiFigma },
      { name: "Vercel", icon: SiVercel },
    ],
  },
  {
    category: "Video Editing",
    items: [
      { name: "Adobe Premiere Pro", icon: Clapperboard },
      { name: "CapCut", icon: Video },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-transparent px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-sm font-medium text-fuchsia-400">Skills</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            What I work with
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            The languages, frameworks, and tools I reach for most often when
            building something.
          </p>
        </motion.div>

        <div className="mt-12 space-y-10">
          {SKILL_GROUPS.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: groupIndex * 0.1,
              }}
            >
              <h3 className="text-sm font-medium text-slate-300">
                {group.category}
              </h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {group.items.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/8 backdrop-blur-md px-4 py-2.5 shadow-md shadow-black/20 transition-colors duration-200 hover:border-fuchsia-400/40"
                  >
                    <Icon size={18} className="text-fuchsia-400" />
                    <span className="text-sm text-slate-300">{name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}