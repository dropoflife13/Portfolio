import { useState, useEffect, useRef } from "react";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";

const STEP_DURATION = 4500;

const STEPS = [
  {
    number: "01",
    title: "Understand",
    description:
      "Before I touch code, I map the real domain problem. I interrogate the brief, surface edge cases early, and define clear architectural boundaries.",
    preview: {
      fileName: "01-understand.md",
      lines: [
        { text: "# Domain & Problem Discovery", color: "text-white" },
        { text: "", color: "" },
        { text: "## Core Questions", color: "text-cyan-300" },
        { text: "• Who relies on this system daily?", color: "text-ink-muted" },
        { text: "• What breaks under edge conditions?", color: "text-ink-muted" },
        { text: "", color: "" },
        { text: "→ Interrogate before architecting.", color: "text-cyan-400" },
      ],
    },
  },
  {
    number: "02",
    title: "Build",
    description:
      "I ship vertical slices early and iterate with discipline. Clean component boundaries, predictable data flow, and zero unnecessary abstraction.",
    preview: {
      fileName: "02-build.tsx",
      lines: [
        { text: "// Ship deterministic vertical slices", color: "text-ink-muted" },
        { text: "", color: "" },
        { text: "export function SystemCore() {", color: "text-white" },
        { text: "  // strict types, resilient state", color: "text-ink-muted" },
        { text: "  return <ProductionSlice verified />;", color: "text-cyan-300" },
        { text: "}", color: "text-white" },
        { text: "", color: "" },
        { text: "// Iterate with real telemetry.", color: "text-ink-muted" },
      ],
    },
  },
  {
    number: "03",
    title: "Ship",
    description:
      "Spacing, motion curves, latency, and security invariants. The details nobody asks for but everyone feels. Nothing ships until it feels finished.",
    preview: {
      fileName: "03-ship.md",
      lines: [
        { text: "## Pre-Flight Release Checklist", color: "text-white" },
        { text: "", color: "" },
        { text: "✓ Responsive down to 320px viewports", color: "text-ink-muted" },
        { text: "✓ 60fps spring physics & reduced-motion safe", color: "text-ink-muted" },
        { text: "✓ Zero unverified edge states", color: "text-ink-muted" },
        { text: "", color: "" },
        { text: "→ Ready for production deployment.", color: "text-cyan-400" },
      ],
    },
  },
];

function useTypewriter(lines, activeKey) {
  const [state, setState] = useState({ key: activeKey, rendered: [] });
  const timerRef = useRef(null);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let cancelled = false;
    const acc = [];

    const tick = () => {
      if (cancelled) return;
      if (lineIndex >= lines.length) return;

      const currentLine = lines[lineIndex].text;

      if (charIndex <= currentLine.length) {
        acc[lineIndex] = currentLine.slice(0, charIndex);
        setState({ key: activeKey, rendered: [...acc] });
        charIndex++;
        timerRef.current = setTimeout(tick, currentLine.length === 0 ? 70 : 16);
      } else {
        lineIndex++;
        charIndex = 0;
        timerRef.current = setTimeout(tick, 120);
      }
    };

    timerRef.current = setTimeout(tick, 180);

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeKey, lines]);

  const activeRendered = state.key === activeKey ? state.rendered : [];
  return activeRendered.slice(0, lines.length);
}

export default function Process() {
  const [active, setActive] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const current = STEPS[active];

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
      setProgressKey((k) => k + 1);
    }, STEP_DURATION);
    return () => clearTimeout(timer);
  }, [active, progressKey]);

  const goTo = (i) => {
    setActive(i);
    setProgressKey((k) => k + 1);
  };

  const typedLines = useTypewriter(
    current.preview.lines,
    `${active}-${progressKey}`
  );

  return (
    <section id="process" className="relative px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-page">
        <SectionLabel number={2} text="Engineering Philosophy" />

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-2xl font-serif text-3xl font-light leading-[1.05] text-ink sm:text-4xl md:text-5xl">
            How I understand.
            <br />
            <span className="text-ink-muted">How I build. How I ship.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="space-y-4">
              {STEPS.map((step, i) => {
                const isActive = active === i;
                return (
                  <Reveal key={step.number} delay={0.1 + i * 0.05}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      className={`group block w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
                        isActive
                          ? "border-cyan-400/50 bg-[#070d1f]/90 shadow-[0_0_28px_rgba(34,211,238,0.12)]"
                          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={`font-mono text-sm font-semibold uppercase tracking-widest transition-colors duration-300 ${
                            isActive ? "text-cyan-300" : "text-white/25"
                          }`}
                        >
                          {step.number}
                        </span>

                        <div className="flex-1">
                          <h3
                            className={`font-serif text-xl font-normal transition-colors duration-300 sm:text-2xl ${
                              isActive ? "text-white" : "text-ink-muted"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`mt-2 text-sm leading-relaxed transition-colors duration-300 ${
                              isActive ? "text-ink-muted" : "text-ink-faint"
                            }`}
                          >
                            {step.description}
                          </p>

                          {/* Animated progress line */}
                          <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-white/10">
                            {isActive && (
                              <div
                                key={progressKey}
                                className="h-full bg-cyan-400"
                                style={{
                                  animation: `progressBar ${STEP_DURATION}ms linear forwards`,
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <div className="relative h-full">
                <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-cyan-400/10 blur-3xl" />

                <div className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#060b19]/90 backdrop-blur-xl">
                  <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
                      <span className="ml-3 font-mono text-xs text-cyan-200/80">
                        {current.preview.fileName}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">
                      UTF-8 · LF
                    </span>
                  </div>

                  <div className="min-h-[300px] flex-1 p-6 font-mono text-sm leading-relaxed">
                    {typedLines.map((text, i) => {
                      const line = current.preview.lines[i];
                      if (!line) return null;
                      const isTyping =
                        i === typedLines.length - 1 &&
                        text.length < line.text.length;
                      return (
                        <div key={i} className="flex gap-4">
                          <span className="select-none text-white/20">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className={line.color}>
                            {text}
                            {isTyping && (
                              <span className="ml-0.5 inline-block h-4 w-[6px] translate-y-[2px] animate-pulse bg-cyan-400" />
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-center gap-2 border-t border-white/10 bg-black/30 py-3.5">
                    {STEPS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Go to step ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          active === i
                            ? "w-8 bg-cyan-400"
                            : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
