import type { YoutubeSubscription } from '../types/youtube';

type SwipeCardStackProps = {
  currentCard: YoutubeSubscription;
  nextCard?: YoutubeSubscription;
};

export function SwipeCardStack({ currentCard, nextCard }: SwipeCardStackProps) {
  return (
    <div className="swipe-stack">
      {nextCard && (
        <article className="swipe-card card ghost-card">
          <div className="tag">Next</div>
          <h2>{nextCard.snippet?.title || 'Untitled channel'}</h2>
          <p>Prepare to decide on the next channel.</p>
        </article>
      )}
      <article className="swipe-card card active-card">
        <div className="tag">Current</div>
        <h2>{currentCard.snippet?.title || 'Untitled channel'}</h2>
        <p>
          Channel ID: <span className="mono">{currentCard.snippet?.channelId}</span>
        </p>
        <div className="meta">
          <span>Swipe left to unsubscribe.</span>
          <span>Swipe right to keep.</span>
        </div>
      </article>
    </div>
  );
}
