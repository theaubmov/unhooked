import { useState } from 'react';
import { YoutubeHttpAPI } from './apis/youtubeApi';
import { PLATFORMS } from './app.constants';
import { SetupView } from './components/SetupView';
import { SwipeView } from './components/SwipeView';
import { YoutubeServiceImpl } from './services/youtubeService';
import type { CSSVars, PlatformId } from './app.types';
import type {
  YoutubeChannel,
  YoutubeSubscription,
  YoutubeSubscriptionCard,
} from './types/youtube';

export default function App() {
  const [activeId, setActiveId] = useState<PlatformId>('youtube');
  const [view, setView] = useState<'setup' | 'swipe'>('setup');
  const [subscriptions, setSubscriptions] = useState<YoutubeSubscriptionCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const activePlatform =
    PLATFORMS.find((platform) => platform.id === activeId) ?? PLATFORMS[0];
  const themeStyle: CSSVars = {
    '--accent': activePlatform.accent,
    '--accent-contrast': activePlatform.contrast,
  };
  const youtubeApiKey =
    import.meta.env.YOUTUBE_API_KEY ?? import.meta.env.VITE_YOUTUBE_API_KEY;
  const youtubeClientId =
    import.meta.env.YOUTUBE_CLIENT_ID ?? import.meta.env.VITE_YOUTUBE_CLIENT_ID;
  const youtubeAccessToken =
    import.meta.env.YOUTUBE_ACCESS_TOKEN ?? import.meta.env.VITE_YOUTUBE_ACCESS_TOKEN;
  const isYoutubeActive = activeId === 'youtube';
  const canStart = isYoutubeActive && !!youtubeAccessToken && !isLoading;
  const currentCard = subscriptions[currentIndex];
  const nextCard = subscriptions[currentIndex + 1];

  const getErrorMessage = (error: unknown) =>
    error instanceof Error ? error.message : 'Something went wrong. Please try again.';

  const createYoutubeService = () =>
    new YoutubeServiceImpl(new YoutubeHttpAPI(), {
      apiKey: youtubeApiKey?.trim(),
      clientId: youtubeClientId?.trim(),
      accessToken: youtubeAccessToken?.trim(),
    });

  const buildChannelVisuals = async (items: YoutubeSubscription[]) => {
    const channelIds = items
      .map((item) => item.snippet?.resourceId?.channelId || '')
      .filter(Boolean);

    const uniqueChannelIds = Array.from(new Set(channelIds));
    if (!uniqueChannelIds.length) {
      return new Map<string, YoutubeChannel>();
    }

    const channels: YoutubeChannel[] = [];
    const delayBetweenBatchesMs = 150;

    for (let index = 0; index < uniqueChannelIds.length; index += 50) {
      const batchIds = uniqueChannelIds.slice(index, index + 50);
      try {
        const response = await createYoutubeService().getChannelDetails({
          part: 'brandingSettings,snippet',
          id: batchIds.join(','),
          maxResults: batchIds.length,
        });

        channels.push(...response.items);
      } catch {
        // Keep going so one failed batch does not block the rest.
      }

      if (index + 50 < uniqueChannelIds.length) {
        await new Promise((resolve) => setTimeout(resolve, delayBetweenBatchesMs));
      }
    }

    return new Map(channels.map((channel) => [channel.id, channel]));
  };

  const applyChannelVisuals = (
    items: YoutubeSubscription[],
    channelsById: Map<string, YoutubeChannel>,
  ): YoutubeSubscriptionCard[] =>
    items.map((item) => {
      const channelId = item.snippet?.resourceId?.channelId;
      const channel = channelId ? channelsById.get(channelId) : undefined;
      const avatarUrl =
        channel?.snippet?.thumbnails?.high?.url ||
        channel?.snippet?.thumbnails?.medium?.url ||
        channel?.snippet?.thumbnails?.default?.url;
      const coverUrl =
        channel?.brandingSettings?.image?.bannerExternalUrl || avatarUrl;

      if (!coverUrl && !avatarUrl) {
        return item;
      }

      return {
        ...item,
        visuals: {
          coverUrl,
          avatarUrl,
        },
      };
    });

  const loadSubscriptions = async (pageToken?: string) => {
    if (!youtubeAccessToken?.trim()) {
      setErrorMessage('Missing YOUTUBE_ACCESS_TOKEN in the environment.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await createYoutubeService().listUserChannels({
        pageToken,
      });
      const channelsById = await buildChannelVisuals(response.items);
      const hydratedItems = applyChannelVisuals(response.items, channelsById);

      setSubscriptions((prev) =>
        pageToken ? [...prev, ...hydratedItems] : hydratedItems,
      );
      setNextPageToken(response.nextPageToken);
      if (!pageToken) {
        setCurrentIndex(0);
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = async () => {
    if (!isYoutubeActive) {
      setErrorMessage('YouTube support is available first. Switch back to start.');
      return;
    }
    if (!youtubeAccessToken?.trim()) {
      setErrorMessage('Missing YOUTUBE_ACCESS_TOKEN in the environment.');
      return;
    }

    setView('swipe');
    await loadSubscriptions();
  };

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!currentCard || isActionLoading) {
      return;
    }

    if (direction === 'left') {
      setIsActionLoading(true);
      setErrorMessage(null);
      try {
        await createYoutubeService().unsubscribe(currentCard.id);
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
        setIsActionLoading(false);
        return;
      } finally {
        setIsActionLoading(false);
      }
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const handleReset = () => {
    setView('setup');
    setSubscriptions([]);
    setCurrentIndex(0);
    setNextPageToken(undefined);
    setErrorMessage(null);
  };

  return (
    <div className="page" style={themeStyle}>
      {view === 'setup' ? (
        <SetupView
          activePlatform={activePlatform}
          platforms={PLATFORMS}
          activeId={activeId}
          canStart={canStart}
          isYoutubeActive={isYoutubeActive}
          errorMessage={errorMessage}
          onPlatformChange={setActiveId}
          onStart={handleStart}
        />
      ) : (
        <SwipeView
          currentIndex={currentIndex}
          totalCount={subscriptions.length}
          currentCard={currentCard}
          nextCard={nextCard}
          isLoading={isLoading}
          isActionLoading={isActionLoading}
          errorMessage={errorMessage}
          canLoadMore={!!nextPageToken && !isLoading}
          onBack={handleReset}
          onLoadMore={() => void loadSubscriptions(nextPageToken)}
          onUnsubscribe={() => void handleSwipe('left')}
          onKeep={() => void handleSwipe('right')}
          onSwipeLeft={() => void handleSwipe('left')}
          onSwipeRight={() => void handleSwipe('right')}
        />
      )}
    </div>
  );
}
