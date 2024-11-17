/// <reference types="vite/client" />



interface ImportMetaEnv {
    readonly VITE_SUPA_BASE_URL: string;
    readonly VITE_SUPA_BASE_ANON_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }