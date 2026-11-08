import { TrendingDown, TrendingUp } from "lucide-react";
import SectionLabel from "./SectionLabel";

export default function MinimalistData() {
  // SVG dimensions for the minimal charts
  const width = 360;
  const height = 140;

  // Chart 1: Downward Token Cost Optimization path (100% -> 20%)
  const costPoints = [
    { x: 10, y: 25, label: "Unconstrained: 100% Cost" },
    { x: 70, y: 40, label: "AST Filter: 78%" },
    { x: 140, y: 65, label: "Local Vector: 52%" },
    { x: 210, y: 95, label: "Deterministic Cache: 31%" },
    { x: 280, y: 115, label: "Tiered Router: 22%" },
    { x: 350, y: 120, label: "Optimized Baseline: 20%" },
  ];
  const costPath = "M 10 25 C 90 35, 140 75, 210 100 C 270 118, 310 120, 350 120";
  const costArea = "M 10 25 C 90 35, 140 75, 210 100 C 270 118, 310 120, 350 120 L 350 140 L 10 140 Z";

  // Chart 2: Upward Knowledge Expansion path (0 -> 29 domains seeded)
  const growthPoints = [
    { x: 10, y: 125, label: "Genesis: 2 Domains" },
    { x: 70, y: 110, label: "Core Security: 7 Domains" },
    { x: 140, y: 85, label: "Data & Storage: 14 Domains" },
    { x: 210, y: 55, label: "UI & State: 21 Domains" },
    { x: 280, y: 35, label: "Cloud & Reliability: 26 Domains" },
    { x: 350, y: 18, label: "Full Mesh: 29 Domains (159 Rules)" },
  ];
  const growthPath = "M 10 125 C 70 115, 120 95, 180 70 C 240 45, 300 25, 350 18";
  const growthArea = "M 10 125 C 70 115, 120 95, 180 70 C 240 45, 300 25, 350 18 L 350 140 L 10 140 Z";

  return (
    <section
      id="data"
      className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto max-w-page">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
          <div>
            <SectionLabel number={4} text="System Telemetry // Scale" />
            <h2 className="mt-4 text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-6xl">
              Minimalist Data.{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-sky-400 bg-clip-text text-transparent">
                Zero noise.
              </span>
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs uppercase tracking-widest text-slate-400/80">
            Real telemetry across token consumption, domain knowledge expansion,
            and deterministic gatekeeper throughput.
          </p>
        </div>

        {/* High-Contrast Glassmorphic Grid with Huge Typography */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
          <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
            {/* Stat 1: 29 Domains */}
            <div className="group p-8 transition-colors duration-300 hover:bg-white/[0.04] sm:p-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400">
                01 // ONTOLOGY DEPTH
              </span>
              <div className="mt-4 text-6xl font-black tracking-tighter text-white sm:text-7xl lg:text-8xl">
                29
              </div>
              <h3 className="mt-3 text-sm font-semibold tracking-wide text-white">
                Autonomous Domains
              </h3>
              <p className="mt-1 font-mono text-xs text-slate-400/80">
                Mapped into a unified 3D synaptic knowledge graph.
              </p>
            </div>

            {/* Stat 2: 200+ Rules */}
            <div className="group p-8 transition-colors duration-300 hover:bg-white/[0.04] sm:p-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-teal-400">
                02 // INVARIANTS
              </span>
              <div className="mt-4 text-6xl font-black tracking-tighter text-white sm:text-7xl lg:text-8xl">
                200+
              </div>
              <h3 className="mt-3 text-sm font-semibold tracking-wide text-white">
                Deterministic Rules
              </h3>
              <p className="mt-1 font-mono text-xs text-slate-400/80">
                Enforced STRIDE checks, RLS policies, and schema guards.
              </p>
            </div>

            {/* Stat 3: 80% Cost Reduction */}
            <div className="group p-8 transition-colors duration-300 hover:bg-white/[0.04] sm:p-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-400">
                03 // EFFICIENCY
              </span>
              <div className="mt-4 text-6xl font-black tracking-tighter text-white sm:text-7xl lg:text-8xl">
                80%
              </div>
              <h3 className="mt-3 text-sm font-semibold tracking-wide text-white">
                Token Cost Optimization
              </h3>
              <p className="mt-1 font-mono text-xs text-slate-400/80">
                Local heuristic matching resolves queries before LLM calls.
              </p>
            </div>

            {/* Stat 4: <5ms Latency */}
            <div className="group p-8 transition-colors duration-300 hover:bg-white/[0.04] sm:p-10">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-purple-400">
                04 // LATENCY
              </span>
              <div className="mt-4 text-6xl font-black tracking-tighter text-white sm:text-7xl lg:text-8xl">
                &lt;5ms
              </div>
              <h3 className="mt-3 text-sm font-semibold tracking-wide text-white">
                PDP Decision Speed
              </h3>
              <p className="mt-1 font-mono text-xs text-slate-400/80">
                Instant policy interception without blocking production writes.
              </p>
            </div>
          </div>
        </div>

        {/* Minimalist Ultra-Thin SVG Charts Section */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Chart 1: Token Cost Optimization */}
          <div className="group relative rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/30 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                  <TrendingDown size={16} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Token Cost Optimization
                  </h4>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-400">
                    -80% LLM Call Overhead
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] text-white/50">
                TREND: INVERSE
              </span>
            </div>

            {/* Ultra-Thin SVG Chart */}
            <div className="relative mt-6 h-44 w-full">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="h-full w-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="costGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Minimal coordinate grid lines */}
                <line x1="0" y1="35" x2={width} y2="35" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="75" x2={width} y2="75" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="115" x2={width} y2="115" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Area under curve */}
                <path d={costArea} fill="url(#costGrad)" />

                {/* The main ultra-thin line */}
                <path
                  d={costPath}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />

                {/* Data points */}
                {costPoints.map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={pt.x}
                    cy={pt.y}
                    r={idx === costPoints.length - 1 ? 4 : 2.5}
                    fill={idx === costPoints.length - 1 ? "#10b981" : "#ffffff"}
                    className="cursor-pointer transition-transform hover:scale-150"
                  />
                ))}
              </svg>
            </div>

            <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-white/40">
              <span>UNFILTERED PROMPT</span>
              <span>LOCAL AST &amp; VECTOR CACHE</span>
              <span className="text-emerald-400 font-semibold">20% BASELINE</span>
            </div>
          </div>

          {/* Chart 2: Knowledge Expansion */}
          <div className="group relative rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">
                    Knowledge Expansion
                  </h4>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-cyan-400">
                    29 Shards · 159 Invariants Seeded
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] text-white/50">
                TREND: EXPONENTIAL
              </span>
            </div>

            {/* Ultra-Thin SVG Chart */}
            <div className="relative mt-6 h-44 w-full">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="h-full w-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="growthGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Minimal coordinate grid lines */}
                <line x1="0" y1="35" x2={width} y2="35" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="75" x2={width} y2="75" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="115" x2={width} y2="115" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Area under curve */}
                <path d={growthArea} fill="url(#growthGrad)" />

                {/* The main ultra-thin line */}
                <path
                  d={growthPath}
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />

                {/* Data points */}
                {growthPoints.map((pt, idx) => (
                  <circle
                    key={idx}
                    cx={pt.x}
                    cy={pt.y}
                    r={idx === growthPoints.length - 1 ? 4 : 2.5}
                    fill={idx === growthPoints.length - 1 ? "#22d3ee" : "#ffffff"}
                    className="cursor-pointer transition-transform hover:scale-150"
                  />
                ))}
              </svg>
            </div>

            <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-white/40">
              <span>INITIAL SEED (2)</span>
              <span>SECURITY &amp; STORAGE (14)</span>
              <span className="text-cyan-300 font-semibold">29 DOMAINS (100%)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
