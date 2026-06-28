import { Request, Response } from "express";
import { ProductType } from "@prisma/client";
import { prisma } from "../utils/prisma";

interface ProductBody {
  name: string;
  price: number;
  type: ProductType;
  imageUrl: string;
  defaultX: number;
  defaultY: number;
  categoryId: string;
}

export const PostProduct = async (
  req: Request<{}, {}, ProductBody>,
  res: Response,
): Promise<void> => {
  const { name, price, type, imageUrl, defaultX, defaultY, categoryId } =
    req.body;
  try {
    const newProduct = await prisma.product.create({
      data: { name, price, type, imageUrl, defaultX, defaultY, categoryId },
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hata oluştu" });
  }
};

export const GetProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Hata oluştu" });
  }
};
