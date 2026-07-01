import express, { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import { filter } from "../middleware/isRole";
const router = express.Router();
import {
  deleteCategory,
  getCategories,
  postCategories,
  updateCategory,
} from "../controllers/categoryControler";
router.get("/", getCategories);
router.post("/", isAuth, filter(["ADMIN", "DESIGNER"]), postCategories);
router.delete("/:id", isAuth, filter(["ADMIN", "DESIGNER"]), deleteCategory);
router.patch("/:id", isAuth, filter(["ADMIN", "DESIGNER"]), updateCategory);
export default router;
