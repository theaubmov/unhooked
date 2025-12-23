type SwipeHeaderProps = {
  currentIndex: number;
  totalCount: number;
  onBack: () => void;
};

export function SwipeHeader({ currentIndex, totalCount, onBack }: SwipeHeaderProps) {
  const progress =
    totalCount > 0
      ? `${Math.min(currentIndex + 1, totalCount)} of ${totalCount}`
      : 'No channels loaded';

  return (
    <div className="swipe-header">
      <button className="ghost" type="button" onClick={onBack}>
        Back to setup
      </button>
      <div className="progress">{progress}</div>
    </div>
  );
}
