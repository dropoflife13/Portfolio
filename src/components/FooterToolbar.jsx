import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { Mail } from "lucide-react";

const ITEMS = [
  {
    label: "GitHub",
    href: "https://github.com/Dropoflife13",
    icon: FaGithub,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/neil-mar-de-asis-b97255337/",
    icon: FaLinkedin,
    external: true,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100002033212896",
    icon: FaFacebook,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:neilasis43@gmail.com",
    icon: Mail,
    external: false,
  },
];

export default function FooterToolbar() {
  const [hovered, setHovered] = useState(null);
  const [active] = useState(0);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseLeave={() => setHovered(null)}
    >
      <div className="flex items-center gap-0.5 rounded-full border border-line bg-paperDeep/80 p-1 backdrop-blur-md">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          const isHighlighted =
            hovered === i || (hovered === null && active === i);
          const isTooltipOpen = hovered === i;

          return (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              aria-label={item.label}
              onMouseEnter={() => setHovered(i)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full"
            >
              <motion.span
                initial={false}
                animate={{
                  scale: isHighlighted ? 1 : 0,
                  opacity: isHighlighted ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="absolute inset-0 rounded-full bg-accent/15"
              />

              <Icon
                size={15}
                className={`relative z-10 transition-colors duration-200 ${
                  isHighlighted ? "text-accent" : "text-ink-muted"
                }`}
              />

              <AnimatePresence>
                {isTooltipOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="pointer-events-none absolute -top-9 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-md border border-line bg-paperDeep px-2.5 py-1.5 shadow-lg shadow-black/40"
                  >
                    <span className="font-mono text-[10px] font-medium text-ink">
                      {item.label}
                    </span>
                    <span className="flex h-3.5 w-3.5 items-center justify-center rounded border border-line bg-white/[0.04] font-mono text-[8px] uppercase text-ink-faint">
                      {item.label.charAt(0)}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </a>
          );
        })}
      </div>
    </div>
  );
}