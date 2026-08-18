import React, { useState } from 'react';
import {
  Zap,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Ban,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  BookOpen,
} from 'lucide-react';
import type { Recommendation, InterestProfile } from '../types';
import { WhyThisReelModal } from '../components/WhyThisReelModal';

interface RecommendationFeedProps {
  recommendations: Recommendation[];
  profile: InterestProfile;
  onFeedback: (reelId: string, feedbackType: 'useful' | 'not_relevant' | 'save' | 'block_topic') => void;
}

export const RecommendationFeed: React.FC<RecommendationFeedProps> = ({
  recommendations,
  profile,
  onFeedback,
}) => {
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const handleUserFeedback = (reelId: string, type: 'useful' | 'not_relevant' | 'save' | 'block_topic', title: string) => {
    onFeedback(reelId, type);
    const messages = {
      useful: `Feedback recorded: Marked "${title}" as useful. Increased affinity!`,
      not_relevant: `Feedback recorded: Reduced weight for this topic.`,
      save: `Saved to your learning list!`,
      block_topic: `Topic blocked: Interest profile updated immediately.`,
    };
    setFeedbackToast(messages[type]);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Toast Feedback Banner */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-gray-900 border border-emerald-500 text-emerald-300 text-xs font-bold shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{feedbackToast}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-gray-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Generalized Technology Learning Feed</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Recommended Tech Content for: <span className="gradient-text">{profile.primaryInterest}</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Curated to provide practical skill progression beyond current reel keywords while filtering out clickbait hype.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-gray-300 bg-gray-900 px-3.5 py-2 rounded-xl border border-gray-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Diversity Enforced: Max 2/Subcategory</span>
        </div>
      </div>

      {/* Recommendations Feed Grid */}
      <div className="space-y-4">
        {recommendations.map((rec) => {
          const { reel, score, reasoning } = rec;

          return (
            <div
              key={reel.id}
              className="glass-panel glass-panel-hover p-6 rounded-2xl border border-gray-800/80 space-y-4 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Details */}
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                    {reel.category}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-gray-900 text-gray-300 rounded border border-gray-800">
                    {reel.subCategory}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center space-x-1">
                    <BookOpen className="w-3 h-3" />
                    <span>Edu Value: {reel.educationalValue}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">{reel.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed font-medium">{reel.caption}</p>

                {/* Reasoning summary badge */}
                <div className="p-2.5 rounded-lg bg-gray-950/80 border border-gray-800 text-xs text-gray-400 flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                  <span className="line-clamp-1">{reasoning}</span>
                </div>
              </div>

              {/* Right Score & Actions */}
              <div className="flex flex-col items-start md:items-end justify-between space-y-3 flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="text-left md:text-right">
                    <div className="text-[11px] text-gray-400 font-semibold">Recommendation Score</div>
                    <div className="text-2xl font-black text-indigo-400">{score.final}<span className="text-xs text-gray-400">/100</span></div>
                  </div>

                  <button
                    onClick={() => setSelectedRecommendation(rec)}
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold text-indigo-300 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 transition shadow-sm"
                  >
                    <HelpCircle className="w-4 h-4 text-indigo-400" />
                    <span>Why this Reel?</span>
                  </button>
                </div>

                {/* Adaptive Feedback Loop Buttons (Section 19 requirement) */}
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleUserFeedback(reel.id, 'useful', reel.title)}
                    title="Useful content - Increase topic weight"
                    className="p-2 rounded-lg bg-gray-900 hover:bg-emerald-500/20 hover:text-emerald-300 border border-gray-800 text-gray-400 text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Useful</span>
                  </button>

                  <button
                    onClick={() => handleUserFeedback(reel.id, 'not_relevant', reel.title)}
                    title="Not relevant - Reduce affinity"
                    className="p-2 rounded-lg bg-gray-900 hover:bg-amber-500/20 hover:text-amber-300 border border-gray-800 text-gray-400 text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <ThumbsDown className="w-3.5 h-3.5 text-amber-400" />
                    <span>Not Relevant</span>
                  </button>

                  <button
                    onClick={() => handleUserFeedback(reel.id, 'save', reel.title)}
                    title="Save reel"
                    className="p-2 rounded-lg bg-gray-900 hover:bg-purple-500/20 hover:text-purple-300 border border-gray-800 text-gray-400 text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-purple-400" />
                    <span>Save</span>
                  </button>

                  <button
                    onClick={() => handleUserFeedback(reel.id, 'block_topic', reel.title)}
                    title="Don't recommend this topic"
                    className="p-2 rounded-lg bg-gray-900 hover:bg-red-500/20 hover:text-red-300 border border-gray-800 text-gray-400 text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <Ban className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Explanation Drawer */}
      <WhyThisReelModal
        recommendation={selectedRecommendation}
        onClose={() => setSelectedRecommendation(null)}
      />
    </div>
  );
};
