import React from 'react';
import {
  BrainCircuit,
  Compass,
  Sparkles,
  Zap,
  TestTube2,
  BarChart3,
  Settings,
  Play,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  aiMode: string;
  onRunDemo: () => void;
  isDemoRunning?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  aiMode,
  onRunDemo,
  isDemoRunning = false,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BrainCircuit },
    { id: 'reels', label: 'Reels Explorer', icon: Compass },
    { id: 'analysis', label: 'AI Analysis', icon: Sparkles },
    { id: 'recommendations', label: 'Recommendations', icon: Zap },
    { id: 'surprise-lab', label: 'Surprise Lab', icon: TestTube2 },
    { id: 'evaluation', label: 'Evaluation', icon: BarChart3 },
    { id: 'settings', label: 'Settings & Status', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-gray-800/80 bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                  ReelMind <span className="gradient-text">AI</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                  Hack2Skill Demo
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-medium">Turn Your Scroll Into Skill</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions: AI Mode & Run Demo Button */}
          <div className="flex items-center space-x-3">
            {/* AI Engine Status Badge */}
            <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-900 border border-gray-800 text-gray-300">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-gray-400">Mode:</span>
              <span className="text-emerald-400 font-semibold">{aiMode}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot ml-1"></span>
            </div>

            {/* Run Full Demo CTA Button */}
            <button
              onClick={onRunDemo}
              disabled={isDemoRunning}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold text-white shadow-lg transition-all transform hover:scale-105 ${
                isDemoRunning
                  ? 'bg-gradient-to-r from-purple-700 to-indigo-700 cursor-wait animate-pulse'
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-indigo-500/25'
              }`}
            >
              {isDemoRunning ? (
                <>
                  <CheckCircle2 className="w-4 h-4 animate-spin text-indigo-200" />
                  <span>Running AI Demo...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current text-white" />
                  <span>🚀 Run Full AI Demo</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
