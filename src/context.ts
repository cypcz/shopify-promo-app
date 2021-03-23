import { PrismaClient, Store } from "@prisma/client";
import { Request, Response } from "express";
import { verifyJWT } from "./utils";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  store: Store;
  req: Request;
  res: Response;
}

export const createContext = async (
  req: Request,
  res: Response,
): Promise<Context> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new Error("Unauthenticated!");

  const shop = verifyJWT(authHeader.replace("Bearer ", "")) || "";

  const store = await prisma.store.findUnique({ where: { shop } });

  if (!store) throw new Error("Store not found!");

  return {
    prisma,
    store,
    req,
    res,
  };
};
