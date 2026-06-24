import express, { Router } from "express";
import {
  userLogin,
  userRegister,
  getProfil,
} from "../controllers/userController";
import { isAuth } from "../middleware/isAuth";
import { filter } from "../middleware/isRole";
const router: Router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/profil", isAuth, getProfil);
router.get("/all", isAuth, filter(["ADMIN"]), getProfil);

export default router;
