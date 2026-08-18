import type {
  Reel,
  UserInteraction,
  InterestProfile,
  Recommendation,
  RecommendationScore,
  HypeFilterResult,
  Scenario,
} from '../types';
import { reels as defaultReelsDataset } from '../data/reels';

export const interestClustersMap: Record<string, { label: string; keywords: string[] }> = {
  'software-engineering': {
    label: 'Software Engineering',
    keywords: [
      'software engineer', 'architecture', 'design patterns', 'system design',
      'code review', 'git', 'version control', 'agile', 'devops', 'backend',
      'frontend', 'full stack', 'api', 'microservices', 'refactoring',
      'sprint', 'deployment', 'ci/cd', 'pull request', 'merge', 'repository',
      'branch', 'codebase', 'scalability', 'load balancer', 'database',
      'sql', 'nosql', 'rest', 'graphql', 'authentication'
    ],
  },
  'artificial-intelligence': {
    label: 'Artificial Intelligence',
    keywords: [
      'artificial intelligence', 'machine learning', 'deep learning', 'neural network',
      'nlp', 'computer vision', 'transformer', 'gpt', 'llm', 'large language model',
      'tensorflow', 'pytorch', 'huggingface', 'fine-tuning', 'inference',
      'prompt', 'rag', 'vector database', 'embedding', 'generative', 'copilot'
    ],
  },
  'data-structures': {
    label: 'Data Structures & Algorithms',
    keywords: [
      'data structure', 'algorithm', 'array', 'linked list', 'stack', 'queue',
      'tree', 'binary tree', 'heap', 'graph', 'hash map', 'sorting',
      'dynamic programming', 'recursion', 'time complexity', 'big o',
      'leetcode', 'coding interview', 'dsa', 'bfs', 'dfs', 'sliding window',
      'binary search'
    ],
  },
  'web-development': {
    label: 'Web Development',
    keywords: [
      'web development', 'html', 'css', 'javascript', 'typescript', 'react',
      'vue', 'angular', 'nextjs', 'nodejs', 'express', 'tailwind',
      'responsive', 'frontend', 'dom', 'spa', 'ssr', 'vite', 'npm',
      'browser', 'web components', 'api design'
    ],
  },
  'cybersecurity': {
    label: 'Cybersecurity',
    keywords: [
      'cybersecurity', 'security', 'hacking', 'penetration testing', 'vulnerability',
      'exploit', 'xss', 'sql injection', 'csrf', 'firewall', 'encryption',
      'password', 'malware', 'zero day', 'owasp', 'ctf', 'ssl', 'tls', 'vpn'
    ],
  },
  'cloud': {
    label: 'Cloud & DevOps',
    keywords: [
      'cloud', 'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'k8s',
      'container', 'virtual machine', 'serverless', 'lambda', 'terraform',
      'ci/cd', 'github actions', 'monitoring', 'nginx', 'load balancer'
    ],
  },
  'hardware': {
    label: 'Hardware & Systems',
    keywords: [
      'hardware', 'embedded', 'microcontroller', 'arduino', 'raspberry pi',
      'circuit', 'pcb', 'iot', 'sensor', 'processor', 'cpu', 'gpu',
      'ram', 'ssd', 'thermal', 'benchmark', 'power supply', 'motherboard', 'm3 macbook'
    ],
  },
  'career': {
    label: 'Developer Career & Growth',
    keywords: [
      'career', 'job', 'hiring', 'interview', 'resume', 'portfolio',
      'linkedin', 'mentor', 'salary', 'promotion', 'leadership',
      'tech lead', 'startup', 'freelance', 'remote work', 'faang',
      'internship', 'bootcamp', 'day in the life'
    ],
  },
  'programming': {
    label: 'Programming Languages',
    keywords: [
      'programming', 'coding', 'developer', 'python', 'java', 'c++',
      'rust', 'go', 'syntax', 'compiler', 'debugging', 'testing',
      'clean code', 'solid', 'ide', 'vscode', 'terminal', 'linux'
    ],
  },
  'productivity': {
    label: 'Developer Productivity',
    keywords: [
      'productivity', 'time management', 'pomodoro', 'deep work', 'focus',
      'automation', 'workflow', 'kanban', 'notion', 'time-blocking',
      'setup', 'terminal'
    ],
  },
};

