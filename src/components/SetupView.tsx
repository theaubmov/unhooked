import type { Platform, PlatformId } from '../app.types';
import { SetupHero } from './SetupHero';

type SetupViewProps = {
  activePlatform: Platform;
  platforms: Platform[];
  activeId: PlatformId;
  canStart: boolean;
  isYoutubeActive: boolean;
  errorMessage: string | null;
  onPlatformChange: (platformId: PlatformId) => void;
  onStart: () => Promise<void>;
  onOpenRoadmap: () => void;
};

export function SetupView({
  activePlatform,
  platforms,
  activeId,
  canStart,
  isYoutubeActive,
  errorMessage,
  onPlatformChange,
  onStart,
  onOpenRoadmap,
}: SetupViewProps) {
  return (
    <>
      <SetupHero
        activePlatform={activePlatform}
        platforms={platforms}
        activeId={activeId}
        canStart={canStart}
        isYoutubeActive={isYoutubeActive}
        errorMessage={errorMessage}
        onPlatformChange={onPlatformChange}
        onStart={onStart}
        onOpenRoadmap={onOpenRoadmap}
      />
    </>
  );
}
