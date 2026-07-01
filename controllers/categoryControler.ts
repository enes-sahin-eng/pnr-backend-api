import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

interface CategoryBody {
  name: string;
  description: string;
}
interface UpdatedCategoryBody {
  name?: string;
  description?: string;
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
    res.status(500).json({ msg: "Category Yüklenemedi" });
  }
};
export const deleteCategory = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      res.status(404).json({ msg: "malesef kategori bulunamadı" });
      return;
    }
    const deletedCategory = await prisma.category.delete({
      where: { id },
      select: { name: true, description: true },
    });
    res.json(deletedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const updateCategory = async (
  req: Request<{ id: string }, {}, UpdatedCategoryBody>,
  res: Response,
): Promise<void> => {
  const data = req.body;
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      res.status(404).json({ msg: "malesef kategori bulunamadı" });
      return;
    }
    const updatedCategory = await prisma.category.update({
      where: { id },
      data,
      select: { name: true, description: true },
    });
    res.status(201).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
};
