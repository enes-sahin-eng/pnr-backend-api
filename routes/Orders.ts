import express, { Router } from "express";
import { getOrder, postOrder } from "../controllers/orderController";
import { isAuth } from "../middleware/isAuth";

const router = express.Router();

router.get("/", isAuth, getOrder);
router.post("/", isAuth, postOrder);
export default router;
