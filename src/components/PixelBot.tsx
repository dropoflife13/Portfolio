'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type AgentCode = 'DB' | 'SEC' | 'UX' | 'PM' | 'SD' | 'IR' | 'GR' | 'RS' | 'ARB';

export interface AgentMeta {
  code: AgentCode;
  id: string;
  name: string;
  role: string;
  colorName: string;
  color: string;
  colorLight: string;
  colorDark: string;
  glowColor: string;
  badgeBg: string;
  borderColor: string;
  textColor: string;
  invariants: string;
  description: string;
  samplePrompt: string;
}

export const AGENT_REGISTRY: Record<AgentCode, AgentMeta> = {
  DB: {
    code: 'DB',
    id: 'dbaagent',
    name: 'Database Agent',
    role: 'The Archivist',
    colorName: 'Blue',
    color: '#2563eb',
    colorLight: '#60a5fa',
    colorDark: '#1e40af',
    glowColor: 'rgba(59, 130, 246, 0.6)',
    badgeBg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-400',
    invariants: 'DB-01 to DB-14: Immutability, RLS, Indexes',
    description: 'Enforces append-only schemas, strict Row-Level Security, and indexing integrity.',
    samplePrompt: 'Audit my schema for append-only immutability and missing RLS policies.',
  },
  SEC: {
    code: 'SEC',
    id: 'securityagent',
    name: 'Security Agent',
    role: 'The Sentinel',
    colorName: 'Red',
    color: '#dc2626',
    colorLight: '#f87171',
    colorDark: '#991b1b',
    glowColor: 'rgba(239, 68, 68, 0.6)',
    badgeBg: 'bg-red-500/15 text-red-400 border-red-500/30',
    borderColor: 'border-red-500',
    textColor: 'text-red-400',
    invariants: 'SEC-01 to SEC-15: STRIDE, Externalized AuthZ, Secret Isolation',
    description: 'Guards against privilege escalation, externalizes PDP/PEP authorization, and insulates secrets.',
    samplePrompt: 'Review my authentication flow against STRIDE threat modeling and PDP/PEP patterns.',
  },
  UX: {
    code: 'UX',
    id: 'uiuxagent',
    name: 'UI/UX Agent',
    role: 'The Stylist',
    colorName: 'Purple',
    color: '#9333ea',
    colorLight: '#c084fc',
    colorDark: '#6b21a8',
    glowColor: 'rgba(168, 85, 247, 0.6)',
    badgeBg: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-400',
    invariants: 'UX-01 to UX-15: Cognitive Friction, A11y, Visual Hierarchy',
    description: 'Eliminates cognitive drag, polishes cyber-terminal ergonomics, and ensures WCAG a11y compliance.',
    samplePrompt: 'How can I reduce cognitive friction and streamline the operator experience for this view?',
  },
  PM: {
    code: 'PM',
    id: 'productmanageragent',
    name: 'Product Manager Agent',
    role: 'The Inquisitor',
    colorName: 'Yellow',
    color: '#ca8a04',
    colorLight: '#fde047',
    colorDark: '#854d0e',
    glowColor: 'rgba(234, 179, 8, 0.6)',
    badgeBg: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-400',
    invariants: 'PM-01 to PM-14: Problem Interrogation, Edge Cases, Acceptance Criteria',
    description: 'Interrogates assumptions with 5 hard questions, draws strict scope boundaries, and enforces PRD rigor.',
    samplePrompt: 'Interrogate this feature request with 5 edge-case questions before we write any code.',
  },
  SD: {
    code: 'SD',
    id: 'systemsdesignagent',
    name: 'Systems Design Agent',
    role: 'The Architect',
    colorName: 'Cyan',
    color: '#0891b2',
    colorLight: '#22d3ee',
    colorDark: '#155e75',
    glowColor: 'rgba(6, 182, 212, 0.6)',
    badgeBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    borderColor: 'border-cyan-500',
    textColor: 'text-cyan-400',
    invariants: 'SD-01 to SD-14: Architecture Boundaries, Failure Modes, Data Contracts',
    description: 'Defines As-Is and To-Be architectures, specifies failure topologies, and enforces zero circular dependencies.',
    samplePrompt: 'Draft an architectural technical specification (TRD) with explicit failure modes and data contracts.',
  },
  IR: {
    code: 'IR',
    id: 'integrationagent',
    name: 'Integration Agent',
    role: 'The Lineman',
    colorName: 'Orange',
    color: '#ea580c',
    colorLight: '#fb923c',
    colorDark: '#9a3412',
    glowColor: 'rgba(249, 115, 22, 0.6)',
    badgeBg: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-400',
    invariants: 'IR-01 to IR-14: API Resilience, Offline Queues, Idempotent Retries',
    description: 'Hardens external endpoints, provisions resilient retry backoffs, and maintains offline sync queues.',
    samplePrompt: 'Design an idempotent retry policy and dead-letter queue for external third-party webhook integrations.',
  },
  GR: {
    code: 'GR',
    id: 'growthagent',
    name: 'Growth Agent',
    role: 'The Catalyst',
    colorName: 'Green',
    color: '#16a34a',
    colorLight: '#4ade80',
    colorDark: '#14532d',
    glowColor: 'rgba(34, 197, 94, 0.6)',
    badgeBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-400',
    invariants: 'GR-01 to GR-14: Executive Pitch, Activation Loops, Speed to Value',
    description: 'Synthesizes value propositions, writes high-conviction 3-minute pitches, and accelerates user time-to-aha.',
    samplePrompt: 'Craft a punchy 3-minute executive pitch selling the architectural upgrade to leadership.',
  },
  RS: {
    code: 'RS',
    id: 'researchagent',
    name: 'Research Agent',
    role: 'The Epistemologist',
    colorName: 'White',
    color: '#cbd5e1',
    colorLight: '#ffffff',
    colorDark: '#64748b',
    glowColor: 'rgba(248, 250, 252, 0.8)',
    badgeBg: 'bg-slate-200/20 text-slate-200 border-slate-300/30',
    borderColor: 'border-slate-300',
    textColor: 'text-slate-200',
    invariants: 'RS-01 to RS-14: Anti-Hallucination, Source Triangulation, Epistemic Rigor',
    description: 'Mandates source triangulation, separates verifiable facts from opinions, and executes the "I don\'t know" rule.',
    samplePrompt: 'Triangulate this claim across primary sources and flag any potential hallucinations or ungrounded assumptions.',
  },
  ARB: {
    code: 'ARB',
    id: 'arbiter',
    name: 'Judgment Arbiter',
    role: 'The Supreme Court',
    colorName: 'Crimson Gold',
    color: '#e11d48',
    colorLight: '#fb7185',
    colorDark: '#881337',
    glowColor: 'rgba(225, 29, 72, 0.7)',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    borderColor: 'border-rose-500',
    textColor: 'text-rose-400',
    invariants: 'ARB-01 to ARB-06: Domain Separation, Conflict Fallback, Fact vs. Opinion, Precautionary Principle, Trend Verification, Seeding Boundaries',
    description: 'The Supreme Court of the Cortex. Resolves conflicts between domains and enforces your core invariants when rules contradict.',
    samplePrompt: 'Resolve a conflict between aggressive growth metrics (GR/MKT) and clinical safety invariants (MED/HLT).',
  },
};

