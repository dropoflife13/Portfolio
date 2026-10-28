import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import Reveal from "./Reveal";
import { Button } from "@/components/ui/button";

type Step = {
  command: string;
  title: string;
  agents: string[];
};

// The Golden Path — each step is owned by one or more specialised agents.
const STEPS: Step[] = [
  { command: "/grill", title: "Interrogate Problem", agents: ["PM"] },
  { command: "/pitch", title: "3-Minute Pitch", agents: ["GR"] },
  { command: "/to-spec", title: "Technical PRD", agents: ["SD"] },
  { command: "/to-tickets", title: "Atomic Tasks", agents: ["PM"] },
  { command: "/implement", title: "Production Code", agents: ["DB", "IR", "SEC"] },
  { command: "/review", title: "Security Audit", agents: ["SEC"] },
];

const LEFT = STEPS.slice(0, 3);
const RIGHT = STEPS.slice(3);

const CYAN = "#22d3ee";

function StepCard({
  step,
  index,
  active,
  onActivate,
  onDeactivate,
  cardRef,
}: {
  step: Step;
  index: number;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <motion.div
      ref={cardRef}
      tabIndex={0}
      onHoverStart={onActivate}
      onHoverEnd={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={`relative z-10 cursor-default rounded-xl border bg-black/60 p-4 backdrop-blur-md outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-cyan-400/70 ${
        active
          ? "border-cyan-400/60 shadow-[0_0_28px_rgba(34,211,238,0.25)]"
          : "border-white/10"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <code className="font-mono text-sm font-medium text-cyan-300">
          {step.command}
        </code>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
          Step {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-3 font-serif text-lg font-normal text-white">
        {step.title}
      </h3>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {step.agents.map((agent) => (
          <span
            key={agent}
            className="rounded-full border border-cyan-400/25 bg-cyan-400/[0.08] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan-200"
          >
            {agent} Agent
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function FactoryShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [paths, setPaths] = useState<string[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState<number | null>(null);
  const [modelReady, setModelReady] = useState(false);

  // Measure card + iframe positions so the SVG lines always meet them exactly.
  const measure = useCallback(() => {
    const container = containerRef.current;
    const center = centerRef.current;
    if (!container || !center) return;

    const c = container.getBoundingClientRect();
    const m = center.getBoundingClientRect();
    const cx = m.left - c.left + m.width / 2;
    const cy = m.top - c.top + m.height / 2;

    setBox({ w: c.width, h: c.height });
    setPaths(
      STEPS.map((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return "";
        const r = el.getBoundingClientRect();
        const isLeft = r.left + r.width / 2 < m.left + m.width / 2;
        const x = (isLeft ? r.right : r.left) - c.left;
        const y = r.top - c.top + r.height / 2;
        const dx = x - cx;
        return `M ${cx} ${cy} C ${cx + dx * 0.45} ${cy}, ${cx + dx * 0.6} ${y}, ${x} ${y}`;
      })
    );
  }, []);

  useLayoutEffect(() => {
    measure();
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // The brain page is same-origin, so we can trigger its own GLB exporter.
  const downloadModel = () => {
    const btn = iframeRef.current?.contentDocument?.getElementById("dl");
    btn?.click();
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[i] = el;
  };

  const activate = (i: number) => () => setActive(i);
  const deactivate = () => setActive(null);

  return (
    <section
      id="factory"
      className="relative overflow-hidden bg-[#050505] px-6 py-20 sm:py-28"
    >
      {/* Tech grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, #000 30%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-page">
        {/* Header */}
        <Reveal>
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-300/80">
            Golden Path · Software Factory
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="section-heading mx-auto mt-5 max-w-3xl text-center">
            The AI Software Factory
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-ink-muted sm:text-lg">
            Inspired by the Cerbos Golden Path, my 3D Brain enforces a 6-step
            SDLC pipeline using 7 autonomous AI agents.
          </p>
        </Reveal>

        {/* Diagram */}
        <div ref={containerRef} className="relative mt-14">
          {/* Animated connections — behind cards and iframe */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
            width={box.w}
            height={box.h}
            viewBox={`0 0 ${box.w} ${box.h}`}
            fill="none"
          >
            {paths.map((d, i) => {
              const on = active === i;
              return (
                <g key={i}>
                  {/* glow underlay */}
                  <path
                    d={d}
                    stroke={CYAN}
                    strokeWidth={on ? 7 : 3}
                    strokeOpacity={on ? 0.35 : 0.08}
                    style={{ filter: "blur(4px)", transition: "all 0.25s" }}
                  />
                  {/* flowing dashes */}
                  <path
                    d={d}
                    className="factory-line"
                    stroke={CYAN}
                    strokeWidth={on ? 2.5 : 1.5}
                    strokeOpacity={on ? 1 : 0.45}
                    strokeDasharray="6 8"
                    strokeLinecap="round"
                    style={{
                      filter: on ? `drop-shadow(0 0 6px ${CYAN})` : "none",
                      transition: "stroke-width 0.25s, stroke-opacity 0.25s",
                    }}
                  />
                </g>
              );
            })}
          </svg>

          <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_minmax(360px,520px)_1fr] lg:gap-12">
            {/* Left cards */}
            <div className="order-2 flex flex-col gap-5 lg:order-1 lg:gap-10">
              {LEFT.map((step, i) => (
                <StepCard
                  key={step.command}
                  step={step}
                  index={i}
                  active={active === i}
                  onActivate={activate(i)}
                  onDeactivate={deactivate}
                  cardRef={setCardRef(i)}
                />
              ))}
            </div>

            {/* Center — 3D brain */}
            <motion.div
              ref={centerRef}
              animate={
                active !== null ? { scale: [1, 1.025, 1] } : { scale: 1 }
              }
              transition={
                active !== null
                  ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.3 }
              }
              className="relative order-1 aspect-square w-full lg:order-2"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-6 rounded-full blur-3xl transition-opacity duration-300"
                style={{
                  background:
                    "radial-gradient(circle, rgba(34,211,238,0.22), transparent 65%)",
                  opacity: active !== null ? 1 : 0.45,
                }}
              />
              <iframe
                ref={iframeRef}
                src="/synaptic-constellation-brain.html?embed"
                className="relative h-full w-full border-0"
                title="3D Neural Brain"
                loading="lazy"
                onLoad={() => setModelReady(true)}
              />
            </motion.div>

            {/* Right cards */}
            <div className="order-3 flex flex-col gap-5 lg:gap-10">
              {RIGHT.map((step, i) => (
                <StepCard
                  key={step.command}
                  step={step}
                  index={i + 3}
                  active={active === i + 3}
                  onActivate={activate(i + 3)}
                  onDeactivate={deactivate}
                  cardRef={setCardRef(i + 3)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 border border-cyan-400/50 bg-cyan-400/10 px-8 font-mono text-sm tracking-wide text-cyan-200 hover:bg-cyan-400/20 hover:shadow-[0_0_24px_rgba(34,211,238,0.3)]"
          >
            <a
              href="https://cortex-gamma-ten.vercel.app/console"
              target="_blank"
              rel="noopener noreferrer"
            >
              [ Launch the Live Factory <ArrowUpRight aria-hidden="true" /> ]
            </a>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={downloadModel}
            disabled={!modelReady}
            className="h-12 border-white/15 bg-transparent px-6 font-mono text-sm text-white/70 hover:border-cyan-400/40 hover:bg-white/5 hover:text-white"
          >
            <Download aria-hidden="true" /> Download 3D model (.glb)
          </Button>
        </div>
      </div>
    </section>
  );
}

