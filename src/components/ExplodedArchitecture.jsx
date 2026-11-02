import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FileCode2,
  Database,
  Cpu,
  Terminal,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import SectionLabel from "./SectionLabel";
import PixelBot from "./PixelBot";

const LAYERS = [
  {
    id: "vault",
    name: "The Brain Vault",
    tagline: "Declarative Source of Truth",
    badge: "LAYER 01 // SPEC",
    icon: FileCode2,
    accent: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.25)",
    items: [
      { name: "CLAUDE.md", desc: "Core Governance Rules" },
      { name: "stride-security.md", desc: "Threat Modeling" },
      { name: "rls-policies.sql", desc: "Row-Level Constraints" },
      { name: "prd-invariants.json", desc: "Immutable Specs" },
    ],
    metric: "280+ Active Invariants",
  },
  {
    id: "domains",
    name: "The 29 Domains",
    tagline: "Taxonomy & Architectural Shards",
    badge: "LAYER 02 // TAXONOMY",
    icon: Database,
    accent: "#2dd4bf",
    glow: "rgba(45, 212, 191, 0.25)",
    tags: [
      "Auth & Identity",
      "Append-Only DB",
      "STRIDE Invariants",
      "Row-Level Security",
      "Next.js App Router",
      "Three.js / WebGL",
      "State Machines",
      "CQRS & Replicas",
      "Idempotent Queues",
      "Zero-Trust Boundaries",
      "Offline-First Sync",
      "Telemetry & Tracing",
    ],
    metric: "29 Domain Ontologies",
  },
  {
    id: "agents",
    name: "The 8 Agents & Arbiter",
    tagline: "Autonomous Verification Pipeline",
    badge: "LAYER 03 // RUNTIME",
    icon: Cpu,
    accent: "#a855f7",
    glow: "rgba(168, 85, 247, 0.25)",
    agentsList: [
      { code: "PM", role: "Product", desc: "Problem Interrogation" },
      { code: "SD", role: "Systems", desc: "TRD & Failure Modes" },
      { code: "UX", role: "Frontend", desc: "Accessible Systems" },
      { code: "DB", role: "Database", desc: "Append-Only RLS" },
      { code: "IR", role: "Reliability", desc: "Queues & Outboxes" },
      { code: "SEC", role: "Security", desc: "STRIDE Auditor" },
      { code: "GR", role: "Growth", desc: "Value Proposition" },
      { code: "ARB", role: "Arbiter", desc: "Final Gatekeeper" },
    ],
    metric: "8 Specialized Gatekeepers",
  },
];

