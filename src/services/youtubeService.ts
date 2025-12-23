import type {
  YoutubeAPI,
  YoutubeApiConfig,
  YoutubeApiResponse,
  YoutubeChannel,
  YoutubeChannelsParams,
  YoutubeSubscription,
  YoutubeSubscriptionsParams,
  YoutubeService,
} from '../types/youtube';

export class YoutubeServiceImpl implements YoutubeService {
  private readonly defaultSubscriptionsParams: YoutubeSubscriptionsParams = {
    part: 'snippet',
    mine: true,
    maxResults: 50,
  };

  constructor(
    private api: YoutubeAPI,
    private config: YoutubeApiConfig,
  ) {}

  async listUserChannels(
    params: Partial<YoutubeSubscriptionsParams> = {},
  ): Promise<YoutubeApiResponse<YoutubeSubscription>> {
    const mergedParams = {
      ...this.defaultSubscriptionsParams,
      ...params,
    };

    return this.api.getSubscriptions(mergedParams, this.config);
  }

  async getChannelDetails(
    params: YoutubeChannelsParams,
  ): Promise<YoutubeApiResponse<YoutubeChannel>> {
    const mergedParams = {
      ...params,
      part: params.part || 'snippet',
    };

    return this.api.getChannels(mergedParams, this.config);
  }

  async unsubscribe(subscriptionId: string): Promise<void> {
    await this.api.unsubscribe(subscriptionId, this.config);
  }
}
