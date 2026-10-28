import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Process from "./components/Process";
import FactoryShowcase from "./components/FactoryShowcase";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import ParticleBackground from "./components/ParticleBackground";

function App() {
  const shouldReduceMotion = useReducedMotion();
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setBooting(false),
      shouldReduceMotion ? 80 : 650
    );
    return () => window.clearTimeout(timer);
  }, [shouldReduceMotion]);

  return (
    <div className="relative min-h-screen selection:bg-cyan-400 selection:text-slate-950">
      <CustomCursor />
      <ParticleBackground />
      <ScrollProgress />

      {/* Quick "System Boot" Fade-In Overlay */}
      <AnimatePresence>
        {booting && (
          <motion.div
            key="system-boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050914]"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.25)]">
                <span className="h-2 w-2 animate-ping rounded-full bg-cyan-400" />
                <span>SYSTEM BOOT · NEURAL CORTEX</span>
              </div>
              <div className="h-0.5 w-48 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="h-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero />
        <About />
        <Process />
        <FactoryShowcase />
        <Projects />
        <Skills />
        <Contact />
      </motion.main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
