import React from 'react';
import {
  BrainCircuit,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  Play,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Compass,
  TestTube2,
  BarChart3,
  Layers,
  Award,
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import type { InterestProfile } from '../types';
import { PipelineVisualizer } from '../components/PipelineVisualizer';
import { CareerRoadmapVisualizer } from '../components/CareerRoadmapVisualizer';

interface DashboardProps {
  profile: InterestProfile;
  onRunDemo: () => void;
  onNavigate: (tab: string) => void;
  isDemoRunning?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  onRunDemo,
  onNavigate,
  isDemoRunning = false,
}) => {
  // Chart Data preparation
  const chartData = [
    { name: 'Software Eng', score: profile.scores['software-engineering'] || 92 },
    { name: 'DSA / Algo', score: profile.scores['data-structures'] || 78 },
    { name: 'Web Dev', score: profile.scores['web-development'] || 72 },
    { name: 'Cloud & DevOps', score: profile.scores['cloud'] || 65 },
    { name: 'AI / ML', score: profile.scores['artificial-intelligence'] || 60 },
    { name: 'Productivity', score: profile.scores['productivity'] || 55 },
  ];

  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-8 sm:p-10 border border-gray-800/80 shadow-2xl bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950/40">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Explainable AI Recommendation Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Your Feed Knows What You Watch.{' '}
            <span className="gradient-text">ReelMind Understands Why.</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
            An explainable AI recommendation engine that transforms short-form content consumption into meaningful technology learning.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onRunDemo}
              disabled={isDemoRunning}
              className="flex items-center space-x-2.5 px-6 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-xl shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isDemoRunning ? 'Running AI Analysis...' : '🚀 Run Full AI Demo'}</span>
            </button>

            <button
              onClick={() => onNavigate('reels')}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl font-semibold text-sm text-gray-300 bg-gray-900/80 hover:bg-gray-800 border border-gray-800 transition"
            >
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Explore Reel Feed</span>
            </button>
          </div>
        </div>

        {/* Central Product Philosophy Quote */}
        <div className="mt-8 p-4 rounded-2xl bg-gray-950/80 border border-indigo-500/30 flex items-start space-x-3 text-xs sm:text-sm">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 font-serif text-lg font-bold">
            “
          </div>
          <div>
            <div className="text-gray-400 font-medium italic">Central Product Philosophy:</div>
            <div className="text-gray-100 font-bold mt-0.5">
              ReelMind doesn’t ask: “What did you watch?” It asks: “What does your viewing behavior reveal about what you want to learn?”
            </div>
          </div>
        </div>
      </div>

      {/* Top 5 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-gray-800/80 space-y-1">
          <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Reels Analyzed</div>
          <div className="text-2xl font-black text-white">24</div>
          <div className="text-[11px] text-emerald-400 flex items-center space-x-1 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>Multi-topic dataset</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-gray-800/80 space-y-1">
          <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Interests Detected</div>
          <div className="text-2xl font-black text-indigo-400">5 Domains</div>
          <div className="text-[11px] text-gray-400 font-medium">Broad skill clusters</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-gray-800/80 space-y-1">
          <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Tech Relevance</div>
          <div className="text-2xl font-black text-purple-400">91/100</div>
          <div className="text-[11px] text-purple-400 font-medium">High educational value</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-gray-800/80 space-y-1">
          <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Hype Filter Score</div>
          <div className="text-2xl font-black text-pink-400">94%</div>
          <div className="text-[11px] text-emerald-400 flex items-center space-x-1 font-medium">
            <ShieldCheck className="w-3 h-3" />
            <span>Clickbait penalised</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-gray-800/80 space-y-1 col-span-2 sm:col-span-1">
          <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Inference Confidence</div>
          <div className="text-2xl font-black text-emerald-400">{profile.confidence}%</div>
          <div className="text-[11px] text-emerald-400 font-medium">High certainty</div>
        </div>
      </div>

      {/* AI Interest Profile Section with Recharts & Reasoning */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Primary & Secondary Interests */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-gray-800/80 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
                <span>AI Interest Profile</span>
              </h3>
              <span className="px-2.5 py-1 text-xs font-bold bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
                Confidence: {profile.confidence}%
              </span>
            </div>

            {/* Primary Interest Highlight Card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-gray-950 border border-indigo-500/40 space-y-2 glow-indigo">
              <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Inferred Primary Interest</div>
              <div className="text-2xl font-black text-white">{profile.primaryInterest}</div>
              <p className="text-xs text-gray-300 leading-relaxed font-medium">
                Inferred from multi-reel interaction patterns (Java Memory, Dev Lifestyle, Coding Interviews, Git).
              </p>
            </div>

            {/* Secondary Interests Tags */}
            <div className="mt-5 space-y-2">
              <div className="text-xs font-bold uppercase text-gray-400 tracking-wider">Secondary Inferred Interests</div>
              <div className="flex flex-wrap gap-2">
                {profile.secondaryInterests.map((sec, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-900 border border-gray-800 text-gray-200 flex items-center space-x-1.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <span>{sec.label}</span>
                    <span className="text-[10px] text-gray-400 font-mono">({sec.confidence}%)</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('analysis')}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition flex items-center justify-center space-x-1"
          >
            <span>View Complete Graph & AI Decision Trace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Interest Distribution Chart & Reasoning */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-gray-800/80 space-y-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Interest Distribution Breakdown</h3>
            <p className="text-xs text-gray-400">Weighted affinity across top technology clusters</p>
          </div>

          {/* Recharts Bar Chart */}
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* "Why does ReelMind think this?" Box */}
          <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-800 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Why does ReelMind think this?</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              {profile.reasoning}
            </p>
          </div>
        </div>
      </div>

      {/* Before VS After Comparison ("Why Traditional Recommendation Fails") */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-gray-800/80 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Why Traditional Recommendation Fails</h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Comparing naive keyword repetition against ReelMind AI's explainable interest inference engine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Weak Keyword System */}
          <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/30 flex items-center space-x-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Weak Keyword-Based System</span>
              </span>
              <span className="text-[11px] text-red-400 font-mono">Filter Bubble Danger</span>
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="p-2.5 rounded-lg bg-gray-900/80 border border-red-900/50">
                User watches: <strong>Java Meme Reel</strong>
              </div>
              <div className="text-center text-red-400 font-bold">↓ Naive Keyword Match ↓</div>
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-900/80 space-y-1">
                <div className="font-bold text-red-300">Recommends:</div>
                <div className="text-gray-400 font-mono">1. Java Reel 2 • 2. Java Reel 3 • 3. Java Reel 4</div>
              </div>
            </div>

            <p className="text-xs text-gray-400 italic">
              Result: Traps student in redundant repetition, fails to offer broader career roadmap or foundational engineering skills.
            </p>
          </div>

          {/* Right: ReelMind AI Strong System */}
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>ReelMind AI Inference System</span>
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">Generalization Success</span>
            </div>

            <div className="space-y-2 text-xs text-gray-300">
              <div className="p-2.5 rounded-lg bg-gray-900/80 border border-emerald-900/50">
                User watches: <strong>Java Meme + Coding Interview + Dev Lifestyle + Git</strong>
              </div>
              <div className="text-center text-emerald-400 font-bold">↓ Semantic Broader Inference ↓</div>
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-900/80 space-y-1">
                <div className="font-bold text-emerald-300">Infers: Software Engineering Interest</div>
                <div className="text-gray-300 font-medium">Recommends: DSA Prep • Git Branching • REST APIs • System Design • Docker</div>
              </div>
            </div>

            <p className="text-xs text-gray-300 font-medium">
              Result: Transforms passive scrolling into structured technology learning across real career skills.
            </p>
          </div>
        </div>
      </div>

      {/* Career Skill Roadmap Transformation Output */}
      <CareerRoadmapVisualizer primaryInterest={profile.primaryInterest} />

      {/* Interactive Pipeline Visualizer */}
      <PipelineVisualizer />

      {/* Quick Navigation Footer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigate('recommendations')}
          className="p-5 rounded-2xl glass-panel glass-panel-hover border border-gray-800 cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition">
              <Zap className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition" />
          </div>
          <h4 className="text-sm font-bold text-white">Recommendation Feed</h4>
          <p className="text-xs text-gray-400">View recommended tech content filtered for high educational value & low hype.</p>
        </div>

        <div
          onClick={() => onNavigate('surprise-lab')}
          className="p-5 rounded-2xl glass-panel glass-panel-hover border border-gray-800 cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 group-hover:scale-110 transition">
              <TestTube2 className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition" />
          </div>
          <h4 className="text-sm font-bold text-white">Surprise Scenario Lab</h4>
          <p className="text-xs text-gray-400">Test AI generalization on hardware gamers, AI curious devs & custom scenarios.</p>
        </div>

        <div
          onClick={() => onNavigate('evaluation')}
          className="p-5 rounded-2xl glass-panel glass-panel-hover border border-gray-800 cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 group-hover:scale-110 transition">
              <BarChart3 className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-pink-400 transition" />
          </div>
          <h4 className="text-sm font-bold text-white">Evaluation Dashboard</h4>
          <p className="text-xs text-gray-400">Inspect Hack2Skill competition criteria metrics & live automated test suite.</p>
        </div>
      </div>
    </div>
  );
};
