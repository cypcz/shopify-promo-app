const NEXT_PUBLIC_SHOPIFY_API_KEY = process.env.NEXT_PUBLIC_SHOPIFY_API_KEY;
const SHOPIFY_API_SCOPES = process.env.SHOPIFY_API_SCOPES;
const SHOPIFY_APP_URL = process.env.SHOPIFY_APP_URL;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
const PORT = process.env.PORT;

export const checkMissingEnvVars = () => {
  if (
    !NEXT_PUBLIC_SHOPIFY_API_KEY ||
    !SHOPIFY_API_SCOPES ||
    !SHOPIFY_APP_URL ||
    !SHOPIFY_API_SECRET
  ) {
    throw new Error("Missing env vars");
  }
};

export const IS_DEV = process.env.NODE_ENV !== "production";

export {
  NEXT_PUBLIC_SHOPIFY_API_KEY,
  SHOPIFY_API_SCOPES,
  SHOPIFY_APP_URL,
  SHOPIFY_API_SECRET,
  PORT,
};
