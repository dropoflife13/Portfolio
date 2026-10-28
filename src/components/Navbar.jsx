import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { id: "home", label: "Index" },
  { id: "about", label: "About" },
  { id: "factory", label: "Factory" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 8
  );
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.getElementById(l.id)
    ).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (id) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50"
      style={{
        backdropFilter: "blur(24px) saturate(200%)",
        WebkitBackdropFilter: "blur(24px) saturate(200%)",
        background: isScrolled
          ? "rgba(7, 13, 31, 0.72)"
          : "rgba(7, 13, 31, 0.35)",
        borderBottom: isScrolled
          ? "1px solid rgba(34, 211, 238, 0.16)"
          : "1px solid rgba(255, 255, 255, 0.06)",
        boxShadow: isScrolled
          ? "inset 0 1px 0 0 rgba(255, 255, 255, 0.06)"
          : "inset 0 1px 0 0 rgba(255, 255, 255, 0.04)",
        transition:
          "background 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
      }}
    >
      <nav className="mx-auto flex max-w-page items-center justify-between px-6 py-4">
        <button
          onClick={() => handleLinkClick("home")}
          aria-label="Back to top"
          className="font-serif text-lg font-normal tracking-tightest text-ink"
        >
          Neil<span className="text-cyan-400">.</span>
        </button>

        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="relative">
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
                      isActive
                        ? "text-cyan-300"
                        : "text-ink-muted hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-400 transition-all duration-300 ${
                        isActive
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <a
            href="mailto:neilasis43@gmail.com"
            className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-ink-muted transition-colors duration-200 hover:border-cyan-400/40 hover:text-cyan-200"
          >
            neilasis43@gmail.com <span className="text-cyan-400">↗</span>
          </a>
        </div>

        <button
          onClick={() => setIsOpen((p) => !p)}
          className="text-ink md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                <X size={22} />
              </motion.span>
            ) : (
              <motion.span
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex"
              >
                <Menu size={22} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
            style={{
              background: "rgba(7, 13, 31, 0.96)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full py-3 text-left font-mono text-sm uppercase tracking-wider transition-colors duration-200 ${
                      activeSection === link.id
                        ? "text-cyan-300"
                        : "text-ink-muted"
                    }`}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
