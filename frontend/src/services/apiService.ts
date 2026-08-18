import type {
  Reel,
  UserInteraction,
  InterestProfile,
  Recommendation,
  HypeFilterResult,
  Scenario,
} from '../types';
import {
  analyzeInterestLocal,
  generateRecommendationsLocal,
  evaluateHypeLocal,
  analyzeScenarioLocal,
} from '../utils/inferenceLocal';
import { reels as defaultReels } from '../data/reels';

export interface ApiStatus {
  status: string;
  aiMode: string;
  geminiAvailable: boolean;
}

export async function fetchApiStatus(): Promise<ApiStatus> {
  try {
    const res = await fetch('/api/status', { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // Offline / No backend running
  }
  return {
    status: 'standalone',
    aiMode: 'Local Explainable Engine',
    geminiAvailable: false,
  };
}

export async function analyzeInterest(
  reels: Reel[],
  interactions: UserInteraction[]
): Promise<{ source: string; profile: InterestProfile }> {
  try {
    const res = await fetch('/api/analyze-interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reels, interactions }),
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.primaryInterest) {
        const profile: InterestProfile = {
          primaryInterest: data.primaryInterest.label || data.primaryInterest,
          confidence: data.confidence || 85,
          secondaryInterests: (data.secondaryInterests || []).map((s: any) => ({
            label: s.label || s.id || s,
            confidence: s.score || s.confidence || 70,
          })),
          evidence: (data.evidence || []).map((e: any) =>
            typeof e === 'string' ? e : `Signal: ${e.reel || 'Reel interaction'}`
          ),
          reasoning: data.reasoning || 'Inferred based on content and behavioral analysis.',
          scores: data.scores || {},
        };
        return { source: data.source || 'gemini', profile };
      }
    }
  } catch {
    // Fallback to local inference engine
  }

  const localProfile = analyzeInterestLocal(reels, interactions);
  return { source: 'local', profile: localProfile };
}

export async function getRecommendations(
  profile: InterestProfile,
  allReels: Reel[] = defaultReels,
  interactions: UserInteraction[] = []
): Promise<{ source: string; recommendations: Recommendation[] }> {
  try {
    const res = await fetch('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ interestProfile: profile, existingReels: allReels, userInteractions: interactions }),
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.recommendations) && data.recommendations.length > 0) {
        // Map backend response into full Recommendation objects
        const recs: Recommendation[] = data.recommendations.map((r: any) => {
          const reelMatch = allReels.find((reel) => reel.id === r.reelId) || allReels[0];
          return {
            reel: reelMatch,
            score: {
              semanticRelevance: 90,
              behavioralAffinity: 85,
              topicConsistency: 88,
              educationalValue: 92,
              careerValue: 88,
              hypePenalty: 2,
              repetitionPenalty: 0,
              final: r.score || 88,
            },
            reasoning: r.reason || `Recommended based on ${profile.primaryInterest}`,
            connectionToInterest: `Connects to your active interest in ${profile.primaryInterest}`,
            usefulness: `Teaches practical ${reelMatch.category} skills for developer growth`,
            whyNotOther: 'Scores higher due to low hype score and practical educational focus',
            confidence: r.score > 80 ? 'high' : 'medium',
            hypeFiltered: false,
          };
        });
        return { source: data.source || 'gemini', recommendations: recs };
      }
    }
  } catch {
    // Fallback
  }

  const localRecs = generateRecommendationsLocal(profile, allReels, interactions);
  return { source: 'local', recommendations: localRecs };
}

export async function evaluateHype(reel: Reel): Promise<{ source: string; result: HypeFilterResult }> {
  try {
    const res = await fetch('/api/evaluate-reel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reel }),
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      return {
        source: data.source || 'gemini',
        result: {
          score: data.score || 10,
          decision: data.decision === 'misleading' ? 'FILTERED' : data.decision === 'hype' ? 'WARNING' : 'PASS',
          reason: data.reason || 'Evaluation completed.',
          signals: data.signals || [],
        },
      };
    }
  } catch {
    // Fallback
  }

  const localResult = evaluateHypeLocal(reel);
  return { source: 'local', result: localResult };
}

export async function runSurpriseScenario(scenario: Scenario, dataset: Reel[] = defaultReels) {
  try {
    const res = await fetch('/api/surprise-scenario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario }),
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json();
      return { source: data.source || 'gemini', data };
    }
  } catch {
    // Fallback
  }

  const localResult = analyzeScenarioLocal(scenario, dataset);
  return { source: 'local', data: localResult };
}
