type SwipeEmptyStateProps = {
  canLoadMore: boolean;
  onLoadMore: () => void;
  onBack: () => void;
};

export function SwipeEmptyState({
  canLoadMore,
  onLoadMore,
  onBack,
}: SwipeEmptyStateProps) {
  return (
    <div className="empty-state">
      <h2>All caught up.</h2>
      <p>Load more subscriptions or return to setup.</p>
      <div className="empty-actions">
        <button
          type="button"
          className="swipe-button"
          disabled={!canLoadMore}
          onClick={onLoadMore}
        >
          Load more
        </button>
        <button className="ghost" type="button" onClick={onBack}>
          Back to setup
        </button>
      </div>
    </div>
  );
}