/**
 * 16x16 Pixel Maps for each of the 8 robots + Arbiter
 */
const SPRITE_MAPS: Record<AgentCode, string[]> = {
  DB: [
    '....#......#....',
    '....#......#....',
    '...###....###...',
    '..############..',
    '.#SSSSSSSSSSSS#.',
    '.#SPPEEEEEEPPS#.',
    '.#SPPD#EED#PPS#.',
    '.#SPPD####DPPS#.',
    '..############..',
    '.##############.',
    '.#SS#X#X#X#X#SS#.',
    '.#PP#X#X#X#X#PP#.',
    '.#DD#X#X#X#X#DD#.',
    '..############..',
    '..###......###..',
    '.#####....#####.',
  ],
  SEC: [
    '..#..........#..',
    '..##........##..',
    '..###......###..',
    '.##############.',
    '#SSSSSSSSSSSSSS#',
    '#SPPPD#EE#DPPPS#',
    '#SPPPD#EE#DPPPS#',
    '.#SPD######DPS#.',
    '..############..',
    '################',
    '#SS#DPPXXPPD#SS#',
    '#PP#DPXXXXPD#PP#',
    '#DD#DDPXXPDD#DD#',
    '.##############.',
    '..####....####..',
    '.######..######.',
  ],
  UX: [
    '...X........X...',
    '...#........#...',
    '...#...##...#...',
    '..############..',
    '.#SSSSSSSSSSSS#.',
    '.#SP#EE##EE#PS#.',
    '.#SP#EE##EE#PS#.',
    '.#SPPD#WW#DPPS#.',
    '..############..',
    '..############..',
    '.#SS#DXXXXD#SS#.',
    '.#PP#DXXXXD#PP#.',
    '..##DDPPPDD##...',
    '...##########...',
    '....###..###....',
    '....#X#..#X#....',
  ],
  PM: [
    '.......##.......',
    '......####......',
    '....########....',
    '...##########...',
    '..#SSSSSSSSSS#..',
    '.##SP#EE##EE#PS#',
    '.##SP#EE##EE#PS#',
    '..#SPPD##DPPS#..',
    '...##########...',
    '..############..',
    '.#SS#DPXXXXPD#SS#',
    '.#PP#DPXWWXPD#PP#',
    '.#DD#DPXXXXPD#DD#',
    '..############..',
    '..###......###..',
    '.#####....#####.',
  ],
  SD: [
    '#..............#',
    '##............##',
    '###..######..###',
    '.##.########.##.',
    '..#SSSSSSSSSS#..',
    '.#SP#EEEEEE#PS#.',
    '.#SP#EEEEEE#PS#.',
    '..#SPPD##DPPS#..',
    '...##########...',
    '################',
    '.#SS#D#XWX#D#SS#.',
    '.#PP#DXXWXXD#PP#.',
    '.#DD#D#XWX#D#DD#.',
    '..############..',
    '...####..####...',
    '..######.######.',
  ],
  IR: [
    '......XXXX......',
    '.....######.....',
    '....########....',
    '...##########...',
    '..#SSSSSSSSSS#..',
    '.##SP#EE##EE#PS#',
    '.##SP#EE##EE#PS#',
    '..#SPPD##DPPS#..',
    '...##########...',
    '.##############.',
    '#SS#D#X##X#D#SS#',
    '#PP#D#X##X#D#PP#',
    '#DD#D######D#DD#',
    '.##############.',
    '.##############.',
    '.##############.',
  ],
  GR: [
    '.......##.......',
    '......####......',
    '.#...######...#.',
    '.##.########.##.',
    '.##SSSSSSSSSS##.',
    '.#SP#EE##EE#PS#.',
    '.#SP#EE##EE#PS#.',
    '..#SPPD##DPPS#..',
    '...##########...',
    '..############..',
    '.#SS#D##X##D#SS#.',
    '.#PP#D#XXX#D#PP#.',
    '.#DD#D##X##D#DD#.',
    '..############..',
    '..####....####..',
    '..#XX#....#XX#..',
  ],
  RS: [
    '....########....',
    '...#XXXXXXXX#...',
    '....########....',
    '.......##.......',
    '..#SSSSSSSSSS#..',
    '.#SP#EE##EX#PS#.',
    '.#SP#EE##XX#PS#.',
    '..#SPPD##DPPS#..',
    '...##########...',
    '.##############.',
    '.#SS#D#XWWX#D#SS#',
    '.#PP#D#WWWW#D#PP#',
    '.#DD#D#XWWX#D#DD#',
    '..############..',
    '...##########...',
    '....########....',
  ],
  ARB: [
    '..X....XX....X..',
    '..#...####...#..',
    '..############..',
    '.#XXXXXXXXXXXX#.',
    '.#SSSSSSSSSSSS#.',
    '.#SP#EE##EE#PS#.',
    '.#SP#EE##EE#PS#.',
    '..#SPPD##DPPS#..',
    '...##########...',
    '################',
    '#SS#XXXXXXXX#SS#',
    '#PP#X#PWWP#X#PP#',
    '#DD#XX#WW#XX#DD#',
    '.##############.',
    '..####....####..',
    '.######..######.',
  ],
};

