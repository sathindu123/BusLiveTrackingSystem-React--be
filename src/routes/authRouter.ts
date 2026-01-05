import { Router } from "express";
import {
  handleRefreshToken,
  login,
  userRegister,
} from "../controllers/authController"
import { authenticate } from "../middleware/authMiddleware"

const router = Router();

router.post("/register", userRegister)
router.post("/login", login)

router.post("/refresh", handleRefreshToken)
router.get("/me", authenticate)


export default router