import type { FormEvent } from 'react';
import type { Platform, PlatformId } from '../app.types';
import { PlatformSwitcher } from './PlatformSwitcher';

type SetupHeroProps = {
  activePlatform: Platform;
  platforms: Platform[];
  activeId: PlatformId;
  canStart: boolean;
  isYoutubeActive: boolean;
  errorMessage: string | null;
  onPlatformChange: (platformId: PlatformId) => void;
  onStart: () => Promise<void>;
};

export function SetupHero({
  activePlatform,
  platforms,
  activeId,
  canStart,
  isYoutubeActive,
  errorMessage,
  onPlatformChange,
  onStart,
}: SetupHeroProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onStart();
  };

  return (
    <header className="hero">
      <div className="hero-top">
        <span className="brand">Unhooked</span>
        <span className="status-pill">{activePlatform.status}</span>
      </div>
      <h1>Unhook from the scroll.</h1>
      <p>
        A focused clean-up tool for people who want their feeds to feel
        intentional again. We start with YouTube and are building toward X and
        LinkedIn next.
      </p>
      <div className="hero-row">
        <PlatformSwitcher
          platforms={platforms}
          activeId={activeId}
          onChange={onPlatformChange}
        />
        <form className="hero-actions" onSubmit={handleSubmit}>
          <button className="start" type="submit" disabled={!canStart}>
            Start clean-up
          </button>
        </form>
      </div>
      {!isYoutubeActive && (
        <div className="helper">YouTube is available first. More soon.</div>
      )}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </header>
  );
}
