/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLARITY_PROJECT_ID: string;
  readonly VITE_THUNDERFOREST_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
