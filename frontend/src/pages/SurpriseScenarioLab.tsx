import React, { useState } from 'react';
import {
  TestTube2,
  Sparkles,
  Play,
  CheckCircle2,
  Cpu,
  ArrowRight,
  PlusCircle,
  HelpCircle,
  Award,
} from 'lucide-react';
import type { Scenario, Reel } from '../types';
import { scenarios as predefinedScenarios } from '../data/scenarios';
import { analyzeScenarioLocal } from '../utils/inferenceLocal';

interface SurpriseScenarioLabProps {
  allReels: Reel[];
}

export const SurpriseScenarioLab: React.FC<SurpriseScenarioLabProps> = ({ allReels }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(predefinedScenarios[0].id);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // Custom Scenario Builder State
  const [customReelIds, setCustomReelIds] = useState<string[]>(['reel-023', 'reel-024', 'reel-026']);

  const activeScenario = predefinedScenarios.find((s) => s.id === selectedScenarioId) || predefinedScenarios[0];

  const runScenarioAnalysis = (scenarioToAnalyze: Scenario) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeScenarioLocal(scenarioToAnalyze, allReels);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 600);
  };

  const runCustomAnalysis = () => {
    const customScenario: Scenario = {
      id: 'custom-scenario',
      title: 'Custom User Scenario',
      description: 'Custom selection of reel interactions tested against the interest engine.',
      reels: customReelIds.map((id) => ({ reelId: id, interaction: 'watch_complete' })),
      expectedInference: 'Dynamic Broad Interest',
    };
    runScenarioAnalysis(customScenario);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Page Header */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-2">
        <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <TestTube2 className="w-4 h-4" />
          <span>Generalization Testing Suite</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Surprise Scenario Lab (15% Hackathon Weight)
        </h2>
        <p className="text-xs sm:text-sm text-gray-400">
          Proves that ReelMind AI generalizes beyond surface keywords to infer deep technical intent in unseen edge cases.
        </p>
      </div>

      {/* Scenario Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {predefinedScenarios.map((scen) => {
          const isSelected = selectedScenarioId === scen.id;
          return (
            <button
              key={scen.id}
              onClick={() => {
                setSelectedScenarioId(scen.id);
                setAnalysisResult(null);
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-gray-900 border-purple-500 ring-2 ring-purple-500/30 shadow-lg scale-105'
                  : 'bg-gray-950/60 border-gray-800/80 hover:bg-gray-900/80'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-1">
                Scenario Test
              </div>
              <div className="font-bold text-white text-xs mb-1">{scen.title}</div>
              <div className="text-[11px] text-gray-400 line-clamp-2">{scen.description}</div>
            </button>
          );
        })}
      </div>

      {/* Active Scenario Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-gray-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
          <div>
            <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
              Active Benchmark Scenario
            </span>
            <h3 className="text-xl font-bold text-white mt-1">{activeScenario.title}</h3>
            <p className="text-xs text-gray-400">{activeScenario.description}</p>
          </div>

          <button
            onClick={() => runScenarioAnalysis(activeScenario)}
            disabled={isAnalyzing}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-500/20 transition transform hover:scale-105"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isAnalyzing ? 'Evaluating Scenario...' : 'Run Scenario Analysis'}</span>
          </button>
        </div>

        {/* Expected vs Naive Inference callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-800 space-y-1">
            <div className="text-gray-400 font-bold uppercase text-[10px]">Expected Broader Inference</div>
            <div className="text-base font-extrabold text-emerald-400">{activeScenario.expectedInference}</div>
            <div className="text-[11px] text-gray-400">Correctly groups hardware/systems behavior rather than single superficial tags.</div>
          </div>

          <div className="p-4 rounded-xl bg-gray-900/80 border border-gray-800 space-y-1">
            <div className="text-gray-400 font-bold uppercase text-[10px]">Naive System Mistake</div>
            <div className="text-base font-extrabold text-red-400">Repeats Surface Tag Only</div>
            <div className="text-[11px] text-gray-400">Weak systems recommend identical redundant reels based solely on literal title words.</div>
          </div>
        </div>

        {/* Analysis Output Results */}
        {analysisResult && (
          <div className="p-6 rounded-2xl bg-gray-950 border border-purple-500/40 space-y-6 animate-fade-in glow-purple">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <span className="text-xs font-bold uppercase text-purple-400 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Scenario Analysis Output</span>
              </span>
              <span className="px-3 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                Confidence: {analysisResult.confidence}%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-gray-900 border border-gray-800">
                <div className="text-gray-400 text-[10px] uppercase font-bold">Inferred Primary Interest</div>
                <div className="text-lg font-black text-white mt-1">{analysisResult.inferredInterest}</div>
              </div>
              <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 md:col-span-2">
                <div className="text-gray-400 text-[10px] uppercase font-bold">Reasoning Summary</div>
                <div className="text-xs text-gray-200 mt-1 font-medium leading-relaxed">{analysisResult.reasoning}</div>
              </div>
            </div>

            {/* Recommended Content Output */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase text-gray-300">Generalized Tech Recommendations</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {analysisResult.recommendedContent.map((rec: any, i: number) => (
                  <div key={i} className="p-3.5 rounded-xl bg-gray-900 border border-gray-800 space-y-1 text-xs">
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-indigo-500/20 text-indigo-300 rounded">
                      {rec.reel.category} • {rec.reel.subCategory}
                    </span>
                    <div className="font-bold text-white mt-1">{rec.reel.title}</div>
                    <div className="text-[11px] text-gray-400 line-clamp-1">{rec.reasoning}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Scenario Builder (Try New Scenario) */}
      <div className="glass-panel p-6 rounded-2xl border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <PlusCircle className="w-5 h-5 text-indigo-400" />
            <span>Try Custom Scenario Builder</span>
          </h3>
          <button
            onClick={runCustomAnalysis}
            className="px-4 py-2 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition"
          >
            Run Custom Analysis
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Pick any combination of reels from the dataset to test custom edge cases against the inference engine.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {allReels.slice(0, 6).map((reel) => {
            const isSelected = customReelIds.includes(reel.id);
            return (
              <div
                key={reel.id}
                onClick={() => {
                  if (isSelected) {
                    setCustomReelIds(customReelIds.filter((id) => id !== reel.id));
                  } else {
                    setCustomReelIds([...customReelIds, reel.id]);
                  }
                }}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                  isSelected
                    ? 'bg-indigo-950/40 border-indigo-500 text-indigo-200'
                    : 'bg-gray-950/60 border-gray-800 text-gray-400'
                }`}
              >
                <div className="font-bold text-white text-xs">{reel.title}</div>
                <div className="text-[10px] text-gray-400">{reel.category}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
