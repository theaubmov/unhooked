type SwipeActionsProps = {
  isActionLoading: boolean;
  onUnsubscribe: () => void;
  onKeep: () => void;
};

export function SwipeActions({
  isActionLoading,
  onUnsubscribe,
  onKeep,
}: SwipeActionsProps) {
  return (
    <div className="swipe-actions">
      <button
        type="button"
        className="swipe-button danger"
        disabled={isActionLoading}
        onClick={onUnsubscribe}
      >
        <span className="action-title">&lt; Unsubscribe</span>
        <span className="action-meta">Swipe left</span>
      </button>
      <button
        type="button"
        className="swipe-button primary"
        disabled={isActionLoading}
        onClick={onKeep}
      >
        <span className="action-title">Keep &gt;</span>
        <span className="action-meta">Swipe right</span>
      </button>
    </div>
  );
}
