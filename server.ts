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

app.get("/", (req: Request, res: Response) => {
  res.send("Karargah TS ile ayağa kalktı!");
});

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda dinleniyor...`);
});
