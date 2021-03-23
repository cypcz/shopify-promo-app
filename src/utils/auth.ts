import crypto from "crypto";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IS_DEV, SHOPIFY_API_SECRET } from "../setup";

const isHostnameValid = (hostname: string) => {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com$/.test(hostname)) {
    throw new Error("Security checks failed for hostname");
  }
};

const isHMACValid = (queryParams: Record<string, any>) => {
  const { hmac, ...rest } = queryParams;
  const hash = crypto
    .createHmac("SHA256", SHOPIFY_API_SECRET)
    .update(new URLSearchParams(rest).toString())
    .digest("hex");

  if (hash !== hmac) {
    throw new Error("Security checks failed for hmac");
  }
};

export const validateHMAC = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  isHMACValid(req.query);
  next();
};

export const validateHostname = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  isHostnameValid((req.query as any).shop);
  next();
};

export const verifyJWT = (token: string): string => {
  let tokenData;
  if (IS_DEV) {
    tokenData = jwt.decode(token) as Record<string, any>;
  } else {
    tokenData = jwt.verify(token, SHOPIFY_API_SECRET) as Record<string, any>;
  }

  return tokenData?.dest.replace("https://", "");
};
