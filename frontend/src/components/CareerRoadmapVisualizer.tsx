import React from 'react';
import { CheckCircle2, GitBranch, Database, ShieldCheck, Cpu, Cloud, Terminal, Compass, ArrowRight } from 'lucide-react';

interface CareerRoadmapProps {
  primaryInterest: string;
}

export const CareerRoadmapVisualizer: React.FC<CareerRoadmapProps> = ({ primaryInterest }) => {
  const roadmaps: Record<string, { title: string; steps: { level: string; skill: string; desc: string; icon: any }[] }> = {
    'Software Engineering': {
      title: 'Software Engineering Career Pathway',
      steps: [
        { level: 'Phase 1: Foundational', skill: 'Version Control & Git Branching', desc: 'Master multi-branch workflows, rebasing, and merge conflict resolution.', icon: GitBranch },
        { level: 'Phase 2: Algorithmic', skill: 'DSA & Sliding Window Patterns', desc: 'Optimize time complexity from O(N²) to O(N) for coding interviews.', icon: Terminal },
        { level: 'Phase 3: Systems', skill: 'REST API & Microservices Design', desc: 'Build scalable HTTP endpoints, authentication, and database schemas.', icon: Database },
        { level: 'Phase 4: Cloud & Ops', skill: 'Docker & Load Balancer Infrastructure', desc: 'Package applications into containers and manage distributed traffic.', icon: Cloud },
      ],
    },
    'Artificial Intelligence': {
      title: 'Applied AI & ML Engineering Pathway',
      steps: [
        { level: 'Phase 1: Fundamentals', skill: 'Python Data Structures & NumPy', desc: 'Manipulate vectors, matrices, and tensors efficiently.', icon: Terminal },
        { level: 'Phase 2: Deep Learning', skill: 'Neural Networks & PyTorch', desc: 'Build forward pass, backprop, and activation functions.', icon: Cpu },
        { level: 'Phase 3: LLMs & RAG', skill: 'Vector Databases & LangChain', desc: 'Implement Retrieval Augmented Generation for document search.', icon: Compass },
        { level: 'Phase 4: Deployment', skill: 'Model Quantization & Inference APIs', desc: 'Deploy fine-tuned models to production cloud endpoints.', icon: Cloud },
      ],
    },
    'Hardware & Systems': {
      title: 'Hardware & Computer Architecture Pathway',
      steps: [
        { level: 'Phase 1: Low-Level', skill: 'Embedded C & Microcontrollers', desc: 'Program GPIO, I2C, SPI, and UART interfaces on hardware.', icon: Cpu },
        { level: 'Phase 2: Architecture', skill: 'CPU Registers & Memory Management', desc: 'Understand cache lines, bus speeds, and hardware registers.', icon: Terminal },
        { level: 'Phase 3: Benchmarking', skill: 'GPU Performance & Thermal Testing', desc: 'Analyze bottlenecks in PCI-e lanes, thermal throttling, and vRAM.', icon: Compass },
        { level: 'Phase 4: Custom Systems', skill: 'FPGA & Circuit PCB Design', desc: 'Design custom hardware schematics and logic synthesis.', icon: GitBranch },
      ],
    },
  };

  const defaultRoadmap = roadmaps[primaryInterest] || roadmaps['Software Engineering'];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-gray-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-4">
        <div>
          <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
            Scroll-to-Skill Transformation Output
          </span>
          <h3 className="text-xl font-bold text-white mt-1">{defaultRoadmap.title}</h3>
          <p className="text-xs text-gray-400">Inferred from your content viewing patterns to provide a structured skill roadmap</p>
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>4-Phase Career Progression</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {defaultRoadmap.steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl bg-gray-950/80 border border-gray-800 space-y-3 relative group hover:border-indigo-500/50 transition">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="w-6 h-6 rounded-full bg-gray-900 border border-gray-800 text-[10px] font-bold text-gray-300 flex items-center justify-center">
                  0{idx + 1}
                </span>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider mb-1">{step.level}</div>
                <h4 className="text-sm font-bold text-white mb-1">{step.skill}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
              </div>

              {idx < defaultRoadmap.steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-gray-600">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
