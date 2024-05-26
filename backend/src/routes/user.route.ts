import { Router } from "express";
import {
  getAuthenticatedUser,
  login,
  signUp,
  logout,
} from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", requireAuth, getAuthenticatedUser);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
