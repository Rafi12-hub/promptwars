const interestClusters = {
  'software-engineering': {
    label: 'Software Engineering',
    keywords: [
      'software engineer', 'architecture', 'design patterns', 'system design',
      'code review', 'git', 'version control', 'agile', 'devops', 'backend',
      'frontend', 'full stack', 'api', 'microservices', 'refactoring',
      'sprint', 'deployment', 'ci/cd', 'pull request', 'merge', 'repository',
      'branch', 'codebase', 'technical debt', 'scalability', 'load balancer',
      'database', 'sql', 'nosql', 'rest', 'graphql', 'authentication',
      'authorization', 'oauth', 'jwt', 'session', 'middleware'
    ],
    weight: 0,
  },
  'artificial-intelligence': {
    label: 'Artificial Intelligence',
    keywords: [
      'artificial intelligence', 'machine learning', 'deep learning', 'neural network',
      'nlp', 'natural language processing', 'computer vision', 'transformer',
      'gpt', 'llm', 'large language model', 'diffusion model', 'reinforcement learning',
      'supervised learning', 'unsupervised learning', 'classification', 'regression',
      'tensorflow', 'pytorch', 'keras', 'huggingface', 'fine-tuning',
      'training', 'inference', 'model', 'embedding', 'attention', 'token',
      'prompt', 'fine tune', 'fine-tune', 'ai agent', 'rag',
      'retrieval augmented', 'vector database', 'embedding', 'semantic',
      'chatbot', 'generative', 'generative ai', 'copilot'
    ],
    weight: 0,
  },
  'data-structures': {
    label: 'Data Structures & Algorithms',
    keywords: [
      'data structure', 'algorithm', 'array', 'linked list', 'stack', 'queue',
      'tree', 'binary tree', 'binary search tree', 'heap', 'graph',
      'hash map', 'hash table', 'sorting', 'searching', 'dynamic programming',
      'greedy', 'backtracking', 'recursion', 'time complexity', 'space complexity',
      'big o', 'o(n)', 'leetcode', 'competitive programming', 'coding interview',
      'interview prep', 'dsa', 'traversal', 'bfs', 'dfs', 'dijkstra',
      'merge sort', 'quick sort', 'bubble sort', 'insertion sort', 'topological',
      'prefix tree', 'trie', 'union find', 'disjoint set'
    ],
    weight: 0,
  },
  'web-development': {
    label: 'Web Development',
    keywords: [
      'web development', 'html', 'css', 'javascript', 'typescript', 'react',
      'vue', 'angular', 'svelte', 'nextjs', 'next.js', 'nodejs', 'node.js',
      'express', 'tailwind', 'bootstrap', 'responsive', 'frontend',
      'dom', 'document object model', 'spa', 'single page', 'ssr',
      'server side rendering', 'static site', 'jamstack', 'pwa', 'progressive web',
      'webpack', 'vite', 'parcel', 'npm', 'yarn', 'package manager',
      'browser', 'cross-browser', 'accessibility', 'a11y', 'seo',
      'meta tag', 'css grid', 'flexbox', 'animation', 'sass', 'less',
      'webpack', 'esbuild', 'rollup', 'component', 'state management',
      'redux', 'zustand', 'context api', 'hook', 'usestate', 'useeffect'
    ],
    weight: 0,
  },
  'cybersecurity': {
    label: 'Cybersecurity',
    keywords: [
      'cybersecurity', 'security', 'hacking', 'penetration testing', 'vulnerability',
      'exploit', 'xss', 'cross site scripting', 'sql injection', 'csrf',
      'firewall', 'encryption', 'decryption', 'hashing', 'password',
      'brute force', 'phishing', 'malware', 'ransomware', 'trojan',
      'zero day', 'cve', 'patch', 'audit', 'compliance', 'owasp',
      'bug bounty', 'ctf', 'capture the flag', 'red team', 'blue team',
      'siem', 'intrusion detection', 'access control', 'authentication bypass',
      'certificate', 'ssl', 'tls', 'vpn', 'proxy', 'anonymity',
      'social engineering', 'osint', 'forensics', 'incident response'
    ],
    weight: 0,
  },
  'cloud': {
    label: 'Cloud & DevOps',
    keywords: [
      'cloud', 'aws', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes',
      'k8s', 'container', 'virtual machine', 'vm', 'serverless', 'lambda',
      'terraform', 'ansible', 'infrastructure as code', 'iac', 'ci/cd',
      'jenkins', 'github actions', 'gitlab ci', 'monitoring', 'grafana',
      'prometheus', 'logging', 'elk', 'elastic', 'kibana', 'nginx',
      'apache', 'load balancer', 'cdn', 'dns', 'ssl', 'deployment',
      'blue green', 'canary', 'rollback', 'autoscaling', 'elastic',
      'microservice', 'service mesh', 'istio', 'consul', 'etcd',
      'pipeline', 'build', 'artifact', 'registry', 'helm', 'argo'
    ],
    weight: 0,
  },
  'hardware': {
    label: 'Hardware & Embedded',
    keywords: [
      'hardware', 'embedded', 'microcontroller', 'arduino', 'raspberry pi',
      'fpga', 'circuit', 'pcb', 'soldering', 'iot', 'internet of things',
      'sensor', 'actuator', 'gpio', 'spi', 'i2c', 'uart', 'bluetooth',
      'wifi', 'wireless', 'radio', 'rf', 'antenna', 'processor',
      'cpu', 'gpu', 'tpu', 'asic', 'soc', 'system on chip', 'register',
      'memory', 'ram', 'rom', 'flash', 'storage', 'hard disk', 'ssd',
      'power supply', 'voltage', 'current', 'resistance', 'capacitor',
      'transistor', 'diode', 'led', 'oscilloscope', 'multimeter'
    ],
    weight: 0,
  },
  'career': {
    label: 'Career & Professional Growth',
    keywords: [
      'career', 'job', 'hiring', 'interview', 'resume', 'cv', 'portfolio',
      'linkedin', 'networking', 'mentor', 'mentorship', 'salary', 'negotiate',
      'promotion', 'leadership', 'management', 'team lead', 'tech lead',
      'principal', 'staff engineer', 'distinguished', 'fellow', 'cto',
      'engineering manager', 'product manager', 'startup', 'founder',
      'entrepreneur', 'freelance', 'contract', 'remote work', 'work life balance',
      'burnout', 'growth mindset', 'learning', 'upskill', 'transition',
      'switch career', 'first job', 'entry level', 'junior', 'senior',
      'internship', 'apprentice', 'bootcamp', 'self taught', 'degree'
    ],
    weight: 0,
  },
  'programming': {
    label: 'Programming & Coding',
    keywords: [
      'programming', 'coding', 'developer', 'programmer', 'code',
      'python', 'java', 'c++', 'c#', 'rust', 'go', 'golang', 'ruby',
      'php', 'swift', 'kotlin', 'scala', 'haskell', 'elixir', 'lua',
      'perl', 'r', 'matlab', 'sql', 'bash', 'shell', 'powershell',
      'regex', 'oop', 'object oriented', 'functional programming',
      'procedural', 'paradigm', 'syntax', 'compiler', 'interpreter',
      'debugging', 'testing', 'unit test', 'integration test', 'tdd',
      'bdd', 'clean code', 'solid', 'dry', 'kiss', 'yagni',
      'code smell', 'technical debt', 'ide', 'vscode', 'vim', 'neovim',
      'jetbrains', 'intellij', 'eclipse', 'visual studio'
    ],
    weight: 0,
  },
  'productivity': {
    label: 'Productivity & Tools',
    keywords: [
      'productivity', 'notion', 'obsidian', 'todoist', 'trello', 'jira',
      'linear', 'clickup', 'asana', 'calendar', 'time management',
      'pomodoro', 'deep work', 'flow state', 'focus', 'distraction',
      'automation', 'zapier', 'ifttt', 'script', 'macro', 'keyboard shortcut',
      'terminal', 'command line', 'cli', 'workflow', 'system',
      'habit', 'journal', 'note taking', 'mind map', 'kanban',
      'sprint', 'backlog', 'prioritization', 'goal setting', 'okr',
      'smart goal', 'eisenhower', 'pareto', '80/20', 'delegation'
    ],
    weight: 0,
  },
};

