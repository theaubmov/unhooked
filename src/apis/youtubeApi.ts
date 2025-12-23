import type {
  YoutubeAPI,
  YoutubeApiConfig,
  YoutubeApiResponse,
  YoutubeChannel,
  YoutubeChannelsParams,
  YoutubeSubscription,
  YoutubeSubscriptionsParams,
} from '../types/youtube';

export const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

type RequestParams = Record<string, string | number | boolean | undefined>;

const buildQueryParams = (params: RequestParams) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }

    searchParams.set(key, String(value));
  });

  return searchParams;
};

export class YoutubeHttpAPI implements YoutubeAPI {
  constructor(private baseUrl: string = YOUTUBE_API_BASE_URL) {}

  async getSubscriptions(
    params: YoutubeSubscriptionsParams,
    config: YoutubeApiConfig,
  ): Promise<YoutubeApiResponse<YoutubeSubscription>> {
    return this.request('/subscriptions', config, {
      params,
    });
  }

  async getChannels(
    params: YoutubeChannelsParams,
    config: YoutubeApiConfig,
  ): Promise<YoutubeApiResponse<YoutubeChannel>> {
    return this.request('/channels', config, {
      params,
    });
  }

  async unsubscribe(subscriptionId: string, config: YoutubeApiConfig): Promise<void> {
    await this.request('/subscriptions', config, {
      method: 'DELETE',
      params: {
        id: subscriptionId,
      },
    });
  }

  private async request<TResponse>(
    path: string,
    config: YoutubeApiConfig,
    options: RequestInit & { params?: RequestParams } = {},
    attempt = 0,
  ): Promise<TResponse> {
    const url = new URL(`${this.baseUrl}${path}`);
    const queryParams = buildQueryParams({
      key: config.apiKey || undefined,
      // client_id: config.clientId || undefined,
      ...options.params,
    });
    url.search = queryParams.toString();

    const headers = new Headers(options.headers);
    if (config.accessToken) {
      headers.set('Authorization', `Bearer ${config.accessToken}`);
    }

    const response = await fetch(url.toString(), {
      ...options,
      headers,
    });

    if (response.status === 429 && attempt < 2 && (options.method ?? 'GET') === 'GET') {
      const retryAfterHeader = response.headers.get('Retry-After');
      const retryAfterSeconds = retryAfterHeader ? Number(retryAfterHeader) : NaN;
      const backoffMs = Number.isFinite(retryAfterSeconds)
        ? retryAfterSeconds * 1000
        : 500 * (attempt + 1);

      await new Promise((resolve) => setTimeout(resolve, backoffMs));
      return this.request(path, config, options, attempt + 1);
    }

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      const details = body ? ` ${JSON.stringify(body)}` : '';
      throw new Error(`YouTube API request failed (${response.status}).${details}`);
    }

    if (response.status === 204) {
      return undefined as TResponse;
    }

    return (await response.json()) as TResponse;
  }
}
