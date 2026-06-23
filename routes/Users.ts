import express, { Router } from "express";
import { userLogin, userRegister } from "../controllers/userController";
const router: Router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);

export default router;
