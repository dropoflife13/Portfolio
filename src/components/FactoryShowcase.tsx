import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Terminal,
  FolderGit2,
  ChevronRight,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";
import { Button } from "@/components/ui/button";

type FactoryStep = {
  command: string;
  title: string;
  agentLabel: string;
  agents: string[];
  description: string;
  artifacts: string[];
  gateStatus: string;
};

const STEPS: FactoryStep[] = [
  {
    command: "/grill",
    title: "Interrogate Problem",
    agentLabel: "PM Agent",
    agents: ["PM"],
    description:
      "Uncovers edge cases and hidden requirements before writing code...",
    artifacts: ["problem-brief.md", "edge-case-matrix.json"],
    gateStatus: "GATE 01 · ASSUMPTIONS VERIFIED",
  },
  {
    command: "/pitch",
    title: "3-Minute Pitch",
    agentLabel: "GR Agent",
    agents: ["GR"],
    description: "Defines the value proposition and business goals...",
    artifacts: ["value-proposition.md", "scope-boundaries.yml"],
    gateStatus: "GATE 02 · SCOPE LOCKED",
  },
  {
    command: "/to-spec",
    title: "Technical PRD",
    agentLabel: "SD Agent",
    agents: ["SD"],
    description: "Drafts the architecture, data model, and failure modes...",
    artifacts: ["architecture-spec.md", "schema.prisma", "failure-modes.md"],
    gateStatus: "GATE 03 · ARCHITECTURE SIGNED OFF",
  },
  {
    command: "/to-tickets",
    title: "Atomic Tasks",
    agentLabel: "PM Agent",
    agents: ["PM"],
    description: "Breaks the spec into sequential, testable chunks...",
    artifacts: ["tickets-dag.json", "acceptance-criteria.md"],
    gateStatus: "GATE 04 · ATOMIC DAG READY",
  },
  {
    command: "/implement",
    title: "Production Code",
    agentLabel: "DB, IR, SEC Agents",
    agents: ["DB", "IR", "SEC"],
    description:
      "Writes secure, append-only code following strict DB rules...",
    artifacts: ["migrations/", "src/modules/", "unit-tests.spec.ts"],
    gateStatus: "GATE 05 · DETERMINISTIC BUILD PASS",
  },
  {
    command: "/review",
    title: "Security Audit",
    agentLabel: "SEC Agent",
    agents: ["SEC"],
    description:
      "Checks the code against STRIDE boundaries and auth invariants...",
    artifacts: ["stride-audit.report", "auth-invariants.log"],
    gateStatus: "GATE 06 · ZERO CRITICAL FINDINGS",
  },
];

