import React, { useState } from 'react';
import {
  Film,
  FileText,
  Activity,
  Brain,
  ShieldAlert,
  Sliders,
  GraduationCap,
  ChevronRight,
  Info,
} from 'lucide-react';

export const PipelineVisualizer: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<number>(3); // Default to Interest Inference step

  const steps = [
    {
      id: 0,
      title: 'REELS',
      short: 'Raw Input',
      icon: Film,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Step 1',
      details: 'Ingests raw short-form content metadata including title, creator, hashtags, category, and full video transcripts.',
    },
    {
      id: 1,
      title: 'CONTENT UNDERSTANDING',
      short: 'Semantic Extraction',
      icon: FileText,
      color: 'from-indigo-500 to-purple-600',
      badge: 'Step 2',
      details: 'Extracts deep technical concepts, programming languages, framework keywords, and educational depth indicators.',
    },
    {
      id: 2,
      title: 'BEHAVIOR SIGNALS',
      short: 'Action Weights',
      icon: Activity,
      color: 'from-purple-500 to-pink-600',
      badge: 'Step 3',
      details: 'Weights user interactions: Save (+5), Like (+4), Complete Watch (+3), Partial Watch (+1), Skip (-2), Block (-5).',
    },
    {
      id: 3,
      title: 'INTEREST INFERENCE',
      short: 'Broad Clustering',
      icon: Brain,
      color: 'from-pink-500 to-rose-600',
      badge: 'Step 4',
      details: 'Identifies underlying domain interest (e.g., Software Engineering) instead of repeating exact single keywords (Java).',
    },
    {
      id: 4,
      title: 'HYPE FILTER',
      short: 'Clickbait Guard',
      icon: ShieldAlert,
      color: 'from-rose-500 to-amber-600',
      badge: 'Step 5',
      details: 'Scans for sensational claims ("guaranteed job", "get rich in 30 days") and applies score penalties up to -40 points.',
    },
    {
      id: 5,
      title: 'RECOMMENDATION ENGINE',
      short: 'Score & Diversity',
      icon: Sliders,
      color: 'from-amber-500 to-emerald-600',
      badge: 'Step 6',
      details: 'Calculates multi-factor recommendation score and enforces subcategory diversity rules (max 2 per domain).',
    },
    {
      id: 6,
      title: 'USEFUL TECH CONTENT',
      short: 'Skill Roadmaps',
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Step 7',
      details: 'Delivers structured, practical learning content (DSA, Git, System Design, Backend APIs) for real skill growth.',
    },
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 border border-gray-800/80 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800/80 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <span>AI Recommendation Pipeline</span>
            <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
              Interactive System Architecture
            </span>
          </h3>
          <p className="text-xs text-gray-400">Click any step to inspect how ReelMind processes content into skill recommendations</p>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-400">
          <Info className="w-4 h-4 text-indigo-400" />
          <span>Click node to view logic</span>
        </div>
      </div>

      {/* Pipeline Steps Flow */}
      <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isSelected = selectedStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setSelectedStep(step.id)}
              className={`relative p-3 rounded-xl border text-left transition-all duration-200 group flex flex-col justify-between ${
                isSelected
                  ? 'bg-gray-900 border-indigo-500/80 ring-2 ring-indigo-500/30 shadow-lg scale-105 z-10'
                  : 'bg-gray-950/60 border-gray-800/80 hover:bg-gray-900/80 hover:border-gray-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg bg-gradient-to-br ${step.color} p-0.5 flex items-center justify-center shadow-md`}
                  >
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-[9px] font-mono text-gray-400 font-bold">{step.badge}</span>
                </div>
                <div className="text-[11px] font-extrabold text-white leading-tight mb-1">
                  {step.title}
                </div>
                <div className="text-[10px] text-gray-400 leading-none">{step.short}</div>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-20">
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Step Inspector Box */}
      <div className="p-4 rounded-xl bg-gray-900/90 border border-indigo-500/30 flex items-start space-x-3 transition-all animate-fade-in">
        <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 mt-0.5">
          {React.createElement(steps[selectedStep].icon, { className: 'w-5 h-5' })}
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              {steps[selectedStep].badge}: {steps[selectedStep].title}
            </span>
            <span className="text-[10px] text-gray-400">({steps[selectedStep].short})</span>
          </div>
          <p className="text-xs text-gray-200 leading-relaxed">{steps[selectedStep].details}</p>
        </div>
      </div>
    </div>
  );
};
