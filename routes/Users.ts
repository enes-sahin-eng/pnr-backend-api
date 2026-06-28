import express, { Router } from "express";
import {
  userLogin,
  userRegister,
  getProfil,
  getAllUsers,
} from "../controllers/userController";
import { isAuth } from "../middleware/isAuth";
import { filter } from "../middleware/isRole";
const router: Router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/profil", isAuth, getProfil);
router.get("/all", isAuth, filter(["ADMIN"]), getAllUsers);

export default router;
