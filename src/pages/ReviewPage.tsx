import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { YoutubeHttpAPI } from '../apis/youtubeApi';
import { PLATFORMS } from '../app.constants';
import type { CSSVars } from '../app.types';
import { SwipeView } from '../components/SwipeView';
import { YoutubeServiceImpl } from '../services/youtubeService';
import type {
  YoutubeChannel,
  YoutubeSubscription,
  YoutubeSubscriptionCard,
} from '../types/youtube';

export function ReviewPage() {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState<YoutubeSubscriptionCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [totalSubscriptions, setTotalSubscriptions] = useState<number | null>(null);
  const currentCard = subscriptions[currentIndex];
  const nextCard = subscriptions[currentIndex + 1];
  const activePlatform =
    PLATFORMS.find((platform) => platform.id === 'youtube') ?? PLATFORMS[0];
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

  const getErrorMessage = (error: unknown) =>
    error instanceof Error ? error.message : 'Something went wrong. Please try again.';

  const createYoutubeService = useCallback(
    () =>
      new YoutubeServiceImpl(new YoutubeHttpAPI(), {
        apiKey: youtubeApiKey?.trim(),
        clientId: youtubeClientId?.trim(),
        accessToken: youtubeAccessToken?.trim(),
      }),
    [youtubeApiKey, youtubeClientId, youtubeAccessToken],
  );

  const buildChannelVisuals = useCallback(
    async (items: YoutubeSubscription[]) => {
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
    },
    [createYoutubeService],
  );

  const applyChannelVisuals = useCallback(
    (
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
      }),
    [],
  );

  const loadSubscriptions = useCallback(
    async (pageToken?: string) => {
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
        if (!pageToken) {
          const totalResults = response.pageInfo?.totalResults;
          if (typeof totalResults === 'number') {
            setTotalSubscriptions(totalResults);
          }
        }
        setNextPageToken(response.nextPageToken);
        setHasLoaded(true);
        if (!pageToken) {
          setCurrentIndex(0);
        }
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
    [
      applyChannelVisuals,
      buildChannelVisuals,
      createYoutubeService,
      youtubeAccessToken,
    ],
  );

  useEffect(() => {
    void loadSubscriptions();
  }, [loadSubscriptions]);

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
    setSubscriptions([]);
    setCurrentIndex(0);
    setNextPageToken(undefined);
    setErrorMessage(null);
    setHasLoaded(false);
    setTotalSubscriptions(null);
    navigate('/');
  };

  return (
    <div className="page" style={themeStyle}>
      <SwipeView
        currentIndex={currentIndex}
        totalCount={subscriptions.length}
        totalAvailable={totalSubscriptions ?? undefined}
        currentCard={currentCard}
        nextCard={nextCard}
        isLoading={isLoading}
        isActionLoading={isActionLoading}
        errorMessage={errorMessage}
        canLoadMore={!!nextPageToken && !isLoading}
        hasLoaded={hasLoaded}
        onBack={handleReset}
        onLoadMore={() => void loadSubscriptions(nextPageToken)}
        onUnsubscribe={() => void handleSwipe('left')}
        onKeep={() => void handleSwipe('right')}
        onSwipeLeft={() => void handleSwipe('left')}
        onSwipeRight={() => void handleSwipe('right')}
      />
    </div>
  );
}