const behaviorWeights = {
  watch_complete: 3,
  save: 5,
  like: 4,
  watch_partial: 1,
  skip: -2,
  not_interested: -5,
};

function extractTextSignals(reel) {
  const parts = [];
  if (reel.title) parts.push(reel.title);
  if (reel.description) parts.push(reel.description);
  if (reel.category) parts.push(reel.category);
  if (reel.tags && Array.isArray(reel.tags)) parts.push(reel.tags.join(' '));
  if (reel.skills && Array.isArray(reel.skills)) parts.push(reel.skills.join(' '));
  if (reel.transcript) parts.push(reel.transcript);
  if (reel.creator) parts.push(reel.creator);
  return parts.join(' ').toLowerCase();
}

function scoreClusters(text) {
  const scores = {};
  for (const [id, cluster] of Object.entries(interestClusters)) {
    let matches = 0;
    for (const kw of cluster.keywords) {
      if (text.includes(kw)) matches++;
    }
    scores[id] = matches;
  }
  return scores;
}

function normalizeScores(scores) {
  const maxScore = Math.max(...Object.values(scores), 1);
  const normalized = {};
  for (const [id, score] of Object.entries(scores)) {
    normalized[id] = Math.round((score / maxScore) * 100);
  }
  return normalized;
}

function analyzeInterest(reels, interactions) {
  if (!reels || !reels.length) {
    return {
      primaryInterest: null,
      confidence: 0,
      secondaryInterests: [],
      evidence: [],
      reasoning: 'No reels provided for analysis.',
      scores: {},
    };
  }

  const combinedScores = {};
  for (const id of Object.keys(interestClusters)) {
    combinedScores[id] = 0;
  }

  const evidence = [];
  const reelTexts = [];

  for (const reel of reels) {
    const text = extractTextSignals(reel);
    reelTexts.push(text);
    const clusterScores = scoreClusters(text);
    for (const [id, score] of Object.entries(clusterScores)) {
      combinedScores[id] += score;
    }
  }

  const interactionMap = {};
  for (const interaction of interactions) {
    const reelId = interaction.reelId || interaction.reel_id;
    const action = interaction.action || interaction.type;
    if (reelId && action && behaviorWeights[action] !== undefined) {
      if (!interactionMap[reelId]) interactionMap[reelId] = [];
      interactionMap[reelId].push(behaviorWeights[action]);
    }
  }

  for (const reel of reels) {
    const reelId = reel.id || reel._id;
    if (reelId && interactionMap[reelId]) {
      const totalBehavior = interactionMap[reelId].reduce((a, b) => a + b, 0);
      const text = extractTextSignals(reel);
      const clusterScores = scoreClusters(text);
      const topClusters = Object.entries(clusterScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .filter(([, s]) => s > 0);

      for (const [id] of topClusters) {
        combinedScores[id] += totalBehavior;
      }
    }
  }

  const normalized = normalizeScores(combinedScores);
  const sorted = Object.entries(normalized).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0];
  const secondary = sorted.slice(1, 4).filter(([, s]) => s > 0);

  const totalSignals = reels.length + interactions.length;
  const primaryScore = primary ? primary[1] : 0;
  let confidence = Math.min(95, Math.round(
    (primaryScore / 100) * 60 + Math.min(40, totalSignals * 3)
  ));
  if (primaryScore < 20) confidence = Math.round(confidence * 0.5);

  const reasoning = generateReasoning(primary, secondary, reels.length, interactions.length);

  for (const reel of reels) {
    const text = extractTextSignals(reel);
    const topMatches = [];
    for (const [id, cluster] of Object.entries(interestClusters)) {
      let count = 0;
      for (const kw of cluster.keywords) {
        if (text.includes(kw)) count++;
      }
      if (count > 0) topMatches.push({ cluster: cluster.label, matches: count });
    }
    topMatches.sort((a, b) => b.matches - a.matches);
    if (topMatches.length > 0) {
      evidence.push({
        reel: reel.title || reel.id || 'Unknown',
        topSignals: topMatches.slice(0, 2).map((m) => m.cluster),
      });
    }
  }

  return {
    primaryInterest: primary ? { id: primary[0], label: interestClusters[primary[0]].label, score: primary[1] } : null,
    confidence,
    secondaryInterests: secondary.map(([id, score]) => ({
      id,
      label: interestClusters[id].label,
      score,
    })),
    evidence,
    reasoning,
    scores: normalized,
  };
}

