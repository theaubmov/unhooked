import { useRef, type PointerEvent, type SyntheticEvent } from 'react';
import type { YoutubeSubscriptionCard } from '../types/youtube';

type SwipeCardStackProps = {
  currentCard: YoutubeSubscriptionCard;
  nextCard?: YoutubeSubscriptionCard;
  isActionLoading: boolean;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
};

const normalizeImageUrl = (url?: string) => {
  if (!url) {
    return '';
  }
  if (url.startsWith('//')) {
    return `https:${url}`;
  }
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  return url;
};

const getCoverUrl = (subscription?: YoutubeSubscriptionCard) =>
  normalizeImageUrl(
    subscription?.visuals?.coverUrl ||
      subscription?.visuals?.avatarUrl ||
      subscription?.snippet?.thumbnails?.high?.url ||
      subscription?.snippet?.thumbnails?.medium?.url ||
      subscription?.snippet?.thumbnails?.default?.url ||
      '',
  );

const getAvatarUrl = (subscription?: YoutubeSubscriptionCard) =>
  normalizeImageUrl(
    subscription?.visuals?.avatarUrl ||
      subscription?.snippet?.thumbnails?.default?.url ||
      subscription?.snippet?.thumbnails?.medium?.url ||
      subscription?.snippet?.thumbnails?.high?.url ||
      '',
  );

export function SwipeCardStack({
  currentCard,
  nextCard,
  isActionLoading,
  onSwipeLeft,
  onSwipeRight,
}: SwipeCardStackProps) {
  const startPointRef = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    if (isActionLoading) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    startPointRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (!startPointRef.current || isActionLoading) {
      return;
    }
    event.currentTarget.releasePointerCapture(event.pointerId);

    const deltaX = event.clientX - startPointRef.current.x;
    const deltaY = event.clientY - startPointRef.current.y;
    startPointRef.current = null;

    if (Math.abs(deltaX) < 60 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  };

  const handlePointerCancel = () => {
    startPointRef.current = null;
  };

  const currentCover = getCoverUrl(currentCard);
  const currentAvatar = getAvatarUrl(currentCard);
  const showAvatar = !!currentAvatar && currentAvatar !== currentCover;
  const nextCover = getCoverUrl(nextCard);
  const coverFallback = showAvatar ? currentAvatar : '';

  const handleImageError = (
    event: SyntheticEvent<HTMLImageElement>,
    fallback?: string,
  ) => {
    const target = event.currentTarget;
    if (fallback && target.dataset.fallbackApplied !== 'true') {
      target.dataset.fallbackApplied = 'true';
      target.src = fallback;
      return;
    }
    target.style.display = 'none';
  };
  const currentChannelId =
    currentCard.snippet?.resourceId?.channelId || currentCard.snippet?.channelId;

  return (
    <div className="swipe-stack">
      {nextCard && (
        <article className="swipe-card card ghost-card">
          <div className="card-media">
            <div className="card-cover" data-empty={!nextCover}>
            {nextCover ? (
              <img
                src={nextCover}
                alt=""
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(event) => handleImageError(event)}
              />
            ) : (
              <div className="cover-fallback" aria-hidden="true" />
            )}
          </div>
          </div>
          <div className="card-body">
            <div className="tag">Next</div>
            <h2>{nextCard.snippet?.title || 'Untitled channel'}</h2>
            <p>Prepare to decide on the next channel.</p>
          </div>
        </article>
      )}
      <article
        className="swipe-card card active-card"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerCancel}
      >
        <div className="card-media">
          <div className="card-cover" data-empty={!currentCover}>
            {currentCover ? (
              <img
                src={currentCover}
                alt={`${currentCard.snippet?.title || 'Channel'} cover`}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(event) => handleImageError(event, coverFallback)}
              />
            ) : (
              <div className="cover-fallback" aria-hidden="true" />
            )}
          </div>
          {showAvatar && (
            <img
              className="channel-avatar"
              src={currentAvatar}
              alt={`${currentCard.snippet?.title || 'Channel'} avatar`}
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(event) => handleImageError(event)}
            />
          )}
        </div>
        <div className="card-body">
          <div className="tag">Current</div>
          <h2>{currentCard.snippet?.title || 'Untitled channel'}</h2>
          {currentCard.snippet?.description && (
            <p className="card-description">{currentCard.snippet.description}</p>
          )}
          <p>
            Channel ID:{' '}
            <span className="mono">{currentChannelId}</span>
          </p>
          {currentChannelId && (
            <a
              className="view-channel"
              href={`https://www.youtube.com/channel/${currentChannelId}`}
              target="_blank"
              rel="noreferrer"
            >
              View channel
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