export interface PixelBotProps {
  code: AgentCode | string;
  size?: number;
  showNameTag?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function PixelBot({
  code,
  size = 48,
  showNameTag = true,
  className = '',
  onClick,
}: PixelBotProps) {
  const upperCode = (code || 'SD').toUpperCase() as AgentCode;
  const meta: AgentMeta = AGENT_REGISTRY[upperCode] || AGENT_REGISTRY.SD;
  const spriteMap = SPRITE_MAPS[upperCode] || SPRITE_MAPS.SD;

  const defaultEyeColors: Record<string, string> = {
    DB: '#93c5fd',
    SEC: '#fca5a5',
    UX: '#f3e8ff',
    PM: '#fef08a',
    SD: '#a5f3fc',
    IR: '#fed7aa',
    GR: '#bbf7d0',
    RS: '#38bdf8',
    ARB: '#fde047',
  };

  const eyeColor = defaultEyeColors[upperCode] || meta.colorLight || '#ffffff';

  const resolveColor = (char: string): string => {
    switch (char) {
      case '#':
        return '#080d1a';
      case 'P':
        return meta.color;
      case 'S':
        return meta.colorLight;
      case 'D':
        return meta.colorDark;
      case 'E':
        return eyeColor;
      case 'X':
        if (upperCode === 'ARB') return '#fbbf24';
        if (upperCode === 'SEC') return '#fbbf24';
        if (upperCode === 'UX') return '#f472b6';
        if (upperCode === 'IR') return '#facc15';
        if (upperCode === 'RS') return '#0284c7';
        if (upperCode === 'GR') return '#86efac';
        if (upperCode === 'DB') return '#38bdf8';
        if (upperCode === 'PM') return '#ffffff';
        return '#fbbf24';
      case 'W':
        return '#ffffff';
      default:
        return 'transparent';
    }
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`relative inline-flex flex-col items-center select-none group ${className}`}
      title={`${meta.name} (${meta.code}) · ${meta.role}`}
    >
      <motion.div
        whileHover={{ scale: 1.1, y: -4 }}
        transition={{ duration: 0.2 }}
        className="relative flex items-center justify-center"
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 16 16"
          style={{
            imageRendering: 'pixelated',
            shapeRendering: 'crispEdges',
            filter: `drop-shadow(0 4px 8px rgba(0,0,0,0.5)) drop-shadow(0 0 8px ${meta.glowColor})`,
          }}
        >
          {spriteMap.map((rowStr, y) =>
            rowStr.split('').map((char, x) => {
              if (char === '.') return null;
              const fill = resolveColor(char);
              return (
                <rect
                  key={`${x}-${y}`}
                  x={x}
                  y={y}
                  width={1}
                  height={1}
                  fill={fill}
                />
              );
            })
          )}
        </svg>
      </motion.div>

      {showNameTag && (
        <div className="mt-1 flex flex-col items-center">
          <div className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider flex items-center gap-1 border border-white/10 bg-black/60 text-slate-300 group-hover:border-white/30 transition-colors">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: meta.color,
                boxShadow: `0 0 6px ${meta.color}`,
              }}
            />
            <span>{meta.code}</span>
          </div>
        </div>
      )}
    </div>
  );
}

