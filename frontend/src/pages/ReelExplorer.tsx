import React, { useState } from 'react';
import {
  Heart,
  Bookmark,
  CheckCircle2,
  PlayCircle,
  SkipForward,
  Ban,
  ShieldAlert,
  GraduationCap,
  Sparkles,
  Filter,
  Flame,
  Search,
  Activity,
  Compass,
  Layers,
  Award,
} from 'lucide-react';
import type { Reel, UserInteraction, InteractionType, Category } from '../types';

interface ReelExplorerProps {
  reels: Reel[];
  interactions: UserInteraction[];
  onInteract: (reelId: string, type: InteractionType) => void;
  onRunAnalysis: () => void;
}

export const ReelExplorer: React.FC<ReelExplorerProps> = ({
  reels,
  interactions,
  onInteract,
  onRunAnalysis,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterHype, setFilterHype] = useState<boolean>(false);
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);

  // Categories list
  const categories = ['All', 'Git/GitHub', 'Web Development', 'System Design', 'DSA', 'Cloud', 'Java', 'Python', 'Cybersecurity', 'AI', 'Hardware', 'Career', 'Productivity'];

  const filteredReels = reels.filter((reel) => {
    const matchesCategory = selectedCategory === 'All' || reel.category === selectedCategory;
    const matchesSearch =
      reel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reel.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reel.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesHype = filterHype ? reel.hypeScore < 40 : true;
    return matchesCategory && matchesSearch && matchesHype;
  });

  const activeReel = filteredReels[activeReelIndex] || filteredReels[0] || reels[0];

  const getInteractionForReel = (reelId: string) => {
    return interactions.find((i) => i.reelId === reelId);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-gray-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Compass className="w-6 h-6 text-indigo-400" />
            <span>Simulated Reel Explorer</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Interact with short-form technical content to train the explainable interest inference engine
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onRunAnalysis}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/20 transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Re-Analyze Profile ({interactions.length} Interactions)</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-gray-800 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reels or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-xs text-gray-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Hype Toggle Filter */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilterHype(!filterHype)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border ${
                filterHype
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-gray-200'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Hide Hype Reels (Hype &lt; 40)</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveReelIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-900 text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Reel Explorer Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Reel Player Simulation View */}
        {activeReel && (
          <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-gray-800 space-y-6 flex flex-col justify-between">
            {/* Simulated Reel View Box */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-950 border border-gray-800 min-h-[380px] p-6 flex flex-col justify-between bg-gradient-to-b from-gray-900 via-gray-950 to-gray-950">
              {/* Top Badges */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 rounded-md border border-indigo-500/30">
                    {activeReel.category}
                  </span>
                  <span className="px-2.5 py-1 text-xs font-bold bg-gray-800 text-gray-300 rounded-md">
                    {activeReel.subCategory}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2.5 py-1 text-xs font-bold rounded-md border ${
                      activeReel.hypeScore > 60
                        ? 'bg-red-500/20 text-red-300 border-red-500/30'
                        : activeReel.hypeScore > 30
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    Hype: {activeReel.hypeScore}/100
                  </span>
                </div>
              </div>

              {/* Center Content Mockup */}
              <div className="my-6 space-y-3 z-10">
                <div className="flex items-center space-x-2 text-gray-400 text-xs font-semibold">
                  <PlayCircle className="w-4 h-4 text-indigo-400" />
                  <span>Duration: {activeReel.duration}s</span>
                  <span>•</span>
                  <span>Creator: @{activeReel.creator}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white">{activeReel.title}</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
                  {activeReel.caption}
                </p>

                {/* Transcript Box */}
                <div className="p-3 rounded-xl bg-gray-900/90 border border-gray-800 space-y-1">
                  <div className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider">Audio Transcript</div>
                  <p className="text-xs text-gray-300 italic">"{activeReel.transcript}"</p>
                </div>
              </div>

              {/* Bottom Tags */}
              <div className="flex flex-wrap items-center gap-1.5 z-10">
                {activeReel.skills.map((skill, i) => (
                  <span key={i} className="px-2 py-0.5 text-[10px] font-mono bg-gray-900 text-gray-400 rounded border border-gray-800">
                    #{skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Behavioral Controls */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Simulate Viewing Action (Applies Behavioral Weighting)
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => onInteract(activeReel.id, 'watch_complete')}
                  className="p-2.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-300 text-xs font-bold flex items-center justify-center space-x-1.5 transition"
                >
                  <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                  <span>Watch Complete (+3)</span>
                </button>

                <button
                  onClick={() => onInteract(activeReel.id, 'like')}
                  className="p-2.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-pink-300 text-xs font-bold flex items-center justify-center space-x-1.5 transition"
                >
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span>Like (+4)</span>
                </button>

                <button
                  onClick={() => onInteract(activeReel.id, 'save')}
                  className="p-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center justify-center space-x-1.5 transition"
                >
                  <Bookmark className="w-4 h-4 text-purple-400" />
                  <span>Save Reel (+5)</span>
                </button>

                <button
                  onClick={() => onInteract(activeReel.id, 'watch_partial')}
                  className="p-2.5 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 text-xs font-bold flex items-center justify-center space-x-1.5 transition"
                >
                  <PlayCircle className="w-4 h-4 text-gray-400" />
                  <span>Partial Watch (+1)</span>
                </button>

                <button
                  onClick={() => onInteract(activeReel.id, 'skip')}
                  className="p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center space-x-1.5 transition"
                >
                  <SkipForward className="w-4 h-4 text-amber-400" />
                  <span>Skip Reel (-2)</span>
                </button>

                <button
                  onClick={() => onInteract(activeReel.id, 'not_interested')}
                  className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold flex items-center justify-center space-x-1.5 transition"
                >
                  <Ban className="w-4 h-4 text-red-400" />
                  <span>Not Interested (-5)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right: Reel List & History Feed */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel p-4 rounded-2xl border border-gray-800 flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-gray-300 flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Available Reels ({filteredReels.length})</span>
            </span>
            <span className="text-[11px] text-gray-400">Click to select & simulate</span>
          </div>

          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredReels.map((reel, idx) => {
              const interaction = getInteractionForReel(reel.id);
              const isActive = activeReel?.id === reel.id;

              return (
                <div
                  key={reel.id}
                  onClick={() => setActiveReelIndex(idx)}
                  className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                    isActive
                      ? 'bg-gray-900 border-indigo-500 ring-1 ring-indigo-500/30 shadow-lg'
                      : 'bg-gray-950/60 border-gray-800/80 hover:bg-gray-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-gray-800 text-indigo-300 rounded">
                      {reel.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-gray-400 font-mono">Edu: {reel.educationalValue}</span>
                      {interaction && (
                        <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {interaction.type}
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="font-bold text-white text-xs mb-1 line-clamp-1">{reel.title}</h4>
                  <p className="text-[11px] text-gray-400 line-clamp-2">{reel.caption}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
