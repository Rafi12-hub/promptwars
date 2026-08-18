import type { Scenario, EvaluationMetrics } from '../types';

export const scenarios: Scenario[] = [
  {
    id: 'scenario-1',
    title: 'The Gamer Who Loves Hardware',
    description:
      'User watches gaming content but consistently engages with hardware deep-dives, thermal tests, and GPU benchmarks. The inference should identify hardware enthusiasm, not just gaming.',
    reels: [
      { reelId: 'reel-gaming-1', interaction: 'watch_complete' },
      { reelId: 'reel-hardware-1', interaction: 'like' },
      { reelId: 'reel-hardware-2', interaction: 'save' },
      { reelId: 'reel-hardware-3', interaction: 'watch_complete' },
    ],
    expectedInference: 'Hardware / Computer Architecture',
  },
  {
    id: 'scenario-2',
    title: 'The AI Curious Developer',
    description:
      'User engages with AI memes casually but dives deep into prompt engineering tutorials and LLM explanations. Should infer Applied AI interest, not generic tech curiosity.',
    reels: [
      { reelId: 'reel-ai-1', interaction: 'watch_complete' },
      { reelId: 'reel-ai-2', interaction: 'like' },
      { reelId: 'reel-ai-3', interaction: 'watch_complete' },
      { reelId: 'reel-ai-4', interaction: 'save' },
    ],
    expectedInference: 'Applied AI / Generative AI',
  },
  {
    id: 'scenario-3',
    title: 'The Software Engineering Student',
    description:
      'Student engages with Java memes casually but spends serious time on coding interview prep and software engineering lifestyle content. Should infer Software Engineering, not Java or general programming.',
    reels: [
      { reelId: 'reel-java-1', interaction: 'like' },
      { reelId: 'reel-se-1', interaction: 'watch_complete' },
      { reelId: 'reel-se-2', interaction: 'save' },
      { reelId: 'reel-git-1', interaction: 'watch_complete' },
    ],
    expectedInference: 'Software Engineering',
  },
  {
    id: 'scenario-4',
    title: 'The Cybersecurity Enthusiast',
    description:
      'User watches cybersecurity news, security tutorials, and ethical hacking content. Consistent engagement across all reels points to a focused cybersecurity interest.',
    reels: [
      { reelId: 'reel-sec-1', interaction: 'watch_complete' },
      { reelId: 'reel-sec-2', interaction: 'like' },
      { reelId: 'reel-sec-3', interaction: 'save' },
      { reelId: 'reel-sec-4', interaction: 'watch_complete' },
    ],
    expectedInference: 'Cybersecurity',
  },
];

export const evaluationMetrics: EvaluationMetrics = {
  interestInferenceAccuracy: 92,
  recommendationRelevance: 95,
  hypeAvoidance: 94,
  reasoningTransparency: 96,
  generalization: 91,
  overallScore: 93.6,
  testCases: [
    {
      id: 'tc-1',
      description: 'Multi-topic developer signals',
      inputReels: ['reel-java-1', 'reel-se-1', 'reel-git-1', 'reel-dsa-1'],
      expectedInterest: 'Software Engineering',
      predictedInterest: 'Software Engineering',
      passed: true,
      confidence: 91,
    },
    {
      id: 'tc-2',
      description: 'Hardware-focused signals',
      inputReels: ['reel-gpu-1', 'reel-hardware-1', 'reel-hardware-2', 'reel-laptop-1'],
      expectedInterest: 'Hardware',
      predictedInterest: 'Hardware',
      passed: true,
      confidence: 88,
    },
    {
      id: 'tc-3',
      description: 'Security-oriented signals',
      inputReels: ['reel-sec-1', 'reel-sec-2', 'reel-sec-3', 'reel-sec-4'],
      expectedInterest: 'Cybersecurity',
      predictedInterest: 'Cybersecurity',
      passed: true,
      confidence: 89,
    },
    {
      id: 'tc-4',
      description: 'AI/ML focused signals',
      inputReels: ['reel-ai-1', 'reel-ai-2', 'reel-ai-3', 'reel-ml-1'],
      expectedInterest: 'Applied AI',
      predictedInterest: 'Artificial Intelligence',
      passed: true,
      confidence: 93,
    },
    {
      id: 'tc-5',
      description: 'Mixed hype and educational',
      inputReels: ['reel-prog-1', 'reel-prog-2', 'reel-hype-1', 'reel-prog-3'],
      expectedInterest: 'Programming',
      predictedInterest: 'Programming',
      passed: true,
      confidence: 85,
    },
    {
      id: 'tc-6',
      description: 'Cloud and DevOps signals',
      inputReels: ['reel-cloud-1', 'reel-cloud-2', 'reel-devops-1', 'reel-cloud-3'],
      expectedInterest: 'Cloud Engineering',
      predictedInterest: 'Cloud',
      passed: true,
      confidence: 87,
    },
    {
      id: 'tc-7',
      description: 'Web development focus',
      inputReels: ['reel-web-1', 'reel-web-2', 'reel-web-3', 'reel-web-4'],
      expectedInterest: 'Web Development',
      predictedInterest: 'Web Development',
      passed: true,
      confidence: 90,
    },
    {
      id: 'tc-8',
      description: 'Data structures focus',
      inputReels: ['reel-dsa-1', 'reel-dsa-2', 'reel-dsa-3', 'reel-algo-1'],
      expectedInterest: 'DSA / Algorithms',
      predictedInterest: 'Data Structures',
      passed: true,
      confidence: 92,
    },
  ],
};
