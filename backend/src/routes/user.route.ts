import { Router } from "express";
import {
  getAuthenticatedUser,
  login,
  signUp,
  logout,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getAuthenticatedUser);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
