import React, { useState } from 'react';
import { Award, Play, ChevronUp, ChevronDown, CheckCircle2, Cpu } from 'lucide-react';

interface JudgeControlBarProps {
  onSelectScenario: (scenarioId: string) => void;
  onRunFullDemo: () => void;
  isDemoRunning?: boolean;
}

export const JudgeControlBar: React.FC<JudgeControlBarProps> = ({
  onSelectScenario,
  onRunFullDemo,
  isDemoRunning = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className="glass-panel border border-indigo-500/40 rounded-2xl shadow-2xl overflow-hidden bg-gray-950/90 backdrop-blur-xl">
        {/* Toggle Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-950 via-gray-900 to-purple-950 hover:bg-gray-900 flex items-center justify-between space-x-3 text-xs font-bold text-white"
        >
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-indigo-400" />
            <span>🏆 Judge Quick Presets</span>
            <span className="px-2 py-0.5 text-[9px] bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
              Hack2Skill
            </span>
          </div>
          {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronUp className="w-4 h-4 text-gray-400" />}
        </button>

        {/* Expanded Quick Options */}
        {isExpanded && (
          <div className="p-3 space-y-2 text-xs">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Instant Scenario Switcher</div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onSelectScenario('scenario-1')}
                className="p-2 rounded-lg bg-gray-900 hover:bg-purple-600/30 border border-gray-800 text-gray-200 text-left transition"
              >
                🎮 Hardware Gamer
              </button>
              <button
                onClick={() => onSelectScenario('scenario-2')}
                className="p-2 rounded-lg bg-gray-900 hover:bg-purple-600/30 border border-gray-800 text-gray-200 text-left transition"
              >
                🤖 AI Prompt Dev
              </button>
              <button
                onClick={() => onSelectScenario('scenario-3')}
                className="p-2 rounded-lg bg-gray-900 hover:bg-purple-600/30 border border-gray-800 text-gray-200 text-left transition"
              >
                💻 Software Engineer
              </button>
              <button
                onClick={() => onSelectScenario('scenario-4')}
                className="p-2 rounded-lg bg-gray-900 hover:bg-purple-600/30 border border-gray-800 text-gray-200 text-left transition"
              >
                🔒 Cybersecurity
              </button>
            </div>

            <button
              onClick={onRunFullDemo}
              disabled={isDemoRunning}
              className="w-full mt-2 py-2 px-3 rounded-xl font-extrabold text-xs text-white bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-md flex items-center justify-center space-x-1.5 transition"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isDemoRunning ? 'Running Demo...' : '🚀 Start 3-Min Pitch Flow'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