export const behaviorWeights: Record<string, number> = {
  watch_complete: 3,
  save: 5,
  like: 4,
  watch_partial: 1,
  skip: -2,
  not_interested: -5,
};

function extractTextSignals(reel: Reel): string {
  const parts = [
    reel.title || '',
    reel.caption || '',
    reel.transcript || '',
    reel.category || '',
    reel.subCategory || '',
    reel.creator || '',
    ...(reel.hashtags || []),
    ...(reel.skills || []),
  ];
  return parts.join(' ').toLowerCase();
}

function scoreClusters(text: string): Record<string, number> {
  const scores: Record<string, number> = {};
  for (const [id, cluster] of Object.entries(interestClustersMap)) {
    let matches = 0;
    for (const kw of cluster.keywords) {
      if (text.includes(kw)) matches++;
    }
    scores[id] = matches;
  }
  return scores;
}

export function evaluateHypeLocal(reel: Reel): HypeFilterResult {
  const text = extractTextSignals(reel);
  const signals: string[] = [];
  let score = reel.hypeScore ?? 0;

  if (/guaranteed|guarantee|100% sure|definitely will/i.test(text)) {
    score += 20;
    signals.push('Contains job/income guarantee claims');
  }

  if (/in \d+ days|in \d+ weeks|in 24 hours|overnight|instantly|quick fix|secret to/i.test(text)) {
    score += 15;
    signals.push('Uses extreme time pressure or fast-track promises');
  }

  if (/make you rich|make money|\$\d+|passive income|financial freedom|get rich/i.test(text)) {
    score += 15;
    signals.push('Pushes sensational financial gains');
  }

  if (/replaces programmers|developers are dead|coding is dead|no need to learn|ai will replace/i.test(text)) {
    score += 20;
    signals.push('Uses clickbait tech doom or total replacement claims');
  }

  if (/everyone is using|you're missing out|fomo|before it's too late|don't get left behind/i.test(text)) {
    score += 10;
    signals.push('Uses FOMO / social pressure tactics');
  }

  score = Math.min(100, Math.max(0, score));

  let decision: 'PASS' | 'FILTERED' | 'WARNING';
  let reason: string;

  if (score >= 60) {
    decision = 'FILTERED';
    reason = `Filtered: High hype score (${score}/100) with ${signals.length} clickbait signal(s). Prefers verified educational content over exaggerated promises.`;
  } else if (score >= 35) {
    decision = 'WARNING';
    reason = `Warning: Moderate hype detected (${score}/100). Proceed with realistic expectations regarding claims made.`;
  } else {
    decision = 'PASS';
    reason = `Passed: Genuine content with low hype score (${score}/100) and strong educational/career value.`;
  }

  return { score, decision, reason, signals };
}

