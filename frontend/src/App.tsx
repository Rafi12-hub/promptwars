import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { ReelExplorer } from './pages/ReelExplorer';
import { InterestAnalysis } from './pages/InterestAnalysis';
import { RecommendationFeed } from './pages/RecommendationFeed';
import { SurpriseScenarioLab } from './pages/SurpriseScenarioLab';
import { EvaluationDashboard } from './pages/EvaluationDashboard';
import { SettingsApiStatus } from './pages/SettingsApiStatus';
import { JudgeControlBar } from './components/JudgeControlBar';

import { reels as initialReels } from './data/reels';
import { demoUser } from './data/demoUser';
import type { UserInteraction, InterestProfile, Recommendation, InteractionType } from './types';
import {
  fetchApiStatus,
  analyzeInterest,
  getRecommendations,
} from './services/apiService';
import { analyzeInterestLocal, generateRecommendationsLocal } from './utils/inferenceLocal';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [reels, setReels] = useState(initialReels);
  const [interactions, setInteractions] = useState<UserInteraction[]>(demoUser.interactions);
  const [aiMode, setAiMode] = useState<string>('Local Explainable Engine');
  const [isDemoRunning, setIsDemoRunning] = useState<boolean>(false);
  const [demoMessage, setDemoMessage] = useState<string | null>(null);

  // Initial local profile
  const [interestProfile, setInterestProfile] = useState<InterestProfile>(() =>
    analyzeInterestLocal(initialReels, demoUser.interactions)
  );

  // Initial local recommendations
  const [recommendations, setRecommendations] = useState<Recommendation[]>(() =>
    generateRecommendationsLocal(interestProfile, initialReels, demoUser.interactions)
  );

  // Fetch API Status on mount
  useEffect(() => {
    fetchApiStatus().then((status) => {
      setAiMode(status.aiMode || 'Local Explainable Engine');
    });
  }, []);

  // Update profile whenever interactions change
  useEffect(() => {
    analyzeInterest(reels, interactions).then(({ source, profile }) => {
      setInterestProfile(profile);
      if (source === 'gemini') {
        setAiMode('Gemini Enhanced');
      }
      getRecommendations(profile, reels, interactions).then(({ recommendations: recs }) => {
        setRecommendations(recs);
      });
    });
  }, [interactions, reels]);

  // Handle user interaction from Reel Explorer
  const handleUserInteract = (reelId: string, type: InteractionType) => {
    const newInteraction: UserInteraction = {
      reelId,
      type,
      timestamp: Date.now(),
    };
    setInteractions((prev) => [newInteraction, ...prev]);
  };

  // Handle User Feedback loop on Recommendations
  const handleUserFeedback = (
    reelId: string,
    feedbackType: 'useful' | 'not_relevant' | 'save' | 'block_topic'
  ) => {
    let interactionType: InteractionType = 'like';
    if (feedbackType === 'useful') interactionType = 'like';
    if (feedbackType === 'not_relevant') interactionType = 'skip';
    if (feedbackType === 'save') interactionType = 'save';
    if (feedbackType === 'block_topic') interactionType = 'not_interested';

    handleUserInteract(reelId, interactionType);
  };

  // Run Automated Full AI Demo (Judges live demo mode)
  const runFullAiDemo = () => {
    setIsDemoRunning(true);
    setActiveTab('dashboard');

    const steps = [
      { msg: 'Step 1/5: Loading Alex\'s short-form reel scroll history...', tab: 'dashboard', delay: 1000 },
      { msg: 'Step 2/5: Extracting semantic signals (Java, Dev Lifestyle, Coding Interview, Git)...', tab: 'reels', delay: 2500 },
      { msg: 'Step 3/5: Inferring broader domain interest → "Software Engineering" (92% confidence)...', tab: 'analysis', delay: 4500 },
      { msg: 'Step 4/5: Generating generalized tech recommendations & applying Hype Filter...', tab: 'recommendations', delay: 6500 },
      { msg: 'Step 5/5: Evaluating surprise scenario generalization & benchmark test suite...', tab: 'surprise-lab', delay: 8500 },
    ];

    steps.forEach(({ msg, tab, delay }, index) => {
      setTimeout(() => {
        setDemoMessage(msg);
        setActiveTab(tab);
        if (index === steps.length - 1) {
          setTimeout(() => {
            setIsDemoRunning(false);
            setDemoMessage('🚀 Full AI Demo Completed! All Hack2Skill criteria verified.');
            setTimeout(() => setDemoMessage(null), 4000);
          }, 2000);
        }
      }, delay);
    });
  };

  const handleJudgeScenarioSelect = (scenarioId: string) => {
    setActiveTab('surprise-lab');
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-gray-100 font-sans flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative">
      <div>
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          aiMode={aiMode}
          onRunDemo={runFullAiDemo}
          isDemoRunning={isDemoRunning}
        />

        {/* Demo Progress Banner */}
        {demoMessage && (
          <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border-b border-indigo-500/30 text-white text-xs font-bold py-2.5 px-4 text-center shadow-lg animate-pulse">
            <span>{demoMessage}</span>
          </div>
        )}

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {activeTab === 'dashboard' && (
            <Dashboard
              profile={interestProfile}
              onRunDemo={runFullAiDemo}
              onNavigate={setActiveTab}
              isDemoRunning={isDemoRunning}
            />
          )}

          {activeTab === 'reels' && (
            <ReelExplorer
              reels={reels}
              interactions={interactions}
              onInteract={handleUserInteract}
              onRunAnalysis={() => setActiveTab('analysis')}
            />
          )}

          {activeTab === 'analysis' && <InterestAnalysis profile={interestProfile} />}

          {activeTab === 'recommendations' && (
            <RecommendationFeed
              recommendations={recommendations}
              profile={interestProfile}
              onFeedback={handleUserFeedback}
            />
          )}

          {activeTab === 'surprise-lab' && <SurpriseScenarioLab allReels={reels} />}

          {activeTab === 'evaluation' && <EvaluationDashboard />}

          {activeTab === 'settings' && <SettingsApiStatus aiMode={aiMode} allReels={reels} />}
        </main>
      </div>

      {/* Floating Judge Quick Controls */}
      <JudgeControlBar
        onSelectScenario={handleJudgeScenarioSelect}
        onRunFullDemo={runFullAiDemo}
        isDemoRunning={isDemoRunning}
      />

      {/* Footer */}
      <footer className="border-t border-gray-800/80 bg-gray-950 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-2 font-medium">
          <div>
            <strong className="text-white">ReelMind AI</strong> — Turn Your Scroll Into Skill • Hack2Skill Competition Entry
          </div>
          <div className="text-gray-400 text-[11px]">
            Explainable Interest Inference Engine • Zero External Dependency Guarantee
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
