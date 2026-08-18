import React from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, HelpCircle, ArrowUpRight, Award } from 'lucide-react';
import type { Recommendation } from '../types';

interface WhyThisReelModalProps {
  recommendation: Recommendation | null;
  onClose: () => void;
}

export const WhyThisReelModal: React.FC<WhyThisReelModalProps> = ({ recommendation, onClose }) => {
  if (!recommendation) return null;

  const { reel, score, reasoning, connectionToInterest, usefulness, whyNotOther, confidence } = recommendation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden glass-panel">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-900/60">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Recommendation Transparency</h3>
              <p className="text-xs text-gray-400">Explainable Reasoning Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Target Reel Card */}
          <div className="p-4 rounded-xl bg-gray-950/70 border border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                {reel.category} • {reel.subCategory}
              </span>
              <h4 className="text-base font-bold text-white mt-1">{reel.title}</h4>
              <p className="text-xs text-gray-400">By {reel.creator}</p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-xs text-gray-400 font-medium">Relevance Score</div>
                <div className="text-2xl font-black text-indigo-400">{score.final}<span className="text-sm text-gray-400">/100</span></div>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="capitalize">{confidence} Confidence</span>
              </div>
            </div>
          </div>

          {/* Reasoning Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box 1: Why recommended */}
            <div className="p-4 rounded-xl bg-gray-900/80 border border-indigo-500/20 space-y-2">
              <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Why This Was Recommended</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-medium">{reasoning}</p>
            </div>

            {/* Box 2: Connection */}
            <div className="p-4 rounded-xl bg-gray-900/80 border border-purple-500/20 space-y-2">
              <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
                <ArrowUpRight className="w-4 h-4" />
                <span>Interest Connection</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-medium">{connectionToInterest}</p>
            </div>

            {/* Box 3: Practical Usefulness */}
            <div className="p-4 rounded-xl bg-gray-900/80 border border-emerald-500/20 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Skill & Career Usefulness</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-medium">{usefulness}</p>
            </div>

            {/* Box 4: Why not another reel */}
            <div className="p-4 rounded-xl bg-gray-900/80 border border-pink-500/20 space-y-2">
              <div className="flex items-center space-x-2 text-pink-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Why Not Supericial Hype Content?</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-medium">{whyNotOther}</p>
            </div>
          </div>

          {/* Mathematical Score Formula Breakdown */}
          <div className="p-4 rounded-xl bg-gray-950/90 border border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-gray-300 flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4 text-indigo-400" />
                <span>Score Breakdown Formula</span>
              </span>
              <span className="text-[11px] font-mono text-gray-400">
                Formula: (Semantic × 0.3) + (Behavior × 0.25) + (Topic × 0.15) + (Edu × 0.15) + (Career × 0.15) - Penalties
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-gray-900 border border-gray-800">
                <div className="text-gray-400 text-[10px]">Semantic Match</div>
                <div className="text-sm font-bold text-indigo-400">{score.semanticRelevance}</div>
              </div>
              <div className="p-2 rounded-lg bg-gray-900 border border-gray-800">
                <div className="text-gray-400 text-[10px]">Behavioral Affinity</div>
                <div className="text-sm font-bold text-purple-400">{score.behavioralAffinity}</div>
              </div>
              <div className="p-2 rounded-lg bg-gray-900 border border-gray-800">
                <div className="text-gray-400 text-[10px]">Educational Value</div>
                <div className="text-sm font-bold text-emerald-400">{score.educationalValue}</div>
              </div>
              <div className="p-2 rounded-lg bg-gray-900 border border-gray-800">
                <div className="text-gray-400 text-[10px]">Hype Penalty</div>
                <div className="text-sm font-bold text-red-400">-{score.hypePenalty}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800 bg-gray-900/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
