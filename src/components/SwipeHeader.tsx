import type { CSSProperties } from 'react';

type SwipeHeaderProps = {
  currentIndex: number;
  totalCount: number;
  totalAvailable?: number;
  isLoading: boolean;
  hasCurrentCard: boolean;
  onBack: () => void;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function SwipeHeader({
  currentIndex,
  totalCount,
  totalAvailable,
  isLoading,
  hasCurrentCard,
  onBack,
}: SwipeHeaderProps) {
  const resolvedTotal = totalAvailable ?? totalCount;
  const processedCount = clamp(
    currentIndex + (hasCurrentCard ? 1 : 0),
    0,
    resolvedTotal,
  );
  const remainingCount = Math.max(resolvedTotal - processedCount, 0);
  const progressPercent =
    resolvedTotal > 0 ? (processedCount / resolvedTotal) * 100 : 0;

  const progressLabel =
    resolvedTotal > 0 ? `${processedCount} of ${resolvedTotal}` : 'No channels';

  return (
    <div className="swipe-header">
      <button className="ghost" type="button" onClick={onBack}>
        Back to setup
      </button>
      <div className="progress">
        <div
          className={`progress-ring${isLoading ? ' is-loading' : ''}`}
          style={{ '--progress': `${progressPercent}%` } as CSSProperties}
          aria-hidden="true"
        />
        <div className="progress-text">
          <span>{progressLabel}</span>
          <span className="progress-remaining">{remainingCount} remaining</span>
        </div>
      </div>
    </div>
  );
}
