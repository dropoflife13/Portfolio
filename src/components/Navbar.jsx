import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Add a background/shadow once the user scrolls past the top
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section is currently in view
  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(
      Boolean
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (id) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/8 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10 shadow-lg shadow-black/30"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo / brand */}
        <button
          onClick={() => handleLinkClick("home")}
          className="text-lg font-semibold tracking-tight text-white"
        >
          Neil Mar De Asis
          
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleLinkClick(link.id)}
                className={`relative text-sm font-medium transition-colors duration-200 py-1 ${
                  activeSection === link.id
                    ? "text-fuchsia-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-fuchsia-400 transition-all duration-300 ${
                    activeSection === link.id ? "w-full" : "w-0"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA (desktop only) */}
        <button
          onClick={() => handleLinkClick("contact")}
          className="hidden md:inline-flex items-center rounded-lg border border-fuchsia-400/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-200 hover:border-fuchsia-400/50 hover:bg-white/15"
        >
          Say hello
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden text-slate-200"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 border-t border-white/10 bg-white/8 backdrop-blur-xl backdrop-saturate-150 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left py-2.5 text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.id
                    ? "text-fuchsia-400"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="pt-2">
            <button
              onClick={() => handleLinkClick("contact")}
              className="w-full rounded-lg border border-fuchsia-400/30 bg-white/10 py-2 text-sm font-medium text-white backdrop-blur-md hover:border-fuchsia-400/50 hover:bg-white/15 transition-all duration-200"
            >
              Say hello
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}