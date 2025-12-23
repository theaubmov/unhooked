import type { Platform } from './app.types';

export const PLATFORMS: Platform[] = [
  {
    id: 'youtube',
    label: 'YouTube',
    accent: '#e62117',
    contrast: '#fffaf8',
    status: 'v1 focus',
    summary:
      'Organize and clean your YouTube subscription feed by removing uninteresting channels and quickly unsubscribing.',
  },
  {
    id: 'twitter',
    label: 'X / Twitter',
    accent: '#111111',
    contrast: '#f5f5f5',
    status: 'next up',
    summary:
      'Trim noisy accounts, slow the timeline, and keep only the voices that matter. Coming soon.',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    accent: '#0a66c2',
    contrast: '#eef5ff',
    status: 'coming soon',
    summary:
      'Declutter your LinkedIn feed to highlight meaningful updates and people you care about. Coming soon.',
  },
];