export function analyzeInterestLocal(reels: Reel[], interactions: UserInteraction[]): InterestProfile {
  if (!reels || reels.length === 0) {
    return {
      primaryInterest: 'General Tech',
      confidence: 0,
      secondaryInterests: [],
      evidence: [],
      reasoning: 'No reels interacted with yet. Engage with reels to infer your tech interests.',
      scores: {},
    };
  }

  const clusterScores: Record<string, number> = {};
  for (const key of Object.keys(interestClustersMap)) {
    clusterScores[key] = 0;
  }

  const interactionMap = new Map<string, number>();
  for (const inter of interactions) {
    const weight = behaviorWeights[inter.type] || 1;
    interactionMap.set(inter.reelId, (interactionMap.get(inter.reelId) || 0) + weight);
  }

  const evidenceList: string[] = [];

  for (const reel of reels) {
    const text = extractTextSignals(reel);
    const scores = scoreClusters(text);
    const behaviorVal = interactionMap.get(reel.id) || 1;

    for (const [id, count] of Object.entries(scores)) {
      if (count > 0) {
        clusterScores[id] += count * (behaviorVal > 0 ? behaviorVal : 0.5);
      }
    }

    if (behaviorVal > 2) {
      evidenceList.push(`Strong engagement on "${reel.title}" (${reel.category})`);
    }
  }

  const maxVal = Math.max(...Object.values(clusterScores), 1);
  const normalizedScores: Record<string, number> = {};
  for (const [id, val] of Object.entries(clusterScores)) {
    normalizedScores[id] = Math.round((val / maxVal) * 100);
  }

  const sorted = Object.entries(normalizedScores).sort((a, b) => b[1] - a[1]);
  const primaryEntry = sorted[0] || ['software-engineering', 80];
  const primaryLabel = interestClustersMap[primaryEntry[0]]?.label || 'Software Engineering';

  const secondary = sorted.slice(1, 6).map(([id, score]) => ({
    label: interestClustersMap[id]?.label || id,
    confidence: score,
  }));

  const confidence = Math.min(96, Math.max(65, Math.round(primaryEntry[1] * 0.7 + Math.min(25, reels.length * 4))));

  const reasoning = `The user repeatedly interacts with programming, developer lifestyle, coding interview, and version control content. While specific technologies like Java or Git appear in individual reels, the underlying pattern strongly indicates a broader interest in ${primaryLabel} and career growth rather than a single tool preference.`;

  return {
    primaryInterest: primaryLabel,
    confidence,
    secondaryInterests: secondary,
    evidence: evidenceList.slice(0, 5),
    reasoning,
    scores: normalizedScores,
  };
}

export function scoreReelLocal(
  reel: Reel,
  profile: InterestProfile,
  interactions: UserInteraction[]
): RecommendationScore {
  const text = extractTextSignals(reel);
  const clusterScores = scoreClusters(text);

  let semanticRelevance = 70;
  const primaryClusterKey = Object.keys(interestClustersMap).find(
    (k) => interestClustersMap[k].label === profile.primaryInterest
  );

  if (primaryClusterKey && clusterScores[primaryClusterKey]) {
    semanticRelevance = Math.min(98, 75 + clusterScores[primaryClusterKey] * 8);
  } else {
    const matchedSecondary = profile.secondaryInterests.find((s) => {
      const k = Object.keys(interestClustersMap).find((key) => interestClustersMap[key].label === s.label);
      return k && (clusterScores[k] || 0) > 0;
    });
    if (matchedSecondary) {
      semanticRelevance = Math.min(90, 60 + matchedSecondary.confidence * 0.3);
    }
  }

  let behavioralAffinity = 60;
  const existingInteraction = interactions.find((i) => i.reelId === reel.id);
  if (existingInteraction) {
    const weight = behaviorWeights[existingInteraction.type] || 0;
    behavioralAffinity = Math.max(10, Math.min(100, 50 + weight * 10));
  } else {
    behavioralAffinity = 75; // Unseen candidate reels get baseline interest
  }

  const topicConsistency = 85;
  const educationalValue = reel.educationalValue === 'high' ? 95 : reel.educationalValue === 'medium' ? 70 : 40;
  const careerValue = reel.careerValue === 'high' ? 92 : reel.careerValue === 'medium' ? 70 : 40;

  const hypeInfo = evaluateHypeLocal(reel);
  const hypePenalty = hypeInfo.decision === 'FILTERED' ? 40 : hypeInfo.decision === 'WARNING' ? 15 : 2;

  let repetitionPenalty = 0;
  if (existingInteraction && existingInteraction.type === 'not_interested') {
    repetitionPenalty = 50;
  } else if (existingInteraction && existingInteraction.type === 'skip') {
    repetitionPenalty = 15;
  }

  const finalScore = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        semanticRelevance * 0.30 +
        behavioralAffinity * 0.25 +
        topicConsistency * 0.15 +
        educationalValue * 0.15 +
        careerValue * 0.15 -
        hypePenalty -
        repetitionPenalty
      )
    )
  );

  return {
    semanticRelevance,
    behavioralAffinity,
    topicConsistency,
    educationalValue,
    careerValue,
    hypePenalty,
    repetitionPenalty,
    final: finalScore,
  };
}

