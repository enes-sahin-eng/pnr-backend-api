import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
import productRouter from "./routes/Product";
import categoryRouter from "./routes/Categories";
import orderRouter from "./routes/Orders";
import userRouter from "./routes/Users";
import { prisma } from "./utils/prisma";

app.get("/", (req: Request, res: Response) => {
  res.send("Karargah TS ile ayağa kalktı!");
});

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/user", userRouter);

async function main() {
  await prisma.$connect();

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda dinleniyor...`);
  });
}

main().catch((err) => {
  console.error("Sunucu başlatılamadı:", err);
  process.exit(1);
});