function generateReasoning(primary, secondary, reelCount, interactionCount) {
  if (!primary || primary[1] === 0) {
    return 'Insufficient signals detected. The reels provided do not clearly map to a specific interest cluster. Try providing reels with more distinct technical content.';
  }

  const parts = [];
  parts.push(`Based on analysis of ${reelCount} reel(s) and ${interactionCount} interaction(s),`);

  const primaryLabel = interestClusters[primary[0]].label;
  parts.push(`the strongest interest signal is ${primaryLabel} (confidence: ${primary[1]}%).`);

  if (secondary.length > 0) {
    const secLabels = secondary.map(([id]) => interestClusters[id].label);
    parts.push(`Secondary interests include ${secLabels.join(', ')}.`);
  }

  if (interactionCount > 0) {
    parts.push('Behavioral signals (watch time, likes, saves) reinforce these findings.');
  }

  parts.push('This analysis uses keyword matching, content classification, and behavioral weighting to derive the interest profile.');

  return parts.join(' ');
}

function scoreReel(reel, interestProfile, userInteractions) {
  if (!reel || !interestProfile) return 0;

  const text = extractTextSignals(reel);
  const clusterScores = scoreClusters(text);

  let semanticRelevance = 0;
  if (interestProfile.scores) {
    let weightedSum = 0;
    let totalWeight = 0;
    for (const [clusterId, reelScore] of Object.entries(clusterScores)) {
      const userInterest = interestProfile.scores[clusterId] || 0;
      weightedSum += reelScore * userInterest;
      totalWeight += reelScore;
    }
    semanticRelevance = totalWeight > 0 ? Math.min(100, (weightedSum / totalWeight)) : 0;
  } else if (interestProfile.primaryInterest) {
    const primaryId = interestProfile.primaryInterest.id;
    const primaryMax = interestClusters[primaryId]
      ? interestClusters[primaryId].keywords.length
      : 1;
    semanticRelevance = Math.min(100, ((clusterScores[primaryId] || 0) / Math.max(primaryMax, 1)) * 100);
  }

  let behavioralAffinity = 50;
  const reelId = reel.id || reel._id;
  if (userInteractions && userInteractions.length > 0) {
    const relevantInteractions = userInteractions.filter(
      (i) => (i.reelId || i.reel_id) === reelId
    );
    if (relevantInteractions.length > 0) {
      const totalWeight = relevantInteractions.reduce(
        (sum, i) => sum + (behaviorWeights[i.action || i.type] || 0), 0
      );
      behavioralAffinity = Math.max(0, Math.min(100, 50 + totalWeight * 5));
    }
  }

  let topicConsistency = 50;
  if (interestProfile.secondaryInterests && interestProfile.secondaryInterests.length > 0) {
    const secondaryIds = interestProfile.secondaryInterests.map((s) => s.id);
    const matchesSecondary = secondaryIds.filter((id) => (clusterScores[id] || 0) > 0);
    topicConsistency = 50 + (matchesSecondary.length / secondaryIds.length) * 50;
  }

  let educationalValue = 50;
  const eduKeywords = [
    'tutorial', 'learn', 'teach', 'explain', 'guide', 'how to', 'walkthrough',
    'deep dive', 'understand', 'concept', 'principle', 'theory', 'practice',
    'example', 'demo', 'step by step', 'beginner', 'advanced', 'fundamental',
    'master', 'course', 'lesson', 'workshop', 'study'
  ];
  let eduMatches = 0;
  for (const kw of eduKeywords) {
    if (text.includes(kw)) eduMatches++;
  }
  educationalValue = Math.min(100, 40 + eduMatches * 8);

  let careerValue = 50;
  const careerKeywords = [
    'job', 'career', 'interview', 'hiring', 'resume', 'salary', 'promotion',
    'skill', 'professional', 'industry', 'market', 'demand', 'opportunity',
    'freelance', 'client', 'portfolio', 'certification', 'credential'
  ];
  let careerMatches = 0;
  for (const kw of careerKeywords) {
    if (text.includes(kw)) careerMatches++;
  }
  careerValue = Math.min(100, 40 + careerMatches * 8);

  const hypeResult = evaluateHype(reel);
  const hypePenalty = Math.max(0, (hypeResult.score - 30) * 1.5);

  let repetitionPenalty = 0;
  if (userInteractions && userInteractions.length > 0) {
    const reelTags = (reel.tags || []).map((t) => t.toLowerCase());
    const reelCategory = (reel.category || '').toLowerCase();
    let seenCount = 0;
    for (const interaction of userInteractions) {
      if (interaction.reelTags) {
        const overlap = interaction.reelTags.filter((t) =>
          reelTags.includes(t.toLowerCase())
        ).length;
        if (overlap > 0) seenCount++;
      }
      if (interaction.reelCategory && interaction.reelCategory.toLowerCase() === reelCategory) {
        seenCount++;
      }
    }
    repetitionPenalty = Math.min(30, seenCount * 5);
  }

  const finalScore =
    semanticRelevance * 0.30 +
    behavioralAffinity * 0.25 +
    topicConsistency * 0.15 +
    educationalValue * 0.15 +
    careerValue * 0.15 -
    hypePenalty -
    repetitionPenalty;

  return Math.max(0, Math.min(100, Math.round(finalScore)));
}

