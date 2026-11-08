import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import SectionLabel from "./SectionLabel";

export default function PepPdpRouter() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTier, setActiveTier] = useState(1);

  return (
    <section
      id="router"
      className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto max-w-page">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-end">
          <div>
            <SectionLabel number={5} text="Policy Engine // PEP & PDP Router" />
            <h2 className="mt-4 text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-6xl">
              Zero-Trust Routing.{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-sky-400 bg-clip-text text-transparent">
                Every query gated.
              </span>
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs uppercase tracking-widest text-slate-400/80">
            Deterministic Policy Enforcement Point (PEP) and Policy Decision
            Point (PDP) dispatching to 3 tiered execution engines.
          </p>
        </div>

        {/* The Flow Diagram Container */}
        <div className="relative mt-16 rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-2xl sm:p-10 lg:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.36)]">
          {/* Subtle background tech grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-6">
            {/* Box 1: User Query (PEP) */}
            <div className="lg:col-span-3">
              <div className="group relative rounded-2xl border border-white/15 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-cyan-400" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                      PEP INTERCEPT
                    </span>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                </div>

                <div className="mt-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300">
                    BOX 01 // INGRESS
                  </span>
                  <h3 className="mt-1 font-sans text-xl font-bold tracking-tight text-white">
                    User Query
                  </h3>
                  <p className="mt-1 font-mono text-xs text-white/50">
                    Incoming engineering prompt or code transformation request.
                  </p>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-3 font-mono text-[11px] text-cyan-200">
                  <div className="text-white/40">// Request Context:</div>
                  <div>action: &quot;mutate_schema&quot;</div>
                  <div>role: &quot;contributor&quot;</div>
                  <div>stride_risk: &quot;high&quot;</div>
                </div>

                <div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
                  <ShieldCheck size={12} />
                  <span>Enforcing Point Active</span>
                </div>
              </div>
            </div>

            {/* Neural / Circuit Connection Arrow 1 */}
            <div className="relative hidden h-20 items-center justify-center lg:col-span-1 lg:flex">
              <svg className="h-10 w-full overflow-visible" viewBox="0 0 100 20">
                <path
                  d="M 0 10 L 100 10"
                  stroke="rgba(34,211,238,0.25)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {!shouldReduceMotion && (
                  <circle r="3" fill="#22d3ee" className="shadow-lg">
                    <animateMotion
                      path="M 0 10 L 100 10"
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </svg>
            </div>

            {/* Box 2: Tiered Router (PDP Diamond) */}
            <div className="flex flex-col items-center justify-center lg:col-span-4">
              <div className="relative flex h-64 w-64 items-center justify-center">
                {/* Glowing Diamond Outline */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute h-44 w-44 rotate-45 rounded-2xl bg-cyan-500/15 blur-xl animate-pulse"
                />

                {/* Rotated Diamond Card */}
                <div className="relative flex h-40 w-40 rotate-45 items-center justify-center rounded-2xl border-2 border-cyan-400/60 bg-gradient-to-br from-[#070e24] via-black to-[#070e24] shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-transform duration-300 hover:scale-105">
                  {/* Inside content rotated back so text stays horizontal */}
                  <div className="-rotate-45 p-3 text-center">
                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
                      <Zap size={15} />
                    </div>
                    <span className="mt-1.5 block font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                      PDP ENGINE
                    </span>
                    <h3 className="font-sans text-sm font-bold tracking-tight text-white">
                      Tiered Router
                    </h3>
                    <p className="mt-0.5 font-mono text-[9px] text-white/50">
                      Cost &amp; Risk Policy Matrix
                    </p>
                  </div>
                </div>
              </div>

              <span className="mt-4 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 font-mono text-[10px] uppercase tracking-widest text-white/70">
                BOX 02 // POLICY DECISION POINT
              </span>
            </div>

            {/* Neural / Circuit Connection Arrow 2 */}
            <div className="relative hidden h-20 items-center justify-center lg:col-span-1 lg:flex">
              <svg className="h-10 w-full overflow-visible" viewBox="0 0 100 20">
                <path
                  d="M 0 10 L 100 10"
                  stroke="rgba(34,211,238,0.25)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {!shouldReduceMotion && (
                  <circle r="3" fill="#22d3ee">
                    <animateMotion
                      path="M 0 10 L 100 10"
                      dur="1.8s"
                      repeatCount="indefinite"
                      begin="0.9s"
                    />
                  </circle>
                )}
              </svg>
            </div>

            {/* Box 3: The 3 Tiered Pathways */}
            <div className="space-y-3 lg:col-span-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300">
                  BOX 03 // 3-TIER EXECUTION
                </span>
                <span className="font-mono text-[10px] text-white/40">
                  TARGET RESOLUTION
                </span>
              </div>

              {/* Tier 1: Local */}
              <button
                type="button"
                onClick={() => setActiveTier(1)}
                className={`w-full rounded-xl border p-3.5 text-left transition-all duration-200 ${
                  activeTier === 1
                    ? "border-emerald-400/60 bg-emerald-400/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-300">
                    Tier 1 · Local Heuristic
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400/80">
                    &lt;1ms · $0
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-white/60">
                  AST invariants, regex security rules, in-memory cache.
                </p>
              </button>

              {/* Tier 2: Fast LLM */}
              <button
                type="button"
                onClick={() => setActiveTier(2)}
                className={`w-full rounded-xl border p-3.5 text-left transition-all duration-200 ${
                  activeTier === 2
                    ? "border-cyan-400/60 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-300">
                    Tier 2 · Fast LLM
                  </span>
                  <span className="font-mono text-[10px] text-cyan-400/80">
                    120ms · Low
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-white/60">
                  Gemini Flash classification, intent routing, structured parsing.
                </p>
              </button>

              {/* Tier 3: Heavy LLM */}
              <button
                type="button"
                onClick={() => setActiveTier(3)}
                className={`w-full rounded-xl border p-3.5 text-left transition-all duration-200 ${
                  activeTier === 3
                    ? "border-purple-400/60 bg-purple-400/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-purple-300">
                    Tier 3 · Heavy LLM
                  </span>
                  <span className="font-mono text-[10px] text-purple-400/80">
                    Deep Reasoning
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] text-white/60">
                  Claude Sonnet architecture synthesis &amp; adversarial audit.
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
