import type { YoutubeSubscription } from '../types/youtube';
import { SwipeActions } from './SwipeActions';
import { SwipeCardStack } from './SwipeCardStack';
import { SwipeEmptyState } from './SwipeEmptyState';
import { SwipeHeader } from './SwipeHeader';

type SwipeViewProps = {
  currentIndex: number;
  totalCount: number;
  currentCard?: YoutubeSubscription;
  nextCard?: YoutubeSubscription;
  isLoading: boolean;
  isActionLoading: boolean;
  errorMessage: string | null;
  canLoadMore: boolean;
  onBack: () => void;
  onLoadMore: () => void;
  onUnsubscribe: () => void;
  onKeep: () => void;
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
  onBack,
  onLoadMore,
  onUnsubscribe,
  onKeep,
}: SwipeViewProps) {
  return (
    <section className="swipe">
      <SwipeHeader
        currentIndex={currentIndex}
        totalCount={totalCount}
        onBack={onBack}
      />

      {isLoading && <div className="loader">Loading your channels...</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}

      {!isLoading && currentCard ? (
        <>
          <SwipeCardStack currentCard={currentCard} nextCard={nextCard} />
          <SwipeActions
            isActionLoading={isActionLoading}
            onUnsubscribe={onUnsubscribe}
            onKeep={onKeep}
          />
        </>
      ) : null}

      {!isLoading && !currentCard && (
        <SwipeEmptyState
          canLoadMore={canLoadMore}
          onLoadMore={onLoadMore}
          onBack={onBack}
        />
      )}
    </section>
  );
}
