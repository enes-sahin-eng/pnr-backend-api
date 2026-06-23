import express, { Router } from "express";
const router = express.Router();
import {
  getCategories,
  postCategories,
} from "../controllers/categoryControler";
router.get("/", getCategories);
router.post("/", postCategories);
export default router;
