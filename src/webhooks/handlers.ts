import { Request, Response } from "express";
import { prisma } from "../context";

export const customersRedact = async (req: Request, res: Response) => {
  console.log("customers redact webhook called");
  console.log(req.headers);

  return res.sendStatus(200);
};

export const shopRedact = async (req: Request, res: Response) => {
  console.log("shop redact webhook called");
  console.log(req.headers);

  return res.sendStatus(200);
};

export const customersDataRequest = async (req: Request, res: Response) => {
  console.log("customers data request webhook called");
  console.log(req.headers);

  return res.sendStatus(200);
};

export const appUninstalled = async (req: Request, res: Response) => {
  console.log("uninstall webhook called");
  console.log(req.headers);
  const shop = req.headers["x-shopify-shop-domain"] as string;

  await prisma.store.update({ where: { shop }, data: { isInstalled: false } });

  return res.sendStatus(200);
};

export const productCreate = async (req: Request, res: Response) => {
  console.log("product create webhook called");
  console.log(req.headers);

  return res.sendStatus(200);
};

export const productUpdate = async (req: Request, res: Response) => {
  console.log("product update webhook called");

  console.log(req.headers);
  return res.sendStatus(200);
};

export const productDelete = async (req: Request, res: Response) => {
  console.log("product delete webhook called");
  console.log(req.headers);

  return res.sendStatus(200);
};
