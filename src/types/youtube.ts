export type YoutubeApiConfig = {
  apiKey?: string;
  clientId?: string;
  accessToken?: string;
};

export type YoutubeSubscriptionsParams = {
  part: string;
  mine?: boolean;
  maxResults?: number;
  pageToken?: string;
};

export type YoutubeChannelsParams = {
  part: string;
  id?: string;
  forUsername?: string;
  maxResults?: number;
  pageToken?: string;
};

export type YoutubeApiResponse<TItem> = {
  items: TItem[];
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo?: {
    totalResults?: number;
    resultsPerPage?: number;
  };
};

export type YoutubeSubscription = {
  id: string;
  snippet?: {
    title?: string;
    channelId?: string;
  };
};

export type YoutubeChannel = {
  id: string;
  snippet?: {
    title?: string;
    description?: string;
    customUrl?: string;
  };
};

export interface YoutubeAPI {
  getSubscriptions(
    params: YoutubeSubscriptionsParams,
    config: YoutubeApiConfig,
  ): Promise<YoutubeApiResponse<YoutubeSubscription>>;
  getChannels(
    params: YoutubeChannelsParams,
    config: YoutubeApiConfig,
  ): Promise<YoutubeApiResponse<YoutubeChannel>>;
  unsubscribe(subscriptionId: string, config: YoutubeApiConfig): Promise<void>;
}

export interface YoutubeService {
  listUserChannels(
    params?: Partial<YoutubeSubscriptionsParams>,
  ): Promise<YoutubeApiResponse<YoutubeSubscription>>;
  getChannelDetails(
    params: YoutubeChannelsParams,
  ): Promise<YoutubeApiResponse<YoutubeChannel>>;
  unsubscribe(subscriptionId: string): Promise<void>;
}
