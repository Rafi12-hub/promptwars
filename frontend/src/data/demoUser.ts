import type { UserProfile } from '../types';

export const demoUser: UserProfile = {
  name: 'Alex',
  interactions: [
    {
      reelId: 'reel-007', // Java Memory Management
      type: 'watch_complete',
      timestamp: Date.now() - 3600000 * 5,
    },
    {
      reelId: 'reel-022', // Software Engineer Day in Life
      type: 'like',
      timestamp: Date.now() - 3600000 * 4,
    },
    {
      reelId: 'reel-004', // DSA Sliding Window / Interview
      type: 'save',
      timestamp: Date.now() - 3600000 * 3,
    },
    {
      reelId: 'reel-001', // How Git Branching Works
      type: 'watch_complete',
      timestamp: Date.now() - 3600000 * 2,
    },
    {
      reelId: 'reel-023', // Developer Setup Tour / Laptop
      type: 'watch_partial',
      timestamp: Date.now() - 3600000 * 1,
    },
  ],
  explicitInterests: ['Software Engineering', 'Programming'],
  blockedTopics: [],
};
