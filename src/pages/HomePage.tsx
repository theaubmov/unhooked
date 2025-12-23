import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLATFORMS } from '../app.constants';
import type { CSSVars, PlatformId } from '../app.types';
import { SetupView } from '../components/SetupView';

export function HomePage() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<PlatformId>('youtube');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const activePlatform =
    PLATFORMS.find((platform) => platform.id === activeId) ?? PLATFORMS[0];
  const themeStyle: CSSVars = {
    '--accent': activePlatform.accent,
    '--accent-contrast': activePlatform.contrast,
  };
  const youtubeAccessToken =
    import.meta.env.YOUTUBE_ACCESS_TOKEN ?? import.meta.env.VITE_YOUTUBE_ACCESS_TOKEN;
  const hasAccessToken = !!youtubeAccessToken?.trim();
  const isYoutubeActive = activeId === 'youtube';
  const canStart = isYoutubeActive && hasAccessToken;

  const handleStart = async () => {
    if (!isYoutubeActive) {
      setErrorMessage('YouTube support is available first. Switch back to start.');
      return;
    }
    if (!hasAccessToken) {
      setErrorMessage('Missing YOUTUBE_ACCESS_TOKEN in the environment.');
      return;
    }

    setErrorMessage(null);
    navigate('/review');
  };

  const handlePlatformChange = (platformId: PlatformId) => {
    setActiveId(platformId);
    setErrorMessage(null);
  };

  return (
    <div className="page" style={themeStyle}>
      <SetupView
        activePlatform={activePlatform}
        platforms={PLATFORMS}
        activeId={activeId}
        canStart={canStart}
        isYoutubeActive={isYoutubeActive}
        errorMessage={errorMessage}
        onPlatformChange={handlePlatformChange}
        onStart={handleStart}
        onOpenRoadmap={() => navigate('/roadmap')}
      />
    </div>
  );
}