function generateRecommendations(interestProfile, allReels, userInteractions, count = 7) {
  if (!allReels || !allReels.length) return [];

  const scored = allReels.map((reel) => ({
    reel,
    score: scoreReel(reel, interestProfile, userInteractions),
  }));

  scored.sort((a, b) => b.score - a.score);

  const recommendations = [];
  const subcategoryCount = {};

  for (const item of scored) {
    if (recommendations.length >= count) break;

    const subcategory = (item.reel.category || item.reel.subcategory || 'general').toLowerCase();
    const currentCount = subcategoryCount[subcategory] || 0;
    if (currentCount >= 2) continue;

    const reason = generateRecommendationReason(item.reel, interestProfile, item.score);

    recommendations.push({
      reelId: item.reel.id || item.reel._id,
      title: item.reel.title || 'Untitled',
      score: item.score,
      reason,
      category: item.reel.category || 'General',
    });

    subcategoryCount[subcategory] = currentCount + 1;
  }

  return recommendations;
}

function generateRecommendationReason(reel, profile, score) {
  const parts = [];
  const text = extractTextSignals(reel);
  const clusterScores = scoreClusters(text);

  const topCluster = Object.entries(clusterScores)
    .sort((a, b) => b[1] - a[1])
    .find(([, s]) => s > 0);

  if (topCluster) {
    const label = interestClusters[topCluster[0]]?.label || topCluster[0];
    parts.push(`Matches your interest in ${label}`);
  }

  if (score >= 80) {
    parts.push('Strong alignment with your profile');
  } else if (score >= 60) {
    parts.push('Good alignment with your interests');
  } else {
    parts.push('Potentially relevant content');
  }

  const eduKeywords = ['tutorial', 'learn', 'teach', 'explain', 'guide', 'how to'];
  for (const kw of eduKeywords) {
    if (text.includes(kw)) {
      parts.push('Educational content');
      break;
    }
  }

  return parts.join('. ') + '.';
}

