import React, { useState } from 'react';
import { Brain, Layers, GitBranch, Sparkles, CheckCircle2 } from 'lucide-react';
import type { InterestProfile } from '../types';

interface NodeGraphProps {
  profile: InterestProfile;
}

export const InteractiveNodeGraph: React.FC<NodeGraphProps> = ({ profile }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>('root');

  const nodes = [
    { id: 'root', label: profile.primaryInterest, type: 'primary', level: 0, x: 50, y: 15, score: profile.confidence, desc: 'Central Inferred Primary Domain Interest' },
    { id: 'sub-1', label: 'Data Structures & Algorithms', type: 'sub', level: 1, x: 20, y: 45, score: 88, desc: 'Sub-domain: Coding Interview Prep, Arrays, Graphs' },
    { id: 'sub-2', label: 'Version Control & DevTools', type: 'sub', level: 1, x: 50, y: 45, score: 92, desc: 'Sub-domain: Git, Branching, GitHub Actions, CI/CD' },
    { id: 'sub-3', label: 'Backend & System Design', type: 'sub', level: 1, x: 80, y: 45, score: 85, desc: 'Sub-domain: REST APIs, Databases, Scalability, Load Balancers' },
    { id: 'reel-1', label: 'Java Memory Reel', type: 'signal', level: 2, x: 12, y: 80, score: 75, desc: 'Watched Signal: JVM Heap/Stack Memory Allocation' },
    { id: 'reel-2', label: 'Dev Lifestyle Vlog', type: 'signal', level: 2, x: 38, y: 80, score: 80, desc: 'Watched Signal: Software Engineering Day in Life' },
    { id: 'reel-3', label: 'Interview Joke Reel', type: 'signal', level: 2, x: 62, y: 80, score: 82, desc: 'Watched Signal: Top Coding Interview Mistakes' },
    { id: 'reel-4', label: 'Git Branching Reel', type: 'signal', level: 2, x: 88, y: 80, score: 95, desc: 'Watched Signal: How Git Branching Actually Works' },
  ];

  const connections = [
    { from: 'root', to: 'sub-1' },
    { from: 'root', to: 'sub-2' },
    { from: 'root', to: 'sub-3' },
    { from: 'sub-1', to: 'reel-1' },
    { from: 'sub-1', to: 'reel-3' },
    { from: 'sub-2', to: 'reel-4' },
    { from: 'sub-3', to: 'reel-2' },
  ];

  const activeNodeData = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-gray-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-4">
        <div>
          <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-purple-500/20 text-purple-300 rounded border border-purple-500/30">
            Interactive Network Topology
          </span>
          <h3 className="text-xl font-bold text-white mt-1">2D Semantic Interest Network Graph</h3>
          <p className="text-xs text-gray-400">Click any node to inspect signal propagation & confidence weightings</p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-xl border border-purple-500/30">
          <Sparkles className="w-4 h-4" />
          <span>Multi-Layer Graph Inference</span>
        </div>
      </div>

      {/* SVG Canvas & Nodes Grid */}
      <div className="relative w-full h-80 bg-gray-950/90 rounded-2xl border border-gray-800 overflow-hidden p-4">
        {/* SVG Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((conn, idx) => {
            const fromNode = nodes.find((n) => n.id === conn.from);
            const toNode = nodes.find((n) => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            return (
              <line
                key={idx}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={selectedNode === fromNode.id || selectedNode === toNode.id ? '#8b5cf6' : '#374151'}
                strokeWidth={selectedNode === fromNode.id || selectedNode === toNode.id ? 2.5 : 1.5}
                strokeDasharray={fromNode.type === 'sub' ? '4 4' : 'none'}
              />
            );
          })}
        </svg>

        {/* Nodes Layer */}
        {nodes.map((node) => {
          const isSelected = selectedNode === node.id;
          let colorClass = 'bg-indigo-600 text-white border-indigo-400';
          if (node.type === 'sub') colorClass = 'bg-purple-950 text-purple-200 border-purple-500';
          if (node.type === 'signal') colorClass = 'bg-gray-900 text-gray-300 border-gray-700';

          return (
            <div
              key={node.id}
              onClick={() => setSelectedNode(node.id)}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-xl border text-xs font-bold cursor-pointer transition-all duration-200 shadow-xl flex items-center space-x-2 ${colorClass} ${
                isSelected ? 'ring-4 ring-purple-500/40 scale-110 z-20' : 'hover:scale-105'
              }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${node.type === 'primary' ? 'bg-emerald-400 pulse-dot' : 'bg-indigo-400'}`}></div>
              <span className="whitespace-nowrap">{node.label}</span>
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Box */}
      <div className="p-4 rounded-xl bg-gray-900/90 border border-purple-500/30 flex items-center justify-between text-xs animate-fade-in">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <div className="text-gray-400 font-bold uppercase text-[10px]">Selected Node: {activeNodeData.label}</div>
            <div className="text-gray-200 font-medium mt-0.5">{activeNodeData.desc}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-400">Weight / Score</div>
          <div className="text-base font-black text-purple-400">{activeNodeData.score}%</div>
        </div>
      </div>
    </div>
  );
};