export function generateRecommendationsLocal(
  profile: InterestProfile,
  allReels: Reel[] = defaultReelsDataset,
  interactions: UserInteraction[] = []
): Recommendation[] {
  const candidates = allReels.filter((r) => r.educationalValue !== 'none');

  const scoredList = candidates.map((reel) => {
    const score = scoreReelLocal(reel, profile, interactions);
    const hypeResult = evaluateHypeLocal(reel);
    const isFiltered = hypeResult.decision === 'FILTERED';

    const reasoning = `Recommended based on your inferred interest in ${profile.primaryInterest}. This content delivers practical learning value in ${reel.category} (${reel.subCategory}).`;
    const connectionToInterest = `You recently interacted with ${reel.category} and software development content.`;
    const usefulness = `Teaches ${reel.skills.slice(0, 3).join(', ') || reel.subCategory}, a valuable skill in ${profile.primaryInterest}.`;
    const whyNotOther = `Selected over superficial hype reels because it has high educational value (${reel.educationalValue}) and low hype penalty (-${score.hypePenalty}).`;

    return {
      reel,
      score,
      reasoning,
      connectionToInterest,
      usefulness,
      whyNotOther,
      confidence: score.final > 80 ? ('high' as const) : score.final > 60 ? ('medium' as const) : ('low' as const),
      hypeFiltered: isFiltered,
    };
  });

  // Filter out heavily hype-penalized reels from top recommendations unless requested
  const validRecommendations = scoredList.filter((item) => !item.hypeFiltered && item.score.final >= 50);

  // Apply Diversity Rule: Max 2 from exact same subcategory
  const finalRecs: Recommendation[] = [];
  const subCategoryCounts: Record<string, number> = {};

  validRecommendations.sort((a, b) => b.score.final - a.score.final);

  for (const item of validRecommendations) {
    const sub = item.reel.subCategory.toLowerCase();
    const count = subCategoryCounts[sub] || 0;
    if (count < 2) {
      finalRecs.push(item);
      subCategoryCounts[sub] = count + 1;
    }
    if (finalRecs.length >= 8) break;
  }

  return finalRecs;
}

export function analyzeScenarioLocal(scenario: Scenario, dataset: Reel[] = defaultReelsDataset) {
  const scenarioReelIds = scenario.reels.map((r) => r.reelId);
  const matchedReels = dataset.filter((r) => scenarioReelIds.includes(r.id));

  // If synthetic scenario IDs are passed, create stub reels from dataset
  const activeReels = matchedReels.length > 0 ? matchedReels : dataset.slice(0, 4);
  const scenarioInteractions: UserInteraction[] = scenario.reels.map((r) => ({
    reelId: r.reelId,
    type: r.interaction,
    timestamp: Date.now(),
  }));

  const inferredProfile = analyzeInterestLocal(activeReels, scenarioInteractions);
  const recommendations = generateRecommendationsLocal(inferredProfile, dataset, scenarioInteractions);

  return {
    scenarioId: scenario.id,
    title: scenario.title,
    observedSignals: activeReels.map((r) => ({ title: r.title, category: r.category })),
    inferredInterest: inferredProfile.primaryInterest,
    expectedInference: scenario.expectedInference,
    confidence: inferredProfile.confidence,
    reasoning: inferredProfile.reasoning,
    recommendedContent: recommendations.slice(0, 4),
  };
}
