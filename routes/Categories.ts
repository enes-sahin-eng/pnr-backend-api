import express, { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import { filter } from "../middleware/isRole";
const router = express.Router();
import {
  getCategories,
  postCategories,
} from "../controllers/categoryControler";
router.get("/", getCategories);
router.post("/", isAuth, filter(["ADMIN", "DESIGNER"]), postCategories);
export default router;
