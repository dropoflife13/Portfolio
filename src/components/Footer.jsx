import { ArrowUp } from "lucide-react";
import Reveal from "./Reveal";
import FooterToolbar from "./FooterToolbar";

const QUICK_LINKS = [
  { label: "Index", id: "home" },
  { label: "About", id: "about" },
  { label: "Work", id: "projects" },
  { label: "Stack", id: "skills" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleLinkClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden px-6 pt-16 pb-8">
      {/* Ghost wordmark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 select-none overflow-hidden text-center"
      >
        <span className="block font-serif text-[22vw] font-light leading-none tracking-tightest text-white/[0.02]">
          NEIL
        </span>
      </div>

      <div className="mx-auto max-w-page">
        <Reveal>
          <div className="flex flex-col gap-10 border-t border-line pt-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            {/* Brand */}
            <div className="max-w-xs">
              <button
                onClick={scrollTop}
                className="font-serif text-2xl font-light text-ink transition-colors duration-200 hover:text-accent sm:text-3xl"
              >
                Neil<span className="text-accent">.</span>
              </button>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                Always open to new projects and conversations.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-3 py-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_6px_rgba(45,212,191,0.6)]" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                  Online · Iloilo, PH
                </span>
              </div>
            </div>

            {/* Navigate — label above, links horizontal */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                Navigate
              </p>
              <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
                {QUICK_LINKS.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => handleLinkClick(link.id)}
                      className="text-sm text-ink-muted transition-colors duration-200 hover:text-accent"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Elsewhere — label above, toolbar + back-to-top side by side */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                Elsewhere
              </p>
              <div className="mt-4 flex items-center gap-4">
                <FooterToolbar />

                <button
                  onClick={scrollTop}
                  className="group inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted transition-colors duration-200 hover:border-accent/40 hover:text-accent"
                >
                  Top
                  <ArrowUp
                    size={12}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5"
                  />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Bottom bar */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row">
            <p>© {year} Neil Mar De Asis · All rights reserved.</p>
            <p>Built with React, Vite &amp; Tailwind CSS</p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}