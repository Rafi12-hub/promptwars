import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Cpu, CheckCircle, ArrowRight, ShieldCheck, Filter } from 'lucide-react';
import type { InterestProfile } from '../types';

interface DecisionTracePanelProps {
  profile: InterestProfile;
}

export const DecisionTracePanel: React.FC<DecisionTracePanelProps> = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(true);

  const steps = [
    {
      num: 1,
      title: 'Analyze Reel Content Signals',
      desc: 'Ingest title, caption, creator metadata, tags, and full audio transcripts from user feed activity.',
      badge: 'Signal Ingestion',
    },
    {
      num: 2,
      title: 'Extract Topics & Skill Embeddings',
      desc: 'Map keywords to technical domains (Java, Git, REST, JVM, DSA, Docker) with multi-tag weightings.',
      badge: 'Feature Extraction',
    },
    {
      num: 3,
      title: 'Evaluate Behavioral Action Weights',
      desc: 'Assign behavioral weights (Save: +5, Like: +4, Watch Complete: +3, Watch Partial: +1, Skip: -2, Block: -5).',
      badge: 'Behavior Weighting',
    },
    {
      num: 4,
      title: 'Detect Broad Recurring Patterns',
      desc: 'Cross-reference interactions over time to detect multi-topic clusters rather than isolated keywords.',
      badge: 'Pattern Analysis',
    },
    {
      num: 5,
      title: 'Infer Broader Domain Interest',
      desc: `Inferred primary interest: "${profile.primaryInterest}" with ${profile.confidence}% confidence.`,
      badge: 'Interest Inference',
      highlight: true,
    },
    {
      num: 6,
      title: 'Generate Cross-Domain Candidates',
      desc: 'Fetch candidates covering related foundational skills (DSA, Architecture, Version Control, Systems).',
      badge: 'Candidate Retrieval',
    },
    {
      num: 7,
      title: 'Score Educational & Career Value',
      desc: 'Evaluate practical tutorial depth, skill relevance, and career advancement potential.',
      badge: 'Value Scoring',
    },
    {
      num: 8,
      title: 'Execute Hype & Clickbait Filter',
      desc: 'Penalize exaggerated career claims ("guaranteed job in 30 days", "AI replaces devs") by up to -40 points.',
      badge: 'Hype Filtering',
    },
    {
      num: 9,
      title: 'Rank & Enforce Diversity Rules',
      desc: 'Cap recommendations at max 2 per subcategory to ensure broad, structured skill progression.',
      badge: 'Final Selection',
    },
  ];

  return (
    <div className="glass-panel rounded-2xl border border-gray-800/80 overflow-hidden shadow-xl">
      {/* Header Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gray-900/80 hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>AI Decision Trace</span>
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
                Transparent Reasoning
              </span>
            </h3>
            <p className="text-xs text-gray-400">9-Step Explainable Inference Pipeline Execution</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <span>{isOpen ? 'Collapse Trace' : 'Expand Trace'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expandable Trace Details */}
      {isOpen && (
        <div className="p-6 bg-gray-950/60 border-t border-gray-800/60 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {steps.map((step) => (
              <div
                key={step.num}
                className={`p-3.5 rounded-xl border text-xs transition-all ${
                  step.highlight
                    ? 'bg-indigo-950/40 border-indigo-500/50 text-indigo-200 shadow-lg shadow-indigo-950/50'
                    : 'bg-gray-900/60 border-gray-800/80 text-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-gray-800 border border-gray-700 text-[10px] font-bold text-gray-300 flex items-center justify-center">
                    {step.num}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                      step.highlight
                        ? 'bg-indigo-500/30 text-indigo-300'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {step.badge}
                  </span>
                </div>
                <div className="font-bold text-white mb-1 text-xs">{step.title}</div>
                <p className="text-[11px] text-gray-400 leading-snug">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-gray-300">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>
                Engine completed decision trace in <strong className="text-emerald-400">12ms</strong> (Local Engine Mode)
              </span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <span>Hype Filter: Active</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400 ml-1" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
