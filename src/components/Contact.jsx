import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const CONTACT_LINKS = [
  {
    label: "Email",
    value: "neilasis43@gmail.com",
    href: "mailto:your.neilasis43@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "09159871692",
    href: "tel:+15551234567",
    icon: Phone,
  },
  {
    label: "GitHub",
    value: "github.com/Dropoflife13",
    href: "https://github.com/Dropoflife13",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/Neil Mar De Asis",
    href: "https://www.linkedin.com/in/neil-mar-de-asis-b97255337/",
    icon: FaLinkedin,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-transparent px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-sm font-medium text-fuchsia-400">Contact</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            Let's talk
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-400">
            Feel free to reach out through any of these — I'll usually reply
            within a day or two.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {CONTACT_LINKS.map(({ label, value, href, icon: Icon }, index) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/8 backdrop-blur-md px-5 py-4 text-left shadow-lg shadow-black/30 transition-colors duration-200 hover:border-fuchsia-400/40"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-fuchsia-400/10 text-fuchsia-400">
                <Icon size={18} />
              </span>
              <span>
                <span className="block text-xs font-medium text-slate-400">
                  {label}
                </span>
                <span className="block text-sm text-slate-200">{value}</span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}