function evaluateHype(reel) {
  const text = extractTextSignals(reel);
  const signals = [];
  let hypeScore = 0;

  const guaranteedPatterns = [/guaranteed/gi, /guarantee/gi, /definitely will/gi, /100%\s*(sure|guaranteed|money)/gi];
  for (const pattern of guaranteedPatterns) {
    if (pattern.test(text)) {
      hypeScore += 20;
      signals.push('Contains guarantee language');
      break;
    }
  }

  const timePressurePatterns = [
    /in\s+\d+\s+days?/gi, /in\s+\d+\s+weeks?/gi, /in\s+\d+\s+hours?/gi,
    /in\s+just\s+\d+/gi, /overnight/gi, /instant(ly)?/gi, /quick(ly)?\s+fix/gi,
    /secret(s)?\s+to/gi, /nobody\s+(tells|wants)\s+you/gi,
  ];
  for (const pattern of timePressurePatterns) {
    if (pattern.test(text)) {
      hypeScore += 15;
      signals.push('Uses time pressure language');
      break;
    }
  }

  const moneyPatterns = [
    /make\s+you\s+rich/gi, /make\s+money/gi, /earn\s+\$/gi, /passive\s+income/gi,
    /financial\s+freedom/gi, /get\s+rich/gi, /\$[\d,]+/g, /money\s+online/gi,
    /side\s+hustle/gi, /cash\s+flow/gi,
  ];
  for (const pattern of moneyPatterns) {
    if (pattern.test(text)) {
      hypeScore += 15;
      signals.push('Contains money-making claims');
      break;
    }
  }

  const replacementPatterns = [
    /replaces\s+programmers/gi, /replaces\s+developers/gi,
    /developers?\s+are\s+dead/gi, /coding\s+is\s+dead/gi,
    /no\s+need\s+to\s+(learn|code|program)/gi, /why\s+learn\s+to\s+code/gi,
    /ai\s+will\s+replace/gi, /obsolete/gi,
  ];
  for (const pattern of replacementPatterns) {
    if (pattern.test(text)) {
      hypeScore += 20;
      signals.push('Makes replacement/doom claims');
      break;
    }
  }

  const socialPressurePatterns = [
    /everyone\s+is\s+using/gi, /you'?re?\s+missing\s+out/gi,
    /fomo/gi, /before\s+it'?s?\s+too\s+late/gi, /don'?t?\s+get\s+left\s+behind/gi,
    /everyone\s+knows/gi, /only\s+way\s+forward/gi,
  ];
  for (const pattern of socialPressurePatterns) {
    if (pattern.test(text)) {
      hypeScore += 15;
      signals.push('Uses social pressure tactics');
      break;
    }
  }

  const capsWords = text.match(/\b[A-Z]{4,}\b/g) || [];
  const capsRatio = capsWords.length / Math.max(text.split(/\s+/).length, 1);
  if (capsRatio > 0.15) {
    hypeScore += 10;
    signals.push('Excessive capitalization');
  }

  const exclamationCount = (text.match(/!/g) || []).length;
  if (exclamationCount > 3) {
    hypeScore += 10;
    signals.push('Excessive exclamation marks');
  }

  const dollarSigns = (text.match(/\$/g) || []).length;
  if (dollarSigns > 2) {
    hypeScore += 10;
    signals.push('Excessive dollar signs');
  }

  const emojiCount = (text.match(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu) || []).length;
  if (emojiCount > 5) {
    hypeScore += 5;
    signals.push('Excessive emoji usage');
  }

  hypeScore = Math.min(100, hypeScore);

  let decision;
  if (hypeScore >= 60) {
    decision = 'misleading';
  } else if (hypeScore >= 30) {
    decision = 'hype';
  } else {
    decision = 'genuine';
  }

  let reason;
  if (decision === 'genuine') {
    reason = 'This reel appears to have authentic content without significant hype indicators.';
  } else if (decision === 'hype') {
    reason = `This reel shows moderate hype indicators (${signals.length} signal(s) detected). Some claims may be exaggerated.`;
  } else {
    reason = `This reel shows strong hype and potentially misleading content (${signals.length} signal(s) detected). Exercise caution with the claims made.`;
  }

  return {
    score: hypeScore,
    decision,
    reason,
    signals,
  };
}

