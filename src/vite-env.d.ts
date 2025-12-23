/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly YOUTUBE_API_KEY?: string;
  readonly VITE_YOUTUBE_API_KEY?: string;
  readonly YOUTUBE_CLIENT_ID?: string;
  readonly VITE_YOUTUBE_CLIENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
