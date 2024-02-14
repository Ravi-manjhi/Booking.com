import { Router } from "express";
import {
  authRegister,
  authLogin,
  validateTokenCtrl,
  signOutCtrl,
} from "../controllers/auth.controller";
import { check } from "express-validator";
import { checkError } from "../middleware/error";
import { verifyToken } from "../middleware/auth";

const router = Router();

router.post(
  "/register",
  [
    check("email", "Email is required").isEmail(),
    check("firstName", "firstName is required").isString(),
    check("lastName", "lastName is required").isString(),
    check("password", "password is required").isLength({ min: 6 }).isString(),
  ],
  checkError,
  authRegister
);

router.post(
  "/login",
  [
    check("email", "email must be required").isEmail(),
    check("password", "password more then 6 character")
      .isLength({ min: 6 })
      .isString(),
  ],
  checkError,
  authLogin
);

router.get("/validate-token", verifyToken, validateTokenCtrl);

router.get("/sign-out", signOutCtrl);

export default router;
