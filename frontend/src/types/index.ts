export type Category =
  | 'AI' | 'DSA' | 'Java' | 'Python' | 'Web Development'
  | 'Cybersecurity' | 'Cloud' | 'Hardware' | 'Career' | 'System Design'
  | 'Git/GitHub' | 'Programming' | 'Productivity' | 'Gaming'
  | 'Entertainment' | 'Tech News';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type ContentType = 'educational' | 'entertainment' | 'news' | 'lifestyle' | 'tutorial' | 'review';
export type ValueLevel = 'high' | 'medium' | 'low' | 'none';

export interface Reel {
  id: string;
  title: string;
  caption: string;
  transcript: string;
  creator: string;
  category: Category;
  subCategory: string;
  duration: number;
  engagement: number;
  hashtags: string[];
  difficulty: Difficulty;
  educationalValue: ValueLevel;
  careerValue: ValueLevel;
  hypeScore: number;
  technologyRelevance: ValueLevel;
  skills: string[];
  contentType: ContentType;
}

export type InteractionType =
  | 'like' | 'skip' | 'save' | 'watch_complete'
  | 'watch_partial' | 'not_interested';

export interface UserInteraction {
  reelId: string;
  type: InteractionType;
  timestamp: number;
}

export interface UserProfile {
  name: string;
  interactions: UserInteraction[];
  explicitInterests: string[];
  blockedTopics: string[];
}

export interface InterestCluster {
  id: string;
  label: string;
  keywords: string[];
  weight: number;
}

export interface InterestProfile {
  primaryInterest: string;
  confidence: number;
  secondaryInterests: { label: string; confidence: number }[];
  evidence: string[];
  reasoning: string;
  scores: Record<string, number>;
}

export interface RecommendationScore {
  semanticRelevance: number;
  behavioralAffinity: number;
  topicConsistency: number;
  educationalValue: number;
  careerValue: number;
  hypePenalty: number;
  repetitionPenalty: number;
  final: number;
}

export interface Recommendation {
  reel: Reel;
  score: RecommendationScore;
  reasoning: string;
  connectionToInterest: string;
  usefulness: string;
  whyNotOther: string;
  confidence: 'high' | 'medium' | 'low';
  hypeFiltered: boolean;
}

export interface HypeFilterResult {
  score: number;
  decision: 'PASS' | 'FILTERED' | 'WARNING';
  reason: string;
  signals: string[];
}

export interface PipelineStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'complete';
}

export interface ScenarioReel {
  reelId: string;
  interaction: InteractionType;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  reels: ScenarioReel[];
  expectedInference: string;
}

export interface EvaluationTestCase {
  id: string;
  description: string;
  inputReels: string[];
  expectedInterest: string;
  predictedInterest: string;
  passed: boolean;
  confidence: number;
}

export interface EvaluationMetrics {
  interestInferenceAccuracy: number;
  recommendationRelevance: number;
  hypeAvoidance: number;
  reasoningTransparency: number;
  generalization: number;
  overallScore: number;
  testCases: EvaluationTestCase[];
}
