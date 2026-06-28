import express, { Router } from "express";
import { PostProduct, GetProducts } from "../controllers/productController";
import { isAuth } from "../middleware/isAuth";
import { filter } from "../middleware/isRole";
const router: Router = express.Router();

router.get("/", GetProducts);
router.post("/", isAuth, filter(["ADMIN", "DESIGNER"]), PostProduct);

export default router;
