import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: string;
    }
  }
}
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const resHeader = req.headers.authorization as string;
    if (!resHeader || !resHeader.startsWith("Bearer ")) {
      res.status(401).json({ msg: "Malesef önce giriş yapmalısın" });
      return;
    }
    const token: string = resHeader.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      process.env.SECRET_TOKEN as string,
    ) as { id: string; role: string };

    req.userId = decodedToken.id;
    req.userRole = decodedToken.role;
    next();
  } catch (err) {
    res.status(403).json({ msg: "Geçersiz veya süresi dolmuş token" });
  }
};
