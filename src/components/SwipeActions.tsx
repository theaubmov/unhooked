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
        Unsubscribe
      </button>
      <button
        type="button"
        className="swipe-button"
        disabled={isActionLoading}
        onClick={onKeep}
      >
        Keep
      </button>
    </div>
  );
}
