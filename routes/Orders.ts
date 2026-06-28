import express, { Router } from "express";
import {
  getOrder,
  postOrder,
  updateStatus,
} from "../controllers/orderController";
import { isAuth } from "../middleware/isAuth";
import { filter } from "../middleware/isRole";

const router = express.Router();

router.get("/", isAuth, getOrder);
router.post("/", isAuth, postOrder);
router.patch(
  "/:id/status",
  isAuth,
  filter(["ADMIN", "DESIGNER"]),
  updateStatus,
);
export default router;
