import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const SKILLS = [
  "React",
  "JavaScript",
  "PHP",
  "Python",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Git",
  "Node.js",
  "MySQL",
  "MongoDB",
  "Figma",
  "Vercel",
  "Adobe Premiere Pro",
  "CapCut",
];

const EDUCATION = [
  {
    degree: "Bachelor of Science in Information Technology (BSIT)",
    school: "PHINMA University of Iloilo",
    period: "2023 — 2027",
  },
  {
    degree: "Senior High School",
    school: "PHINMA University of Iloilo",
    period: "2022 — 2023",
  },
  {
    degree: "High School",
    school: "Colegio Del Sagrado Corazon De Jesus",
    period: "2013 — 2016",
  },
  {
    degree: "Elementary",
    school: "Ateneo De Iloilo Sta. Maria Catholic School",
    period: "2005 — 2012",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-transparent px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-sm font-medium text-fuchsia-400">About</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            A bit about me
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400">
            I'm a frontend developer who enjoys turning ideas into interfaces
            people actually want to use. I care about the small details —
            spacing, motion, load time — because that's what separates a
            functional page from a good one. Outside of code, I'm usually
            reading about design systems or tinkering with side projects.
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mt-12"
        >
          <h3 className="text-sm font-medium text-slate-300">
            Technologies I work with
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-white/10 bg-white/8 backdrop-blur-md px-3 py-1.5 text-sm text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="mt-14"
        >
          <div className="flex items-center gap-2 text-slate-300">
            <GraduationCap size={18} className="text-fuchsia-400" />
            <h3 className="text-sm font-medium">Education</h3>
          </div>

          <div className="mt-4 space-y-5 border-l border-white/10 pl-4">
            {EDUCATION.map((entry) => (
              <div key={entry.degree}>
                <p className="text-sm font-medium text-white">
                  {entry.degree}
                </p>
                <p className="text-xs text-slate-400">{entry.period}</p>
                <p className="mt-1 text-sm text-slate-400">{entry.school}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}