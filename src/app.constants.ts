import type { Platform } from './app.types';

export const PLATFORMS: Platform[] = [
  {
    id: 'youtube',
    label: 'YouTube',
    accent: '#e62117',
    contrast: '#fffaf8',
    status: 'v1 focus',
    summary: 'Clean recommendations, reduce rabbit holes, and reset the home feed.',
  },
  {
    id: 'twitter',
    label: 'X / Twitter',
    accent: '#111111',
    contrast: '#f5f5f5',
    status: 'next up',
    summary: 'Filter low-signal posts and calm the timeline pace.',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    accent: '#0a66c2',
    contrast: '#eef5ff',
    status: 'coming soon',
    summary: 'Declutter the feed and surface relevant professional updates.',
  },
];
