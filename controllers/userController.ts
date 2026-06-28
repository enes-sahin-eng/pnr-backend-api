import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface userBody {
  fullname: string;
  email: string;
  password: string;
  role: string;
}
interface loginBody {
  email: string;
  password: string;
}

export const userRegister = async (
  req: Request<{}, {}, userBody>,
  res: Response,
): Promise<void> => {
  const { fullname, email, password }: userBody = req.body;
  try {
    const userExist = await prisma.user.findUnique({ where: { email } });
    if (userExist) {
      res.status(409).json({ msg: "Bu email Kullanılmaktadır" });
      return;
    }
    const hashedPasword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPasword,
      },
      select: { id: true, fullname: true, email: true, role: true },
    });
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      process.env.SECRET_TOKEN as string,
      {
        expiresIn: "1h",
      },
    );
    res.status(201).json({ fullname, email, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Malesef sunucu hatası " });
  }
};

export const userLogin = async (
  req: Request<{}, {}, loginBody>,
  res: Response,
): Promise<void> => {
  const { email, password }: loginBody = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      res.status(404).json({ msg: "Malesef yanlış mail yada parola" });
      return;
    }
    const checkedPassword = await bcrypt.compare(password, user.password);
    if (!checkedPassword) {
      res.status(401).json({ msg: "Malesef yanlış mail yada parola" });
      return;
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_TOKEN as string,
      {
        expiresIn: "1h",
      },
    );

    res.status(200).json({
      msg: "Giriş işlemi başarılı!",
      token: token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Malesef sunucu hatası " });
  }
};

export const getProfil = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { fullname: true, email: true },
    });
    if (!user) {
      res
        .status(401)
        .json({ msg: "Kullanıcı bulunamadı, oturumunuz sonlandırıldı." });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "malesef sunucu hatası" });
  }
};
export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: { fullname: true, email: true },
    });
    if (users.length <= 0) {
      res
        .status(401)
        .json({ msg: "Kullanıcı bulunamadı, oturumunuz sonlandırıldı." });
      return;
    }
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "malesef sunucu hatası" });
  }
};
