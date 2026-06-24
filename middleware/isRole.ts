import { NextFunction, Request, Response } from "express";

export const filter = (allowRoles: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { userId, userRole } = req;

    if (!userId) {
      res.status(403).json({ msg: "Bu işlemi yapmaya yetkiniz yok." });
      return;
    }
    const isAllowed = allowRoles.includes(userRole as string);
    if (!isAllowed) {
      res.status(403).json({ msg: "Bu işlemi yapmaya yetkiniz yok." });
      return;
    }

    next();
  };
};
