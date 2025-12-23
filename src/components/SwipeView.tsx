import type { YoutubeSubscriptionCard } from '../types/youtube';
import { SwipeActions } from './SwipeActions';
import { SwipeCardStack } from './SwipeCardStack';
import { SwipeEmptyState } from './SwipeEmptyState';
import { SwipeHeader } from './SwipeHeader';

type SwipeViewProps = {
  currentIndex: number;
  totalCount: number;
  currentCard?: YoutubeSubscriptionCard;
  nextCard?: YoutubeSubscriptionCard;
  isLoading: boolean;
  isActionLoading: boolean;
  errorMessage: string | null;
  canLoadMore: boolean;
  totalAvailable?: number;
  hasLoaded: boolean;
  onBack: () => void;
  onLoadMore: () => void;
  onUnsubscribe: () => void;
  onKeep: () => void;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

export function SwipeView({
  currentIndex,
  totalCount,
  currentCard,
  nextCard,
  isLoading,
  isActionLoading,
  errorMessage,
  canLoadMore,
  totalAvailable,
  hasLoaded,
  onBack,
  onLoadMore,
  onUnsubscribe,
  onKeep,
  onSwipeLeft,
  onSwipeRight,
}: SwipeViewProps) {
  return (
    <section className="swipe">
      <SwipeHeader
        currentIndex={currentIndex}
        totalCount={totalCount}
        totalAvailable={totalAvailable}
        isLoading={isLoading}
        hasCurrentCard={!!currentCard}
        onBack={onBack}
      />

      {errorMessage && <div className="error">{errorMessage}</div>}

      {!isLoading && currentCard ? (
        <>
          <SwipeCardStack
            currentCard={currentCard}
            nextCard={nextCard}
            isActionLoading={isActionLoading}
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
          />
          <SwipeActions
            isActionLoading={isActionLoading}
            onUnsubscribe={onUnsubscribe}
            onKeep={onKeep}
          />
        </>
      ) : null}

      {!isLoading && !currentCard && hasLoaded && (
        <SwipeEmptyState
          canLoadMore={canLoadMore}
          onLoadMore={onLoadMore}
          onBack={onBack}
        />
      )}
    </section>
  );
}
