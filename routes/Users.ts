import express, { Router } from "express";
import {
  userLogin,
  userRegister,
  getProfil,
} from "../controllers/userController";
import { isAuth } from "../middleware/isAuth";
const router: Router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/profil", isAuth, getProfil);

export default router;
