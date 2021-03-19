/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_SHOPIFY_API_KEY: string;
    SHOPIFY_API_SECRET: string;
    SHOPIFY_API_SCOPES: string;
    SHOPIFY_APP_URL: string;
  }
}
