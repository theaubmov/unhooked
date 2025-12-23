import type { CSSProperties } from 'react';

export type PlatformId = 'youtube' | 'twitter' | 'linkedin';

export type Platform = {
  id: PlatformId;
  label: string;
  accent: string;
  contrast: string;
  status: string;
  summary: string;
};

export type CSSVars = CSSProperties & {
  '--accent'?: string;
  '--accent-contrast'?: string;
  '--delay'?: string;
};
