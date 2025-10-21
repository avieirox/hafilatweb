/// <reference types="vite/client" />

// Extend env typing for our project-specific variables
interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
