import express, { Router } from "express";
import { PostProduct, GetProducts } from "../controllers/productController";
const router: Router = express.Router();

router.get("/", GetProducts);
router.post("/", PostProduct);

export default router;