function analyzeScenario(scenarioReels, reelsDataset) {
  if (!scenarioReels || !scenarioReels.length) {
    return {
      analysis: [],
      summary: 'No scenario reels provided.',
      overallImpact: 0,
    };
  }

  const datasetMap = {};
  if (reelsDataset && reelsDataset.length) {
    for (const reel of reelsDataset) {
      const id = reel.id || reel._id;
      if (id) datasetMap[id] = reel;
    }
  }

  const resolvedReels = scenarioReels.map((sr) => {
    if (typeof sr === 'object' && sr.title) return sr;
    if (typeof sr === 'string' || typeof sr === 'number') {
      return datasetMap[sr] || { id: sr, title: `Scenario Reel ${sr}`, description: '', category: 'unknown' };
    }
    return sr;
  });

  const defaultProfile = {
    scores: {},
    primaryInterest: null,
    secondaryInterests: [],
  };
  for (const id of Object.keys(interestClusters)) {
    defaultProfile.scores[id] = 50;
  }

  const analysis = resolvedReels.map((reel) => {
    const hype = evaluateHype(reel);
    const text = extractTextSignals(reel);
    const clusterScores = scoreClusters(text);
    const normalizedClusters = normalizeScores(clusterScores);

    const topClusters = Object.entries(normalizedClusters)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .filter(([, s]) => s > 0)
      .map(([id, score]) => ({
        id,
        label: interestClusters[id]?.label || id,
        score,
      }));

    return {
      reelId: reel.id || reel._id || 'unknown',
      title: reel.title || 'Untitled',
      hype,
      interestAlignment: topClusters,
      overallScore: Math.round(
        (100 - hype.score) * 0.4 +
        (topClusters.length > 0 ? topClusters[0].score * 0.6 : 30)
      ),
    };
  });

  const avgScore = analysis.length > 0
    ? Math.round(analysis.reduce((sum, a) => sum + a.overallScore, 0) / analysis.length)
    : 0;
  const avgHype = analysis.length > 0
    ? Math.round(analysis.reduce((sum, a) => sum + a.hype.score, 0) / analysis.length)
    : 0;

  let summary;
  if (analysis.length === 0) {
    summary = 'No reels could be analyzed in this scenario.';
  } else {
    const genuineCount = analysis.filter((a) => a.hype.decision === 'genuine').length;
    const hypeCount = analysis.filter((a) => a.hype.decision === 'hype').length;
    const misleadingCount = analysis.filter((a) => a.hype.decision === 'misleading').length;

    const parts = [`Scenario contains ${analysis.length} reel(s).`];
    if (genuineCount > 0) parts.push(`${genuineCount} genuine.`);
    if (hypeCount > 0) parts.push(`${hypeCount} hype.`);
    if (misleadingCount > 0) parts.push(`${misleadingCount} misleading.`);
    parts.push(`Average quality score: ${avgScore}/100. Average hype: ${avgHype}/100.`);
    summary = parts.join(' ');
  }

  return {
    analysis,
    summary,
    overallImpact: avgScore,
    averageHype: avgHype,
  };
}

module.exports = {
  analyzeInterest,
  generateRecommendations,
  evaluateHype,
  analyzeScenario,
  scoreReel,
  interestClusters,
  behaviorWeights,
};
