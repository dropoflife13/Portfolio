import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Mail } from "lucide-react";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/yourusername", icon: FaGithub },
  { label: "LinkedIn", href: "https://linkedin.com/in/yourusername", icon: FaLinkedin },
  { label: "Twitter", href: "https://twitter.com/yourusername", icon: FaXTwitter },
  { label: "Email", href: "mailto:your.email@gmail.com", icon: Mail },
];

const QUICK_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleLinkClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-white/8 backdrop-blur-md px-6 pt-16 pb-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row">
          {/* Brand + CTA */}
          <div className="max-w-xs">
            <p className="text-lg font-semibold text-white">
              Neil Mar De Asis<span className="text-fuchsia-400">.</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Always open to new projects and conversations. Reach out if
              you'd like to work together.
            </p>
            <button
              onClick={() => handleLinkClick("contact")}
              className="mt-5 inline-flex items-center rounded-lg border border-fuchsia-400/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-all duration-200 hover:border-fuchsia-400/50 hover:bg-white/15"
            >
              Say hello
            </button>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-sm font-medium text-slate-300">Quick links</p>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="text-sm text-slate-400 transition-colors duration-200 hover:text-fuchsia-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-sm font-medium text-slate-300">Elsewhere</p>
            <div className="mt-4 flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-slate-400 transition-colors duration-200 hover:border-fuchsia-400/40 hover:text-fuchsia-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>© {year} Neil Mar De Asis. All rights reserved.</p>
          <p>Built with React, Vite &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}