export default function ExplodedArchitecture() {
  const shouldReduceMotion = useReducedMotion();
  const [activeLayer, setActiveLayer] = useState(null);

  return (
    <section
      id="architecture"
      className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto max-w-page">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <SectionLabel number={2} text="Architecture // Exploded View" />
            <h2 className="mt-4 text-4xl font-black tracking-tighter text-white sm:text-5xl md:text-6xl dark:text-white">
              Decoupled by design.{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-sky-400 bg-clip-text text-transparent">
                Governed in depth.
              </span>
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs uppercase tracking-widest text-ink-muted">
            Three stacked cognitive layers wired into a central deterministic
            verification core. Hover each layer to inspect.
          </p>
        </div>

        {/* The Exploded Diagram */}
        <div className="relative mt-16 rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.36)] sm:p-10 lg:p-14">
          {/* Subtle tech background grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* The Floating Stacked Layers (Exploded View) */}
            <div className="space-y-5 lg:col-span-8">
              {LAYERS.map((layer, index) => {
                const isActive = activeLayer === layer.id;
                const LayerIcon = layer.icon;

                return (
                  <motion.div
                    key={layer.id}
                    onMouseEnter={() => setActiveLayer(layer.id)}
                    onMouseLeave={() => setActiveLayer(null)}
                    animate={
                      shouldReduceMotion
                        ? {}
                        : {
                            y: isActive ? -6 : [0, -3, 0],
                            scale: isActive ? 1.015 : 1,
                          }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0.2 }
                        : {
                            y: isActive
                              ? { duration: 0.2 }
                              : {
                                  duration: 4.5 + index * 0.8,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: index * 0.4,
                                },
                            scale: { duration: 0.25 },
                          }
                    }
                    className={`group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${
                      isActive
                        ? "border-cyan-400/60 bg-[#070e24]/90 shadow-[0_0_36px_rgba(34,211,238,0.2)]"
                        : "border-white/10 bg-[#050a18]/70 hover:border-white/20"
                    }`}
                  >
                    {/* Layer accent glow */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full blur-2xl transition-opacity duration-300"
                      style={{
                        backgroundColor: layer.glow,
                        opacity: isActive ? 0.9 : 0.2,
                      }}
                    />

                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10"
                          style={{
                            backgroundColor: `${layer.accent}15`,
                            color: layer.accent,
                          }}
                        >
                          <LayerIcon size={18} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300/80">
                              {layer.badge}
                            </span>
                          </div>
                          <h3 className="font-sans text-xl font-bold tracking-tight text-white sm:text-2xl">
                            {layer.name}
                          </h3>
                        </div>
                      </div>

                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-white/70">
                        {layer.metric}
                      </span>
                    </div>

                    <p className="mt-3 text-xs font-mono uppercase tracking-wider text-ink-muted">
                      {layer.tagline}
                    </p>

                    {/* Specific Layer Content Visuals */}
                    {layer.id === "vault" && (
                      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {layer.items.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-3.5 py-2 font-mono text-xs text-white/90"
                          >
                            <span className="flex items-center gap-2 text-cyan-300">
                              <Terminal size={13} />
                              {item.name}
                            </span>
                            <span className="text-[10px] text-white/45">
                              {item.desc}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {layer.id === "domains" && (
                      <div className="mt-4 space-y-4">
                        {/* 8 Autonomous Pixel Bot Gatekeepers */}
                        <div className="rounded-xl border border-teal-400/25 bg-black/40 p-3.5 backdrop-blur-md">
                          <div className="mb-2.5 flex items-center justify-between">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-teal-300">
                              Autonomous Governance Bots // Active Mesh
                            </span>
                            <span className="font-mono text-[10px] text-white/40">
                              8 Agents Guarding 29 Shards
                            </span>
                          </div>
                          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 items-center justify-items-center pt-1">
                            {["DB", "SEC", "UX", "PM", "SD", "IR", "GR", "RS"].map((code) => (
                              <PixelBot key={code} code={code} size={36} showNameTag={true} />
                            ))}
                          </div>
                        </div>

                        {/* Domain Taxonomy Tags */}
                        <div className="flex flex-wrap gap-2">
                          {layer.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-lg border border-teal-400/20 bg-teal-400/10 px-2.5 py-1 font-mono text-[11px] text-teal-200"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {layer.id === "agents" && (
                      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {layer.agentsList.map((agent) => (
                          <div
                            key={agent.code}
                            className="rounded-xl border border-purple-400/20 bg-purple-400/[0.08] p-2.5 font-mono text-xs"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-purple-300">
                                {agent.code}
                              </span>
                              <span className="text-[10px] text-white/40">
                                {agent.role}
                              </span>
                            </div>
                            <p className="mt-1 line-clamp-1 text-[10px] text-white/60">
                              {agent.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* The Center: Cortex Core with Dotted Connecting Lines */}
            <div className="relative flex flex-col items-center justify-center p-6 lg:col-span-4">
              {/* Radial glow backdrop */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl animate-pulse"
              />

              {/* The Glowing Cortex Core Visual */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-cyan-400/60 bg-gradient-to-br from-cyan-400/20 via-[#070e24] to-purple-500/20 shadow-[0_0_50px_rgba(34,211,238,0.4)] backdrop-blur-xl">
                  {/* Concentric rotating rings */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-3 rounded-full border border-dashed border-cyan-400/30 animate-spin"
                    style={{ animationDuration: "35s" }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-6 rounded-full border border-white/10"
                  />

                  <div className="flex flex-col items-center justify-center">
                    <Sparkles className="h-8 w-8 text-cyan-300 animate-pulse" />
                    <span className="mt-1 font-mono text-[9px] font-bold uppercase tracking-widest text-cyan-200">
                      CORTEX
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cyan-300">
                    CENTRAL ARBITER CORE
                  </span>
                  <h4 className="mt-2 font-sans text-lg font-bold text-white">
                    Judgment Arbiter · Autonomous Governor
                  </h4>
                  <p className="mt-1 max-w-[260px] font-mono text-xs text-slate-400/80">
                    The Supreme Court of Cortex. Resolves cross-domain conflicts
                    &amp; enforces 280+ active invariants across all tiers.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pixel HQ Command Center Link Card */}
          <a
            href="https://cortex-gamma-ten.vercel.app/hq"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-cyan-400/40 bg-gradient-to-r from-cyan-950/40 via-[#070e24] to-purple-950/30 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(34,211,238,0.25)] sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/40 bg-cyan-400/10 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <Cpu className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-ping rounded-full bg-cyan-400" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300">
                    COMMAND CENTER ACCESS
                  </span>
                </div>
                <h4 className="font-sans text-base font-bold text-white transition-colors group-hover:text-cyan-200">
                  Enter the Pixel HQ ↗
                </h4>
                <p className="mt-0.5 font-mono text-xs text-slate-400">
                  Watch the 8 autonomous agents manage the Cortex reactor in real-time.
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 font-mono text-xs font-semibold text-cyan-200 transition-all group-hover:bg-cyan-400 group-hover:text-slate-950">
              Launch HQ <ArrowUpRight size={14} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