export default function FactoryShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [typingState, setTypingState] = useState({
    index: 0,
    text: STEPS[0].description,
  });

  const activeStep = STEPS[activeIndex];

  useEffect(() => {
    const fullText = activeStep.description;
    if (shouldReduceMotion) return;

    let i = 0;
    const interval = window.setInterval(() => {
      i += 1;
      setTypingState({ index: activeIndex, text: fullText.slice(0, i) });
      if (i >= fullText.length) {
        window.clearInterval(interval);
      }
    }, 18);

    return () => window.clearInterval(interval);
  }, [activeIndex, activeStep.description, shouldReduceMotion]);

  const typedText = shouldReduceMotion
    ? activeStep.description
    : typingState.index === activeIndex
      ? typingState.text
      : "";
  const isTyping = typedText.length < activeStep.description.length;

  return (
    <section
      id="factory"
      className="relative overflow-hidden px-6 py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-page">
        {/* Header */}
        <SectionLabel number={3} text="Golden Path · Interactive CLI" />

        <div className="mt-6 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Reveal delay={0.05}>
              <h2 className="section-heading">The Software Factory</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                A 6-step software development lifecycle enforced by my 3D
                knowledge engine. I use 7 specialized AI agents to act as strict
                gatekeepers—ensuring nothing ships without passing the grill,
                the spec, and the security audit.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] px-3.5 py-1.5 font-mono text-xs text-cyan-200">
              <Cpu size={14} className="text-cyan-400" />
              <span>7 Gatekeeper Agents · 6 Enforced Stages</span>
            </div>
          </Reveal>
        </div>

        {/* Split-Pane Code Editor / Command Line Terminal */}
        <Reveal delay={0.2}>
          <div className="mt-12 grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-[#060b18]/90 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl sm:p-6 lg:grid-cols-12">
            {/* Left Side: File Explorer / Command List */}
            <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#040812]/90 p-3 sm:p-4 lg:col-span-5">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] px-2 pb-3">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/60">
                    <FolderGit2 size={14} className="text-cyan-400" />
                    <span>pipeline/commands</span>
                  </div>
                  <span className="font-mono text-[10px] text-cyan-300/70">
                    hover to execute
                  </span>
                </div>

                <ul className="mt-3 space-y-1.5" role="listbox" aria-label="SDLC Pipeline Commands">
                  {STEPS.map((step, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <li key={step.command}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onMouseEnter={() => setActiveIndex(index)}
                          onFocus={() => setActiveIndex(index)}
                          onClick={() => setActiveIndex(index)}
                          className={`group flex w-full items-center justify-between rounded-xl border px-3.5 py-3 text-left transition-all duration-200 ${
                            isActive
                              ? "border-cyan-400/50 bg-cyan-400/[0.1] shadow-[0_0_24px_rgba(34,211,238,0.14)]"
                              : "border-transparent bg-transparent hover:border-white/10 hover:bg-white/[0.03]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <ChevronRight
                              size={15}
                              className={`transition-transform duration-200 ${
                                isActive
                                  ? "translate-x-0.5 text-cyan-300"
                                  : "text-white/25 group-hover:text-white/50"
                              }`}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <code
                                  className={`font-mono text-sm font-semibold ${
                                    isActive ? "text-cyan-300" : "text-white/85"
                                  }`}
                                >
                                  {step.command}
                                </code>
                                <span className="text-xs text-white/45">
                                  — {step.title}
                                </span>
                              </div>
                              <p className="mt-0.5 font-mono text-[11px] text-ink-faint">
                                {step.agentLabel}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                              isActive
                                ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-200"
                                : "border-white/10 bg-white/[0.02] text-white/40"
                            }`}
                          >
                            0{index + 1}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] px-2 pt-3 font-mono text-[11px] text-white/45">
                <span>branch: main*</span>
                <span className="text-emerald-400/90">● strict-mode</span>
              </div>
            </div>

            {/* Right Side: Terminal Window */}
            <div className="flex flex-col justify-between rounded-lg border border-white/10 bg-black p-6 font-mono lg:col-span-7">
              <div>
                {/* Terminal Window Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500/75" />
                    <span className="h-3 w-3 rounded-full bg-amber-400/75" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400/75" />
                    <span className="ml-2 flex items-center gap-1.5 text-xs text-white/60">
                      <Terminal size={13} className="text-cyan-400" />
                      cortex-cli — zsh — 80×24
                    </span>
                  </div>

                  <span className="rounded border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-cyan-300">
                    {activeStep.agentLabel}
                  </span>
                </div>

                {/* Command Prompt Line */}
                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex flex-wrap items-center gap-2 text-white/90">
                    <span className="text-emerald-400">neil@cortex-engine</span>
                    <span className="text-white/40">:</span>
                    <span className="text-cyan-300">~/factory</span>
                    <span className="text-white/40">$</span>
                    <span className="rounded bg-cyan-400/15 px-2 py-0.5 font-semibold text-cyan-200">
                      {activeStep.command}
                    </span>
                    <span className="text-xs text-white/40">
                      --enforced-by=&quot;{activeStep.agents.join(",")}&quot;
                    </span>
                  </div>

                  {/* Typewriter Output Box */}
                  <div className="min-h-[96px] rounded-lg border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-xs uppercase tracking-widest text-white/40">
                      // Stage 0{activeIndex + 1} · {activeStep.title}
                    </p>
                    <p className="mt-2 text-base leading-relaxed text-cyan-200">
                      &gt; {typedText}
                      <span
                        aria-hidden="true"
                        className={`ml-1 inline-block h-4 w-2 translate-y-0.5 bg-cyan-400 ${
                          isTyping ? " opacity-100" : "animate-pulse"
                        }`}
                      />
                    </p>
                  </div>

                  {/* Generated Artifacts & Gatekeeper Telemetry */}
                  <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
                    <div className="rounded-lg border border-white/10 bg-white/[0.015] p-3.5">
                      <p className="text-[10px] uppercase tracking-widest text-white/45">
                        Enforcing Gatekeepers
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {activeStep.agents.map((agent) => (
                          <span
                            key={agent}
                            className="inline-flex items-center gap-1.5 rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs text-cyan-200"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                            {agent} Agent
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-lg border border-white/10 bg-white/[0.015] p-3.5">
                      <p className="text-[10px] uppercase tracking-widest text-white/45">
                        Verified Artifacts
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {activeStep.artifacts.map((artifact) => (
                          <span
                            key={artifact}
                            className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs text-white/75"
                          >
                            {artifact}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terminal Footer Status */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck size={15} />
                  <span>{activeStep.gateStatus}</span>
                </div>
                <span className="text-white/40">
                  exit code 0 · deterministic check passed
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Call to action */}
        <Reveal delay={0.28}>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#070d1f]/75 px-6 py-5 backdrop-blur-xl sm:flex-row">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-cyan-300">
                Live Telemetry Console
              </p>
              <p className="mt-1 text-sm text-ink-muted">
                Inspect the live multi-agent orchestration console and 3D
                knowledge graph in real time.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="h-11 shrink-0 rounded-xl border border-cyan-400/50 bg-cyan-400/15 px-6 font-mono text-xs tracking-wider text-cyan-200 hover:bg-cyan-400/25 hover:shadow-[0_0_24px_rgba(34,211,238,0.3)]"
            >
              <a
                href="https://cortex-gamma-ten.vercel.app/console"
                target="_blank"
                rel="noopener noreferrer"
              >
                [ Launch the Live Factory <ArrowUpRight aria-hidden="true" /> ]
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
