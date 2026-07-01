import express, { Router } from "express";
import {
  PostProduct,
  GetProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/productController";
import { isAuth } from "../middleware/isAuth";
import { filter } from "../middleware/isRole";
const router: Router = express.Router();

router.get("/", GetProducts);
router.post("/", isAuth, filter(["ADMIN", "DESIGNER"]), PostProduct);
router.delete("/:id", isAuth, filter(["ADMIN", "DESIGNER"]), deleteProduct);
router.patch("/:id", isAuth, filter(["ADMIN", "DESIGNER"]), updateProduct);

export default router;
