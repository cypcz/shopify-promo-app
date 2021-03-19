import { PrismaClient, Store } from "@prisma/client";
import { Request, Response } from "express";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  store: Store | null;
  req: Request;
  res: Response;
}

export const createContext = async (
  req: Request,
  res: Response,
): Promise<Context> => {
  const shop = (req.query as any).shop || "";
  const store = await prisma.store.findUnique({ where: { shop } });
  return {
    prisma,
    store,
    req,
    res,
  };
};
