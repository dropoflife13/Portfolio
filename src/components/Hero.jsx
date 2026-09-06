import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope, FaFacebook } from "react-icons/fa";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/dropoflife13", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/neil-mar-de-asis-b97255337/", icon: FaLinkedin },
  { label: "Gmail", href: "mailto:neilasis43@gmail.com", icon: FaEnvelope },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100002033212896", icon: FaFacebook },
];
const STATS = [
  { value: "2+", label: "Years experience" },
  { value: "15+", label: "Projects shipped" },
  { value: "6", label: "Core technologies" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24 pb-16"
    >
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-pink-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col-reverse items-center gap-14 md:flex-row md:justify-center md:gap-20">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 text-center md:text-left"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1 text-xs font-medium text-fuchsia-300">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
            Available for new opportunities
          </span>

          <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-white sm:text-5xl">
            Hi, I'm Neil Mar De Asis
          </h1>

          <h2 className="mt-3 text-2xl font-medium text-slate-400 sm:text-3xl">
            <Typewriter
              words={["Frontend Developer", "React Engineer", "UI Craftsman"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1800}
            />
          </h2>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-400 md:text-lg">
            I build fast, accessible web interfaces with React and Tailwind —
            focused on clean code, thoughtful interaction, and details that
            make products feel solid in production, not just in a demo.
          </p>

          {/* Stats */}
          <div className="mt-8 flex justify-center gap-8 md:justify-start">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="text-2xl font-semibold text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-fuchsia-400/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md shadow-lg shadow-black/20 transition-all duration-200 hover:border-fuchsia-400/50 hover:bg-white/15"
            >
              <Download size={16} />
              Download resume
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-slate-200 backdrop-blur-md transition-all duration-200 hover:border-white/25 hover:bg-white/10"
            >
              <Mail size={16} />
              Get in touch
            </a>
          </div>

          {/* Social icons under the CTAs */}
          <div className="mt-6 flex items-center justify-center gap-3 md:justify-start">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/8 text-slate-400 backdrop-blur-md transition-colors duration-200 hover:border-fuchsia-400/40 hover:text-fuchsia-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="relative shrink-0"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-pink-500/30 blur-3xl" />
          <img
            src="/profile.jpg"
            alt="Portrait of Neil Mar De Asis"
            className="h-52 w-52 rounded-full border-2 border-fuchsia-400/40 object-cover sm:h-64 sm:w-64"
          />
        </motion.div>
      </div>
    </section>
  );
}