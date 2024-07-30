import { Router } from "express";
import { registerValidation, loginValidation } from "../validations";
import { checkAuth, handleValidationErrors } from "../utils";
import { UserController } from "../controllers";

const router = Router();

router.post(
  "/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);

router.post(
  "/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);

router.get("/me", checkAuth, UserController.getMe);

export default router;
