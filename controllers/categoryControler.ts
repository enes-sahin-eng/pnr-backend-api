import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

interface CategoryBody {
  name: string;
  description: string;
}

export const getCategories = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json("Malesef kategori bulunamadı");
  }
};

export const postCategories = async (
  req: Request<{}, {}, CategoryBody>,
  res: Response,
): Promise<void> => {
  const { name, description }: CategoryBody = req.body;
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
        description,
      },
    });
    res.status(201).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Category Yüklnemedi" });
  }
};
