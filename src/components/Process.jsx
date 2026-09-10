import { useState, useEffect, useRef } from "react";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
const STEP_DURATION = 4500;

const STEPS = [
  {
    number: "01",
    title: "Understand",
    description:
      "Before I touch code, I want to know the real problem. I read the brief, ask the questions nobody else asks, and write down what I don't understand yet.",
    preview: {
      fileName: "understand.md",
      lines: [
        { text: "# Before I build", color: "text-ink" },
        { text: "", color: "" },
        { text: "## What is this for?", color: "text-ink" },
        { text: "Who actually uses it?", color: "text-ink-muted" },
        { text: "What breaks if it's wrong?", color: "text-ink-muted" },
        { text: "", color: "" },
        { text: "→ Ask before assuming.", color: "text-accent" },
      ],
    },
  },
  {
    number: "02",
    title: "Build",
    description:
      "I ship small and often. I'd rather show you something working in day one than a perfect plan that never leaves my head.",
    preview: {
      fileName: "build.jsx",
      lines: [
        { text: "// Ship something small today", color: "text-ink-muted" },
        { text: "", color: "" },
        { text: "function FirstDraft() {", color: "text-ink" },
        { text: "  // rough, honest, working", color: "text-ink-muted" },
        { text: "  return <Version zero />", color: "text-accent" },
        { text: "}", color: "text-ink" },
        { text: "", color: "" },
        { text: "// Iterate in public.", color: "text-ink-muted" },
      ],
    },
  },
  {
    number: "03",
    title: "Ship",
    description:
      "Spacing, motion, load time. The details nobody asks for but everyone feels. I don't call something done until it feels finished.",
    preview: {
      fileName: "ship.md",
      lines: [
        { text: "## Before I ship", color: "text-ink" },
        { text: "", color: "" },
        { text: "✓ Works on the smallest screen", color: "text-ink-muted" },
        { text: "✓ Feels right at 0.5x speed", color: "text-ink-muted" },
        { text: "✓ No rough edges I ignored", color: "text-ink-muted" },
        { text: "", color: "" },
        { text: "→ Then it goes live.", color: "text-accent" },
      ],
    },
  },
];

function useTypewriter(lines, activeKey) {
  const [rendered, setRendered] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    setRendered([]);

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
        setRendered([...acc]);
        charIndex++;
        timerRef.current = setTimeout(tick, currentLine.length === 0 ? 80 : 18);
      } else {
        lineIndex++;
        charIndex = 0;
        timerRef.current = setTimeout(tick, 140);
      }
    };

    timerRef.current = setTimeout(tick, 300);

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeKey, lines]);

  return rendered.slice(0, lines.length);
}

export default function Process() {
  const [active, setActive] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const current = STEPS[active];

  // Auto-advance. No pause on hover — only manual clicks reset it.
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
      <SectionLabel number={2} text="How I work" />



        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-2xl font-serif text-3xl font-light leading-[1.05] text-ink sm:text-4xl md:text-5xl">
            How I understand.
            <br />
            <span className="text-ink-muted">How I build. How I ship.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="space-y-8">
              {STEPS.map((step, i) => {
                const isActive = active === i;
                return (
                  <Reveal key={step.number} delay={0.1 + i * 0.05}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      className="group block w-full text-left"
                    >
                      <div className="flex items-start gap-5">
                        <span
                          className={`font-serif text-2xl font-light leading-none transition-colors duration-500 sm:text-3xl ${
                            isActive ? "text-accent" : "text-white/20"
                          }`}
                        >
                          {step.number}
                        </span>

                        <div className="pt-0.5 flex-1">
                          <h3
                            className={`font-serif text-xl font-normal transition-colors duration-500 sm:text-2xl ${
                              isActive ? "text-ink" : "text-ink-muted"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`mt-2 max-w-sm text-sm leading-relaxed transition-colors duration-500 sm:text-base ${
                              isActive ? "text-ink-muted" : "text-ink-faint"
                            }`}
                          >
                            {step.description}
                          </p>

                          {/* Animated progress line */}
                          <div className="mt-4 h-px w-full bg-white/10">
                            {isActive && (
                              <div
                                key={progressKey}
                                className="h-px bg-accent"
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
              <div className="relative">
                <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-accent/5 blur-3xl" />

                <div className="overflow-hidden rounded-lg border border-line bg-[#0e183b]">
                  <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    <span className="ml-3 font-mono text-xs text-ink-faint">
                      {current.preview.fileName}
                    </span>
                  </div>

                  <div className="min-h-[320px] p-6 font-mono text-sm leading-relaxed">
                   {typedLines.map((text, i) => {
  const line = current.preview.lines[i];
  if (!line) return null;   // ← ADD THIS
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
                              <span className="ml-0.5 inline-block h-4 w-[6px] translate-y-[2px] animate-pulse bg-accent" />
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-center gap-2 border-t border-line py-4">
                    {STEPS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Go to step ${i + 1}`}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          active === i
                            ? "w-8 bg-accent"
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