import { Request, Response } from "express";
import { OrderStatus } from "@prisma/client";
import { prisma } from "../utils/prisma";

interface OrderItemBody {
  productId: string;
  quantity: number;
}
interface OrderBody {
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  items: OrderItemBody[];
}
interface OrderItemData {
  productId: string;
  quantity: number;
  price: number;
}
type Params = {
  id: string;
};
export const postOrder = async (
  req: Request<{}, {}, Omit<OrderBody, "userId">>,
  res: Response,
): Promise<void> => {
  const { items } = req.body;
  const userId = req.userId as string;
  let totalAmount = 0;
  const orderItemsData: OrderItemData[] = [];
  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
    });
    if (!product) {
      res.status(404).json({ msg: "malesef bu rün bulunamadı" });
      return;
    }
    orderItemsData.push({
      price: product.price,
      quantity: item.quantity,
      productId: item.productId,
    });
    totalAmount += product.price * item.quantity;
  }
  try {
    const newOrder = await prisma.order.create({
      data: { userId, totalAmount, items: { create: orderItemsData } },
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

export const updateStatus = async (
  req: Request<Params, {}, OrderBody>,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    res.status(200).json({
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (err) {
    res.json(err);
  }
};
