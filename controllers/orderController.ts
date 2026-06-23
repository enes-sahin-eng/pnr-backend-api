import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
interface OrderItemBody {
  productId: string;
  quantity: number;
  price: number;
}
interface OrderBody {
  userId: string;
  totalAmount: number;
  items: OrderItemBody[];
}

export const postOrder = async (
  req: Request<{}, {}, Omit<OrderBody, "userId">>,
  res: Response,
): Promise<void> => {
  const { totalAmount, items } = req.body;
  const userId = req.userId as string;
  try {
    const newOrder = await prisma.order.create({
      data: { userId, totalAmount, items: { create: items } },
    });
    res.status(201).json(newOrder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "malesef bir hata gerçekleşti" });
  }
};

export const getOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: { include: { product: true } } },
    });
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "malesef bir hata gerçekleşti" });
  }
};
