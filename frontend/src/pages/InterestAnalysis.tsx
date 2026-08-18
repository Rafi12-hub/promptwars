import React from 'react';
import {
  BrainCircuit,
  Sparkles,
  GitBranch,
  Layers,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  ArrowDown,
  Info,
} from 'lucide-react';
import type { InterestProfile } from '../types';
import { DecisionTracePanel } from '../components/DecisionTracePanel';
import { InteractiveNodeGraph } from '../components/InteractiveNodeGraph';

interface InterestAnalysisProps {
  profile: InterestProfile;
}

export const InterestAnalysis: React.FC<InterestAnalysisProps> = ({ profile }) => {
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-2">
        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Explainable AI Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          AI Interest Analysis & Semantic Graph
        </h2>
        <p className="text-xs sm:text-sm text-gray-400">
          How ReelMind AI translates unstructured scroll behavior into structured, verifiable tech learning paths.
        </p>
      </div>

      {/* Primary & Secondary Profile Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950/40 space-y-3 md:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Inferred Primary Interest</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Confidence: {profile.confidence}%
            </span>
          </div>

          <h3 className="text-3xl font-black text-white">{profile.primaryInterest}</h3>

          <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-800 space-y-1">
            <div className="text-xs font-bold text-gray-300 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Inference Rationale</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              {profile.reasoning}
            </p>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Secondary Interest Matrix</h4>
          <div className="space-y-2.5">
            {profile.secondaryInterests.map((sec, i) => (
              <div key={i} className="p-3 rounded-xl bg-gray-900/80 border border-gray-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-200">{sec.label}</span>
                <span className="font-mono text-purple-400 font-bold">{sec.confidence}% affinity</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive 2D Node Network Topology Graph */}
      <InteractiveNodeGraph profile={profile} />

      {/* 9-Step AI Decision Trace Component */}
      <DecisionTracePanel profile={profile} />

      {/* Explicit Scoring Formula Panel */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <HelpCircle className="w-5 h-5 text-indigo-400" />
          <span>Explicit Scoring Formula Architecture</span>
        </h3>
        <p className="text-xs text-gray-400">
          ReelMind AI calculates interest and recommendation scores using a mathematical multi-factor formula rather than simple keyword matches:
        </p>

        <div className="p-4 rounded-xl bg-gray-950 font-mono text-xs text-indigo-300 border border-gray-800 overflow-x-auto">
          Score = (SemanticRelevance × 0.30) + (BehavioralAffinity × 0.25) + (TopicConsistency × 0.15) + (EducationalValue × 0.15) + (CareerValue × 0.15) - HypePenalty - RepetitionPenalty
        </div>
      </div>
    </div>
  );
};
