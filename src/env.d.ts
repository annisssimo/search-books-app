/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_BOOKS_API_KEY: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
