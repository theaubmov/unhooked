import type { Platform, PlatformId } from '../app.types';

type PlatformSwitcherProps = {
  platforms: Platform[];
  activeId: PlatformId;
  onChange: (platformId: PlatformId) => void;
};

export function PlatformSwitcher({
  platforms,
  activeId,
  onChange,
}: PlatformSwitcherProps) {
  return (
    <div className="switcher" role="group" aria-label="Platform focus">
      {platforms.map((platform) => (
        <button
          key={platform.id}
          type="button"
          aria-pressed={platform.id === activeId}
          data-active={platform.id === activeId}
          onClick={() => onChange(platform.id)}
        >
          {platform.label}
        </button>
      ))}
    </div>
  );
}
